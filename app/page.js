"use client";

import { useState, useEffect } from "react";
import GlobalHeaderTitle from "./components/global-header-title";
import GlobalHeaderTitleButton from "./components/global-header-title-button";
import GlobalHeaderTitleDescription from "./components/global-header-title-description";
import GlobalHeaderTitleButtonDescription from "./components/global-header-title-button-description";
import TerraBannerHeroWithButton from "./components/terra-banner-hero-with-button";
import TerraBannerHeroWithSearch from "./components/terra-banner-hero-with-search";
import TerraFeaturesImageLeft from "./components/terra-features-image-left";
import TerraFeaturesImageRight from "./components/terra-features-image-right";
import TerraUsp3col from "./components/terra-usp-3col";
import TerraFooter from "./components/terra-footer";
import { uspData, footerData } from "./content/data";
import styles from "./page.module.css";

/**
 * Template Generator Page
 * Allows users to select and preview section components
 */
export default function TemplateGeneratorPage() {
  const [selectedComponents, setSelectedComponents] = useState([]);

  // Component library organized by category
  const componentLibrary = {
    "Header": [
      { id: "header-title", name: "Title", component: GlobalHeaderTitle, thumbnail: "Title" },
      { id: "header-title-desc", name: "Title, Desc", component: GlobalHeaderTitleDescription, thumbnail: "Title\nDesc" },
      { id: "header-title-button", name: "Title, Button", component: GlobalHeaderTitleButton, thumbnail: "Title\nButton" },
      { id: "header-title-desc-button", name: "Title, Desc, Button", component: GlobalHeaderTitleButtonDescription, thumbnail: "Title\nDesc\nButton" },
    ],
    "Hero Banner": [
      { id: "hero-button", name: "Terra - Search", component: TerraBannerHeroWithButton, thumbnail: "Hero\nButton" },
      { id: "hero-search", name: "Terra - Button", component: TerraBannerHeroWithSearch, thumbnail: "Hero\nSearch" },
    ],
    "Feature - Split": [
      { id: "feature-left", name: "Terra - Image Left", component: TerraFeaturesImageLeft, thumbnail: "Image\nLeft" },
      { id: "feature-right", name: "Terra - Image Right", component: TerraFeaturesImageRight, thumbnail: "Image\nRight" },
    ],
    "USP": [
      { id: "usp-3col", name: "Terra - 3 Column", component: TerraUsp3col, thumbnail: "3 Col\nUSP" },
      { id: "usp-4col", name: "Terra - 4 Column", component: TerraUsp4col, thumbnail: "4 Col\nUSP" },
    ],
  };

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragStart = (e, index, componentName, thumbnail) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";

    // Custom Drag Image
    const dragImage = document.getElementById("custom-drag-image");
    if (dragImage) {
      const thumbnailEl = document.getElementById("drag-thumbnail-content");
      const nameEl = document.getElementById("drag-name-content");

      if (thumbnailEl) thumbnailEl.innerText = thumbnail || "";
      if (nameEl) nameEl.innerText = componentName || "Section";

      e.dataTransfer.setDragImage(dragImage, 0, 0);
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedItemIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    // Optional: clear drop target if leaving the container, but might be tricky with child elements
    // For now, we rely on drop or drag end to clear it
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDropTargetIndex(null);
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newComponents = [...selectedComponents];
    const draggedItem = newComponents[draggedItemIndex];
    newComponents.splice(draggedItemIndex, 1);
    newComponents.splice(index, 0, draggedItem);

    setSelectedComponents(newComponents);
    setDraggedItemIndex(null);
  };



  const addComponent = (componentData) => {
    setSelectedComponents([...selectedComponents, { ...componentData, uniqueId: Date.now() }]);
  };

  const removeComponent = (uniqueId) => {
    setSelectedComponents(selectedComponents.filter(c => c.uniqueId !== uniqueId));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newComponents = [...selectedComponents];
    [newComponents[index - 1], newComponents[index]] = [newComponents[index], newComponents[index - 1]];
    setSelectedComponents(newComponents);
  };

  const moveDown = (index) => {
    if (index === selectedComponents.length - 1) return;
    const newComponents = [...selectedComponents];
    [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
    setSelectedComponents(newComponents);
  };

  const handleExport = () => {
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

    // 1. Extract Clean HTML
    // We need to get the HTML of the components WITHOUT the editor wrappers and controls
    let cleanHtmlContent = "";

    // Get all component wrappers
    // Since we're using CSS modules, we can use the class from the styles object
    // We handle potential multiple classes by taking the first one if it's a space-separated string
    const wrapperClass = styles.componentWrapper.split(' ')[0];
    // We need to find elements that have this class. 
    // Note: querySelectorAll with a class that contains spaces (if any) might fail, but module classes are usually single strings.
    const componentWrappers = canvasElement.querySelectorAll(`.${wrapperClass}`);

    Array.from(componentWrappers).forEach(wrapper => {
      // Clone the wrapper to manipulate it without affecting the DOM
      const clone = wrapper.cloneNode(true);

      // Remove control buttons
      const controlButtons = clone.querySelector(`.${styles.controlButtons}`);
      if (controlButtons) controlButtons.remove();

      // Remove drop indicators
      const dropIndicator = clone.querySelector(`.${styles.dropIndicator}`);
      if (dropIndicator) dropIndicator.remove();

      // The actual component content is what remains inside the wrapper after removing editor UI.
      cleanHtmlContent += clone.innerHTML + "\n";
    });

    // 2. Extract CSS
    let cssContent = "/* Exported Styles */\n\n";
    const usedSelectors = new Set();

    // Helper to process rules
    const processRule = (rule) => {
      if (rule.type === 1) { // CSSStyleRule
        // Check if selector matches any element in canvas
        // We use a try-catch because some selectors might be invalid or complex
        try {
          // Clean selector for checking (remove pseudo-elements/classes)
          const cleanSelector = rule.selectorText.split(':')[0];

          // Always include :root, html, body for variables and global resets
          if (rule.selectorText === ":root" || rule.selectorText === "html" || rule.selectorText === "body" ||
            (cleanSelector && (canvasElement.querySelector(cleanSelector) || canvasElement.matches(cleanSelector)))) {

            // Exclude editor-specific styles
            if (rule.selectorText.includes(wrapperClass)) return;
            if (rule.selectorText.includes(styles.controlButtons)) return;
            if (rule.selectorText.includes(styles.dropIndicator)) return;

            if (!usedSelectors.has(rule.selectorText)) {
              cssContent += rule.cssText + "\n";
              usedSelectors.add(rule.selectorText);
            }
          }
        } catch (e) {
          // Ignore invalid selectors
        }
      } else if (rule.type === 4) { // CSSMediaRule
        // For media queries, we check if any rule inside matches
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

    // Iterate through all stylesheets
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

    // 3. Resolve CSS Variables
    // We need to replace all var(--variable-name) with their computed values
    const computedStyle = getComputedStyle(document.documentElement);

    const resolveVariables = (cssText) => {
      return cssText.replace(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/g, (match, variable, fallback) => {
        const value = computedStyle.getPropertyValue(variable).trim();
        if (value) return value;
        if (fallback) return fallback;
        return match; // Keep if not found
      });
    };

    // Resolve variables in CSS content
    // We might need multiple passes for nested variables
    let resolvedCssContent = cssContent;
    let previousContent = "";
    let passes = 0;
    while (resolvedCssContent !== previousContent && passes < 5) {
      previousContent = resolvedCssContent;
      resolvedCssContent = resolveVariables(resolvedCssContent);
      passes++;
    }

    // 4. Clean Class Names
    // We want to replace Next.js hashed classes (e.g. TerraFooter_container__abc12) 
    // with clean names (e.g. terra-footer-container)

    // Map to store class mappings to ensure consistency
    const classMap = new Map();

    const cleanClassName = (className) => {
      if (classMap.has(className)) return classMap.get(className);

      // Pattern: [Component]_[Class]__[Hash] or similar
      // We want to convert to kebab-case
      // Example: TerraFooter_container__abc12 -> terra-footer-container

      // Remove hash part (after double underscore)
      let clean = className.split('__')[0];

      // Convert camelCase or PascalCase to kebab-case
      clean = clean.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

      // Replace underscores with hyphens
      clean = clean.replace(/_/g, '-');

      // Remove leading hyphens if any
      clean = clean.replace(/^-+/, '');

      classMap.set(className, clean);
      return clean;
    };

    // Replace classes in HTML
    // We use a regex to find class="..." attributes
    let finalHtmlContent = cleanHtmlContent.replace(/class="([^"]+)"/g, (match, classNames) => {
      const cleanedClasses = classNames.split(' ').map(cls => {
        // Only clean classes that look like modules (contain underscores or mixed case)
        // Simple utility classes might be preserved or cleaned too
        if (cls.includes('_') || cls.includes('__')) {
          return cleanClassName(cls);
        }
        return cls;
      }).join(' ');
      return `class="${cleanedClasses}"`;
    });

    // Replace classes in CSS
    // We iterate through the map to replace in CSS content
    // This is safer than regexing the whole CSS which might match non-class strings
    // However, we need to be careful about selector specificity and structure
    // A simple string replace for each mapped class should work for most cases

    // Sort keys by length descending to avoid partial replacements
    const sortedClasses = Array.from(classMap.keys()).sort((a, b) => b.length - a.length);

    let finalCssContent = resolvedCssContent;
    sortedClasses.forEach(originalClass => {
      const cleanClass = classMap.get(originalClass);
      // Replace .OriginalClass with .clean-class
      // We use a global regex with word boundaries to avoid partial matches
      // Escaping the original class for regex
      const escapedOriginal = originalClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\.${escapedOriginal}(?![\\w-])`, 'g');
      finalCssContent = finalCssContent.replace(regex, `.${cleanClass}`);
    });

    // 5. Create full HTML document with embedded CSS
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round" rel="stylesheet">
    <style>
        /* Reset & Base Styles */
        body { margin: 0; padding: 0; background-color: #ffffff; font-family: 'Lato', sans-serif; }
        
        /* Extracted Styles */
        ${finalCssContent}
    </style>
</head>
<body>
${finalHtmlContent}
</body>
</html>`;

    // 6. Download Single File
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

  return (
    <>
      <TerraBannerHeroWithSearch />
      <TerraBannerHeroWithButton />
      <TerraUsp4col title={uspData.title} features={uspData.features} />
      <TerraUsp3col />
      <TerraFeaturesImageLeft />
      <TerraFeaturesImageRight />
      <GlobalHeaderTitle />
      <GlobalHeaderTitleButton />
      <GlobalHeaderTitleDescription />
      <GlobalHeaderTitleButtonDescription />
      <TerraFooter {...footerData} />
    </>
  );
}