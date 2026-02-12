import { NextResponse } from 'next/server';
import componentMap from './component-map';
import {
    ALLOWED_DIRS,
    cleanBuilderContent,
    getCacheHeaders,
    log
} from './helpers';

// Fix: Use Edge Runtime for Cloudflare compatibility
export const runtime = 'edge';

// Helper to normalize path for map lookup
const normalizePath = (p) => p.replace(/\\/g, '/');

export async function POST(req) {
    try {
        const { filePath } = await req.json();

        if (!filePath) {
            return NextResponse.json({ error: 'Missing filePath' }, { status: 400 });
        }

        // 1. Resolve Path (Simplified for Map Lookup)
        // Ensure path starts with one of the allowed dirs to prevent arbitrary access
        // The component map key is relative to project root, e.g. "app/templates/..."

        let targetKey = normalizePath(filePath);

        // Remove leading slash if present
        if (targetKey.startsWith('/')) targetKey = targetKey.substring(1);

        // Security Check: Ensure path is within allowed directories
        const isAllowed = ALLOWED_DIRS.some(dir => targetKey.startsWith(dir) || targetKey.includes(dir));
        if (!isAllowed) {
            log('Access Denied:', targetKey);
            return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
        }

        // 2. lookup in Map
        const mapEntry = componentMap[targetKey];

        if (!mapEntry) {
            // Soft fail for optional CSS modules to avoid browser console 404s
            if (targetKey.endsWith('.module.css')) {
                return NextResponse.json({ content: null, isBinary: false }, { status: 200 });
            }

            log('File Not Found in Map:', targetKey);
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // 3. Process Content
        const isJs = targetKey.endsWith('.js');
        let { content, isBinary } = mapEntry;

        // Clean builder content if JS
        if (!isBinary && isJs && (targetKey.includes('app/templates') || targetKey.includes('app/page-builder'))) {
            content = cleanBuilderContent(content);
        }

        return NextResponse.json({
            content,
            isBinary
        }, {
            headers: getCacheHeaders(isBinary)
        });

    } catch (error) {
        console.error('[export-component] Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message,
            stack: error.stack,
            type: error.constructor.name
        }, { status: 500 });
    }
}

export async function GET() {
    // DEBUG: return the content of feature-image-left to see what's in the map
    const debugKey = 'app/templates/feature/feature-image-left.js';
    const entry = componentMap[debugKey];
    return NextResponse.json({
        status: 'Export API Ready (Edge Compatible)',
        debugKey,
        exists: !!entry,
        preview: entry ? entry.content.substring(0, 500) : 'N/A'
    });
}
