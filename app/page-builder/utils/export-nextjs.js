
import JSZip from 'jszip';
import { COMPONENT_PATHS } from './component-paths';
import { componentDefaults } from '@/app/templates/content/data';
import { defaultPlaceholder } from '@/app/page-builder/utils/builder/builder-image';

/**
 * handleExportNextjs: Exports selected components as a clean Next.js project structure (Partial).
 */
export const handleExportNextjs = async (selectedComponents, activeThemePath = '/themes/theme.css', options = {}) => {
    const { download = true, savePreview = false, previewFolder } = options;
    if (!selectedComponents || selectedComponents.length === 0) {
        alert("No components selected to export.");
        return;
    }

    const zip = new JSZip();
    const componentsFolder = zip.folder("components");
    const errors = [];

    // Track imports and preview files
    const imports = new Map();
    const previewMap = new Map();

    // 1. Fetch Shared Utilities
    try {
        const utilsRes = await fetch('/api/export-component', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: 'app/page-builder/utils/section-utils.js' })
        });
        if (utilsRes.ok) {
            let { content } = await utilsRes.json();
            if (content && typeof content === 'string' && /use(State|Effect|Context|Ref|Callback|Memo)/.test(content)) {
                if (!content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
                    content = `"use client";\n${content}`;
                }
            }
            zip.folder("utils").file("section-utils.js", content);
            previewMap.set("utils/section-utils.js", { path: "utils/section-utils.js", content });
        } else {
            console.warn("Could not fetch section-utils.js");
            errors.push("Missing utils/section-utils.js");
        }
    } catch (e) {
        console.error("Error fetching utils", e);
    }

    // 1b. Fetch Sticky Manager
    try {
        const stickyRes = await fetch('/api/export-component', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: 'app/page-builder/utils/sticky-manager.js' })
        });
        if (stickyRes.ok) {
            let { content } = await stickyRes.json();
            if (content && typeof content === 'string' && /use(State|Effect|Context|Ref|Callback|Memo)/.test(content)) {
                if (!content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
                    content = `"use client";\n${content}`;
                }
            }
            zip.folder("utils").file("sticky-manager.js", content);
            previewMap.set("utils/sticky-manager.js", { path: "utils/sticky-manager.js", content });
        } else {
            console.warn("Could not fetch sticky-manager.js");
            errors.push("Missing utils/sticky-manager.js");
        }
    } catch (e) {
        console.error("Error fetching sticky manager", e);
    }

    // 1c. Fetch Font Metadata
    let fontMetadata = {};
    try {
        const fontRes = await fetch('/api/export-component', { method: 'GET' });
        if (fontRes.ok) {
            const data = await fontRes.json();
            fontMetadata = data.fonts || {};
        }
    } catch (e) {
        console.error("Error fetching font metadata", e);
    }


    // 1d. Define API Routes (For Forms)
    const confluentApiContent = `export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();

        // Forwarding to the external Confluent API Gateway (Dev Endpoint)
        const externalApiUrl = 'https://devapigwpubmarketingdata.wingscorp.com/post-data-confluent';
        const apiKey = process.env.WINGSCORP_API_KEY;

        console.log(\`[API Proxy] Sending data to: \${externalApiUrl}\`);

        const response = await fetch(externalApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-api-key': apiKey,
                'User-Agent': 'Lunar-Page-Builder-Proxy',
            },
            body: JSON.stringify(body),
        });

        const status = response.status;
        const contentType = response.headers.get('content-type') || '';
        const responseText = await response.text();

        console.log(\`[API Proxy] Upstream Response Status: \${status}\`);

        let responseData = {};
        try {
            if (contentType.includes('application/json') || (responseText.trim().startsWith('{') || responseText.trim().startsWith('['))) {
                responseData = JSON.parse(responseText);
            } else {
                responseData = { message: responseText };
            }
        } catch (e) {
            responseData = { message: 'Could not parse response', raw: responseText };
        }

        if (!response.ok) {
            console.error(\`[API Proxy] Upstream Error:\`, responseData);
            return NextResponse.json(
                {
                    error: 'External API Error',
                    status,
                    data: responseData
                },
                { status: 500 }
            );
        }

        console.log(\`[API Proxy] Successfully proxied data.\`);
        return NextResponse.json({ success: true, data: responseData });

    } catch (error) {
        console.error('[API Proxy] Error:', error.message);
        return NextResponse.json(
            { error: 'Proxy Internal Error', message: error.message },
            { status: 500 }
        );
    }
}
`;
    zip.folder("app").folder("api").folder("post-data-confluent").file("route.js", confluentApiContent);
    previewMap.set("app/api/post-data-confluent/route.js", { path: "app/api/post-data-confluent/route.js", content: confluentApiContent });

    // 2. Process Components (Fetch JS, CSS, and Dependencies)
    const processedFiles = new Set();
    const thumbnailToVideoMap = new Map(); // Track TikTok thumbnails -> original video URLs

    const bundledImages = new Map(); // Track bundled image paths -> unique filenames

    // ----------------------------------------------------------------

    const bundleAsset = async (imgPath) => {
        // Check if already bundled
        if (bundledImages.has(imgPath)) {
            return bundledImages.get(imgPath);
        }
        // Ensure we don't process it as a generic file again if tracked elsewhere
        if (processedFiles.has(imgPath)) return null;

        processedFiles.add(imgPath);

        try {
            // Skip bundling for the system default placeholder
            if (imgPath === defaultPlaceholder || (typeof imgPath === 'string' && imgPath.includes('assets-lunar/placeholder.svg'))) {
                return null;
            }

            let uniqueName;
            let dataContent;

            // Skip external URLs (EXCEPT TikTok CDN thumbnails which expire)
            if (typeof imgPath === 'string' && imgPath.startsWith('http') && !imgPath.includes('tiktokcdn.com')) {
                return null;
            }

            if (imgPath.startsWith('blob:') || (typeof imgPath === 'string' && imgPath.includes('tiktokcdn.com'))) {
                // Handle Blob or External TikTok URL
                let res = await fetch(imgPath);

                // Auto-healing: If TikTok thumbnail is 403, try to fetch fresh one via oEmbed
                if (res.status === 403 && imgPath.includes('tiktokcdn.com')) {
                    const originalVideoUrl = thumbnailToVideoMap.get(imgPath);
                    if (originalVideoUrl) {
                        console.log(`[Export] TikTok thumbnail 403. Attempting refresh for: ${originalVideoUrl}`);
                        try {
                            const oembedRes = await fetch(`/api/oembed?url=${encodeURIComponent(originalVideoUrl)}`);
                            if (oembedRes.ok) {
                                const data = await oembedRes.json();
                                if (data.thumbnail_url) {
                                    console.log(`[Export] Successfully refreshed TikTok thumbnail.`);
                                    // Try fetching the new URL
                                    res = await fetch(data.thumbnail_url);
                                }
                            }
                        } catch (refreshErr) {
                            console.warn(`[Export] Failed to refresh TikTok thumbnail:`, refreshErr);
                        }
                    }
                }

                if (!res.ok) {
                    console.warn(`Failed to fetch image: ${imgPath} (Status: ${res.status})`);
                    return null;
                }

                const blob = await res.blob();
                const arrayBuffer = await blob.arrayBuffer();

                // ... (handling logic setup same as below)

                let ext = 'png';
                if (blob.type === 'image/jpeg') ext = 'jpg';
                else if (blob.type === 'image/svg+xml') ext = 'svg';
                else if (blob.type === 'image/gif') ext = 'gif';
                else if (blob.type === 'image/webp') ext = 'webp';

                dataContent = arrayBuffer;
                uniqueName = `upload-${Math.random().toString(36).substr(2, 8)}.${ext}`;

                zip.folder("public").folder("assets").file(uniqueName, dataContent);

                const base64 = btoa(
                    new Uint8Array(arrayBuffer)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                previewMap.set(`public/assets/${uniqueName}`, { path: `public/assets/${uniqueName}`, content: base64, base64: true });

            } else {
                // Check if it's a source file (app/...) or public asset
                const isSourceFile = imgPath.startsWith('app/') || (imgPath.startsWith('/') && imgPath.includes('/app/'));

                if (isSourceFile) {
                    // Handle Server-Side Source File via API
                    const res = await fetch('/api/export-component', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ filePath: imgPath })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        if (data.isBinary && data.content) {
                            const cleanName = imgPath.split('/').pop().split('?')[0];
                            uniqueName = `asset-${Math.random().toString(36).substr(2, 5)}-${cleanName}`;

                            zip.folder("public").folder("assets").file(uniqueName, data.content, { base64: true });
                            previewMap.set(`public/assets/${uniqueName}`, { path: `public/assets/${uniqueName}`, content: data.content, base64: true });
                        }
                    }
                } else {
                    // Handle Public Asset (Direct Fetch)
                    // Ensure path starts with /
                    let fetchPath = imgPath;
                    if (fetchPath.startsWith('public/')) fetchPath = fetchPath.replace('public/', '/');
                    if (!fetchPath.startsWith('/')) fetchPath = '/' + fetchPath;

                    try {
                        const res = await fetch(fetchPath);
                        if (res.ok) {
                            const blob = await res.blob();
                            const arrayBuffer = await blob.arrayBuffer();

                            let ext = 'png';
                            // Simple ext detection from path if blob type generic
                            if (fetchPath.endsWith('.svg')) ext = 'svg';
                            else if (fetchPath.endsWith('.jpg') || fetchPath.endsWith('.jpeg')) ext = 'jpg';
                            else if (blob.type === 'image/svg+xml') ext = 'svg';

                            const cleanName = fetchPath.split('/').pop().split('?')[0];
                            uniqueName = `asset-${Math.random().toString(36).substr(2, 5)}-${cleanName}`;

                            zip.folder("public").folder("assets").file(uniqueName, arrayBuffer);

                            const base64 = btoa(
                                new Uint8Array(arrayBuffer)
                                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
                            );
                            previewMap.set(`public/assets/${uniqueName}`, { path: `public/assets/${uniqueName}`, content: base64, base64: true });
                        }
                    } catch (err) {
                        console.warn('Failed to fetch public asset:', fetchPath, err);
                    }
                }
            }

            if (uniqueName) {
                bundledImages.set(imgPath, uniqueName);
                return uniqueName;
            }
        } catch (e) {
            console.warn("Failed to bundle image:", imgPath, e);
        }
        return null;
    };

    const processComponent = async (filePath, currentBytes = null) => {
        if (processedFiles.has(filePath)) return;
        processedFiles.add(filePath);

        const filename = filePath.split('/').pop();


        try {
            // If content is provided, use it. otherwise fetch.
            let content = currentBytes;
            if (!content) {
                const response = await fetch('/api/export-component', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filePath })
                });
                if (response.ok) {
                    const data = await response.json();
                    content = data.content;
                    
                    // Auto-inject "use client" for components with hooks or interactivity
                    if (!data.isBinary && typeof content === 'string') {
                        const hasHooks = /use(State|Effect|Context|Ref|Callback|Memo|LayoutEffect|Id|Transition|DeferredValue|SyncExternalStore|ActionState|FormStatus|Optimistic|ImperativeHandle|InsertionEffect|DebugValue)|on[A-Z][a-zA-Z]*\s*=|openDialog|createUpdateHandler|update\(/.test(content);
                        if (hasHooks && !content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
                            content = `"use client";\n${content}`;
                        }
                    }
                    
                    if (data.isBinary) {
                        componentsFolder.file(filename, content, { base64: true });
                        previewMap.set(`components/${filename}`, { path: `components/${filename}`, content, base64: true });
                    } else {
                        componentsFolder.file(filename, content);
                        previewMap.set(`components/${filename}`, { path: `components/${filename}`, content });
                    }
                } else {
                    const errText = await response.text();
                    throw new Error(`Failed to fetch component: ${filePath}. Status: ${response.status}. Error: ${errText}`);
                }
            } else {
                // Auto-inject "use client" for components with hooks (for direct content provides)
                if (content && typeof content === 'string') {
                    const hasHooks = /use(State|Effect|Context|Ref|Callback|Memo|LayoutEffect|Id|Transition|DeferredValue|SyncExternalStore|ActionState|FormStatus|Optimistic|ImperativeHandle|InsertionEffect|DebugValue)/.test(content);
                    if (hasHooks && !content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
                        content = `"use client";\n${content}`;
                    }
                }
                componentsFolder.file(filename, content);
                previewMap.set(`components/${filename}`, { path: `components/${filename}`, content });
            }

            // B. Fetch CSS Module (Optional)
            const cssPath = filePath.replace('.js', '.module.css');
            if (cssPath.endsWith('.module.css') && !processedFiles.has(cssPath)) {
                try {
                    const cssRes = await fetch('/api/export-component', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ filePath: cssPath })
                    });
                    if (cssRes.ok) {
                        const { content: cssContent } = await cssRes.json();
                        if (cssContent) {
                            processedFiles.add(cssPath);
                            componentsFolder.file(filename.replace('.js', '.module.css'), cssContent);
                            previewMap.set(`components/${filename.replace('.js', '.module.css')}`, { path: `components/${filename.replace('.js', '.module.css')}`, content: cssContent });
                        }
                    }
                } catch { /* CSS is optional */ }
            }

            // C. Find and Process Dependencies (Recursive) - Match standard imports
            if (!content || typeof content !== 'string') {
                console.warn(`[Export] Skipping dependency analysis for ${filePath}: invalid content.`);
                return;
            }

            const importRegex = /(?:import\s+([\w{},*\s]+)\s+from\s+['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\))/g;
            const matches = [...content.matchAll(importRegex)];

            for (const match of matches) {
                const importSpecs = match[1];
                const importPath = match[2] || match[3]; // Group 2 is static, Group 3 is dynamic

                // Filter: Only process relative paths (.) and project aliases (@/)
                // Ignore external packages (next, react, etc.)
                if (!importPath.startsWith('.') && !importPath.startsWith('@/')) continue;

                // Ignore CSS/Style imports locally (handled by step B or global styles), but ALLOW .module.css
                // This is crucial for components that import another component's CSS module
                // Ignore plain CSS imports (handled globally), but ALLOW .module.css
                // This is crucial for components that import another component's CSS module (e.g. media-21-9 imports media-16-9.module.css)
                if (importPath.endsWith('.css') && !importPath.endsWith('.module.css')) continue;

                // Explicitly exclude page.module.css (Builder specific styles)
                if (importPath.includes('page.module.css')) {
                    // Remove import but define styles object to prevent "styles is not defined" error
                    // We dynamically use the captured import name (e.g. 'builderStyles', 'styles', etc.)
                    const importName = importSpecs?.trim() || 'styles';
                    content = content.replace(match[0], `const ${importName} = {};`);
                    continue;
                }

                // Resolve relative path
                const currentDir = filePath.substring(0, filePath.lastIndexOf('/'));

                const resolvePath = (base, relative) => {
                    const stack = base.split('/');
                    const parts = relative.split('/');
                    for (const part of parts) {
                        if (part === '.') continue;
                        if (part === '..') stack.pop();
                        else stack.push(part);
                    }
                    return stack.join('/');
                };

                let depFilePath = importPath;
                if (importPath.startsWith('.')) {
                    depFilePath = resolvePath(currentDir, importPath);
                } else if (importPath.startsWith('@/')) {
                    depFilePath = importPath.replace('@/', '');
                }

                // If it's a CSS module, don't append .js
                const isCssModule = depFilePath.endsWith('.module.css');
                if (!isCssModule && !depFilePath.endsWith('.js')) depFilePath += '.js';

                // Process the dependency
                try {
                    await processComponent(depFilePath);
                } catch (depErr) {
                    console.error(`[Export] Dependency fetch failed for ${depFilePath} (imported by ${filePath}):`, depErr);
                    throw depErr; // Re-throw to be caught by the outer catch
                }

                // REWRITE IMPORT IN CONTENT
                const depFilename = depFilePath.split('/').pop();

                // If it's a CSS module, keep extension. If JS, remove .js
                const newImportName = isCssModule ? depFilename : depFilename.replace('.js', '');
                const newImportPath = `./${newImportName}`;

                // Robust replacement using Regex to handle variations in whitespace/quotes
                const escapedImportPath = importPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                // 1. Static Imports: from "PATH"
                content = content.replace(
                    new RegExp(`from\\s*['"]${escapedImportPath}['"]`, 'g'),
                    `from "${newImportPath}"`
                );

                // 2. Dynamic Imports: import("PATH")
                content = content.replace(
                    new RegExp(`import\\s*\\(\\s*['"]${escapedImportPath}['"]\\s*\\)`, 'g'),
                    `import("${newImportPath}")`
                );
            }

            // Final "use client" injection check before writing to zip/preview
            if (content && typeof content === 'string') {
                const hasHooks = /use(State|Effect|Context|Ref|Callback|Memo|LayoutEffect|Id|Transition|DeferredValue|SyncExternalStore|ActionState|FormStatus|Optimistic|ImperativeHandle|InsertionEffect|DebugValue)|on[A-Z][a-zA-Z]*\s*=|openDialog|createUpdateHandler|update\(/.test(content);
                if (hasHooks && !content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
                    content = `"use client";\n${content}`;
                }
            }

            // Update file in zip with rewritten content
            componentsFolder.file(filename, content);
            previewMap.set(`components/${filename}`, { path: `components/${filename}`, content });

        } catch (err) {
            console.error(`[Export] Error processing ${filePath}:`, err);
            errors.push(`Failed to export dependency: ${filename}. Details: ${err.message}`);
        }
    };

    // This allows both the bundler loop and the page generator loop to see the updated props.
    const processedComponents = JSON.parse(JSON.stringify(selectedComponents));
    let lcpImageUrl = ""; // Capture LCP image URL for preloading in layout.js
    let lcpImageUrl2 = ""; // Capture second candidate for LCP preload

    // --- Placeholders Injection (Do this upfront) ---
    const injectPlaceholders = (obj) => {
        if (!obj || typeof obj !== 'object') return;

        if (Array.isArray(obj)) {
            obj.forEach(subItem => injectPlaceholders(subItem));
            return;
        }

        Object.keys(obj).forEach(key => {
            const val = obj[key];
            const isImageKey = /image|logo|avatar|icon|background/i.test(key) && !/id$|url$|link$|ratio$|portrait$|visible$/i.test(key);

            if (isImageKey && (!val || val === "")) {
                obj[key] = defaultPlaceholder;
            } else if (typeof val === 'object' && val !== null) {
                injectPlaceholders(val);
            }
        });
    };

    processedComponents.forEach(item => {
        // Run injection on the root of the clone (for essentials like placeholders)
        injectPlaceholders(item);
        // Ensure props object exists
        if (!item.props) item.props = {};

        // FIX: Revert placeholder for ScrollGroup/Stacked items if they are using the default
        if (item.id === 'scroll-group' || item.componentName === 'ScrollGroup') {
            if (item.props.image === defaultPlaceholder || (typeof item.props.image === 'string' && item.props.image.includes('assets-lunar/placeholder.svg'))) {
                item.props.image = "";
            }
            if (item.props.mobileImage === defaultPlaceholder || (typeof item.props.mobileImage === 'string' && item.props.mobileImage.includes('assets-lunar/placeholder.svg'))) {
                item.props.mobileImage = "";
            }
        }
    });

    // Sort components: Sticky items first
    processedComponents.sort((a, b) => {
        const getSticky = (item) => {
            const defs = componentDefaults[item.id] || componentDefaults[item.componentName] || {};
            // We do NOT sort 'stacked' items to the top. They stay in flow.
            return item.props?.isSticky ?? defs.isSticky ?? false;
        };
        const aSticky = getSticky(a);
        const bSticky = getSticky(b);
        if (aSticky && !bSticky) return -1;
        if (!aSticky && bSticky) return 1;
        return 0;
    });


    // Helper to extract component name from path
    const getComponentName = (filePath) => {
        if (!filePath) return null;
        const filename = filePath.split('/').pop();
        return filename.replace('.js', '')
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    };

    for (const item of processedComponents) {
        const filePath = COMPONENT_PATHS[item.id];
        if (!filePath) {
            console.warn(`No source path found for component: ${item.id}`);
            errors.push(`Missing source for ${item.id}`);
            continue;
        }

        // Fetch Main Component
        await processComponent(filePath);

        // Track Import for page.js
        const filename = filePath.split('/').pop();
        const componentName = getComponentName(filePath);
        imports.set(componentName, `./components/${filename}`);

        // RECURSIVE: Check for nested components property (e.g. ScrollGroup)
        if (item.components && Array.isArray(item.components)) {
            for (const childComp of item.components) {
                const childFilePath = COMPONENT_PATHS[childComp.id];
                if (childFilePath) {
                    await processComponent(childFilePath);
                    const childFilename = childFilePath.split('/').pop();
                    const childComponentName = getComponentName(childFilePath);
                    imports.set(childComponentName, `./components/${childFilename}`);
                }
            }
        }
        if (item.props && item.props.components && Array.isArray(item.props.components)) {
            for (const childComp of item.props.components) {
                const childFilePath = COMPONENT_PATHS[childComp.id];
                if (childFilePath) {
                    await processComponent(childFilePath);
                    const childFilename = childFilePath.split('/').pop();
                    const childComponentName = getComponentName(childFilePath);
                    imports.set(childComponentName, `./components/${childFilename}`);
                }
            }
        }

        // Use the PRE-PROCESSED item which already has placeholders injected
        const findImagesToCheck = (obj, parentVideoUrl = null) => {
            let found = [];
            if (!obj) return found;
            if (typeof obj === 'string') {
                // Check normal paths & blobs (Include TikTok CDN as they expire)
                if (obj.startsWith('blob:') || obj.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|ogv|mp3|wav|ttf|woff|woff2|image)(\?.*)?$/i) || obj.includes('tiktokcdn.com')) {
                    found.push(obj);

                    // Track parent video for TikTok thumbnails to enable auto-refresh on 403
                    if (obj.includes('tiktokcdn.com') && parentVideoUrl) {
                        thumbnailToVideoMap.set(obj, parentVideoUrl);
                    }
                }
                // Check bg images: url("...")
                const urlMatch = obj.match(/url\(['"]?([^'")]+)['"]?\)/);
                if (urlMatch) {
                    const extracted = urlMatch[1];
                    if (extracted.startsWith('blob:') || extracted.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|ogv|mp3|wav|ttf|woff|woff2|image)(\?.*)?$/i) || extracted.includes('tiktokcdn.com')) {
                        found.push(extracted);

                        if (extracted.includes('tiktokcdn.com') && parentVideoUrl) {
                            thumbnailToVideoMap.set(extracted, parentVideoUrl);
                        }
                    }
                }
            } else if (typeof obj === 'object') {
                const currentVideoUrl = obj.videoUrl || parentVideoUrl;
                Object.values(obj).forEach(val => {
                    found = found.concat(findImagesToCheck(val, currentVideoUrl));
                });
            }
            return found;
        };

        const imagesToBundle = findImagesToCheck(item);


        for (const imgPath of imagesToBundle) {
            const uniqueName = await bundleAsset(imgPath);

            if (uniqueName) {
                const targetPath = `assets/${uniqueName}`;

                // Update component references to point to the new local asset path.
                // 1. Update props passed to page.js
                const updateProps = (obj) => {
                    Object.keys(obj).forEach(key => {
                        const val = obj[key];
                        if (typeof val === 'string') {
                            if (val === imgPath) {
                                obj[key] = `${targetPath}`;
                            } else if (val.includes(imgPath)) {
                                obj[key] = val.replace(imgPath, `${targetPath}`);
                            }
                        } else if (typeof val === 'object' && val !== null) {
                            updateProps(val);
                        }
                    });
                };
                updateProps(item);


                // 2. Update Hardcoded strings in the Component File 
                const compFile = componentsFolder.file(filename);
                if (compFile) {
                    let tempContent = await compFile.async("string");
                    const escapedPath = imgPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    const regex = new RegExp(`(["'])${escapedPath}(["'])`, 'g');
                    tempContent = tempContent.replace(regex, `$1${targetPath}$2`);
                    
                    // Re-inject "use client" if mandatory after rewriting
                    if (tempContent && typeof tempContent === 'string') {
                        const hasHooks = /use(State|Effect|Context|Ref|Callback|Memo|LayoutEffect|Id|Transition|DeferredValue|SyncExternalStore|ActionState|FormStatus|Optimistic|ImperativeHandle|InsertionEffect|DebugValue)|on[A-Z][a-zA-Z]*\s*=|openDialog|createUpdateHandler|update\(/.test(tempContent);
                        if (hasHooks && !tempContent.trim().startsWith('"use client"') && !tempContent.trim().startsWith("'use client'")) {
                            tempContent = `"use client";\n${tempContent}`;
                        }
                    }

                    componentsFolder.file(filename, tempContent);
                    previewMap.set(`components/${filename}`, { path: `components/${filename}`, content: tempContent });
                }
            }
        }
    }
    // --- End Image Scanning ---
    
    // Capture LCP image URLs (first 2 images found, including backgrounds) to enable preloading in RootLayout
    const lcpCandidates = [];
    const findLcpCandidates = (obj) => {
        if (!obj || lcpCandidates.length >= 2) return;
        
        if (typeof obj === 'object') {
            const props = obj.props || {};
            
            // Helper to add candidate if valid
            const addCandidate = (url) => {
                if (typeof url === 'string' && url.length > 0 && !url.startsWith('data:') && !lcpCandidates.includes(url)) {
                     // Check if it's an image or a path that likely contains one
                     if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|image)(\?.*)?$/i) || url.includes('/assets/')) {
                         if (lcpCandidates.length < 2) lcpCandidates.push(url);
                     }
                }
            };

            // 1. Check for BuilderImage src
            if ((obj.id === 'image' || obj.componentName === 'BuilderImage') && props.src) {
                addCandidate(props.src);
            }
            
            // 2. Check for background images or images in standard keys (common for heroes/sections)
            Object.entries(props).forEach(([key, val]) => {
                const isImageKey = /image|logo|avatar|icon|background/i.test(key) && !/id$|url$|link$|ratio$|portrait$|visible$/i.test(key);
                if (isImageKey && typeof val === 'string') {
                    addCandidate(val);
                }
                
                // Also check for background-image within style objects
                if (key === 'style' && val && typeof val === 'object') {
                    Object.entries(val).forEach(([sKey, sVal]) => {
                        if (/backgroundImage|background/i.test(sKey) && typeof sVal === 'string') {
                            const urlMatch = sVal.match(/url\(['"]?([^'")]+)['"]?\)/);
                            if (urlMatch) addCandidate(urlMatch[1]);
                        }
                    });
                }
            });

            // 3. Recurse into children/components
            const children = obj.components || props.components || props.children;
            if (Array.isArray(children)) {
                children.forEach(findLcpCandidates);
            } else if (typeof children === 'object' && children !== null) {
                findLcpCandidates(children);
            }
            
            // 4. Recurse into other sub-objects (including nested arrays) if we still need candidates
            if (lcpCandidates.length < 2) {
                Object.entries(obj).forEach(([key, val]) => {
                    if (key !== 'components' && key !== 'props' && val && typeof val === 'object') {
                        if (Array.isArray(val)) {
                            val.forEach(findLcpCandidates);
                        } else {
                            findLcpCandidates(val);
                        }
                    }
                });
            }
        }
    };

    processedComponents.forEach(findLcpCandidates);
    // Ensure all candidates have a leading slash if they are in assets
    const finalLcpCandidates = lcpCandidates.map(url => {
        if (url.startsWith('assets/')) return '/' + url;
        return url;
    });

    // --- 3. Bundle Fonts (Removed: Fonts referenced in CSS are handled by asset bundler, or served via Google Fonts) ---
    // (This block previously listed and fetched all fonts, which created duplicates in public/fonts when they were also bundled to public/assets)
    // --- 4. Fetch Foundation Styles ---
    // Helper to clean theme CSS (Remove @font-face and redirect to next/font variables)
    const cleanThemeCSS = (css) => {
        let cleaned = css;
        
        // 1. Remove @font-face blocks
        cleaned = cleaned.replace(/@font-face\s*{[\s\S]*?}/g, '');
        
        // 2. Map standard Google fonts to next/font variables
        const fontMap = {
            'Lato': 'var(--font-lato)',
            'Poppins': 'var(--font-poppins)',
            'Plus Jakarta Sans': 'var(--font-plus-jakarta)'
        };
        
        Object.entries(fontMap).forEach(([name, variable]) => {
            const regex = new RegExp(`(['"])${name}(['"])`, 'gi');
            cleaned = cleaned.replace(regex, variable);
        });
        
        // 3. Map detected local fonts
        Object.keys(fontMetadata).forEach(family => {
            const variableName = family.toLowerCase().replace(/[^a-z0-9]/g, '');
            const variableCSS = `var(--font-${family.toLowerCase().replace(/\s+/g, '-')})`;
            
            const regex = new RegExp(`(['"])${family}(['"])`, 'gi');
            cleaned = cleaned.replace(regex, variableCSS);
        });
        
        return cleaned;
    };

    // Note: The order matters for cascade.
    const foundationFiles = [
        `public${activeThemePath}`, // Theme (Primitives) must be loaded first
        'app/foundation/tokens.css',
        'app/foundation/accent-color.css',
        'app/foundation/grid.css',
        'app/foundation/global.css'
    ];

    // Helper to minify CSS
    const minifyCSS = (css) => {
        return css
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ')             // Collapse whitespace
            .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around delimiters
            .trim();
    };

    let foundationCSS = '';

    for (const path of foundationFiles) {
        try {
            // Check if it's an app file (needs API) or public file (needs fetch)
            const isAppFile = path.startsWith('app/');

            if (isAppFile) {
                const res = await fetch('/api/export-component', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filePath: path })
                });
                if (res.ok) {
                    const { content } = await res.json();
                    foundationCSS += `\n${content}\n`;
                } else {
                    console.warn(`Failed to fetch foundation file via API: ${path}`);
                }
            } else {
                // Public fetch
                let fetchPath = path;
                if (fetchPath.startsWith('public/')) fetchPath = fetchPath.replace('public/', '/');
                if (!fetchPath.startsWith('/')) fetchPath = '/' + fetchPath;

                const res = await fetch(fetchPath);
                if (res.ok) {
                    let content = await res.text();
                    
                    // Clean theme CSS if it's the active theme
                    if (path === `public${activeThemePath}`) {
                        content = cleanThemeCSS(content);
                    }
                    
                    foundationCSS += `\n${content}\n`;
                } else {
                    console.warn(`Failed to fetch foundation file: ${path}`);
                }
            }

        } catch (e) {
            console.error(`Failed to fetch foundation: ${path}`, e);
        }
    }

    foundationCSS = minifyCSS(foundationCSS);

    // 3b. Scan & Bundle Assets in Foundation CSS (e.g. social icons in global.css)
    const cssUrlRegex = /url\(\s*['"]?([^'")\s]+)['"]?\s*\)/g;
    const cssMatches = [...foundationCSS.matchAll(cssUrlRegex)];
    // Deduplicate to avoid processing same URL multiple times
    const uniqueCssAssets = new Set(cssMatches.map(m => m[1]));

    for (const assetPath of uniqueCssAssets) {
        // Skip data URIs or empty
        if (!assetPath || assetPath.startsWith('data:')) continue;

        try {
            const uniqueName = await bundleAsset(assetPath);
            if (uniqueName) {
                const escapedPath = assetPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                // Replace all occurrences of this URL in the CSS
                const replaceRegex = new RegExp(`url\\(['"]?${escapedPath}['"]?\\)`, 'g');
                foundationCSS = foundationCSS.replace(replaceRegex, `url('/assets/${uniqueName}')`);
            }
        } catch (e) {
            console.warn("Failed to bundle CSS asset:", assetPath, e);
        }
    }

    // Safety fallback: Strip any remaining unbundled /themes/ URLs from foundationCSS
    // to prevent 404 errors in the exported app console.
    // Note: /fonts/ are kept as they are processed by the asset bundler above.
    foundationCSS = foundationCSS.replace(/@import\s+url\(['"]?\/themes\/[^)]+\)[^;]*;/g, "");

    // --- 4. Generate Project Structure ---

    // Package.json
    zip.file("package.json", JSON.stringify({
        name: "lunar-export",
        version: "0.1.0",
        private: true,
        scripts: {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        dependencies: {
            "react": "^19.0.0",
            "react-dom": "^19.0.0",
            "next": "^15.0.0",
            "@heroicons/react": "^2.1.3",
            "sonner": "^2.0.1"
        },
        devDependencies: {
            "eslint": "^9",
            "eslint-config-next": "15.0.0"
        }
    }, null, 2));

    // Configs
    zip.file("next.config.mjs", "/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  output: 'export',\n  images: {\n    unoptimized: true,\n  },\n  productionBrowserSourceMaps: true,\n};\nexport default nextConfig;\n");
    zip.file("jsconfig.json", JSON.stringify({ compilerOptions: { paths: { "@/*": ["./*"] } } }, null, 2));

    // App Directory
    const appFolder = zip.folder("app");

    // globals.css (Foundation Styles Only)
    appFolder.file("globals.css", `/* Custom Foundation Styles */
${foundationCSS}

/* Typography Defaults (Restored for Export) - REMOVED (Handled by Component Styles) */

`);

    // layout.js
    const analytics = options.analytics || {};
    const title = (analytics.websiteTitle?.trim() || "Lunar Export");
    const description = (analytics.metaDescription?.trim() || "A premium web experience built with Lunar.");
    const keywords = analytics.metaKeywords || "";
    const favicon = analytics.favicon || "";
    const canonicalUrl = analytics.canonicalUrl || "";
    const ogTitle = analytics.ogTitle || "";
    const ogDescription = analytics.ogDescription || "";
    const ogImage = analytics.ogImage || "";
    let customMetaTags = (analytics.metaTag || "")
        .replace(/user-scalable=no/g, 'user-scalable=yes')
        .replace(/maximum-scale=[0-4](\.[0-9]+)?/g, 'maximum-scale=5');
    // Safety check: specific field must contain HTML tags. if user enters raw text, wrap in comment to prevent build error.
    if (customMetaTags && !customMetaTags.trim().startsWith('<')) {
        customMetaTags = `{/* Invalid Meta Tag (Must be valid HTML): ${customMetaTags.replace(/\*\//g, '* /')} */}`;
    }
    // Clean up any stray theme.css links that might cause 404 in exported apps
    if (typeof customMetaTags === 'string') {
        customMetaTags = customMetaTags.replace(/<link[^>]*href=['"]\/themes\/[^>]*>([\s\n]*<\/link>)?/gi, '');
        customMetaTags = customMetaTags.replace(/<link[^>]*href=['"]\/fonts\/[^>]*>([\s\n]*<\/link>)?/gi, '');
    }

    // Scripts
    const gtmId = analytics.googleTagManagerId;
    const clarityId = analytics.microsoftClarityId;
    const tiktokId = analytics.tikTokPixel;
    const metaPixelId = analytics.metaPixel;

    const hasScripts = gtmId || clarityId || tiktokId || metaPixelId;

    // Generate Layout
    // We use next/font/google and next/font/local for optimal performance
    let fontImports = 'import { Lato, Poppins, Plus_Jakarta_Sans } from "next/font/google";\n';
    let fontDeclarations = `
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});`;

    let localFontVariables = [];
    const localFontEntries = Object.entries(fontMetadata);
    
    if (localFontEntries.length > 0) {
        fontImports += 'import localFont from "next/font/local";\n';
        localFontEntries.forEach(([family, variations]) => {
            const variableName = family.toLowerCase().replace(/[^a-z0-9]/g, '');
            localFontVariables.push(`\${${variableName}.variable}`);
            
            fontDeclarations += `\n\nconst \${variableName} = localFont({
  src: \${JSON.stringify(variations.map(v => ({ path: v.path, weight: v.weight, style: v.style })), null, 2)},
  variable: "--font-\${family.toLowerCase().replace(/\\s+/g, '-')}",
});`;
        });
    }

    const fontConfig = fontImports + fontDeclarations;

    appFolder.file("layout.js", `import "./globals.css";
${fontConfig}
${hasScripts ? 'import Script from "next/script";' : ''}

export const metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${lato.variable} \${poppins.variable} \${plusJakartaSans.variable} ${localFontVariables.join(' ')}\`}>
      <head>
        <title>${title.replace(/"/g, '\\"')}</title>
        <meta name="description" content="${description.replace(/"/g, '\\"')}" />
        <meta name="robots" content="index,follow" />
        ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl.replace(/"/g, '\\"')}" />` : ''}
        ${ogTitle ? `<meta property="og:title" content="${ogTitle.replace(/"/g, '\\"')}" />` : ''}
        ${ogDescription ? `<meta property="og:description" content="${ogDescription.replace(/"/g, '\\"')}" />` : ''}
        ${ogImage ? `<meta property="og:image" content="${ogImage.replace(/"/g, '\\"')}" />` : ''}

        {/* Preconnect to Font domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* LCP Preload (Up to 2 candidates detected) */}
        ${finalLcpCandidates.map(url => `<link rel="preload" as="image" href="${url}" fetchPriority="high" />`).join('\n        ')}
        ${customMetaTags}
      </head>
      <body>
        {children}
        
        {/* Analytics Scripts */}
        ${gtmId ? `
        <Script id="gtm" strategy="afterInteractive" crossOrigin="anonymous">
          {\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');\`}
        </Script>
        ` : ''}

        ${clarityId ? `
        <Script id="microsoft-clarity" strategy="lazyOnload" crossOrigin="anonymous">
          {\`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");\`}
        </Script>` : ''}

        ${tiktokId ? `
        <Script id="tiktok-pixel" strategy="lazyOnload" crossOrigin="anonymous">
          {\`!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t.align=2,ttq.push([t].concat(Array.prototype.slice.call(e,0)))};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.setAndDefer(t,e),n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${tiktokId}');
            ttq.page();
          }(window, document, 'ttq');\`}
        </Script>` : ''}

        ${metaPixelId ? `
        <Script id="meta-pixel" strategy="lazyOnload" crossOrigin="anonymous">
          {\`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');\`}
        </Script>` : ''}
      </body>
    </html>
  );
}
`);

    // page.js
    let pageMetadata = `export const metadata = {
  title: "${title.replace(/"/g, '\\"') || 'Lunar Export'}",
  description: "${description.replace(/"/g, '\\"') || 'A premium web experience built with Lunar.'}",
  robots: { index: true, follow: true },
  ${keywords ? `keywords: "${keywords.replace(/"/g, '\\"')}",` : ''}
  ${favicon ? `icons: { icon: "${favicon.replace(/"/g, '\\"')}" },` : ''}
  ${canonicalUrl ? `alternates: { canonical: "${canonicalUrl.replace(/"/g, '\\"')}" },` : ''}
  openGraph: {
    ${ogTitle ? `title: "${ogTitle.replace(/"/g, '\\"')}",` : ''}
    ${ogDescription ? `description: "${ogDescription.replace(/"/g, '\\"')}",` : ''}
    ${ogImage ? `images: [{ url: "${ogImage.replace(/"/g, '\\"')}" }],` : ''}
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
\n\n`;

    // Imports (Dynamic for components below the fold)
    let pageImports = `import dynamic from "next/dynamic";\n`;
    
    // Sort components: keep first 3 static, others dynamic
    const staticComponents = new Set();
    processedComponents.slice(0, 3).forEach(item => {
        const filePath = COMPONENT_PATHS[item.id];
        if (filePath) staticComponents.add(getComponentName(filePath));
        
        // Also children of first 3 components and their props.components
        const addChildren = (comp) => {
            if (comp.components) comp.components.forEach(c => {
                const p = COMPONENT_PATHS[c.id];
                if (p) staticComponents.add(getComponentName(p));
            });
            if (comp.props?.components) comp.props.components.forEach(c => {
                const p = COMPONENT_PATHS[c.id];
                if (p) staticComponents.add(getComponentName(p));
            });
        };
        addChildren(item);
    });

    imports.forEach((path, name) => {
        const importPath = path.replace('./components', '@/components');
        if (staticComponents.has(name)) {
            pageImports += `import ${name} from "${importPath}";\n`;
        } else {
            pageImports += `const ${name} = dynamic(() => import("${importPath}"), { ssr: true });\n`;
        }
    });
    // Import Sticky Manager
    pageImports += `import StickyManager from "@/utils/sticky-manager";\n`;

    let pageContent = pageImports + '\n' + pageMetadata;

    pageContent += `\nexport default function ExportedPage() {\n`;
    pageContent += `  return (\n`;
    pageContent += `    <main style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'clip', containerType: 'inline-size', containerName: 'root-container' }}>\n`;
    pageContent += `      <div id="canvas-background-root" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} />\n`;
    pageContent += `      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>\n`;

    // Map uniqueIds to sectionIds for resolving "Target Dialog" links
    const sectionIdMap = new Map();
    processedComponents.forEach(comp => {
        if (comp.uniqueId) {
            // Use sectionId if available, otherwise fallback to uniqueId
            const finalId = comp.sectionId || comp.uniqueId;
            sectionIdMap.set(String(comp.uniqueId), finalId);
        }
    });

    // Pre-calculate Sticky Indices and Stacked Indices
    const stickyIndices = [];
    const stackedIndices = [];
    const blurIndices = [];
    const overlayIndices = [];
    processedComponents.forEach((item, index) => {
        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};
        const isStacked = item.props?.scrollEffect === 'stacked';
        const isSticky = (item.props?.isSticky ?? compDefaults.isSticky ?? false) || isStacked;

        if (isSticky) {
            stickyIndices.push(index);
        }

        // Overlay Check
        const isOverlay = item.props?.isOverlay ?? compDefaults.isOverlay ?? false;
        if (isOverlay) {
            overlayIndices.push(index);
        }

        if (isStacked) {
            stackedIndices.push(index);
            if (item.props?.enableBlur) {
                blurIndices.push(index);
            }
        }
    });

    pageContent += `      <StickyManager stickyIndices={[${stickyIndices.join(',')}]} stackedIndices={[${stackedIndices.join(',')}]} blurIndices={[${blurIndices.join(',')}]} overlayIndices={[${overlayIndices.join(',')}]}>\n`;

    const state = { hasFirstImage: false };
    // Render Instances
    processedComponents.forEach((item, index) => {
        const filePath = COMPONENT_PATHS[item.id];
        if (!filePath) return;


        const componentName = getComponentName(filePath);

        // Merge props from root item and nested props to ensure robust data passing
        // USE CLONE (item itself is now the clone from processedComponents)
        let props = { ...item, ...(item.props || {}) };

        // Check for stickiness before deleting the prop
        // Cleanup metadata fields that should not be passed as props
        if (props.id === item.id && !item.props?.id) {
            delete props.id; // Internal ID (only remove if not manually set)
        }
        delete props.name; // Component Name
        delete props.componentId; // Component Type ID
        delete props.category;
        delete props.isSticky;
        delete props.isOverlay;
        delete props.uniqueId;
        delete props.config; // Configuration specs
        delete props.isOpen; // Fix: Remove uncontrolled state prop
        delete props.thumbnail;
        delete props.props; // Essential: Delete the original nested props object to avoid passing it as a "props" prop

        const finalSectionId = sectionIdMap.get(String(item.uniqueId));
        if (finalSectionId) {
            props.sectionId = finalSectionId;
        }

        // Fix: Disable internal effects for ScrollGroup (StickyManager handles it)
        if (item.id === 'scroll-group' || componentName === 'ScrollGroup') {
            props.disableEffects = true;
        }

        // Helper: Recursive Prop Resolver for Export
        const resolveProps = (props) => {
            if (!props) return props;

            // Deep clone
            const newProps = Array.isArray(props) ? [...props] : { ...props };

            Object.keys(newProps).forEach(key => {
                const val = newProps[key];

                // 1. Remove Functions and Event Handlers (CRITICAL: Must be first to catch string-based handlers too)
                if (typeof val === 'function' || (typeof key === 'string' && key.startsWith('on') && key.length > 2 && key[2] === key[2].toUpperCase())) {
                    delete newProps[key];
                    return;
                }

                // 2. Strings or Numbers: Check for Match
                if (typeof val === 'string' || typeof val === 'number') {
                    const valStr = String(val);
                    // Check if the value ITSELF is a key in the map (Direct ID match)
                    if (sectionIdMap.has(valStr)) {
                        newProps[key] = sectionIdMap.get(valStr);
                    }
                    // Special: targetDialogId Logic (Case-insensitive check)
                    const lowerKey = key.toLowerCase();
                    if (lowerKey.includes('targetdialogid')) {
                        let resolvedId = sectionIdMap.get(valStr);

                        // Generic Fallback Logic: If target dialog is not found, find a valid default
                        if (!resolvedId && valStr) {
                            // 1. Try to find 'dialog-item-list'
                            if (sectionIdMap.has('dialog-item-list')) {
                                resolvedId = 'dialog-item-list';
                            } else {
                                // 2. Find ANY dialog component
                                const firstDialog = processedComponents.find(c =>
                                    c.id && (c.id.includes('dialog') || c.id === 'dialog-item-list')
                                );
                                if (firstDialog) {
                                    resolvedId = firstDialog.sectionId || firstDialog.uniqueId;
                                }
                            }

                            // 3. Absolute Last Resort: Hardcode 'dialog-item-list' even if not found.
                            if (!resolvedId) {
                                resolvedId = 'dialog-item-list';
                            }

                            if (resolvedId) {
                                console.warn(`[Export] Remapping missing dialog ID "${valStr}" to fallback "${resolvedId}"`);
                            }
                        }

                        // Use the resolved ID (whether direct match or fallback)
                        if (resolvedId) {
                            newProps[key] = resolvedId;
                        }

                        // Force Link Type and update associated props unconditionally if we have a target dialog ID
                        if (newProps[key]) {
                            // Helper to find associated keys with matching casing pattern
                            const updateAssociatedProp = (suffix, newValue) => {
                                const lowerSuffix = suffix.toLowerCase();
                                const baseKey = key.replace(/targetdialogid/i, '');
                                
                                // 1. Try to update existing key
                                let found = false;
                                for (const k of Object.keys(newProps)) {
                                    const lowerK = k.toLowerCase();
                                    if (lowerK.startsWith(baseKey.toLowerCase())) {
                                        const endK = lowerK.slice(baseKey.length);
                                        if (endK === lowerSuffix) {
                                            newProps[k] = newValue;
                                            found = true;
                                        } else if ((lowerSuffix === 'url' || lowerSuffix === 'href') && (endK === 'url' || endK === 'href')) {
                                            newProps[k] = newValue;
                                            // Still consider 'found' false for the primary suffix so we inject it if missing
                                        }
                                    }
                                }

                                if (found) return;

                                // 2. If not found, only inject LinkType (essential) OR root props (unprefixed)
                                if (lowerSuffix !== 'linktype' && baseKey) {
                                    return;
                                }

                                // Use casing of baseKey for the suffix
                                const isBaseCapitalized = baseKey && baseKey.charAt(0) === baseKey.charAt(0).toUpperCase();
                                const capitalizedSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
                                const lowercaseSuffix = suffix.charAt(0).toLowerCase() + suffix.slice(1);
                                
                                const newKey = baseKey + (isBaseCapitalized ? capitalizedSuffix : lowercaseSuffix);
                                newProps[newKey] = newValue;
                            };

                            updateAssociatedProp('LinkType', 'dialog');
                            updateAssociatedProp('Url', '#');
                            updateAssociatedProp('href', '#');
                        }
                    }
                }
                // 2. Objects/Arrays: Recurse
                else if (typeof val === 'object' && val !== null) {
                    newProps[key] = resolveProps(val);
                }
                // 3. Remove Functions and Event Handlers (Essential for Server Components)
                else if (typeof val === 'function' || (typeof key === 'string' && key.startsWith('on') && key.length > 2 && key[2] === key[2].toUpperCase())) {
                    delete newProps[key];
                }
            });
            return newProps;
        };

        // Fix Target ID references (Recursive)
        props = resolveProps(props);

        const propsString = Object.entries(props).map(([key, value]) => {
            if (value === undefined || value === null) return '';

            // SPECIAL HANDLING: If the prop is 'components' (used by ScrollGroup), we must serialize it carefully
            if (key === 'components' && Array.isArray(value)) {
                // We need to transform the array of component objects into code that references the Component classes
                const serializedComponents = value.map(childComp => {
                    const childFilePath = COMPONENT_PATHS[childComp.id];
                    const childComponentName = getComponentName(childFilePath);

                    // Construct object string literal manually
                    let childProps = { ...childComp, ...(childComp.props || {}) };
                    // Clean up metadata
                    delete childProps.id;
                    delete childProps.name;
                    delete childProps.component;
                    delete childProps.props; // flattened
                    delete childProps.thumbnail;

                    // Re-attach uniqueId and sectionId as they are needed by ScrollGroup to render children
                    childProps.uniqueId = childComp.uniqueId;
                    childProps.sectionId = childComp.sectionId || childComp.uniqueId;

                    // Serialize the props object
                    const propsJson = JSON.stringify(childProps);

                    // Inject the component reference
                    // Remove the last brace '}' and add component reference
                    return propsJson.slice(0, -1) + `, component: ${childComponentName || 'null'}}`;
                }).join(', ');

                return `components={[${serializedComponents}]}`;
            }

            // LCP Optimization: Set priority for the first image found in the page
            if (key === 'src' && componentName === 'BuilderImage') {
                const isFirstImage = !state.hasFirstImage;
                if (isFirstImage) {
                    state.hasFirstImage = true;
                    return `src={${JSON.stringify(value)}} priority={true} fetchPriority="high" loading="eager"`;
                }
            }

            if (typeof value === 'string') {
                return `${key}={${JSON.stringify(value)}}`;
            } else if (typeof value === 'boolean') {
                return value ? `${key}` : `${key}={false}`;
            } else {
                return `${key}={${JSON.stringify(value)}}`;
            }
        }).filter(Boolean);

        // Render Component
        let componentJSX;
        if (propsString.length > 0) {
            const formattedProps = propsString.join('\n        ');
            componentJSX = `<${componentName}\n        ${formattedProps}\n      />`;
        } else {
            componentJSX = `<${componentName} />`;
        }



        pageContent += `      ${componentJSX}\n`;
    });

    // 4b. Bundle Local Fonts
    try {
        const fontsFolder = zip.folder("fonts");
        const allFontFiles = Object.values(fontMetadata).flat();
        
        for (const fontInfo of allFontFiles) {
            const fontRes = await fetch(`/\${fontInfo.originalPath}`);
            if (fontRes.ok) {
                const blob = await fontRes.blob();
                const filename = fontInfo.path.split('/').pop();
                fontsFolder.file(filename, blob);
            }
        }
    } catch (e) {
        console.warn("Could not bundle local fonts", e);
    }

    pageContent += `      </StickyManager>\n`;
    pageContent += `      </div>\n`;
    pageContent += `    </main>\n`;
    pageContent += `  );\n`;
    pageContent += `}\n`;

    appFolder.file("page.js", pageContent);

    // Generate robots.txt
    const sanitizedCanonicalUrl = canonicalUrl ? canonicalUrl.replace(/\/+$/, '') : '';
    const robotsContent = analytics.robotsContent || `User-agent: *
Allow: /
Allow: /_next/static/
Disallow: /_next/
Disallow: /api/

${sanitizedCanonicalUrl ? `Sitemap: ${sanitizedCanonicalUrl}/sitemap.xml` : ''}`.trim();
    zip.folder("public").file("robots.txt", robotsContent);
    previewMap.set("public/robots.txt", { path: "public/robots.txt", content: robotsContent });

    // Generate sitemap.xml
    if (canonicalUrl) {
        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;
        zip.folder("public").file("sitemap.xml", sitemapXml);
        previewMap.set("public/sitemap.xml", { path: "public/sitemap.xml", content: sitemapXml });
    }

    // Generate safe title for naming (used for both ZIP and UAT folder)
    const safeTitle = (analytics.websiteTitle || "lunar")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/-+/g, '-')         // Collapse multiple hyphens
        .replace(/(^-|-$)/g, '');    // Trim leading/trailing hyphens

    // 5. Download ZIP (Conditional)
    if (download) {
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        a.download = `${safeTitle || 'lunar'}-export.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 6. Save Preview to Local Folder (Conditional)
    if (savePreview) {
        try {
            const fileList = Array.from(previewMap.values());

            fileList.push({
                path: "package.json", content: JSON.stringify({
                    name: "lunar-export",
                    version: "0.1.0",
                    private: true,
                    scripts: {
                        "dev": "next dev",
                        "build": "next build",
                        "start": "next start",
                        "lint": "next lint"
                    },
                    dependencies: {
                        "react": "^19.0.0",
                        "react-dom": "^19.0.0",
                        "next": "^15.0.0",
                        "@heroicons/react": "^2.1.3"
                    },
                    devDependencies: {
                        "eslint": "^9",
                        "eslint-config-next": "15.0.0"
                    }
                }, null, 2)
            });
            fileList.push({ 
                path: "next.config.mjs", 
                content: `/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    productionBrowserSourceMaps: true,
};
export default nextConfig;
` });
            fileList.push({ path: "jsconfig.json", content: JSON.stringify({ compilerOptions: { paths: { "@/*": ["./*"] } } }, null, 2) });
            fileList.push({
                path: "app/globals.css", content: `/* Custom Foundation Styles */
${foundationCSS}

/* Typography Defaults (Restored for Export) - REMOVED (Handled by Component Styles) */
` });
            fileList.push({
                path: "app/layout.js", content: `import "./globals.css";
${fontConfig}
${hasScripts ? 'import Script from "next/script";' : ''}

export const metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${lato.variable} \${poppins.variable} \${plusJakartaSans.variable} ${localFontVariables.join(' ')}\`}>
      <head>
        <title>${title.replace(/"/g, '\\"')}</title>
        <meta name="description" content="${description.replace(/"/g, '\\"')}" />
        <meta name="robots" content="index,follow" />
        ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl.replace(/"/g, '\\"')}" />` : ''}
        ${ogTitle ? `<meta property="og:title" content="${ogTitle.replace(/"/g, '\\"')}" />` : ''}
        ${ogDescription ? `<meta property="og:description" content="${ogDescription.replace(/"/g, '\\"')}" />` : ''}
        ${ogImage ? `<meta property="og:image" content="${ogImage.replace(/"/g, '\\"')}" />` : ''}

        {/* Preconnect to Font domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* LCP Preload (Up to 2 candidates detected) */}
        ${finalLcpCandidates.map(url => `<link rel="preload" as="image" href="${url}" fetchPriority="high" />`).join('\n        ')}
        ${customMetaTags}
      </head>
      <body>
        {children}
        
        {/* Analytics Scripts */}
        ${gtmId ? `
        <Script id="gtm" strategy="afterInteractive" crossOrigin="anonymous">
          {\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');\`}
        </Script>` : ''}

        ${clarityId ? `
        <Script id="microsoft-clarity" strategy="lazyOnload" crossOrigin="anonymous">
          {\`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");\`}
        </Script>` : ''}

        ${tiktokId ? `
        <Script id="tiktok-pixel" strategy="lazyOnload" crossOrigin="anonymous">
          {\`!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t.align=2,ttq.push([t].concat(Array.prototype.slice.call(e,0)))};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.setAndDefer(t,e),n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${tiktokId}');
            ttq.page();
          }(window, document, 'ttq');\`}
        </Script>` : ''}

        ${metaPixelId ? `
        <Script id="meta-pixel" strategy="lazyOnload" crossOrigin="anonymous">
          {\`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');\`}
        </Script>` : ''}
      </body>
    </html>
  );
}
` });
            fileList.push({ path: "app/page.js", content: pageContent });




            const folderName = previewFolder || `${safeTitle || 'lunar'}-export`;
            const previewRes = await fetch('/api/uat-preview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ files: fileList, folderName })
            });

            if (previewRes.ok) {
                console.log(`Preview files saved to public/uat-files/${folderName}`);
                if (!options.silent) {
                    if (download) {
                        alert(`Export Successful!\n\nZIP Downloaded.\n\nFiles also saved to:\npublic/uat-files/${folderName}`);
                    } else {
                        alert(`Project Saved!\n\nFiles saved to:\npublic/uat-files/${folderName}`);
                    }
                }
            } else {
                console.warn("Failed to save preview files");
            }
        } catch (e) {
            console.error("Error saving preview", e);
        }
    }

    if (errors.length > 0) {
        alert(`Export completed with warning(s):\n${errors.join('\n')}`);
    }
};
