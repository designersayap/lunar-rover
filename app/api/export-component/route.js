import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
    ALLOWED_DIRS,
    BINARY_SET,
    isBinary,
    resolvePath,
    cleanBuilderContent,
    getCacheHeaders,
    log
} from './helpers';

// Fix: Use Node.js Runtime for FS access
export const runtime = 'nodejs';

export async function POST(req) {
    try {
        const { filePath } = await req.json();

        if (!filePath) {
            return NextResponse.json({ error: 'Missing filePath' }, { status: 400 });
        }

        // 1. Resolve and Validate Path
        const { absolutePath, finalPath, isExternal } = resolvePath(filePath);

        // Security Check: Ensure path is within allowed directories
        const isAllowed = ALLOWED_DIRS.some(dir => absolutePath.startsWith(dir));
        if (!isAllowed) {
            log('Access Denied:', absolutePath);
            return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
        }

        // 2. Check if file exists
        try {
            await fs.access(absolutePath);
        } catch {
            // Soft fail for optional CSS modules to avoid browser console 404s
            if (absolutePath.endsWith('.module.css')) {
                return NextResponse.json({ content: null, isBinary: false }, { status: 200 });
            }

            log('File Not Found:', absolutePath);
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // 3. Read File
        const ext = path.extname(absolutePath).toLowerCase();
        const binary = isBinary(ext);

        if (binary) {
            const fileBuffer = await fs.readFile(absolutePath);
            const base64 = fileBuffer.toString('base64');
            return NextResponse.json({
                content: base64,
                isBinary: true
            }, {
                headers: getCacheHeaders(true)
            });
        } else {
            let content = await fs.readFile(absolutePath, 'utf8');

            // 4. Process Content (If it's a Component)
            // Only clean if it's a JS file in templates or page-builder
            if (ext === '.js' && (finalPath.includes('app/templates') || finalPath.includes('app/page-builder'))) {
                content = cleanBuilderContent(content);
            }

            return NextResponse.json({
                content,
                isBinary: false
            }, {
                headers: getCacheHeaders(false)
            });
        }

    } catch (error) {
        console.error('[export-component] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ status: 'Export API Ready' });
}
