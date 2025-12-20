
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const { filePath } = await request.json();

        if (!filePath) {
            return NextResponse.json({ error: 'File path is required' }, { status: 400 });
        }

        // Security: Prevent accessing files outside allowed directories
        const allowedDirs = [
            'app/template-components',
            'app/foundation',
            'app/page-builder-components',
            'public'
        ];

        const isAllowed = allowedDirs.some(dir => filePath.startsWith(dir)) || filePath.endsWith('.css');

        if (!isAllowed) {
            return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
        }

        const fullPath = path.join(process.cwd(), filePath);


        // Check if it is an image/binary asset or external URL
        const isExternal = filePath.startsWith('http');
        const ext = path.extname(filePath.split('?')[0]).toLowerCase();
        const binaryExts = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.mp4', '.webm', '.ogv', '.mp3', '.wav'];
        const isBinary = binaryExts.includes(ext) || isExternal;

        if (isBinary) {
            let buffer;
            if (isExternal) {
                // Proxy external image
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Failed to fetch external asset: ${filePath}`);
                const arrayBuffer = await response.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
            } else {
                if (!fs.existsSync(fullPath)) {
                    return NextResponse.json({ error: 'File not found' }, { status: 404 });
                }
                buffer = fs.readFileSync(fullPath);
            }

            const content = buffer.toString('base64');
            return NextResponse.json({ content, isBinary: true });
        }

        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        let content = fs.readFileSync(fullPath, 'utf8');



        // 1. Remove Builder Imports
        content = content.replace(/import\s+.*?\s+from\s+['"]@\/app\/page-builder-components\/utils\/builder\/.*?['"];?\n?/g, '');
        content = content.replace(/import\s+{\s*createUpdateHandler\s*}\s+from\s+['"].*?['"];?\n?/g, '');
        content = content.replace(/import\s+{\s*getContainerClasses\s*}\s+from\s+['"].*?['"];?\n?/g, '');
        content = content.replace(/import\s+styles\s+from\s+['"](.*?)['"];?/g, "import styles from '$1';");

        // 2. Remove Builder Props & Hooks
        content = content.replace(/onUpdate=\{[^}]+\}/g, '');

        // Remove `createUpdateHandler` initialization
        content = content.replace(/const\s+update\s+=\s+createUpdateHandler\(onUpdate\);/g, '');

        // Remove usages of `update(...)` in props, objects, and function calls
        content = content.replace(/[a-zA-Z0-9]+\=\{\s*update\([^)]+\)\s*\}/g, ''); // Prop usage
        content = content.replace(/[a-zA-Z0-9]+\=\{\s*\(\)\s*=>\s*update\([^)]+\)\s*\}/g, ''); // Arrow function usage
        content = content.replace(/[a-zA-Z0-9]+\s*:\s*update\([^)]+\)\s*,?/g, ''); // Object property usage
        content = content.replace(/update\(['"][^'"]+['"]\)(\([^)]+\))?;?/g, ''); // Standalone calls

        // Remove `update` from dependency arrays
        content = content.replace(/,\s*update\b/g, '');
        content = content.replace(/\bupdate\s*,\s*/g, '');
        content = content.replace(/\[\s*update\s*\]/g, '[]');

        // 3. Transform <BuilderText /> to HTML tags
        const builderTextRegex = /<BuilderText([\s\S]*?)\/>/g;
        content = content.replace(builderTextRegex, (match, attrs) => {
            const tagNameMatch = attrs.match(/tagName="([^"]+)"/);
            const tagName = tagNameMatch ? tagNameMatch[1] : 'div';

            const contentMatch = attrs.match(/content={((?:[^{}]|{[^}]*})*)}/);
            const contentValue = contentMatch ? contentMatch[1] : '';

            const classNameMatch = attrs.match(/className={((?:[^{}]|{[^}]*})*)}/);
            const classNameStringMatch = attrs.match(/className="([^"]+)"/);

            const suffixMatch = attrs.match(/suffix="([^"]+)"/);
            const suffix = suffixMatch ? suffixMatch[1] : '';

            const idMatch = attrs.match(/id={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/id="([^"]+)"/);
            let idExpr = 'undefined';
            if (idMatch) {
                if (idMatch[0].startsWith('id="')) idExpr = `"${idMatch[1]}"`;
                else idExpr = idMatch[1];
            }

            // Fallback: ID or generated sectionId-suffix
            let idAttr = '';
            const defaultSuffix = suffix || tagName;
            const fallback = `(typeof sectionId !== 'undefined' && sectionId ? \`\${sectionId}-${defaultSuffix}\` : undefined)`;
            const combined = idExpr !== 'undefined' ? `(${idExpr} || ${fallback})` : fallback;
            // Only output ID if robust value exists
            idAttr = ` id={${combined}}`;

            let classNameAttr = '';
            if (classNameMatch) classNameAttr = ` className={${classNameMatch[1]}}`;
            else if (classNameStringMatch) classNameAttr = ` className="${classNameStringMatch[1]}"`;

            const styleMatch = attrs.match(/style={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            let styleAttr = '';
            if (styleMatch) styleAttr = ` style={${styleMatch[1]}}`;

            return `<${tagName}${classNameAttr}${idAttr}${styleAttr}>{${contentValue}}</${tagName}>`;
        });

        // 4. Pre-clean: Remove callbacks and complex props to simplify regex matching
        const builderCallbacks = [
            'onIdChange', 'onLabelChange', 'onVisibilityChange',
            'onHrefChange', 'onVariantChange', 'onLinkTypeChange',
            'onTargetDialogIdChange', 'onIsPortraitChange', 'onMobileRatioChange',
            'onChange' // BuilderText uses onChange
        ];

        // Construct Regex: (onIdChange|onLabelChange|...)={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}
        const callbackPattern = `(${builderCallbacks.join('|')})={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}`;
        const callbackRegex = new RegExp(callbackPattern, 'g');
        content = content.replace(callbackRegex, '');


        content = content.replace(/(iconRight|iconLeft)={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/g, '');

        // 5. Transform <BuilderButton /> to <Link>
        const builderButtonRegex = /<BuilderButton([\s\S]*?)\/>/g;
        content = content.replace(builderButtonRegex, (match, attrs) => {
            const labelMatch = attrs.match(/label={((?:[^{}]|{[^}]*})*)}/);
            const label = labelMatch ? `{${labelMatch[1]}}` : 'Label';

            const hrefMatch = attrs.match(/href={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/href="([^"]+)"/);
            // Raw href string or expression
            let hrefRaw = hrefMatch ? (hrefMatch[0].startsWith('href="') ? `"${hrefMatch[1]}"` : hrefMatch[1]) : '""';

            // Capture linkType and targetDialogId
            const linkTypeMatch = attrs.match(/linkType={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/linkType="([^"]+)"/);
            const targetIdMatch = attrs.match(/targetDialogId={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/targetDialogId="([^"]+)"/);

            const classNameMatch = attrs.match(/className={((?:[^{}]|{[^}]*})*)}/);
            const classNameStringMatch = attrs.match(/className="([^"]+)"/);

            const keyMatch = attrs.match(/key={((?:[^{}]|{[^}]*})*)}/);
            let keyAttr = '';
            if (keyMatch) keyAttr = ` key={${keyMatch[1]}}`;

            const suffixMatch = attrs.match(/suffix="([^"]+)"/);
            const suffix = suffixMatch ? suffixMatch[1] : '';

            const idMatch = attrs.match(/id={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/id="([^"]+)"/);

            let idExpr = 'undefined';
            if (idMatch) {
                if (idMatch[0].startsWith('id="')) idExpr = `"${idMatch[1]}"`;
                else idExpr = idMatch[1];
            }

            // ID Fallback Logic
            let finalIdAttr = '';
            if (suffix) {
                // Logic: Use provided ID, or generate from sectionId + suffix
                // We assume sectionId is available in the component scope (standard for these components)
                const fallback = `(typeof sectionId !== 'undefined' && sectionId ? \`\${sectionId}-${suffix}\` : undefined)`;
                const combined = idExpr !== 'undefined' ? `(${idExpr} || ${fallback})` : fallback;
                finalIdAttr = ` id={${combined}}`;
            } else if (idExpr !== 'undefined') {
                // No suffix, just use ID if present
                finalIdAttr = ` id={${idExpr}}`;
            }

            let className = '';
            if (classNameMatch) {
                className = ` className={${classNameMatch[1]}}`;
            } else if (classNameStringMatch) {
                className = ` className="${classNameStringMatch[1]}"`;
            }

            const styleMatch = attrs.match(/style={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            let styleAttr = '';
            if (styleMatch) styleAttr = ` style={${styleMatch[1]}}`;

            // Smart HREF: Handle dialog triggers vs standard links

            let finalHrefExp = '';

            // Helper to get raw expression from match (strip quotes if string, strip braces if expr)
            const getExpr = (matchObj) => {
                if (!matchObj) return 'null';
                if (matchObj[0].startsWith('linkType="') || matchObj[0].startsWith('targetDialogId="')) return `"${matchObj[1]}"`;
                return matchObj[1]; // content inside {}
            };

            const linkTypeExpr = getExpr(linkTypeMatch);
            const targetIdExpr = getExpr(targetIdMatch);

            // Clean up hrefRaw to be an expression we can use
            let hrefExpr = hrefRaw;
            if (hrefRaw.startsWith('"')) {
                // It's a string literal like "#"
                // Keep it as is
            } else {
                // It's an expression content or empty
                // If empty or "", default to "#"
                if (hrefRaw === '""' || hrefRaw === '') hrefExpr = '"#"';
                else hrefExpr = `(${hrefRaw} || "#")`;
            }

            // If we have dynamic props, build the ternary
            // "Go Bigger" Fix: Inject explicit onClick handler to force hash update.
            if (linkTypeExpr !== 'null' && targetIdExpr !== 'null') {
                const targetHash = `'#' + ${targetIdExpr}`;
                finalHrefExp = `{(\n                   (${linkTypeExpr} === 'dialog' && ${targetIdExpr})\n                     ? ${targetHash}\n                     : ${hrefExpr}\n                )}`;

                const onClickLogic = ` onClick={(e) => { if (${linkTypeExpr} === 'dialog' && ${targetIdExpr}) { window.location.hash = ${targetHash}; } }}`;

                return `<Link href=${finalHrefExp}${className}${keyAttr}${finalIdAttr}${onClickLogic}${styleAttr}>${label}</Link>`;
            } else {
                // Fallback to simple href
                finalHrefExp = hrefExpr.startsWith('"') ? hrefExpr : `{${hrefExpr}}`;
                return `<Link href=${finalHrefExp}${className}${keyAttr}${finalIdAttr}${styleAttr}>${label}</Link>`;
            }
        });

        // 6. Transform <BuilderLink /> to <Link>
        const builderLinkRegex = /<BuilderLink([\s\S]*?)\/>/g;
        content = content.replace(builderLinkRegex, (match, attrs) => {
            const labelMatch = attrs.match(/label={((?:[^{}]|{[^}]*})*)}/);
            const label = labelMatch ? `{${labelMatch[1]}}` : '';

            const hrefMatch = attrs.match(/href={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/href="([^"]+)"/);
            let hrefRaw = hrefMatch ? (hrefMatch[0].startsWith('href="') ? `"${hrefMatch[1]}"` : hrefMatch[1]) : '""';

            const linkTypeMatch = attrs.match(/linkType={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/linkType="([^"]+)"/);
            const targetIdMatch = attrs.match(/targetDialogId={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/targetDialogId="([^"]+)"/);

            const classNameMatch = attrs.match(/className={((?:[^{}]|{[^}]*})*)}/);
            const classNameStringMatch = attrs.match(/className="([^"]+)"/);

            const keyMatch = attrs.match(/key={((?:[^{}]|{[^}]*})*)}/);
            let keyAttr = '';
            if (keyMatch) keyAttr = ` key={${keyMatch[1]}}`;

            const idMatch = attrs.match(/id={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/id="([^"]+)"/);

            // Standardize ID Logic (same as Button)
            let idExpr = 'undefined';
            if (idMatch) {
                if (idMatch[0].startsWith('id="')) idExpr = `"${idMatch[1]}"`;
                else idExpr = idMatch[1];
            }

            const suffixMatch = attrs.match(/suffix="([^"]+)"/);
            const suffix = suffixMatch ? suffixMatch[1] : 'link'; // Default suffix 'link'

            let idAttr = '';
            const fallback = `(typeof sectionId !== 'undefined' && sectionId ? \`\${sectionId}-${suffix}\` : undefined)`;
            const combined = idExpr !== 'undefined' ? `(${idExpr} || ${fallback})` : fallback;
            idAttr = ` id={${combined}}`;

            let className = '';
            if (classNameMatch) className = ` className={${classNameMatch[1]}}`;
            else if (classNameStringMatch) className = ` className="${classNameStringMatch[1]}"`;

            const styleMatch = attrs.match(/style={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*})*}/);
            // Correct regex for nested braces/simple object
            const styleMatchRefined = attrs.match(/style={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            let styleAttr = '';
            if (styleMatchRefined) styleAttr = ` style={${styleMatchRefined[1]}}`;

            let finalHrefExp = '';
            const getExpr = (matchObj) => {
                if (!matchObj) return 'null';
                if (matchObj[0].startsWith('linkType="') || matchObj[0].startsWith('targetDialogId="')) return `"${matchObj[1]}"`;
                return matchObj[1];
            };

            const linkTypeExpr = getExpr(linkTypeMatch);
            const targetIdExpr = getExpr(targetIdMatch);

            let hrefExpr = hrefRaw;
            if (hrefRaw.startsWith('"')) {
                // Str literal
            } else {
                if (hrefRaw === '""' || hrefRaw === '') hrefExpr = '"#"';
                else hrefExpr = `(${hrefRaw} || "#")`;
            }

            // If we have dynamic props, build the ternary
            // "Go Bigger" Fix: Inject explicit onClick for hash updates (bypassing Client Router issues)
            if (linkTypeExpr !== 'null' && targetIdExpr !== 'null') {
                const targetHash = `'#' + ${targetIdExpr}`;

                // We construct a Link that handles the click explicitly
                // Note: We use <Link> but override onClick for the dialog case.
                // The ternary is strict: if dialog, use hash + onClick. If url, use href.

                finalHrefExp = `{(\n                   (${linkTypeExpr} === 'dialog' && ${targetIdExpr})\n                     ? ${targetHash}\n                     : ${hrefExpr}\n                )}`;

                const onClickLogic = ` onClick={(e) => { if (${linkTypeExpr} === 'dialog' && ${targetIdExpr}) { window.location.hash = ${targetHash}; } }}`;

                return `<Link href=${finalHrefExp}${className}${keyAttr}${idAttr}${onClickLogic}${styleAttr}>${label}</Link>`;
            } else {
                // Fallback to simple href
                finalHrefExp = hrefExpr.startsWith('"') ? hrefExpr : `{${hrefExpr}}`;
                return `<Link href=${finalHrefExp}${className}${keyAttr}${idAttr}${styleAttr}>${label}</Link>`;
            }
        });

        // 7. Transform <BuilderImage /> to <img/>, <video/>, or <audio/>
        const builderImageRegex = /<BuilderImage([\s\S]*?)\/>/g;
        content = content.replace(builderImageRegex, (match, attrs) => {
            const srcMatch = attrs.match(/src={([^}]+)}/) || attrs.match(/src="([^"]+)"/);
            let src = 'null';
            if (srcMatch) {
                if (srcMatch[0].startsWith('src="')) {
                    src = `"${srcMatch[1]}"`;
                } else {
                    src = srcMatch[1]; // Variable or expression
                }
            }

            // Capture isVisible prop
            const visibleMatch = attrs.match(/isVisible={([^}]+)}/);
            const isVisible = visibleMatch ? visibleMatch[1] : null;

            // Capture ID prop
            const idMatch = attrs.match(/id={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/id="([^"]+)"/);

            // Standardize ID Logic
            let idExpr = 'undefined';
            if (idMatch) {
                if (idMatch[0].startsWith('id="')) idExpr = `"${idMatch[1]}"`;
                else idExpr = idMatch[1];
            }

            const suffixMatch = attrs.match(/suffix="([^"]+)"/);
            const suffix = suffixMatch ? suffixMatch[1] : 'image'; // Default suffix

            const fallback = `(typeof sectionId !== 'undefined' && sectionId ? \`\${sectionId}-${suffix}\` : undefined)`;
            const combined = idExpr !== 'undefined' ? `(${idExpr} || ${fallback})` : fallback;
            const idAttr = ` id={${combined}}`;

            // Improve regex to handle nested braces in className (e.g. template literals ${...})
            // Matches: [^{}] OR { [^{}]* } OR { { [^{}]* } } (2 levels deep)
            const classNameMatch = attrs.match(/className={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            const classNameStringMatch = attrs.match(/className="([^"]+)"/);
            let classNameAttr = '';
            if (classNameMatch) classNameAttr = ` className={${classNameMatch[1]}}`;
            else if (classNameStringMatch) classNameAttr = ` className="${classNameStringMatch[1]}"`;

            const styleMatch = attrs.match(/style={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            let styleAttr = '';
            if (styleMatch) styleAttr = ` style={${styleMatch[1]}}`;

            // Generate Media Tag (Static or Dynamic)

            const videoExts = ['mp4', 'webm', 'ogv'];
            const audioExts = ['mp3', 'wav'];
            const videoRegex = new RegExp(`\\.(${videoExts.join('|')})(\\?.*)?$`, 'i');
            const audioRegex = new RegExp(`\\.(${audioExts.join('|')})(\\?.*)?$`, 'i');

            let mediaTag = '';

            // Case 1: Static String Literal
            if (src.startsWith('"') || src.startsWith("'")) {
                const cleanSrc = src.slice(1, -1); // Remove quotes
                if (videoRegex.test(cleanSrc)) {
                    mediaTag = `<video src={${src}} controls autoPlay muted loop playsInline${classNameAttr}${idAttr}${styleAttr} />`;
                } else if (audioRegex.test(cleanSrc)) {
                    mediaTag = `<audio src={${src}} controls${classNameAttr}${idAttr}${styleAttr} />`;
                } else {
                    mediaTag = `<img src={${src} || null} alt=""${classNameAttr}${idAttr}${styleAttr} />`;
                }
            }
            // Case 2: Dynamic Expression (Runtime Check)
            else {
                // Runtime ternary check: (src && isVideo) ? <video> : (src && isAudio) ? <audio> : <img>

                // Helper strings for regex tests in the generated code
                const isVideo = `/\\.(${videoExts.join('|')})(\\?.*)?$/i.test(${src})`;
                const isAudio = `/\\.(${audioExts.join('|')})(\\?.*)?$/i.test(${src})`;

                const videoTag = `<video src={${src}} controls autoPlay muted loop playsInline${classNameAttr}${idAttr}${styleAttr} />`;
                const audioTag = `<audio src={${src}} controls${classNameAttr}${idAttr}${styleAttr} />`;
                const imgTagFallback = `<img src={${src} || null} alt=""${classNameAttr}${idAttr}${styleAttr} />`;

                mediaTag = `(${src} && ${isVideo}) ? (
                    ${videoTag}
                ) : (${src} && ${isAudio}) ? (
                    ${audioTag}
                ) : (
                    ${imgTagFallback}
                )`;
            }

            // Wrap in conditional if isVisible is present
            if (isVisible) {
                // If mediaTag starts with <, it's a static element, so { isVisible && <Element /> } is valid.
                // If it's a dynamic ternary (starts with '('), we need { isVisible && (ternary) }
                // Fix: Usage of (isVisible ?? true) to default to true if prop is undefined (matching Builder default)
                if (mediaTag.trim().startsWith('<')) {
                    return `{(${isVisible} ?? true) && ${mediaTag}}`;
                } else {
                    return `{(${isVisible} ?? true) && (${mediaTag})}`;
                }
            }

            // If not visible check required, just return mediaTag
            // If it's static JSX, return as is.
            // If it's dynamic ternary, wrap in {}
            if (mediaTag.trim().startsWith('<')) {
                return mediaTag;
            } else {
                return `{${mediaTag}}`;
            }
        });

        // 8. Transform <BuilderElement /> to <div>
        content = content.replace(/<BuilderElement([\s\S]*?)>/g, (match, attrs) => {
            const tagNameMatch = attrs.match(/tagName="([^"]+)"/);
            const tagName = tagNameMatch ? tagNameMatch[1] : 'div';

            const classNameMatch = attrs.match(/className={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            const classNameStringMatch = attrs.match(/className="([^"]+)"/);

            let classNameAttr = '';
            if (classNameMatch) classNameAttr = ` className={${classNameMatch[1]}}`;
            else if (classNameStringMatch) classNameAttr = ` className="${classNameStringMatch[1]}"`;

            const styleMatch = attrs.match(/style={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            let styleAttr = '';
            if (styleMatch) styleAttr = ` style={${styleMatch[1]}}`;

            // Handle ID if present? Usually not mandatory but good to have if provided.
            const idMatch = attrs.match(/id={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/id="([^"]+)"/);
            const elementPropsMatch = attrs.match(/elementProps="([^"]+)"/); // Maps to suffix in BuilderElement
            const suffix = elementPropsMatch ? elementPropsMatch[1] : 'element';

            // Standardize ID Logic
            let idExpr = 'undefined';
            if (idMatch) {
                if (idMatch[0].startsWith('id="')) idExpr = `"${idMatch[1]}"`;
                else idExpr = idMatch[1];
            }

            const fallback = `(typeof sectionId !== 'undefined' && sectionId ? \`\${sectionId}-${suffix}\` : undefined)`;
            const combined = idExpr !== 'undefined' ? `(${idExpr} || ${fallback})` : fallback;
            const idAttr = ` id={${combined}}`;

            // Capture 'key' prop if present (important for lists)
            const keyMatch = attrs.match(/key={((?:[^{}]|{[^}]*})*)}/);
            let keyAttr = '';
            if (keyMatch) {
                keyAttr = ` key={${keyMatch[1]}}`;
            }

            return `<${tagName}${classNameAttr}${keyAttr}${idAttr}${styleAttr}>`;
        });

        content = content.replace(/<\/BuilderElement\s*>/g, '</div>'); // Assuming default is div.
        // 9. Transform <BuilderSection /> to <section>
        const sectionRegex = /<BuilderSection([\s\S]*?)>([\s\S]*?)<\/BuilderSection\s*>/g;
        content = content.replace(sectionRegex, (match, attrs, children) => {
            const tagNameMatch = attrs.match(/tagName="([^"]+)"/);
            const tagName = tagNameMatch ? tagNameMatch[1] : 'section';

            const classNameMatch = attrs.match(/className={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/);
            const classNameStringMatch = attrs.match(/className="([^"]+)"/);
            const sectionIdMatch = attrs.match(/sectionId={((?:[^{}]|{[^}]*})*)}/);

            // Check for layout props
            const innerContainerMatch = attrs.match(/innerContainer={([^}]+)}/);
            const isInnerContainer = innerContainerMatch && innerContainerMatch[1] === 'true';

            // Map layout props to getContainerClasses helper
            const containerUtilsCall = `getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })`;

            let classNameExpr = '';
            if (classNameMatch) classNameExpr = classNameMatch[1];
            else if (classNameStringMatch) classNameExpr = `"${classNameStringMatch[1]}"`;

            let idAttr = '';
            if (sectionIdMatch) idAttr = ` id={${sectionIdMatch[1]}}`;

            // Case 1: Inner Container (Standard for sections with constraints)
            // <tagName className={className}><div className={utils}>...</div></tagName>
            if (isInnerContainer) {
                const rootClass = classNameExpr ? ` className={${classNameExpr}}` : '';
                return `<${tagName}${rootClass}${idAttr}>\n<div className={${containerUtilsCall}}>\n${children}\n</div>\n</${tagName}>`;
            }
            // Case 2: No Inner Container (Classes merged on root)
            // <tagName className={`${className} ${utils}`}>...</tagName>
            else {
                // Merge Logic
                let combinedClass = '';
                if (classNameExpr) {
                    if (classNameExpr.startsWith('"')) {
                        // "class" -> `class ${utils}`
                        // Strip quotes
                        const raw = classNameExpr.slice(1, -1);
                        combinedClass = ` className={\`${raw} \${${containerUtilsCall}}\`}`;
                    } else {
                        // {style.class} -> `${style.class} ${utils}`
                        combinedClass = ` className={\`\${${classNameExpr}} \${${containerUtilsCall}}\`}`;
                    }
                } else {
                    combinedClass = ` className={${containerUtilsCall}}`;
                }

                return `<${tagName}${combinedClass}${idAttr}>\n${children}\n</${tagName}>`;
            }
        });

        // 10. Inject Dialog Effects
        if (filePath.endsWith('dialog-section.js')) {
            const effectInjection = `
    useEffect(() => {
        if (typeof window !== 'undefined' && sectionId) {
            const checkHash = () => {
                if (window.location.hash === \`#\${sectionId}\`) {
                    setInternalIsOpen(true);
                }
            };
            checkHash();
            window.addEventListener('hashchange', checkHash);
            return () => window.removeEventListener('hashchange', checkHash);
        }
    }, [sectionId]);

    useEffect(() => {
        if (!isOpen && typeof window !== 'undefined' && sectionId) {
            if (window.location.hash === \`#\${sectionId}\`) {
                history.replaceState(null, document.title, window.location.pathname + window.location.search);
            }
        }
    }, [isOpen, sectionId]);

    useEffect(() => {
        if (!sectionId || typeof window === 'undefined') return;

        const handleGlobalClick = (e) => {
            const anchor = e.target.closest('a');
            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href === \`#\${sectionId}\`) {
                     setInternalIsOpen(true);
                }
            }
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [sectionId]);
            `;
            const injectionPoint = '// === Effects ===';
            if (content.includes(injectionPoint)) {
                content = content.replace(injectionPoint, effectInjection);
            } else {
                // Fallback: Inject before last brace if standard marker missing
                const lastBrace = content.lastIndexOf('}');
                if (lastBrace !== -1) {
                    content = content.slice(0, lastBrace) + effectInjection + content.slice(lastBrace);
                }
            }
        }

        // 11. Ensure Link import exists
        if (content.includes('<Link') && !content.includes('import Link')) {
            content = "import Link from 'next/link';\n" + content;
        }

        // 12. Inject Helper Functions
        if (content.includes('getContainerClasses') && !content.includes('function getContainerClasses')) {
            const helperFn = `
function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}\n`;
            // Inject after last import or at top
            const lastImportIndex = content.lastIndexOf('import ');
            if (lastImportIndex !== -1) {
                const endOfImportLine = content.indexOf('\n', lastImportIndex);
                content = content.slice(0, endOfImportLine + 1) + helperFn + content.slice(endOfImportLine + 1);
            } else {
                content = helperFn + content;
            }
        }

        return NextResponse.json({ content });
    } catch (error) {
        console.error('Error reading component file:', error);
        return NextResponse.json({ error: `Failed to read file: ${error.message}` }, { status: 500 });
    }
}
