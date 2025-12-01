import styles from "../../page.module.css";

/**
 * Exports the current canvas content as a downloadable HTML file.
 * @param {Array} selectedComponents - List of selected components.
 */
export const handleExportTemplate = (selectedComponents, analyticsData = {}) => {
    if (selectedComponents.length === 0) {
        alert("No components to export. Please add components to the canvas first.");
        return;
    }

    // Get the canvas content
    const canvasElement = document.querySelector('[data-canvas="true"]');
    if (!canvasElement) {
        alert("Canvas not found");
        return;
    }

    // Extract Clean HTML
    let cleanHtmlContent = "";
    const wrapperClass = styles.componentWrapper.split(' ')[0];
    const componentWrappers = canvasElement.querySelectorAll(`.${wrapperClass}`);

    Array.from(componentWrappers).forEach((wrapper, index) => {
        const clone = wrapper.cloneNode(true);


        const controlButtons = clone.querySelector(`.${styles.controlButtons}`);
        if (controlButtons) controlButtons.remove();

        const dropIndicator = clone.querySelector(`.${styles.dropIndicator}`);
        if (dropIndicator) dropIndicator.remove();


        const editableElements = clone.querySelectorAll('[contenteditable]');
        editableElements.forEach(el => {
            el.removeAttribute('contenteditable');
            el.removeAttribute('suppresscontenteditablewarning');
            if (el.tagName === 'SPAN' && el.style.outline === 'none') {
                el.style.outline = '';
                el.style.minWidth = '';
                el.style.display = '';
            }
        });

        const component = selectedComponents[index];
        const sectionId = component?.sectionId || `section-${index}`;

        const componentRoot = clone.firstElementChild;
        if (componentRoot) {
            componentRoot.id = sectionId;
            cleanHtmlContent += componentRoot.outerHTML + "\n";
        } else {
            cleanHtmlContent += clone.innerHTML + "\n";
        }
    });

    // Extract CSS
    let cssContent = "/* Exported Styles */\n\n";
    const usedSelectors = new Set();

    const processRule = (rule) => {
        if (rule.type === 1) { // CSSStyleRule
            try {
                const cleanSelector = rule.selectorText.split(':')[0];


                if (rule.selectorText === ":root" || rule.selectorText === "html" || rule.selectorText === "body" ||
                    (cleanSelector && (canvasElement.querySelector(cleanSelector) || canvasElement.matches(cleanSelector)))) {


                    if (rule.selectorText.includes(wrapperClass)) return;
                    if (rule.selectorText.includes(styles.controlButtons)) return;
                    if (rule.selectorText.includes(styles.dropIndicator)) return;

                    if (!usedSelectors.has(rule.selectorText)) {
                        cssContent += rule.cssText + "\n";
                        usedSelectors.add(rule.selectorText);
                    }
                }
            } catch (e) { }
        } else if (rule.type === 4) { // CSSMediaRule
            let mediaCss = "";
            let hasMatch = false;
            for (const subRule of rule.cssRules) {
                if (subRule.type === 1) {
                    try {
                        const cleanSelector = subRule.selectorText.split(':')[0];
                        if (canvasElement.querySelector(cleanSelector) || canvasElement.matches(cleanSelector)) {
                            mediaCss += subRule.cssText + "\n";
                            hasMatch = true;
                        }
                    } catch (e) { }
                }
            }
            if (hasMatch) {
                cssContent += `@media ${rule.media.mediaText} {\n${mediaCss}}\n`;
            }
        } else if (rule.type === 5) { // CSSFontFaceRule
            cssContent += rule.cssText + "\n";
        } else if (rule.type === 7) { // CSSKeyframesRule
            cssContent += rule.cssText + "\n";
        }
    };


    Array.from(document.styleSheets).forEach(sheet => {
        try {
            const rules = sheet.cssRules || sheet.rules;
            if (rules) {
                Array.from(rules).forEach(processRule);
            }
        } catch (e) {
            console.warn("Could not access stylesheet rules", e);
        }
    });

    // Resolve CSS Variables
    const computedStyle = getComputedStyle(document.documentElement);

    const resolveVariables = (cssText) => {
        return cssText.replace(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/g, (match, variable, fallback) => {
            const value = computedStyle.getPropertyValue(variable).trim();
            if (value) return value;
            if (fallback) return fallback;
            return match;
        });
    };


    let resolvedCssContent = cssContent;
    let previousContent = "";
    let passes = 0;
    while (resolvedCssContent !== previousContent && passes < 5) {
        previousContent = resolvedCssContent;
        resolvedCssContent = resolveVariables(resolvedCssContent);
        passes++;
    }

    // Clean Class Names
    const classMap = new Map();

    const cleanClassName = (className) => {
        if (classMap.has(className)) return classMap.get(className);


        let clean = className.split('__')[0];
        clean = clean.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        clean = clean.replace(/_/g, '-');
        clean = clean.replace(/^-+/, '');

        classMap.set(className, clean);
        return clean;
    };


    let finalHtmlContent = cleanHtmlContent.replace(/class="([^"]+)"/g, (match, classNames) => {
        const cleanedClasses = classNames.split(' ').map(cls => {
            if (cls.includes('_') || cls.includes('__')) {
                return cleanClassName(cls);
            }
            return cls;
        }).join(' ');
        return `class="${cleanedClasses}"`;
    });


    const sortedClasses = Array.from(classMap.keys()).sort((a, b) => b.length - a.length);

    let finalCssContent = resolvedCssContent;
    sortedClasses.forEach(originalClass => {
        const cleanClass = classMap.get(originalClass);
        const escapedOriginal = originalClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\.${escapedOriginal}(?![\\w-])`, 'g');
        finalCssContent = finalCssContent.replace(regex, `.${cleanClass}`);
    });

    // Generate Final HTML
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${analyticsData.metaDescription ? `<meta name="description" content="${analyticsData.metaDescription}">` : ''}
    <title>Exported Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round" rel="stylesheet">
    <style>
        /* Reset & Base Styles */
        body { margin: 0; padding: 0; background-color: var(--base-white); font-family: 'Lato', sans-serif; }
        
        /* Extracted Styles */
        ${finalCssContent}
    </style>
</head>
<body>
${finalHtmlContent}
</body>
</html>`;

    // Download File
    const htmlBlob = new Blob([fullHTML], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'template.html';
    document.body.appendChild(htmlLink);
    htmlLink.click();
    document.body.removeChild(htmlLink);
    URL.revokeObjectURL(htmlUrl);

    alert('Export complete! Downloaded template.html');
};
