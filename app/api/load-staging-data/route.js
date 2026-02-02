export const runtime = 'edge';

import '@/app/lib/edge-polyfill';
import { NextResponse } from 'next/server';
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import S3 from '@/app/lib/s3-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to read S3 stream
// Helper to read S3 stream (Edge-compatible)
const streamToString = async (stream) => {
    // AWS SDK v3 often adds this mixin
    if (typeof stream.transformToString === 'function') {
        return await stream.transformToString();
    }
    // Web Streams (Edge Runtime)
    if (stream instanceof ReadableStream) {
        return await new Response(stream).text();
    }
    // Node.js Streams fallback
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
};

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const folderName = searchParams.get('folder');

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folder name' }, { status: 400 });
        }

        const bucketName = process.env.B2_BUCKET_NAME;
        const prefix = `staging-data/${folderName}/`;

        // 1. List objects to find latest in timestamped folder
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
            MaxKeys: 1000
        });

        const { Contents } = await S3.send(command).catch(err => {
            console.error("S3 List Error:", err);
            return { Contents: [] };
        });

        let targetKey = null;

        if (Contents && Contents.length > 0) {
            // Sort by LastModified desc
            Contents.sort((a, b) => b.LastModified - a.LastModified);
            targetKey = Contents[0].Key;
            console.log(`[Load Staging] Found ${Contents.length} files. Latest Key: ${targetKey}`);
        } else {
            // 2. Legacy check
            const legacyKey = `staging-data/${folderName}.json`;
            const legacyCommand = new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: legacyKey,
                MaxKeys: 1
            });
            const { Contents: LegacyContents } = await S3.send(legacyCommand).catch(() => ({ Contents: [] }));

            if (LegacyContents && LegacyContents.length > 0) {
                targetKey = LegacyContents[0].Key;
                console.log(`[Load Staging] Found legacy file: ${targetKey}`);
            }
        }

        if (!targetKey) {
            console.log(`[Load Staging] No data found for folder: ${folderName}`);
            return NextResponse.json({ error: 'Staging data not found' }, { status: 404 });
        }

        // Fetch data SECURELY via GetObject (works for private buckets)
        try {
            const getCmd = new GetObjectCommand({
                Bucket: bucketName,
                Key: targetKey
            });
            const { Body } = await S3.send(getCmd);
            const jsonString = await streamToString(Body);
            const data = JSON.parse(jsonString);

            // MERGE LOGIC: Apply builderData overrides to components
            const builderData = data.builderData || {};
            const components = data.components || [];

            const applyOverrides = (list) => {
                if (!Array.isArray(list)) return [];
                return list.map(comp => {
                    let override = null;
                    if (comp.sectionId && builderData[comp.sectionId]) override = builderData[comp.sectionId];
                    else if (comp.uniqueId && builderData[comp.uniqueId]) override = builderData[comp.uniqueId];

                    let newComp = { ...comp };
                    let newProps = { ...(comp.props || {}) };

                    if (override) {
                        Object.entries(override).forEach(([k, v]) => {
                            const topLevelKeys = ['id', 'uniqueId', 'sectionId', 'componentName', 'isSticky'];
                            if (topLevelKeys.includes(k)) newComp[k] = v;
                            else newProps[k] = v;
                        });
                        newComp.props = newProps;
                    }

                    if (newProps.components && Array.isArray(newProps.components)) {
                        newProps.components = applyOverrides(newProps.components);
                        newComp.props = newProps;
                    }
                    if (newComp.components && Array.isArray(newComp.components)) {
                        newComp.components = applyOverrides(newComp.components);
                    }

                    return newComp;
                });
            };

            const mergedComponents = applyOverrides(components);

            console.log(`[Load Staging] Returning data: ${mergedComponents.length} components, ${Object.keys(builderData).length} builderData keys.`);
            if (mergedComponents.length > 0) {
                console.log(`[Load Staging] First component: ${JSON.stringify(mergedComponents[0]).substring(0, 100)}...`);
            } else {
                console.warn("[Load Staging] WARNING: Components array is empty!");
            }

            return NextResponse.json({ ...data, components: mergedComponents }, {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });

        } catch (e) {
            console.error("Error reading object from S3:", e);
            return NextResponse.json({ error: `Failed to read data: ${e.message}` }, { status: 500 });
        }

    } catch (error) {
        console.error('Error loading staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Handle CORS Preflight
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
