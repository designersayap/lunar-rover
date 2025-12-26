import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { resolvePath, isBinary, cleanBuilderContent, log, ALLOWED_DIRS, getCacheHeaders } from './helpers';

export async function POST(request) {
    try {
        const { filePath: requestedPath } = await request.json();
        if (!requestedPath) {
            return NextResponse.json({ error: 'File path is required' }, { status: 400 });
        }

        const { absolutePath, finalPath, isExternal } = resolvePath(requestedPath);
        const ext = path.extname(finalPath.split('?')[0]).toLowerCase();

        // Security check – allow external URLs, whitelisted dirs, or CSS files
        const allowed =
            isExternal ||
            ALLOWED_DIRS.some(dir => absolutePath.startsWith(dir)) ||
            finalPath.endsWith('.css');
        if (!allowed) {
            return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
        }

        // Binary assets (images, video, audio) or external URLs
        if (isBinary(ext) || isExternal) {
            if (isExternal) {
                const res = await fetch(finalPath);
                if (!res.ok) {
                    log('Failed to fetch external asset', finalPath, res.status);
                    return NextResponse.json({ error: 'Failed to fetch external asset' }, { status: 502 });
                }
                const buffer = Buffer.from(await res.arrayBuffer());
                return NextResponse.json({ content: buffer.toString('base64'), isBinary: true }, { headers: getCacheHeaders(true) });
            }

            try {
                const buffer = await fs.readFile(absolutePath);
                return NextResponse.json({ content: buffer.toString('base64'), isBinary: true });
            } catch {
                // Soft‑404 for optional assets
                return NextResponse.json({ content: null }, { headers: getCacheHeaders(false) });
            }
        }

        // Text / component files
        let content;
        try {
            content = await fs.readFile(absolutePath, 'utf8');
        } catch {
            return NextResponse.json({ content: null }, { headers: getCacheHeaders(false) });
        }

        // Only clean builder content for JS/TS files
        if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
            content = cleanBuilderContent(content);
        }
        return NextResponse.json({ content }, { headers: getCacheHeaders(false) });
    } catch (error) {
        log('Export error', error);
        return NextResponse.json({ error: `Failed to read file: ${error.message}` }, { status: 500, headers: getCacheHeaders(false) });
    }
}
