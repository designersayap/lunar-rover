import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cleanBuilderContent } from '../export-component/helpers';

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
        let { folderName, fileContent, layoutContent } = await request.json();

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
        const dataFilePath = path.join(targetDir, 'data.js');
        if (!fs.existsSync(dataFilePath)) {
            fs.writeFileSync(dataFilePath, 'export const data = {};');
        }

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
