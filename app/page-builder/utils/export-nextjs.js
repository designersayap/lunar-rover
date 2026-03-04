
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
            const { content } = await utilsRes.json();
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
            const { content } = await stickyRes.json();
            zip.folder("utils").file("sticky-manager.js", content);
            previewMap.set("utils/sticky-manager.js", { path: "utils/sticky-manager.js", content });
        } else {
            console.warn("Could not fetch sticky-manager.js");
            errors.push("Missing utils/sticky-manager.js");
        }
    } catch (e) {
        console.error("Error fetching sticky manager", e);
    }

    // 2. Process Components (Fetch JS, CSS, and Dependencies)
    const processedFiles = new Set();
    const bundledImages = new Map(); // Track bundled image paths -> unique filenames

    // --- FIX: Export ALL defaults to prevent component-library.js crash ---
    // component-library.js (which is bundled if ScrollGroup is used) accesses defaults for ALL components.
    // Filtering causes "undefined is not an object" errors for unused components.
    const dataJsContent = `export const componentDefaults = ${JSON.stringify(componentDefaults, null, 4)};`;

    // Inject into Zip & Preview Map directly (Mocking the file)
    // This prevents processComponent from fetching the original file from server
    zip.folder("components").file("data.js", dataJsContent);
    previewMap.set("components/data.js", { path: "components/data.js", content: dataJsContent });

    // Mark as processed so it's skipped by fetch logic if referenced as dependency
    processedFiles.add("data.js");
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

            // Skip external URLs (user request: keep original link)
            if (typeof imgPath === 'string' && imgPath.startsWith('http')) {
                return null;
            }

            if (imgPath.startsWith('blob:')) {
                // Handle Blob or External URL
                const res = await fetch(imgPath);
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
        const filename = filePath.split('/').pop();
        if (processedFiles.has(filename)) return;
        processedFiles.add(filename);

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

                    // Handle binary content
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
                componentsFolder.file(filename, content);
                previewMap.set(`components/${filename}`, { path: `components/${filename}`, content });
            }

            // B. Fetch CSS Module (Optional)
            const cssPath = filePath.replace('.js', '.module.css');
            try {
                const cssRes = await fetch('/api/export-component', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filePath: cssPath })
                });
                if (cssRes.ok) {
                    const { content: cssContent } = await cssRes.json();
                    if (cssContent) {
                        componentsFolder.file(filename.replace('.js', '.module.css'), cssContent);
                        previewMap.set(`components/${filename.replace('.js', '.module.css')}`, { path: `components/${filename.replace('.js', '.module.css')}`, content: cssContent });
                    }
                }
            } catch { /* CSS is optional */ }

            // C. Find and Process Dependencies (Recursive) - Match standard imports
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
                await processComponent(depFilePath);

                // REWRITE IMPORT IN CONTENT
                const depFilename = depFilePath.split('/').pop();

                // If it's a CSS module, keep extension. If JS, remove .js
                const newImportName = isCssModule ? depFilename : depFilename.replace('.js', '');
                const newImportPath = `./${newImportName}`;

                content = content.replace(`from "${importPath}"`, `from "${newImportPath}"`);
                content = content.replace(`from '${importPath}'`, `from '${newImportPath}'`);
                // Fix: Also rewrite dynamic imports
                content = content.replace(`import("${importPath}")`, `import("${newImportPath}")`);
                content = content.replace(`import('${importPath}')`, `import('${newImportPath}')`);
            }

            // Update file in zip with rewritten content
            componentsFolder.file(filename, content);
            previewMap.set(`components/${filename}`, { path: `components/${filename}`, content });

        } catch (err) {
            console.error(`Error processing ${filePath}`, err);
            errors.push(`Failed to export dependency: ${filename}. Details: ${err.message}`);
        }
    };

    // This allows both the bundler loop and the page generator loop to see the updated props.
    const processedComponents = JSON.parse(JSON.stringify(selectedComponents));

    // --- Placeholders Injection (Do this upfront) ---
    const injectPlaceholders = (obj) => {
        if (!obj || typeof obj !== 'object') return;

        if (Array.isArray(obj)) {
            obj.forEach(subItem => injectPlaceholders(subItem));
            return;
        }

        Object.keys(obj).forEach(key => {
            const val = obj[key];
            const isImageKey = /image|logo|avatar|icon|background/i.test(key) && !/id$/i.test(key) && !/url$/i.test(key) && !/link$/i.test(key) && !/ratio$/i.test(key) && !/portrait/i.test(key);

            if (isImageKey && (!val || val === "")) {
                obj[key] = defaultPlaceholder;
            } else if (typeof val === 'object' && val !== null) {
                injectPlaceholders(val);
            }
        });
    };

    processedComponents.forEach(item => {
        // 1. Merge missing image defaults
        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};

        Object.keys(compDefaults).forEach(key => {
            const isImageKey = /image|logo|avatar|icon|background/i.test(key) && !/id$/i.test(key) && !/url$/i.test(key) && !/link$/i.test(key) && !/ratio$/i.test(key) && !/portrait/i.test(key);
            // If it's an image key AND it's missing from the item (undefined), copy it from defaults.
            const valInItem = item[key];
            const valInProps = item.props ? item.props[key] : undefined;

            if (isImageKey && valInItem === undefined && valInProps === undefined) {
                // If the default is empty string, injectPlaceholders will catch it.
                // If it has a value, it will be used.
                item[key] = compDefaults[key];
            }
        });

        // Run injection on the root of the clone
        injectPlaceholders(item);
        // Ensure props object exists
        if (!item.props) item.props = {};

        // FIX: Revert placeholder for ScrollGroup/Stacked items if they are using the default
        // We don't want a massive placeholder background if the user intended no image.
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
        const findImagesToCheck = (obj) => {
            let found = [];
            if (!obj) return found;
            if (typeof obj === 'string') {
                // Check normal paths & blobs
                if (obj.startsWith('blob:') || obj.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|ogv|mp3|wav)(\?.*)?$/i)) {
                    found.push(obj);
                }
                // Check bg images: url("...")
                const urlMatch = obj.match(/url\(['"]?([^'")]+)['"]?\)/);
                if (urlMatch) {
                    const extracted = urlMatch[1];
                    if (extracted.startsWith('blob:') || extracted.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|ogv|mp3|wav)(\?.*)?$/i)) {
                        found.push(extracted);
                    }
                }
            } else if (typeof obj === 'object') {
                Object.values(obj).forEach(val => {
                    found = found.concat(findImagesToCheck(val));
                });
            }
            return found;
        };

        const imagesToBundle = findImagesToCheck(item);

        // Bundle Defaults too (finding by item.id or componentName)
        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};

        const defaultImages = findImagesToCheck(compDefaults);
        defaultImages.forEach(img => {
            if (!imagesToBundle.includes(img)) imagesToBundle.push(img);
        });

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

                // Inject default prop into 'item' if it relies on default value
                const injectDefaultProp = (defaults, currentProps) => {
                    Object.keys(defaults).forEach(key => {
                        const defVal = defaults[key];
                        if (typeof defVal === 'string' && (defVal === imgPath || defVal.includes(imgPath))) {
                            if (currentProps[key] === undefined || currentProps[key] === defVal) {
                                let newVal = defVal;
                                if (defVal === imgPath) newVal = `${targetPath}`;
                                else newVal = defVal.replace(imgPath, `${targetPath}`);

                                currentProps[key] = newVal;
                            }
                        } else if (typeof defVal === 'object' && defVal !== null) {
                        }
                    });
                };
                injectDefaultProp(compDefaults, item.props);

                // 2. Update Hardcoded strings in the Component File 
                const compFile = componentsFolder.file(filename);
                if (compFile) {
                    let tempContent = await compFile.async("string");
                    const escapedPath = imgPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    const regex = new RegExp(`(["'])${escapedPath}(["'])`, 'g');
                    tempContent = tempContent.replace(regex, `$1${targetPath}$2`);
                    componentsFolder.file(filename, tempContent);
                    previewMap.set(`components/${filename}`, { path: `components/${filename}`, content: tempContent });
                }
            }
        }
    }
    // --- End Image Scanning ---

    // --- 3. Bundle Fonts (Removed: Fonts referenced in CSS are handled by asset bundler, or served via Google Fonts) ---
    // (This block previously listed and fetched all fonts, which created duplicates in public/fonts when they were also bundled to public/assets)
    // --- 4. Fetch Foundation Styles ---
    // Note: The order matters for cascade.
    const foundationFiles = [
        `public${activeThemePath}`, // Theme (Primitives) must be loaded first
        'app/foundation/tokens.css',
        'app/foundation/accent-color.css',
        'app/foundation/grid.css',
        'app/foundation/global.css'
    ];

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
                    foundationCSS += `\n/* --- ${path.split('/').pop()} --- */\n${content}\n`;
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
                    const content = await res.text();
                    foundationCSS += `\n/* --- ${path.split('/').pop()} --- */\n${content}\n`;
                } else {
                    console.warn(`Failed to fetch foundation file: ${path}`);
                }
            }

        } catch (e) {
            console.error(`Failed to fetch foundation: ${path}`, e);
        }
    }

    // --- 3b. Scan & Bundle Assets in Foundation CSS (e.g. social icons in global.css) ---
    const cssUrlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
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
    zip.file("next.config.mjs", "/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;\n");
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
    const title = analytics.websiteTitle || "Lunar Export";
    const description = analytics.metaDescription || "Exported from Lunar Page Builder";
    const keywords = analytics.metaKeywords || "";
    const favicon = analytics.favicon || "";
    const canonicalUrl = analytics.canonicalUrl || "";
    const ogTitle = analytics.ogTitle || "";
    const ogDescription = analytics.ogDescription || "";
    const ogImage = analytics.ogImage || "";
    let customMetaTags = analytics.metaTag || "";
    // Safety check: specific field must contain HTML tags. if user enters raw text, wrap in comment to prevent build error.
    if (customMetaTags && !customMetaTags.trim().startsWith('<')) {
        customMetaTags = `{/* Invalid Meta Tag (Must be valid HTML): ${customMetaTags.replace(/\*\//g, '* /')} */}`;
    }

    // Scripts
    const gtmId = analytics.googleTagManagerId;
    const clarityId = analytics.microsoftClarityId;
    const tiktokId = analytics.tikTokPixel;
    const metaPixelId = analytics.metaPixel;

    const hasScripts = gtmId || clarityId || tiktokId || metaPixelId;

    // Generate Layout
    // We need to inject the Google Fonts link here
    const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Poppins:wght@600;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
  rel="stylesheet"
/>`;

    appFolder.file("layout.js", `import "./globals.css";
${hasScripts ? 'import Script from "next/script";' : ''}

export const metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
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
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${fontLink}
        
        {/* Favicon */}
        ${favicon ? `<link rel="icon" href="${favicon}" />` : ''}
        
        {/* Open Graph */}
        <meta property="og:title" content="${ogTitle.replace(/"/g, '\\"')}" />
        <meta property="og:description" content="${ogDescription.replace(/"/g, '\\"')}" />
        <meta property="og:image" content="${ogImage}" />

        {/* Canonical URL */}
        ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : ''}
        ${customMetaTags}
      </head>
      <body style={{ containerType: 'inline-size', containerName: 'root-container' }}>
        {children}
        
        {/* Analytics Scripts */}
        ${gtmId ? `
        <Script id="gtm" strategy="afterInteractive">
          {\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');\`}
        </Script>
        ` : ''}

        ${clarityId ? `
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {\`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");\`}
        </Script>` : ''}

        ${tiktokId ? `
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {\`!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t.align=2,ttq.push([t].concat(Array.prototype.slice.call(e,0)))};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.setAndDefer(t,e),n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${tiktokId}');
            ttq.page();
          }(window, document, 'ttq');\`}
        </Script>` : ''}

        ${metaPixelId ? `
        <Script id="meta-pixel" strategy="afterInteractive">
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
    let pageContent = `"use client";\n\n`;

    // Imports
    imports.forEach((path, name) => {
        const importPath = path.replace('./components', '@/components');
        pageContent += `import ${name} from "${importPath}";\n`;
    });
    // Import Sticky Manager
    pageContent += `import StickyManager from "@/utils/sticky-manager";\n`;

    pageContent += `\nexport default function ExportedPage() {\n`;
    pageContent += `  return (\n`;
    pageContent += `    <main style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'clip', containerType: 'inline-size', containerName: 'root-container' }}>\n`;
    pageContent += `      <div id="canvas-background-root" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto', overflow: 'hidden' }} />\n`;
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

                // 1. Strings: Check for Match
                if (typeof val === 'string') {
                    // Check if the value ITSELF is a key in the map (Direct ID match)
                    if (sectionIdMap.has(val)) {
                        newProps[key] = sectionIdMap.get(val);
                    }

                    // Special: TargetDialogId Logic
                    if (key.includes('TargetDialogId')) {
                        let resolvedId = sectionIdMap.get(val);

                        // Generic Fallback Logic: If target dialog is not found, find a valid default
                        if (!resolvedId && val) {
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
                                console.warn(`[Export] Remapping missing dialog ID "${val}" to fallback "${resolvedId}"`);
                            }
                        }

                        // Use the resolved ID (whether direct match or fallback)
                        if (resolvedId) {
                            newProps[key] = resolvedId;
                        }

                        // Force Link Type unconditionally if we have a target dialog ID
                        if (newProps[key]) {
                            const linkTypeKey = key.replace('TargetDialogId', 'LinkType');
                            const urlKey = key.replace('TargetDialogId', 'Url');

                            // Always force dialog type if we have a target dialog ID
                            newProps[linkTypeKey] = 'dialog';

                            // Clear URL to prevent confusion
                            if (newProps[urlKey] === '#' || !newProps[urlKey]) {
                                newProps[urlKey] = '';
                            }
                        }
                    }
                }
                // 2. Objects/Arrays: Recurse
                else if (typeof val === 'object' && val !== null) {
                    newProps[key] = resolveProps(val);
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

    pageContent += `      </StickyManager>\n`;
    pageContent += `      </div>\n`;
    pageContent += `    </main>\n`;
    pageContent += `  );\n`;
    pageContent += `}\n`;

    appFolder.file("page.js", pageContent);

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
${canonicalUrl ? `Sitemap: ${canonicalUrl}/sitemap.xml` : ''}`;

    appFolder.file("robots.txt", robotsTxt);
    previewMap.set("app/robots.txt", { path: "app/robots.txt", content: robotsTxt });

    // Generate sitemap.xml
    if (canonicalUrl) {
        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;
        appFolder.file("sitemap.xml", sitemapXml);
        previewMap.set("app/sitemap.xml", { path: "app/sitemap.xml", content: sitemapXml });
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
            fileList.push({ path: "next.config.mjs", content: "/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;\n" });
            fileList.push({ path: "jsconfig.json", content: JSON.stringify({ compilerOptions: { paths: { "@/*": ["./*"] } } }, null, 2) });
            fileList.push({
                path: "app/globals.css", content: `/* Custom Foundation Styles */
${foundationCSS}

/* Typography Defaults (Restored for Export) - REMOVED (Handled by Component Styles) */
` });
            fileList.push({
                path: "app/layout.js", content: `import "./globals.css";
${hasScripts ? 'import Script from "next/script";' : ''}

export const metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
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
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${fontLink}
        
        {/* Favicon */}
        ${favicon ? `<link rel="icon" href="${favicon}" />` : ''}
        
        {/* Open Graph */}
        <meta property="og:title" content="${ogTitle.replace(/"/g, '\\"')}" />
        <meta property="og:description" content="${ogDescription.replace(/"/g, '\\"')}" />
        <meta property="og:image" content="${ogImage}" />

        {/* Canonical URL */}
        ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : ''}
        ${customMetaTags}
      </head>
      <body>
        {children}
        
        {/* Analytics Scripts */}
        ${gtmId ? `
        <Script id="gtm" strategy="afterInteractive">
          {\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');\`}
        </Script>` : ''}

        ${clarityId ? `
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {\`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");\`}
        </Script>` : ''}

        ${tiktokId ? `
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {\`!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t.align=2,ttq.push([t].concat(Array.prototype.slice.call(e,0)))};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.setAndDefer(t,e),n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${tiktokId}');
            ttq.page();
          }(window, document, 'ttq');\`}
        </Script>` : ''}

        ${metaPixelId ? `
        <Script id="meta-pixel" strategy="afterInteractive">
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
