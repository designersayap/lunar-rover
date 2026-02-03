export const runtime = 'edge';

import '@/app/lib/edge-polyfill'; // Polyfill for DOMParser/XMLSerializer in Edge
import { NextResponse } from 'next/server';
import { ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import S3 from '@/app/lib/s3-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const bucketName = process.env.B2_BUCKET_NAME;
        const prefix = 'staging-data/';

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
            MaxKeys: 1000
        });

        const { Contents } = await S3.send(command).catch(err => {
            console.error("S3 List Error:", err);
            throw err;
        });

        // Extract folder names from paths
        // "staging-data/folderName/timestamp.json" or "staging-data/folderName.json"
        const folders = new Set();

        if (Contents) {
            Contents.forEach(item => {
                const parts = item.Key.split('/');
                // Expected: staging-data / folderName / timestamp.json
                if (parts.length === 3 && parts[2].endsWith('.json')) {
                    folders.add(parts[1]);
                }
                // Legacy: staging-data / folderName.json
                else if (parts.length === 2 && parts[1].endsWith('.json')) {
                    folders.add(parts[1].replace('.json', ''));
                }
            });
        }

        const sortedFolders = Array.from(folders).sort((a, b) => a.localeCompare(b));

        return NextResponse.json({ folders: sortedFolders }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
        return NextResponse.json({ folders: sortedFolders }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (error) {
        console.error("Error listing staging folders:", error);

        // Debugging Runtime State
        const debugInfo = {
            message: error.message,
            stack: error.stack,
            env: {
                hasDOMParser: typeof DOMParser !== 'undefined',
                hasGlobalDOMParser: typeof globalThis.DOMParser !== 'undefined',
                hasWindowDOMParser: typeof window !== 'undefined' && typeof window.DOMParser !== 'undefined',
                runtime: process.env.NEXT_RUNTIME,
                node_env: process.env.NODE_ENV
            }
        };

        return NextResponse.json({ error: debugInfo }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { folderName, builderData } = requestBody;

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folderName' }, { status: 400 });
        }

        if (!/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        // Use timestamped structure to maintain history and consistency with load logic
        const timestamp = new Date().toISOString();
        const filename = `staging-data/${folderName}/${timestamp}.json`;

        const stagingData = {
            folderName,
            builderData: builderData || {},
            components: requestBody.components,
            timestamp,
            // Keep activeThemePath if passed, though not in destructuring above yet
            activeThemePath: requestBody.activeThemePath
        };

        const bucketName = process.env.B2_BUCKET_NAME;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: filename,
            Body: JSON.stringify(stagingData),
            ContentType: 'application/json',
            // ACL: 'public-read' // Assumed bucket policy
        });

        await S3.send(command);

        return NextResponse.json({ success: true, path: `/staging/${folderName}` });
    } catch (error) {
        console.error('Error creating staging page:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const folderName = searchParams.get('folderName');

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folderName' }, { status: 400 });
        }

        const bucketName = process.env.B2_BUCKET_NAME;
        const prefix = `staging-data/${folderName}`;

        // Find all objects with this prefix (folder + legacy file) & Delete them

        // 1. List
        const listCmd = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix
        });
        const { Contents } = await S3.send(listCmd);

        if (Contents && Contents.length > 0) {
            const { DeleteObjectsCommand } = await import('@aws-sdk/client-s3');
            const deleteCmd = new DeleteObjectsCommand({
                Bucket: bucketName,
                Delete: {
                    Objects: Contents.map(c => ({ Key: c.Key }))
                }
            });
            await S3.send(deleteCmd);
            console.log(`Deleted ${Contents.length} objects for folder ${folderName}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.warn('Error deleting staging page:', error);
        return NextResponse.json({ success: true, warning: error.message });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
