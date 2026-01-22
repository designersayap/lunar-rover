import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

export async function GET() {
    try {
        const { blobs } = await list({ prefix: 'staging/' });

        // Extract folder names from blob pathnames ("staging/folderName.json")
        const folders = blobs
            .map(blob => {
                const parts = blob.pathname.split('/');
                if (parts.length === 2 && parts[1].endsWith('.json')) {
                    return parts[1].replace('.json', '');
                }
                return null;
            })
            .filter(Boolean)
            .sort((a, b) => b.localeCompare(a)); // Sort desc (newest first usually)

        return NextResponse.json({ folders });
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
        const filename = `staging/${folderName}.json`;

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

