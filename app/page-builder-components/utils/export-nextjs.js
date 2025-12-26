
import JSZip from 'jszip';
import { COMPONENT_PATHS } from './component-paths';
import { componentDefaults } from '@/app/template-components/content/data';
import { defaultPlaceholder } from '@/app/page-builder-components/utils/builder/builder-image';

/**
 * handleExportNextjs: Exports selected components as a clean Next.js project structure (Partial).
 */
export const handleExportNextjs = async (selectedComponents, activeThemePath = '/themes/theme.css', options = {}) => {
    const { download = true, savePreview = true, previewFolder } = options;
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
            body: JSON.stringify({ filePath: 'app/page-builder-components/utils/section-utils.js' })
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
            body: JSON.stringify({ filePath: 'app/page-builder-components/utils/sticky-manager.js' })
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

            // B. Fetch CSS Module
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
            } catch (ignore) { /* CSS is optional */ }

            // C. Find and Process Dependencies (Recursive) - Match standard imports
            // We need a loop because regex.exec is stateful
            // FIXED: capture generic path (matched group 1) to support aliases like matching "@/..."
            const importRegex = /import\s+(?:[\w{},*\s]+)\s+from\s+['"]([^'"]+)['"]/g;
            let match;

            // We collect replacements to do them after the loop to avoid messing up regex indices if content changes length (though we replace text so we should be careful)
            // Actually, replace returns new string, so regex on OLD string is safer if we just iterate once or use matchAll.
            const matches = [...content.matchAll(importRegex)];

            for (const match of matches) {
                const fullImport = match[0];
                const importPath = match[1];

                // Filter: Only process relative paths (.) and project aliases (@/)
                // Ignore external packages (next, react, etc.)
                if (!importPath.startsWith('.') && !importPath.startsWith('@/')) continue;

                // Ignore CSS/Style imports locally (handled by step B or global styles), but ALLOW .module.css
                // This is crucial for components that import another component's CSS module
                // Ignore plain CSS imports (handled globally), but ALLOW .module.css
                // This is crucial for components that import another component's CSS module (e.g. media-21-9 imports media-16-9.module.css)
                if (importPath.endsWith('.css') && !importPath.endsWith('.module.css')) continue;

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
            }

            // Update file in zip with rewritten content
            componentsFolder.file(filename, content);
            previewMap.set(`components/${filename}`, { path: `components/${filename}`, content });

        } catch (err) {
            console.error(`Error processing ${filePath}`, err);
            errors.push(`Failed to export dependency: ${filename}. Details: ${err.message}`);
        }
    };

    // Deep clone components ONCE to ensure consistent modifications (placeholders, etc.)
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
            const isImageKey = /image|logo|avatar|icon|background/i.test(key) && !/id$/i.test(key);

            if (isImageKey && (!val || val === "")) {
                obj[key] = defaultPlaceholder;
            } else if (typeof val === 'object' && val !== null) {
                injectPlaceholders(val);
            }
        });
    };

    processedComponents.forEach(item => {
        // 1. Merge missing image defaults
        // Some components (like TerraFeatures) might not have the property saved if it relies on the default.
        // We find the default config and ensure those keys exist on the item so the injector can find them.
        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};

        Object.keys(compDefaults).forEach(key => {
            const isImageKey = /image|logo|avatar|icon|background/i.test(key) && !/id$/i.test(key);
            // If it's an image key AND it's missing from the item (undefined), copy it from defaults.
            // We check both root and props to be safe, but we inject into root for consistency with the loop below.
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
    });

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
        const componentName = filename.replace('.js', '')
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
        imports.set(componentName, `./components/${filename}`);

        // --- Image Scanning & Bundling ---
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
            if (processedFiles.has(imgPath)) continue; // Avoid re-fetching same image

            // Skip bundling for the system default placeholder (keep as remote URL)
            // Skip bundling for the system default placeholder (keep as remote URL)
            // Use robust check to prevent renaming (which would break detection logic)
            if (imgPath === defaultPlaceholder || (typeof imgPath === 'string' && imgPath.includes('placeholder_falj5i'))) continue;

            processedFiles.add(imgPath);

            try {
                let uniqueName;
                let dataContent;
                let isBase64 = false;

                if (imgPath.startsWith('blob:') || imgPath.startsWith('http')) {
                    // Handle Blob or External URL (Client-Side Fetch)
                    const res = await fetch(imgPath);
                    const blob = await res.blob();
                    const arrayBuffer = await blob.arrayBuffer();

                    // Determine extension from MIME
                    let ext = 'png';
                    if (blob.type === 'image/jpeg') ext = 'jpg';
                    else if (blob.type === 'image/svg+xml') ext = 'svg';
                    else if (blob.type === 'image/gif') ext = 'gif';
                    else if (blob.type === 'image/webp') ext = 'webp';

                    dataContent = arrayBuffer;
                    isBase64 = false; // JSZip handles arraybuffer

                    // Create name
                    uniqueName = `upload-${Math.random().toString(36).substr(2, 8)}.${ext}`;

                    // Add to ZIP (ArrayBuffer)
                    zip.folder("public").folder("assets").file(uniqueName, dataContent);

                    // For Preview (needs Base64 for simplicity in this architecture?)
                    const base64 = btoa(
                        new Uint8Array(arrayBuffer)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    previewMap.set(`public/assets/${uniqueName}`, { path: `public/assets/${uniqueName}`, content: base64, base64: true });

                } else {
                    // Handle Server-Side Asset
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
                }

                if (uniqueName) {
                    const targetPath = `assets/${uniqueName}`;

                    // Update component references to point to the new local asset path.
                    // 1. Update props passed to page.js
                    const updateProps = (obj) => {
                        Object.keys(obj).forEach(key => {
                            const val = obj[key];
                            if (typeof val === 'string') {
                                if (val === imgPath) {
                                    obj[key] = `/${targetPath}`;
                                } else if (val.includes(imgPath)) {
                                    // Handle partials like url(...)
                                    // Careful not to replace substrings that are not paths
                                    obj[key] = val.replace(imgPath, `/${targetPath}`);
                                }
                            } else if (typeof val === 'object' && val !== null) {
                                updateProps(val);
                            }
                        });
                    };
                    updateProps(item); // Update the item (which feeds props) in place

                    // Inject default prop into 'item' if it relies on default value
                    const injectDefaultProp = (defaults, currentProps) => {
                        Object.keys(defaults).forEach(key => {
                            const defVal = defaults[key];
                            if (typeof defVal === 'string' && (defVal === imgPath || defVal.includes(imgPath))) {
                                if (currentProps[key] === undefined || currentProps[key] === defVal) {
                                    let newVal = defVal;
                                    if (defVal === imgPath) newVal = `/${targetPath}`;
                                    else newVal = defVal.replace(imgPath, `/${targetPath}`);

                                    currentProps[key] = newVal;
                                }
                            } else if (typeof defVal === 'object' && defVal !== null) {
                                // Recurse if needed (though props are usually flat-ish)
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
                        tempContent = tempContent.replace(regex, `$1/${targetPath}$2`);
                        componentsFolder.file(filename, tempContent);
                        previewMap.set(`components/${filename}`, { path: `components/${filename}`, content: tempContent });
                    }
                }
            } catch (e) {
                console.warn("Failed to bundle image:", imgPath, e);
            }
        }
    }
    // --- End Image Scanning ---

    // --- 3. Fetch Foundation Styles ---
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
            const res = await fetch('/api/export-component', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filePath: path })
            });
            if (res.ok) {
                const { content } = await res.json();
                foundationCSS += `\n/* --- ${path.split('/').pop()} --- */\n${content}\n`;
            } else {
                console.warn(`Initial fetch failed for ${path}. Checking if it's a root path or requires adjustment.`);
                // Fallback or detailed error logging could go here
            }
        } catch (e) {
            console.error(`Failed to fetch foundation: ${path}`, e);
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
            "@heroicons/react": "^2.1.3"
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
    const customMetaTags = analytics.metaTag || "";

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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />`;

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
        <link rel="icon" href="${favicon}" />
        
        {/* Open Graph */}
        <meta property="og:title" content="${ogTitle.replace(/"/g, '\\"')}" />
        <meta property="og:description" content="${ogDescription.replace(/"/g, '\\"')}" />
        <meta property="og:image" content="${ogImage}" />

        {/* Canonical URL */}
        <link rel="canonical" href="${canonicalUrl}" />
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
    pageContent += `    <main className="flex min-h-screen flex-col items-center justify-between">\n`;

    // Map uniqueIds to sectionIds for resolving "Target Dialog" links
    const sectionIdMap = new Map();
    processedComponents.forEach(comp => {
        if (comp.uniqueId) {
            // Use sectionId if available, otherwise fallback to uniqueId
            const finalId = comp.sectionId || comp.uniqueId;
            sectionIdMap.set(String(comp.uniqueId), finalId);
        }
    });

    // Pre-calculate Sticky Indices
    const stickyIndices = [];
    processedComponents.forEach((item, index) => {
        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};
        const isSticky = item.props?.isSticky ?? compDefaults.isSticky ?? false;
        if (isSticky) {
            stickyIndices.push(index);
        }
    });

    pageContent += `      <StickyManager stickyIndices={[${stickyIndices.join(',')}]}>\n`;

    // Render Instances
    processedComponents.forEach((item) => {
        const filePath = COMPONENT_PATHS[item.id];
        if (!filePath) return;

        const filename = filePath.split('/').pop();
        const componentName = filename.replace('.js', '')
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        // Merge props from root item and nested props to ensure robust data passing
        // Some implementations might store data at root, some in props. We capture both.
        // USE CLONE (item itself is now the clone from processedComponents)
        const props = { ...item, ...(item.props || {}) };

        // Check for stickiness before deleting the prop
        const isSticky = props.isSticky;

        // Cleanup metadata fields that should not be passed as props
        delete props.id; // Internal ID
        delete props.name; // Component Name
        delete props.componentId; // Component Type ID
        delete props.category;
        delete props.isSticky;
        delete props.uniqueId;
        delete props.config; // Configuration specs
        delete props.isOpen; // Fix: Remove uncontrolled state prop

        const finalSectionId = sectionIdMap.get(String(item.uniqueId));
        if (finalSectionId) {
            props.sectionId = finalSectionId;
        }

        // Fix Target ID references
        Object.keys(props).forEach(key => {
            // Address ID mapping
            if (key.includes('TargetDialogId') && props[key]) {
                const targetUniqueId = String(props[key]); // Fix: Ensure String comparison
                if (sectionIdMap.has(targetUniqueId)) {
                    props[key] = sectionIdMap.get(targetUniqueId);

                    // If linkType is missing or 'url', and URL is empty, switch to dialog
                    const linkTypeKey = key.replace('TargetDialogId', 'LinkType');
                    const urlKey = key.replace('TargetDialogId', 'Url');

                    if ((!props[linkTypeKey] || props[linkTypeKey] === 'url') && (!props[urlKey] || props[urlKey] === '#')) {
                        props[linkTypeKey] = 'dialog';
                    }
                }
            }
        });

        const propsString = Object.entries(props).map(([key, value]) => {
            if (value === undefined || value === null) return '';
            if (typeof value === 'string') {
                return `${key}="${value}"`;
            } else if (typeof value === 'boolean') {
                return value ? `${key}` : `${key}={false}`;
            } else {
                return `${key}={${JSON.stringify(value)}}`;
            }
        }).filter(Boolean).join(' ');

        // Render Component
        let componentJSX = `<${componentName} ${propsString} />`;

        // Apply Sticky Wrapper if needed
        // REMOVED: Managed by StickyManager
        /*
        if (isSticky) {
            // Use inline style for sticky positioning (z-index 1000)
            componentJSX = `
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        ${componentJSX}
      </div>`;
        }
        */

        pageContent += `      ${componentJSX}\n`;
    });

    pageContent += `      </StickyManager>\n`;
    pageContent += `    </main>\n`;
    pageContent += `  );\n`;
    pageContent += `}\n`;

    appFolder.file("page.js", pageContent);

    // 5. Download ZIP (Conditional)
    if (download) {
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "nextjs-export.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 6. Save Preview to Local Folder (Conditional)
    if (savePreview) {
        try {
            const fileList = Array.from(previewMap.values());

            // Add Project Files (generated in step 4) to list
            // ... (rest of files logic remains same but needs to be inside if)

            // NOTE: Since I am replacing the block, I need to include the fileList logic again or structure it better.
            // Let's just wrap the whole previous block logic.

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
                path: "app/layout.js", content: `import { Inter } from "next/font/google";
import "./globals.css";
${hasScripts ? 'import Script from "next/script";' : ''}

const inter = Inter({ subsets: ["latin"] });

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        ${customMetaTags}
      </head>
      <body className={inter.className}>
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


            const folderName = previewFolder || `preview-${new Date().toISOString().replace(/[:.]/g, '-')}`;
            const previewRes = await fetch('/api/save-preview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ files: fileList, folderName })
            });

            if (previewRes.ok) {
                console.log(`Preview files saved to public/uat-files/${folderName}`);
                if (download) {
                    alert(`Export Successful!\n\nZIP Downloaded.\n\nFiles also saved to:\npublic/uat-files/${folderName}`);
                } else {
                    alert(`Project Saved!\n\nFiles saved to:\npublic/uat-files/${folderName}`);
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
