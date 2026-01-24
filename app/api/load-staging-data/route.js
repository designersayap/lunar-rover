import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// WORKAROUND: Allow self-signed certs for corporate proxy (Vercel Blob SDK usage)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const folderName = searchParams.get('folder');

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folder name' }, { status: 400 });
        }

        const filename = `staging-data/${folderName}.json`;

        // list blobs matching the filename
        const { blobs } = await list({
            prefix: filename,
            limit: 1
        });

        if (blobs.length === 0) {
            return NextResponse.json({ error: 'Staging data not found' }, { status: 404 });
        }

        // Fetch the JSON content from the blob URL
        const blobUrl = blobs[0].url;
        // Cache bust to ensure we get latest
        const bustUrl = blobUrl + (blobUrl.includes('?') ? '&' : '?') + 't=' + new Date().getTime();

        const response = await fetch(bustUrl, {
            cache: 'no-store',
            // Forward any potential headers if needed, generally public access is fine
        });

        if (!response.ok) {
            return NextResponse.json({
                error: `Failed to fetch blob: ${response.statusText}`
            }, { status: response.status });
        }

        const data = await response.json();

        // The stored payload structure is:
        // {
        //   folderName,
        //   components: [...], // The Tree
        //   builderData: {...}, // The Props Map
        //   analytics,
        //   activeThemePath
        // }
        //
        // The client (staging-popover.js) expects an object that has a 'components' property.
        // So returning 'data' directly is correct.

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error loading staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
