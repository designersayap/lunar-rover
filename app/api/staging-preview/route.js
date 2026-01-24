import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

// WORKAROUND: Allow self-signed certs for corporate proxy (Vercel Blob SDK usage)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
    try {
        const { blobs } = await list({ prefix: 'staging-data/' });

        // Extract folder names from blob pathnames ("staging-data/folderName/timestamp.json" or legacy "staging-data/folderName.json")
        const folders = new Set();

        blobs.forEach(blob => {
            const parts = blob.pathname.split('/');
            // Expected: staging-data / folderName / timestamp.json
            if (parts.length === 3 && parts[2].endsWith('.json')) {
                folders.add(parts[1]);
            }
            // Logic for legacy files separation if needed, but we essentially want to show the "Folder" concept.
            // If we have legacy "staging-data/legacy.json", strictly speaking it is a folder named "legacy" in the UI concept?
            // Let's support both for transition.
            else if (parts.length === 2 && parts[1].endsWith('.json')) {
                folders.add(parts[1].replace('.json', ''));
            }
        });

        const sortedFolders = Array.from(folders).sort((a, b) => a.localeCompare(b));

        return NextResponse.json({ folders: sortedFolders });
    } catch (error) {
        console.error("Error listing staging blobs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { folderName, fileContent, layoutContent, builderData } = requestBody;

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folderName' }, { status: 400 });
        }

        // Security check for folder name
        if (!/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        // Prepare data object to save
        const stagingData = {
            folderName,
            builderData: builderData || {},
            timestamp: new Date().toISOString()
        };

        // Upload to Vercel Blob
        // We save one JSON file per staging page: staging/{folderName}.json
        const filename = `staging-data/${folderName}.json`;

        await put(filename, JSON.stringify(stagingData), {
            access: 'public',
            addRandomSuffix: false // We deserve to overwrite for updates
        });

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

        const filename = `staging-data/${folderName}.json`;
        const { del } = require('@vercel/blob');

        // We delete directly. If it doesn't exist, it doesn't throw usually, or we catch it.
        // But del takes a URL. We need to List first to get the URL?
        // Or can del take a pathname? No, del(url).
        // So we MUST list first.

        const { list } = require('@vercel/blob');
        const { blobs } = await list({ prefix: filename, limit: 1 });

        if (blobs.length > 0) {
            await del(blobs[0].url);
            console.log(`Deleted existing blob: ${blobs[0].url}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.warn('Error deleting staging page:', error);
        // We don't want to block the flow if delete fails, just warn
        return NextResponse.json({ success: true, warning: error.message });
    }
}

