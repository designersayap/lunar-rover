import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


export async function GET() {
    try {
        const STAGING_DIR = path.join(process.cwd(), 'app', 'staging');

        if (!fs.existsSync(STAGING_DIR)) {
            return NextResponse.json({ folders: [] });
        }

        const items = fs.readdirSync(STAGING_DIR, { withFileTypes: true });
        const folders = items
            .filter(item => item.isDirectory())
            .map(item => item.name)
            .sort((a, b) => b.localeCompare(a));

        return NextResponse.json({ folders });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const requestBody = await request.json();
        let { folderName, fileContent, layoutContent } = requestBody;

        if (!folderName || !fileContent) {
            return NextResponse.json({ error: 'Missing folderName or fileContent' }, { status: 400 });
        }

        const STAGING_DIR = path.join(process.cwd(), 'app', 'staging');

        // Security check for folder name
        if (!/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        const targetDir = path.join(STAGING_DIR, folderName);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Handle data.js: Create only if it doesn't exist
        // Handle data.js: Create only if it doesn't exist, OR clean it up if it does
        const dataFilePath = path.join(targetDir, 'data.js');
        let existingData = {};

        if (fs.existsSync(dataFilePath)) {
            try {
                const dataContent = fs.readFileSync(dataFilePath, 'utf-8');
                const start = dataContent.indexOf('{');
                const end = dataContent.lastIndexOf('}');
                if (start !== -1 && end !== -1) {
                    const jsonString = dataContent.substring(start, end + 1);
                    existingData = JSON.parse(jsonString);
                }
            } catch (e) {
                console.warn("Failed to parse existing data.js for cleanup", e);
            }
        }

        // Cleanup: Remove keys that are not in the current active component list
        // activeComponentIds is passed from client
        const activeComponentIds = requestBody.componentIds;
        if (activeComponentIds && Array.isArray(activeComponentIds)) {
            const activeSet = new Set(activeComponentIds);
            Object.keys(existingData).forEach(key => {
                if (!activeSet.has(key)) {
                    delete existingData[key];
                }
            });
        }

        // Always write the data file to ensure it's up to date with cleanup or creation
        fs.writeFileSync(dataFilePath, `export const data = ${JSON.stringify(existingData, null, 4)};`);

        const filePath = path.join(targetDir, 'page.js');
        fs.writeFileSync(filePath, fileContent);

        // Handle layout.js
        if (layoutContent) {
            const layoutFilePath = path.join(targetDir, 'layout.js');
            fs.writeFileSync(layoutFilePath, layoutContent);
        }

        return NextResponse.json({ success: true, path: `/staging/${folderName}` });
    } catch (error) {
        console.error('Error creating staging page:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
