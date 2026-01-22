import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request) {
    try {
        const { folderName, componentId, updates } = await request.json();

        if (!folderName || !componentId || !updates) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const filename = `staging/${folderName}.json`;
        const blobUrl = `${process.env.BLOB_URL_PREFIX || 'https://public.blob.vercel-storage.com'}/${filename}`; // Construct likely URL or use list() to find it if unsure, but standard format is simpler.
        // Better: Fetch the JSON from the public URL directly since we made it public.

        let currentData = {};
        let stagingConfig = {};

        try {
            // Note: In a real production app, you might want to use head() or list() to get the real URL if it's not predictable,
            // or if you want to verify existence. For checking existence and reading, fetching the public URL is efficient.
            // CAUTION: We don't know the exact base URL without list().
            // However, we can use the "copy-on-write" approach: just overwrite? No, we need to merge.

            // Re-list to get the download URL is safer to ensure we have the right one.
            // OR: Since we are in the API, we can just assume we need to read it.
            // Let's rely on the client providing the "latest" state? No, that's risky.

            // Let's use fetch on the expected URL if we can guess it, but Vercel Blob URLs have random suffixes if we let them.
            // BUT: We used `addRandomSuffix: false` in staging-preview, so the URL should be predictable IF the store didn't add one anyway (it sometimes does for uniqueness if creating new).
            // Actually, `addRandomSuffix: false` means it overwrites at the same path.

            // Strategy: content is at `https://<store-id>.public.blob.vercel-storage.com/staging/<folderName>.json`
            // But we don't know store-id easily here without env var or listing.
            // Let's use `list()` to find the blob.

            const { list } = require('@vercel/blob');
            const { blobs } = await list({ prefix: filename, limit: 1 });

            if (blobs.length > 0) {
                const response = await fetch(blobs[0].url);
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
            addRandomSuffix: false
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

