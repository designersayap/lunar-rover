
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const PREVIEW_DIR = path.join(process.cwd(), 'public', 'testing-page');

        if (!fs.existsSync(PREVIEW_DIR)) {
            return NextResponse.json({ folders: [] });
        }

        const items = fs.readdirSync(PREVIEW_DIR, { withFileTypes: true });
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
        const { files, folderName } = await request.json();

        if (!files || !Array.isArray(files)) {
            return NextResponse.json({ error: 'Invalid files data' }, { status: 400 });
        }

        // 1. Setup and validate secure preview directory path
        const rawFolder = folderName || `export-${Date.now()}`;

        if (!/^[a-zA-Z0-9-_]+$/.test(rawFolder)) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        const PREVIEW_DIR = path.join(process.cwd(), 'public', 'testing-page', rawFolder);

        if (PREVIEW_DIR.length < process.cwd().length + 10) {
            console.error("Safety Block: Path too short", PREVIEW_DIR);
            return NextResponse.json({ error: 'Safety block' }, { status: 400 });
        }

        // 2. Clean existing preview directory
        if (fs.existsSync(PREVIEW_DIR)) {
            const existingFiles = fs.readdirSync(PREVIEW_DIR);
            for (const file of existingFiles) {
                const curPath = path.join(PREVIEW_DIR, file);
                fs.rmSync(curPath, { recursive: true, force: true });
            }
        } else {
            fs.mkdirSync(PREVIEW_DIR, { recursive: true });
        }

        // 3. Write files
        for (const file of files) {
            const safePath = file.path
                .replace(/^(\.\.(\/|\\|$))+/, '')
                .replace(/^\/+/, '');

            const fullPath = path.join(PREVIEW_DIR, safePath);
            const dir = path.dirname(fullPath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            let content;
            if (file.base64) {
                content = Buffer.from(file.content, 'base64');
            } else {
                content = file.content;
            }

            fs.writeFileSync(fullPath, content);
        }

        return NextResponse.json({ success: true, path: '/testing-page' });

    } catch (error) {
        console.error('Error saving preview files:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
