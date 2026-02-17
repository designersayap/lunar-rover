export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { S3Manual } from '@/app/lib/s3-manual';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const prefix = 'staging-data/';

        const { Contents } = await S3Manual.listObjects(prefix).catch(err => {
            console.error("S3 List Error:", err);
            throw err;
        });

        // Extract folder names from paths
        const folders = new Set();

        if (Contents) {
            Contents.forEach(item => {
                const parts = item.Key.split('/');
                if (parts.length === 3 && parts[2].endsWith('.json')) {
                    folders.add(parts[1]);
                }
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

    } catch (error) {
        console.error("Error listing staging folders:", error);
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { folderName, builderData } = requestBody;

        if (!folderName || !/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        const timestamp = new Date().toISOString();
        const filename = `staging-data/${folderName}/${Date.now()}.json`;

        const stagingData = {
            folderName,
            builderData: builderData || {},
            components: requestBody.components,
            analytics: requestBody.analytics || {},
            timestamp,
            activeThemePath: requestBody.activeThemePath
        };

        await S3Manual.putJson(filename, stagingData);

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

        const prefix = `staging-data/${folderName}`;

        // 1. List
        const { Contents } = await S3Manual.listObjects(prefix);

        if (Contents && Contents.length > 0) {
            // Delete one by one (Safer/Simpler than XML construction for Multi-Delete)
            await Promise.all(Contents.map(c => S3Manual.deleteObject(c.Key)));
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
