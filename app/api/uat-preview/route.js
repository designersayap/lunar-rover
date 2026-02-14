
import { NextResponse } from 'next/server';
import { S3Manual } from '@/app/lib/s3-manual';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const S3_UAT_PREFIX = 'uat-files/';

export async function GET() {
    try {
        // List folders using S3 CommonPrefixes with delimiter
        const result = await S3Manual.listObjects(S3_UAT_PREFIX, '/');

        const folders = (result.CommonPrefixes || [])
            .map(prefix => {
                // Prefix is like "uat-files/folder-name/"
                // We want just "folder-name"
                const parts = prefix.Prefix.split('/');
                return parts[parts.length - 2]; // Get the second to last part
            })
            .filter(Boolean)
            .sort();

        return NextResponse.json({ folders });
    } catch (error) {
        console.error("Error listing UAT folders:", error);
        return NextResponse.json({ error: "Failed to list folders" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { files, folderName } = await request.json();

        if (!folderName || !/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
        }

        if (!files || !Array.isArray(files)) {
            return NextResponse.json({ error: "Invalid files array" }, { status: 400 });
        }

        const targetPrefix = `${S3_UAT_PREFIX}${folderName}/`;

        // Process files
        const uploadPromises = files.map(async (file) => {
            // file.path is relative to the internal folder structure, e.g. "index.html" or "assets/style.css"
            // We need to construct the full S3 key
            // Start with targetPrefix
            // Clean file.path to avoid leading slashes if present
            const cleanPath = file.path.startsWith('/') ? file.path.slice(1) : file.path;
            const s3Key = `${targetPrefix}${cleanPath}`;

            let content = file.content;
            let contentType = 'application/octet-stream';

            // Determine content type (basic)
            if (s3Key.endsWith('.html')) contentType = 'text/html';
            else if (s3Key.endsWith('.css')) contentType = 'text/css';
            else if (s3Key.endsWith('.js')) contentType = 'application/javascript';
            else if (s3Key.endsWith('.json')) contentType = 'application/json';
            else if (s3Key.endsWith('.png')) contentType = 'image/png';
            else if (s3Key.endsWith('.jpg') || s3Key.endsWith('.jpeg')) contentType = 'image/jpeg';
            else if (s3Key.endsWith('.svg')) contentType = 'image/svg+xml';

            if (file.base64) {
                // Convert base64 to binary for S3
                // In Edge Runtime, we can use Uint8Array.from directly
                try {
                    const binaryString = atob(file.content);
                    content = Uint8Array.from(binaryString, c => c.charCodeAt(0));
                } catch (e) {
                    console.error(`Failed to decode base64 for file ${file.path}`, e);
                    throw new Error(`Failed to decode base64 for file ${file.path}`);
                }
            }

            await S3Manual.putObject(s3Key, content, contentType);
        });

        await Promise.all(uploadPromises);

        return NextResponse.json({ success: true, path: `/uat-files/${folderName}` });

    } catch (error) {
        console.error("Error saving UAT preview:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
