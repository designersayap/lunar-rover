// Helper utilities for export-component route
import path from 'path';
import { promises as fs } from 'fs';


export const ALLOWED_DIRS = [
    path.resolve(process.cwd(), 'app/template-components'),
    path.resolve(process.cwd(), 'app/foundation'),
    path.resolve(process.cwd(), 'app/page-builder-components'),
    path.resolve(process.cwd(), 'public')
];

export const BINARY_SET = new Set([
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico',
    '.mp4', '.webm', '.ogv', '.mp3', '.wav'
]);

export function isBinary(ext) {
    return BINARY_SET.has(ext);
}

/**
 * Resolve a requested path safely.
 * Handles leading '/' (maps to public) and normalises to an absolute path.
 * Returns { absolutePath, finalPath, isExternal }.
 */
export function resolvePath(requestedPath) {
    let finalPath = requestedPath;
    const isExternal = finalPath.startsWith('http://') || finalPath.startsWith('https://');
    if (!isExternal && finalPath.startsWith('/') && !finalPath.startsWith('//')) {
        finalPath = path.join('public', finalPath);
    }
    const absolutePath = path.resolve(process.cwd(), finalPath);
    return { absolutePath, finalPath, isExternal };
}

/** Simple logger – can be swapped for a proper logger later */
export function log(...args) {
    console.log('[export-component]', ...args);
}

/** Clean Builder‑specific imports and props from component source */
export function cleanBuilderContent(src) {
    // Remove Builder imports
    src = src.replace(/import\s+.*?\s+from\s+['"]@\/app\/page-builder-components\/utils\/builder\/.*?['"];?\n?/g, '');
    // Remove generic imports that are not needed (keep CSS imports)
    src = src.replace(/import\s+{[^}]*}\s+from\s+['"][^'\"]+['"];?\n?/g, '');
    // Remove onUpdate props and update handler calls
    src = src.replace(/onUpdate=\{[^}]+\}/g, '');
    src = src.replace(/update\([^)]*\);?/g, '');
    // Remove empty import lines left behind
    src = src.replace(/^\s*\n/gm, '\n');
    return src;
}

export function getCacheHeaders(isBinary) {
    return {
        'Cache-Control': isBinary ? 'public, max-age=31536000, immutable' : 'no-store'
    };
}
