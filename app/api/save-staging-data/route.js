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

        const filename = `staging-data/${folderName}.json`;

        // Fetch existing data
        let currentData = {};
        let stagingConfig = {};

        try {
            const { list } = require('@vercel/blob');
            const { blobs } = await list({ prefix: filename, limit: 1 });

            if (blobs.length > 0) {
                const bustUrl = blobs[0].url + (blobs[0].url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
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
            const newData = { ...componentData, ...updates };
            currentData[componentId] = newData;
            stagingConfig.builderData = currentData;
        }
        else {
            return NextResponse.json({ error: 'Missing data to save (builderData or componentId+updates)' }, { status: 400 });
        }

        // Update timestamp
        stagingConfig.timestamp = new Date().toISOString();

        // Write back
        await put(filename, JSON.stringify(stagingConfig), {
            access: 'public',
            addRandomSuffix: false, // We want to keep the same name
            allowOverwrite: true,  // Explicitly allow overwriting
            cacheControlMaxAge: 0 // Ensure immediate updates
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

