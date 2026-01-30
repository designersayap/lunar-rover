import { NextResponse } from 'next/server';
import { ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import S3 from '@/app/lib/s3-client';

// Helper to read S3 stream
const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });

export async function POST(request) {
    try {
        const { folderName, componentId, updates, builderData } = await request.json();

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folderName' }, { status: 400 });
        }

        const bucketName = process.env.B2_BUCKET_NAME;
        const prefix = `staging-data/${folderName}`;

        let currentData = {};
        let stagingConfig = {};

        try {
            // Find latest file
            const command = new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: prefix + '/',
                MaxKeys: 1000
            });
            let { Contents } = await S3.send(command).catch(() => ({ Contents: [] }));

            let targetKey = null;

            if (Contents && Contents.length > 0) {
                Contents.sort((a, b) => b.LastModified - a.LastModified);
                targetKey = Contents[0].Key;
            } else {
                // Try legacy
                const legacyCmd = new ListObjectsV2Command({
                    Bucket: bucketName,
                    Prefix: prefix + '.json',
                    MaxKeys: 1
                });
                const { Contents: LegacyContents } = await S3.send(legacyCmd).catch(() => ({ Contents: [] }));
                if (LegacyContents && LegacyContents.length > 0) {
                    targetKey = LegacyContents[0].Key;
                }
            }

            if (targetKey) {
                const getCmd = new GetObjectCommand({
                    Bucket: bucketName,
                    Key: targetKey
                });
                const { Body } = await S3.send(getCmd);
                const jsonString = await streamToString(Body);
                stagingConfig = JSON.parse(jsonString);
                currentData = stagingConfig.builderData || {};
            }
        } catch (e) {
            console.warn("Could not fetch existing data to merge, starting fresh or erroring", e);
        }

        // Apply Updates
        if (builderData) {
            stagingConfig.builderData = builderData;
        } else if (componentId && updates) {
            const componentData = currentData[componentId] || {};
            const newData = { ...componentData, ...updates };
            currentData[componentId] = newData;
            stagingConfig.builderData = currentData;
        } else {
            return NextResponse.json({ error: 'Missing data to save' }, { status: 400 });
        }

        stagingConfig.timestamp = new Date().toISOString();

        // Save new version
        const newFilename = `staging-data/${folderName}/${Date.now()}.json`;

        const putCmd = new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: JSON.stringify(stagingConfig),
            ContentType: 'application/json',
            // No ACL needed for private buckets (default is private)
        });

        await S3.send(putCmd);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
