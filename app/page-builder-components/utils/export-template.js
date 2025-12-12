import { renderToStaticMarkup } from 'react-dom/server';
import { componentDefaults } from "@/app/template-components/content/data";
import styles from "../../page.module.css";
import JSZip from 'jszip';

// Essential classes whitelist
const essentialClasses = [
    'container-grid', 'grid',
    'col-mobile-1', 'col-mobile-2',
    'col-tablet-1', 'col-tablet-2', 'col-tablet-3', 'col-tablet-4',
    'col-tablet-5', 'col-tablet-6', 'col-tablet-7', 'col-tablet-8',
    'col-desktop-1', 'col-desktop-2', 'col-desktop-3', 'col-desktop-4',
    'col-desktop-5', 'col-desktop-6', 'col-desktop-7', 'col-desktop-8',
    'col-desktop-9', 'col-desktop-10', 'col-desktop-11', 'col-desktop-12',
    'col-1', 'col-2', 'col-3', 'col-4', 'col-5', 'col-6',
    'col-7', 'col-8', 'col-9', 'col-10', 'col-11', 'col-12',
    'justify-center', 'justify-start', 'justify-end',
    'align-center', 'align-start', 'align-end',
    'offset-mobile-0', 'offset-mobile-1',
    'offset-tablet-0', 'offset-tablet-1', 'offset-tablet-2', 'offset-tablet-3', 'offset-tablet-4',
    'offset-desktop-0', 'offset-desktop-1', 'offset-desktop-2', 'offset-desktop-3',
    'offset-desktop-4', 'offset-desktop-5', 'offset-desktop-6',
    'z-lg', 'z-md', 'z-sm', 'relative', 'absolute', 'fixed', 'sticky'
];

/**
 * Converts a DOM node to a JSON Component Object Model
 */
const domToModel = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        return text ? { type: '#text', content: text } : null;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    // Skip editor-specific elements
    if (node.classList.contains(styles.controlButtons) ||
        node.classList.contains(styles.dropIndicator)) {
        return null;
    }

    const model = {
        type: node.tagName.toLowerCase(),
        attributes: {},
        children: []
    };

    // Extract attributes
    Array.from(node.attributes).forEach(attr => {
        if (attr.name === 'class') {
            // Filter out editor classes
            const classes = attr.value.split(' ')
                .filter(c => !c.includes(styles.componentWrapper) &&
                    !c.includes(styles.componentWrapperDragging))
                .join(' ');
            if (classes) model.attributes.class = classes;
        } else if (!['contenteditable', 'draggable', 'data-tooltip'].includes(attr.name)) {
            model.attributes[attr.name] = attr.value;
        }
    });

    // Recursively process children
    node.childNodes.forEach(child => {
        const childModel = domToModel(child);
        if (childModel) model.children.push(childModel);
    });

    return model;
};

/**
 * Generates HTML string from JSON Model
 */
const renderHtml = (node) => {
    if (!node) return '';
    if (node.type === '#text') return node.content;

    const attributes = Object.entries(node.attributes || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

    const childrenHtml = (node.children || [])
        .map(child => renderHtml(child))
        .join('');

    // Self-closing tags
    if (['img', 'br', 'hr', 'input'].includes(node.type)) {
        return `<${node.type} ${attributes} />`;
    }

    return `<${node.type} ${attributes}>${childrenHtml}</${node.type}>`;
};

/**
 * Extracts and organizes CSS from the model
 */
const renderCss = (model, docStyleSheets) => {
    const usedSelectors = new Set();
    const extractedRules = [];
    const variableNames = new Set(); // Track all variable names found

    // 1. Collect all classes from the model
    const collectClasses = (node, set) => {
        if (node.attributes && node.attributes.class) {
            node.attributes.class.split(' ').forEach(c => set.add(c));
        }
        if (node.children) {
            node.children.forEach(child => collectClasses(child, set));
        }
    };
    const modelClasses = new Set();
    if (Array.isArray(model)) {
        model.forEach(m => collectClasses(m, modelClasses));
    } else {
        collectClasses(model, modelClasses);
    }

    // 2. Helper to check if a rule should be included
    const shouldIncludeRule = (selectorText) => {
        if (!selectorText) return false;
        // Always include :root, html, body, and universal selector
        if (selectorText.includes(':root') || selectorText === 'html' || selectorText === 'body' || selectorText === '*') return true;

        // Check essential classes (Relaxed matching)
        if (essentialClasses.some(cls => selectorText.includes(cls))) return true;

        // Check used model classes
        return Array.from(modelClasses).some(cls => selectorText.includes(cls));
    };

    // Helper to scan for variable names in CSS text
    const scanForVariables = (cssText) => {
        const matches = cssText.match(/--[a-zA-Z0-9-_]+/g);
        if (matches) {
            matches.forEach(v => variableNames.add(v));
        }
    };

    // Recursive function to process rules
    const processRules = (rules) => {
        Array.from(rules).forEach(rule => {
            if (rule.type === 1) { // Style Rule
                scanForVariables(rule.cssText); // Scan for variables
                if (shouldIncludeRule(rule.selectorText)) {
                    if (!usedSelectors.has(rule.selectorText)) {
                        extractedRules.push({ type: 'style', css: rule.cssText });
                        usedSelectors.add(rule.selectorText);
                    }
                }
            } else if (rule.type === 4) { // Media Rule
                let mediaCss = "";
                let hasMatch = false;

                // Special check: If media query contains :root, ALWAYS include it for responsiveness
                const isRootMedia = Array.from(rule.cssRules).some(r => r.selectorText && r.selectorText.includes(':root'));

                Array.from(rule.cssRules).forEach(subRule => {
                    if (subRule.type === 1) {
                        if (isRootMedia || shouldIncludeRule(subRule.selectorText)) {
                            scanForVariables(subRule.cssText);
                            mediaCss += subRule.cssText + "\n";
                            hasMatch = true;
                        }
                    }
                });
                if (hasMatch) {
                    extractedRules.push({
                        type: 'media',
                        css: `@media ${rule.media.mediaText} {\n${mediaCss}}\n`,
                        condition: rule.media.mediaText
                    });
                }
            } else if (rule.type === 5) { // Font Face
                extractedRules.push({ type: 'font', css: rule.cssText });
            } else if (rule.type === 9 || rule.type === 12) { // Layer Rule (9) or Supports Rule (12)
                // Recurse into layers and supports
                if (rule.cssRules) {
                    processRules(rule.cssRules);
                }
            }
        });
    };

    // 3. Iterate StyleSheets
    Array.from(docStyleSheets).forEach(sheet => {
        try {
            const rules = sheet.cssRules || sheet.rules;
            if (rules) processRules(rules);
        } catch (e) {
            console.warn("Error accessing stylesheet", e);
        }
    });

    // 4. Organize CSS
    let cssString = "/* Exported Styles */\n\n";

    // Dynamic Variable Capture (Capture ALL used variables)
    // We capture the current computed values of ALL variables found in the CSS
    // to ensure colors and tokens are defined even if their definition rule was missed.
    const computedStyle = getComputedStyle(document.documentElement);
    let capturedVars = ":root {\n";

    // Add critical grid variables explicitly to the set to ensure they are checked
    ['--grid-columns', '--grid-margin', '--grid-gutter'].forEach(v => variableNames.add(v));

    variableNames.forEach(variable => {
        const value = computedStyle.getPropertyValue(variable).trim();
        // Only capture if it has a value and is NOT a grid layout variable that should be handled by media queries
        // actually, capturing the base value is fine as long as media queries override it.
        // The extracted CSS (with media queries) usually comes AFTER this block, so it should override.
        if (value) {
            capturedVars += `    ${variable}: ${value};\n`;
        }
    });
    capturedVars += "}\n";

    cssString += "/* Dynamically Captured Variables */\n" + capturedVars + "\n";



    extractedRules.forEach(rule => {
        cssString += rule.css + "\n";
    });

    return cssString;
};

import { BuilderSelectionContext } from "./builder/builder-controls";
import { isComponentSticky } from "./component-manager";

export const handleExportTemplate = async (selectedComponents, csvLink = "", analyticsData = {}) => {
    // 0. Sort Components (Sticky First)
    const exportComponents = [
        ...selectedComponents.filter(c => isComponentSticky(c)),
        ...selectedComponents.filter(c => !isComponentSticky(c))
    ];

    // 1. Render Components to Static HTML (Bridge)
    const tempContainer = document.createElement('div');

    // Calcluate Sticky Offsets for Export
    let stickyOffset = 0;
    const stickyStylesMap = {};

    // We can't measure DOM height here (it's node.js/server-side context potentially or just detached).
    // BUT we are in the browser when clicking export.
    // So we can try to find the rendered elements in the existing DOM before export!
    // Or we rely on the `stickyStyles` if we could access them? No.

    // Better strategy for export: Use the same calculation logic but relies either on assume height OR
    // measure the actual DOM elements from the Canvas (if they exist).

    // Attempt to measure from current DOM
    exportComponents.forEach((comp, index) => {
        const isSticky = comp.props?.isSticky ?? componentDefaults[comp.id]?.isSticky ?? false;
        if (isSticky) {
            // Find element in real DOM? 
            // We don't have unique IDs on the wrapper div in the DOM easily unless we put them there.
            // We can assume standard heights? No, that's brittle.
            // Best bet: The user is seeing the canvas. The canvas has the heights.
            // We can find the component by some attribute?
            // Not easily accessible here without passing refs.

            // Fallback: We can't perfectly export exact pixel offsets if we can't measure. 
            // But valid standard fixed height components (like Nav/Banner) usually have fixed heights.
            // Nav (~72px), Banner (~40px). 
            // This is risky.

            // Alternative: Write a JS script in the exported HTML that calculates it on load?
            // YES. That is robust.
        }
    });

    const componentsHtml = exportComponents.map(item => {
        const Component = item.component;

        // We will inject a distinct class or data attribute to let the client-side script handle sticky stacking
        // properties: data-unique-id, data-is-sticky

        // BUT `renderToStaticMarkup` renders the COMPONENT only. The wrapper is created inside `Canvas`.
        // The export function usually just renders the Component. 
        // We need to Wrap it in the export loop too if we want wrapper styles?

        // Looking at current implementation: 
        // `const componentsHtml = selectedComponents.map(...)` renders just the COMPONENT.
        // `renderToStaticMarkup( <Component ... /> )`

        // The `Canvas` wrapper `div` (styles.componentWrapper) is NOT exported currently?
        // Let's check `canvas.js` vs `export-template.js`.
        // `canvas.js` wraps with `<div className={styles.componentWrapper}>`.
        // `export-template.js` renders `<Component ... />` directly into a string.

        // So the exported HTML likely lacks the wrapper unless the Component includes it.
        // Most components have a `container` or similar.

        // If we want sticky behavior in export, we must wrap sticky components in a sticky div 
        // OR rely on the component's root element.

        // Let's modify the export loop to WRAP the component if it is sticky.

        const markup = renderToStaticMarkup(
            <BuilderSelectionContext.Provider value={{ selectedComponents: exportComponents }}>
                <Component {...item.props} sectionId={item.sectionId} />
            </BuilderSelectionContext.Provider>
        );

        if (item.props?.isSticky ?? componentDefaults[item.id]?.isSticky ?? false) {
            // We need to wrap this markup in a sticky container and add a script to handle stacking?
            // Or simpler: The user asked for it to affect export result.
            // Best way: Add a small JS script to the exported file that implements "Sticky Stacking".
            return `<div class="sticky-wrapper" data-is-sticky="true" style="z-index: ${100 - index}">${markup}</div>`;
        }

        return markup;
    }).join('');

    // 2. Parse to DOM (Detached)
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<body>${componentsHtml}</body>`, 'text/html');

    // 3. Build JSON Model
    const model = [];
    doc.body.childNodes.forEach(node => {
        const nodeModel = domToModel(node);
        if (nodeModel) model.push(nodeModel);
    });

    // 4. Enhance Model with Data Fields
    const enhanceModelWithDataFields = (node, index = 0) => {
        if (!node) return;
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.type)) {
            node.attributes['data-field'] = index === 0 ? 'title' : `title_${index + 1}`;
        } else if (node.type === 'p') {
            node.attributes['data-field'] = index === 0 ? 'description' : `description_${index + 1}`;
        } else if (node.type === 'img') {
            node.attributes['data-field'] = index === 0 ? 'image' : `image_${index + 1}`;
        } else if (node.type === 'a') {
            if (node.attributes.class && node.attributes.class.includes('btn')) {
                node.attributes['data-field'] = 'buttonLink';
            } else {
                node.attributes['data-field'] = 'link';
            }
        }
        if (node.children) {
            node.children.forEach((child, i) => enhanceModelWithDataFields(child, i));
        }
    };
    model.forEach(m => enhanceModelWithDataFields(m));

    // 5. Generate Content Strings
    const finalHtmlBody = model.map(m => renderHtml(m)).join('\n');
    const finalCssContent = renderCss(model, document.styleSheets);
    const syncScriptContent = `
/**
 * Google Sheets Sync Script & Navigation Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggle Logic ---
    const toggleButtons = document.querySelectorAll('[data-mobile-menu-toggle]');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('nav') || document.body;
            const menu = container.querySelector('[data-mobile-menu]');
            const openIcon = btn.querySelector('[data-menu-icon="open"]');
            const closeIcon = btn.querySelector('[data-menu-icon="close"]');

            if (menu) {
                const isHidden = menu.style.display === 'none' || getComputedStyle(menu).display === 'none';
                menu.style.display = isHidden ? 'flex' : 'none';
                
                if (openIcon) openIcon.style.display = isHidden ? 'none' : 'block';
                if (closeIcon) closeIcon.style.display = isHidden ? 'block' : 'none';
            }
        });
    });

    // --- Google Sheets Sync Logic ---
    const csvUrl = "${csvLink || ''}";
    if (!csvUrl) return;

    console.log("Syncing with Google Sheets:", csvUrl);
    
    async function fetchAndUpdateContent() {
        try {
            const response = await fetch(csvUrl);
            const text = await response.text();
            const rows = text.split('\\n').map(row => {
                const regex = /(?:^|,)("(?:[^"]|"")*"|[^,]*)/g;
                let matches = [];
                let match;
                while (match = regex.exec(row)) {
                    if (match.index === regex.lastIndex) regex.lastIndex++;
                    let val = match[1];
                    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1).replace(/""/g, '"');
                    matches.push(val);
                }
                return matches;
            }).slice(1); // Skip header

            rows.forEach(row => {
                if (row.length < 3) return;
                const [key, value, property] = row;
                if (!key || !value) return;

                let targetField = key;
                if (key.includes('_')) {
                    const parts = key.split('_');
                    const lastPart = parts[parts.length - 1];
                    if (!isNaN(parseInt(lastPart))) {
                        targetField = parts.slice(parts.length - 2).join('_');
                    } else {
                        targetField = lastPart;
                    }
                }

                const elements = document.querySelectorAll(\`[data-field="\${targetField}"]\`);
                
                elements.forEach(el => {
                    if (property === 'image') {
                        el.src = value;
                    } else if (property === 'link') {
                        el.href = value;
                    } else if (property === 'buttonLabel') {
                         const span = el.querySelector('span');
                         if (span) span.textContent = value;
                         else el.textContent = value;
                    } else {
                        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                            el.placeholder = value;
                        } else {
                            el.textContent = value;
                        }
                    }
                });
                
                if (property === 'buttonLink') {
                    const linkElements = document.querySelectorAll(\`[data-field-link="\${targetField}"]\`);
                    linkElements.forEach(el => el.href = value);
                }
            });

        } catch (error) {
            console.error('Error syncing content:', error);
        }
    }
    
    fetchAndUpdateContent();

    // --- Dialog Logic ---
    // Open Dialog
    document.querySelectorAll('[data-dialog-trigger]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-dialog-target');
            let overlay;
            if (targetId) {
                overlay = document.querySelector(\`[data-section-id="\${targetId}"]\`);
            } else {
                overlay = document.querySelector('[data-dialog-overlay]');
            }
            if (overlay) {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Dialog (Button)
    document.querySelectorAll('[data-dialog-close]').forEach(btnClose => {
        btnClose.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = btnClose.closest('[data-dialog-overlay]');
            if (overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Close Dialog (Overlay Click)
    document.querySelectorAll('[data-dialog-overlay]').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Close Dialog (Escape Key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('[data-dialog-overlay]').forEach(overlay => {
                overlay.style.display = 'none';
            });
            document.body.style.overflow = '';
        }
    });

    // --- Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('[class*="accordionHeader"]');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
             const item = header.closest('[class*="accordionItem"]');
             const container = item.parentElement;
             const content = item.querySelector('[class*="accordionContent"]');
             const inner = content.querySelector('[class*="accordionInner"]');
             const iconPlus = header.querySelector('[class*="PlusIcon"]');
             const iconMinus = header.querySelector('[class*="MinusIcon"]');

             // Close others in the same container
             container.querySelectorAll('[class*="accordionItem"]').forEach(otherItem => {
                 if (otherItem !== item) {
                     const otherContent = otherItem.querySelector('[class*="accordionContent"]');
                     const otherPlus = otherItem.querySelector('[class*="PlusIcon"]');
                     const otherMinus = otherItem.querySelector('[class*="MinusIcon"]');
                     
                     if (otherContent) {
                        otherContent.style.gridTemplateRows = '0fr';
                        // Manually manage inner classes or styles if needed, but grid trick handles it
                        const otherInner = otherContent.querySelector('[class*="accordionInner"]');
                        if (otherInner) {
                             otherInner.style.paddingBottom = '0';
                             otherInner.style.opacity = '0';
                        }
                     }
                     if (otherPlus) otherPlus.style.display = 'block';
                     if (otherMinus) otherMinus.style.display = 'none';
                 }
             });

             // Toggle current
             const isOpen = content.style.gridTemplateRows === '1fr';
             if (isOpen) {
                 content.style.gridTemplateRows = '0fr';
                 inner.style.paddingBottom = '0';
                 inner.style.opacity = '0';
                 if (iconPlus) iconPlus.style.display = 'block';
                 if (iconMinus) iconMinus.style.display = 'none';
             } else {
                 content.style.gridTemplateRows = '1fr';
                 inner.style.paddingBottom = 'var(--padding-md)';
                 inner.style.opacity = '1';
                 if (iconPlus) iconPlus.style.display = 'none';
                 if (iconMinus) iconMinus.style.display = 'block';
             }
        });
    });
    // --- Sticky Stacking Logic ---
    function updateStickyOffsets() {
        const stickyWrappers = document.querySelectorAll('[data-is-sticky="true"]');
        let offset = 0;
        stickyWrappers.forEach((el, index) => {
            el.style.position = 'sticky';
            el.style.top = offset + 'px';
            el.style.zIndex = 100 - index;
            offset += el.offsetHeight;
        });
    }
    
    // Run on load and resize
    updateStickyOffsets();
    window.addEventListener('resize', updateStickyOffsets);
    // Also run periodically incase of font loads/layout shifts
    setTimeout(updateStickyOffsets, 100);
    setTimeout(updateStickyOffsets, 500);
});
`;

    // 6. Assembly HTML File
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Template</title>
    ${csvLink ? `\n    <meta name="csv-data-source" content="${csvLink}">` : ''}
    ${analyticsData.metaDescription ? `\n    <meta name="description" content="${analyticsData.metaDescription}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
${finalHtmlBody}
<script src="script.js"></script>
</body>
</html>`;

    // 7. Create ZIP
    const zip = new JSZip();
    zip.file("index.html", fullHTML);
    zip.file("style.css", finalCssContent);
    zip.file("script.js", syncScriptContent);
    zip.folder("images"); // Empty folder for now

    // 8. Generate and Download
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = "template.zip";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
};
