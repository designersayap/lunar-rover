import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force Node.js runtime for filesystem access
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UAT_DIR = path.join(process.cwd(), 'public', 'uat-files');

export async function GET(request) {
    try {
        // List folders
        const items = fs.readdirSync(UAT_DIR, { withFileTypes: true });
        const folders = items
            .filter(item => item.isDirectory())
            .map(item => item.name)
            .sort();

        return NextResponse.json({ folders });

    } catch (error) {
        console.error("Error listing UAT folders:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
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

        const targetDir = path.join(UAT_DIR, folderName);
        const appFolder = path.join(targetDir, 'app');

        // Clean up existing directory if it exists to prevent duplicate route warnings
        // (e.g. if we switched from robots.txt to robots.js)
        if (fs.existsSync(targetDir)) {
            try {
                fs.rmSync(targetDir, { recursive: true, force: true });
            } catch (rmError) {
                console.warn(`Initial rmSync failed for ${targetDir}: ${rmError.message}. Retrying with content cleanup.`);
                // Fallback: Delete contents individually if rmSync fails with ENOTEMPTY or similar
                try {
                    const files = fs.readdirSync(targetDir);
                    for (const file of files) {
                        fs.rmSync(path.join(targetDir, file), { recursive: true, force: true });
                    }
                    fs.rmdirSync(targetDir);
                } catch (fallbackError) {
                    console.error(`Fallback cleanup failed for ${targetDir}:`, fallbackError);
                    // If everything fails, we still try to proceed by overwriting files
                }
            }
        }

        // Ensure target directory exists
        fs.mkdirSync(targetDir, { recursive: true });

        // Process files
        for (const file of files) {
            // file.path is relative, e.g. "index.html" or "components/foo.js"
            // Clean path to prevent traversal
            const cleanPath = file.path.replace(/^(\.\.(\/|\\|$))+/, '');
            const filePath = path.join(targetDir, cleanPath);
            const fileDir = path.dirname(filePath);

            // Ensure subdirectory exists
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true });
            }

            let content;
            if (file.base64) {
                content = Buffer.from(file.content, 'base64');
            } else {
                content = file.content;
            }

            fs.writeFileSync(filePath, content);
        }

        return NextResponse.json({ success: true, folder: folderName });

    } catch (error) {
        console.error("Error saving UAT files:", error);
        return NextResponse.json({ error: "Failed to save files" }, { status: 500 });
    }
}
