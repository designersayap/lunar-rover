import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// WORKAROUND: Allow self-signed certs for corporate proxy (Vercel Blob SDK usage)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(request) {
    try {
        const { folderName, componentId, updates, builderData } = await request.json();

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folderName' }, { status: 400 });
        }

        const prefix = `staging-data/${folderName}`;

        // Fetch existing data (Latest)
        let currentData = {};
        let stagingConfig = {};

        try {
            const { list } = require('@vercel/blob');
            // Try new structure first
            const { blobs } = await list({ prefix: prefix + '/', limit: 1000 });
            let targetUrl = null;

            if (blobs.length > 0) {
                blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
                targetUrl = blobs[0].url;
            } else {
                // Try legacy
                const { blobs: legacyBlobs } = await list({ prefix: prefix + '.json', limit: 1 });
                if (legacyBlobs.length > 0) targetUrl = legacyBlobs[0].url;
            }

            if (targetUrl) {
                const bustUrl = targetUrl + (targetUrl.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
                const response = await fetch(bustUrl, { cache: 'no-store' });
                if (response.ok) {
                    stagingConfig = await response.json();
                    currentData = stagingConfig.builderData || {};
                }
            }
        } catch (e) {
            console.warn("Could not fetch existing data to merge, starting fresh or erroring", e);
        }

        // Mode 1: Full Overwrite (if builderData is provided)
        if (builderData) {
            stagingConfig.builderData = builderData;
        }
        // Mode 2: Partial Update (if componentId + updates provided)
        else if (componentId && updates) {
            const componentData = currentData[componentId] || {};
            // Partial update needs to be careful about deeply nested props? 
            // For now simple merge is what we had.
            const newData = { ...componentData, ...updates };
            currentData[componentId] = newData;
            stagingConfig.builderData = currentData;
        }
        else {
            return NextResponse.json({ error: 'Missing data to save (builderData or componentId+updates)' }, { status: 400 });
        }

        // Update timestamp
        stagingConfig.timestamp = new Date().toISOString();

        // Write back to NEW timestamped file to avoid cache issues
        // We use the same pattern as stage-preview.js: staging-data/folder/timestamp.json
        const newFilename = `staging-data/${folderName}/${Date.now()}.json`;

        await put(newFilename, JSON.stringify(stagingConfig), {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
            cacheControlMaxAge: 0 // Ensure immediate updates
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

