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
import TerraUsp4col from "./components/terra-usp-4col";
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

  // Component Configuration
  const componentLibrary = {
    "Header": [
      { id: "header-title", name: "Title", component: GlobalHeaderTitle, thumbnail: "/images/thumbnails/header-title.svg" },
      { id: "header-title-desc", name: "Title, Desc", component: GlobalHeaderTitleDescription, thumbnail: "/images/thumbnails/header-title-desc.svg" },
      { id: "header-title-button", name: "Title, Button", component: GlobalHeaderTitleButton, thumbnail: "/images/thumbnails/header-title-button.svg" },
      { id: "header-title-desc-button", name: "Title, Desc, Button", component: GlobalHeaderTitleButtonDescription, thumbnail: "/images/thumbnails/header-title-desc-button.svg" },
    ],
    "Hero Banner": [
      { id: "hero-button", name: "Terra - Search", component: TerraBannerHeroWithButton, thumbnail: "/images/thumbnails/terra-search.svg" },
      { id: "hero-search", name: "Terra - CTA", component: TerraBannerHeroWithSearch, thumbnail: "/images/thumbnails/terra-cta.svg" },
    ],
    "Feature - Split": [
      { id: "feature-left", name: "Terra - Image Left", component: TerraFeaturesImageLeft, thumbnail: "/images/thumbnails/terra-image-left.svg" },
      { id: "feature-right", name: "Terra - Image Right", component: TerraFeaturesImageRight, thumbnail: "/images/thumbnails/terra-image-right.svg" },
    ],
    "USP": [
      { id: "usp-3col", name: "Terra - USP 3 Column", component: TerraUsp3col, thumbnail: "/images/thumbnails/terra-USP-3col.svg" },
      { id: "usp-4col", name: "Terra - USP 4 Column", component: TerraUsp4col, thumbnail: "/images/thumbnails/terra-USP-4col.svg" },
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

    // Drag Preview
    const dragImage = document.getElementById("custom-drag-image");
    if (dragImage) {
      const thumbnailEl = document.getElementById("drag-thumbnail-image");
      const nameEl = document.getElementById("drag-name-content");

      if (thumbnailEl) thumbnailEl.src = thumbnail || "";
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

    // 1. Extract Clean HTML (remove editor UI)
    let cleanHtmlContent = "";
    const wrapperClass = styles.componentWrapper.split(' ')[0];
    const componentWrappers = canvasElement.querySelectorAll(`.${wrapperClass}`);

    Array.from(componentWrappers).forEach(wrapper => {
      const clone = wrapper.cloneNode(true);

      // Remove editor controls
      const controlButtons = clone.querySelector(`.${styles.controlButtons}`);
      if (controlButtons) controlButtons.remove();

      const dropIndicator = clone.querySelector(`.${styles.dropIndicator}`);
      if (dropIndicator) dropIndicator.remove();

      cleanHtmlContent += clone.innerHTML + "\n";
    });

    // 2. Extract CSS
    let cssContent = "/* Exported Styles */\n\n";
    const usedSelectors = new Set();

    // Helper to process rules
    const processRule = (rule) => {
      if (rule.type === 1) { // CSSStyleRule
        try {
          const cleanSelector = rule.selectorText.split(':')[0];

          // Include globals and used selectors
          if (rule.selectorText === ":root" || rule.selectorText === "html" || rule.selectorText === "body" ||
            (cleanSelector && (canvasElement.querySelector(cleanSelector) || canvasElement.matches(cleanSelector)))) {

            // Exclude editor styles
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
    const computedStyle = getComputedStyle(document.documentElement);

    const resolveVariables = (cssText) => {
      return cssText.replace(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/g, (match, variable, fallback) => {
        const value = computedStyle.getPropertyValue(variable).trim();
        if (value) return value;
        if (fallback) return fallback;
        return match;
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

    // 4. Clean Class Names (remove hashes)
    const classMap = new Map();

    const cleanClassName = (className) => {
      if (classMap.has(className)) return classMap.get(className);

      // Convert to kebab-case
      let clean = className.split('__')[0];
      clean = clean.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      clean = clean.replace(/_/g, '-');
      clean = clean.replace(/^-+/, '');

      classMap.set(className, clean);
      return clean;
    };

    // Update HTML classes
    let finalHtmlContent = cleanHtmlContent.replace(/class="([^"]+)"/g, (match, classNames) => {
      const cleanedClasses = classNames.split(' ').map(cls => {
        if (cls.includes('_') || cls.includes('__')) {
          return cleanClassName(cls);
        }
        return cls;
      }).join(' ');
      return `class="${cleanedClasses}"`;
    });

    // Update CSS classes
    const sortedClasses = Array.from(classMap.keys()).sort((a, b) => b.length - a.length);

    let finalCssContent = resolvedCssContent;
    sortedClasses.forEach(originalClass => {
      const cleanClass = classMap.get(originalClass);
      const escapedOriginal = originalClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\.${escapedOriginal}(?![\\w-])`, 'g');
      finalCssContent = finalCssContent.replace(regex, `.${cleanClass}`);
    });

    // 5. Generate Final HTML
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
        body { margin: 0; padding: 0; background-color: var(--base-white); font-family: 'Lato', sans-serif; }
        
        /* Extracted Styles */
        ${finalCssContent}
    </style>
</head>
<body>
${finalHtmlContent}
</body>
</html>`;

    // 6. Download File
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
    <div className={styles.container}>
      {/* Top Bar - Full Width */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <h1 className={`h5 ${styles.logo}`}>Lunar</h1>
        </div>
        <div className={styles.topBarRight}>
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className={`${styles.topBarButton} ${styles.topBarButtonBordered}`}
          >
            <span className="material-icons-round" style={{ fontSize: "16px", color: "var(--content-neutral--body)" }}>
              {isSidebarVisible ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
            </span>
          </button>
          <button className={`${styles.topBarButton} ${styles.topBarButtonBordered}`}>
            <span className="material-icons-round" style={{ fontSize: "16px", color: "var(--content-neutral--body)" }}>download</span>
          </button>
          <button className={styles.topBarButtonWide}>
            <span className="material-icons-round" style={{ fontSize: "16px" }}>code</span>
            Import JSON
          </button>
          <button className={styles.topBarButtonExport} onClick={handleExport}>
            <span className="material-icons-round" style={{ fontSize: "16px" }}>rocket_launch</span>
            Export
          </button>

        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Canvas Area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "var(--base-white)",
          position: "relative"
        }}>
          {/* Canvas Content */}
          <div style={{ padding: "var(--space-100)" }}>
            {selectedComponents.length === 0 ? (
              <div style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--base-white)",
                borderRadius: "var(--round-80)",
                border: "1px dashed var(--grey-200)"
              }}>
                <div style={{ textAlign: "center" }}>
                  <p className="body-regular" style={{ color: "var(--content-neutral--caption)" }}>
                    Select components from the sidebar to build your template
                  </p>
                </div>
              </div>
            ) : (
              <div data-canvas="true">
                {selectedComponents.map((item, index) => {
                  const Component = item.component;
                  return (
                    <div
                      key={item.uniqueId}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index, item.name || "Section", item.thumbnail)}
                      onDragEnd={() => setDraggedItemIndex(null)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`${styles.componentWrapper} ${draggedItemIndex === index ? styles.componentWrapperDragging : ''}`}
                      style={{
                        marginTop: dropTargetIndex === index && draggedItemIndex !== index ? "var(--space-80)" : "0"
                      }}
                    >
                      {/* Drop Indicator */}
                      {dropTargetIndex === index && draggedItemIndex !== index && (
                        <div className={styles.dropIndicator}>
                          <div className={styles.dropIndicatorCircle} />
                        </div>
                      )}
                      {/* Grouped Control Buttons */}
                      <div className={styles.controlButtons}>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === selectedComponents.length - 1}
                          className={`${styles.controlButton} ${styles.controlButtonBordered}`}
                          style={{
                            color: index === selectedComponents.length - 1 ? "var(--content-neutral--body)" : "var(--content-neutral--title)",
                            cursor: index === selectedComponents.length - 1 ? "not-allowed" : "pointer"
                          }}
                        >
                          <span className="material-icons-round" style={{ fontSize: "16px" }}>keyboard_arrow_down</span>
                        </button>
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className={`${styles.controlButton} ${styles.controlButtonBordered}`}
                          style={{
                            color: index === 0 ? "var(--content-neutral--body)" : "var(--content-neutral--title)",
                            cursor: index === 0 ? "not-allowed" : "pointer"
                          }}
                        >
                          <span className="material-icons-round" style={{ fontSize: "16px" }}>keyboard_arrow_up</span>
                        </button>
                        <button
                          onClick={() => removeComponent(item.uniqueId)}
                          className={`${styles.controlButton} ${styles.controlButtonDelete}`}
                        >
                          <span className="material-icons-round" style={{ fontSize: "16px" }}>delete</span>
                        </button>
                      </div>

                      {/* Render Component */}
                      {item.id === "usp-3col" || item.id === "usp-4col" ? (
                        <Component title={uspData.title} features={uspData.features} />
                      ) : item.id === "footer" ? (
                        <Component {...footerData} />
                      ) : (
                        <Component />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarVisible && (
          <div className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h2 className={`h5 ${styles.sidebarTitle}`}>Configuration</h2>
              <div className={styles.tabs}>
                <button className={`${styles.tab} ${styles.tabActive}`}>
                  Elements
                </button>
                <button className={`${styles.tab} ${styles.tabInactive}`}>
                  Analytics
                </button>
              </div>
            </div>

            {/* Search */}
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search elements"
            />

            <div className={styles.separator} />

            {/* Component Categories */}
            {Object.entries(componentLibrary).map(([category, components], index, array) => (
              <div key={category} className={styles.categoryWrapper}>
                <details open>
                  <summary className={styles.categorySummary}>
                    {category}
                    <span className="material-icons-round" style={{ color: "var(--content-neutral--body)" }}>arrow_drop_down</span>
                  </summary>
                  <div className={styles.componentGrid}>
                    {components.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => addComponent(comp)}
                        className={styles.sidebarButton}
                      >
                        <div className={styles.sidebarButtonImageWrapper}>
                          <img
                            src={comp.thumbnail}
                            alt={comp.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </div>
                        <p className="caption-regular" style={{
                          fontSize: "var(--typography-font-size-80)",
                          color: "var(--content-neutral--caption)"
                        }}>
                          {comp.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </details>
                {index < array.length - 1 && (
                  <div className={styles.separator} style={{ marginTop: "var(--space-100)", marginBottom: "0" }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Drag Image (Hidden) */}
      <div
        id="custom-drag-image"
        className={styles.customDragImage}
      >
        <div style={{
          height: "60px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--grey-50)",
          borderRadius: "var(--round-80)",
          border: "1px solid var(--grey-200)",
          overflow: "hidden"
        }}>
          <img
            id="drag-thumbnail-image"
            src={null}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <span id="drag-name-content" style={{
          fontSize: "var(--typography-font-size-80)",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--content-neutral--title)"
        }}></span>
      </div>
    </div >
  );
}