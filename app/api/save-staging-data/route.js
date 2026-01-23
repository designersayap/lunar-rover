import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// WORKAROUND: Allow self-signed certs for corporate proxy (Vercel Blob SDK usage)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(request) {
    try {
        const { folderName, componentId, updates } = await request.json();

        if (!folderName || !componentId || !updates) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const filename = `staging-data/${folderName}.json`;
        const blobUrl = `${process.env.BLOB_URL_PREFIX || 'https://public.blob.vercel-storage.com'}/${filename}`; // Construct likely URL or use list() to find it if unsure, but standard format is simpler.
        // Better: Fetch the JSON from the public URL directly since we made it public.

        let currentData = {};
        let stagingConfig = {};

        try {
            const { list } = require('@vercel/blob');
            const { blobs } = await list({ prefix: filename, limit: 1 });

            if (blobs.length > 0) {
                // Cache busting for the read
                const bustUrl = blobs[0].url + (blobs[0].url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
                const response = await fetch(bustUrl, { cache: 'no-store' });
                if (response.ok) {
                    stagingConfig = await response.json();
                    currentData = stagingConfig.builderData || {};
                }
            }
        } catch (e) {
            console.warn("Could not fetch existing data to merge, starting fresh or erroring", e);
            // If we can't find it, we probably can't save effectively.
            return NextResponse.json({ error: 'Staging data not found' }, { status: 404 });
        }

        // Merge updates
        const componentData = currentData[componentId] || {};
        const newData = { ...componentData, ...updates };
        currentData[componentId] = newData;

        // Update the full config object
        stagingConfig.builderData = currentData;
        stagingConfig.timestamp = new Date().toISOString();

        // Write back
        await put(filename, JSON.stringify(stagingConfig), {
            access: 'public',
            addRandomSuffix: false,
            cacheControlMaxAge: 0 // Ensure immediate updates
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

