
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// FORCE NODEJS RUNTIME (Not Edge) - Because we need access to local filesystem
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Disable caching

const UAT_BASE_DIR = path.join(process.cwd(), 'public', 'uat-files');

export async function GET() {
    // Ensure base directory exists (or just check)
    try {
        await fs.access(UAT_BASE_DIR);
    } catch {
        return NextResponse.json({ folders: [] });
    }

    try {
        const entries = await fs.readdir(UAT_BASE_DIR, { withFileTypes: true });
        const folders = entries
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort();

        return NextResponse.json({ folders });
    } catch (error) {
        if (error.code === 'ENOENT') {
            return NextResponse.json({ folders: [] });
        }
        console.error("Error listing UAT folders:", error);
        return NextResponse.json({ error: "Failed to list folders" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { files, folderName } = await request.json();

        if (!folderName || !/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
        }

        if (!files || !Array.isArray(files)) {
            return NextResponse.json({ error: "Invalid files array" }, { status: 400 });
        }

        const targetDir = path.join(UAT_BASE_DIR, folderName);

        // Clear existing or create new
        // Ideally we might want to wipe it first to ensure clean state? 
        // For now, let's just mkdir recursive.
        await fs.mkdir(targetDir, { recursive: true });

        // Process files
        for (const file of files) {
            const filePath = path.join(targetDir, file.path);
            const fileDir = path.dirname(filePath);

            // Ensure directory exists
            await fs.mkdir(fileDir, { recursive: true });

            let content = file.content;
            if (file.base64) {
                content = Buffer.from(file.content, 'base64');
            }

            await fs.writeFile(filePath, content);
        }

        return NextResponse.json({ success: true, path: `/uat-files/${folderName}` });

    } catch (error) {
        console.error("Error saving UAT preview:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
