"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BellAlertIcon, TrashIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";
import { handleExportTemplate } from "@/app/page-builder-components/utils/export-template";
import { handleExportCsv } from "@/app/page-builder-components/utils/export-csv";
import { componentLibrary } from "@/app/page-builder-components/content/component-library";
import Sidebar from "@/app/page-builder-components/sidebar";
import TopBar from "@/app/page-builder-components/topbar";
import Canvas from "@/app/page-builder-components/canvas";
import ConfigPopover from "@/app/page-builder-components/config-popover";
import ThemePickerPopover from "@/app/page-builder-components/theme-picker-popover";
import ExportPopover from "@/app/page-builder-components/export-popover";
import { getThemes } from "@/app/page-builder-components/utils/get-themes";

/**
 * Template Generator Page
 * Allows users to select and preview section components
 */
export default function TemplateGeneratorPage() {

  const [selectedComponents, setSelectedComponents] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("success"); // success | delete
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("elements"); // "elements" | "analytics"
  const [analyticsData, setAnalyticsData] = useState({
    metaDescription: "",
    googleAnalyticsId: "",
    tikTokPixel: "",
    metaPixel: "",
    hotjarId: ""
  });
  const [openCategories, setOpenCategories] = useState({ "Hero Banner": true });
  const [selectedComponentForConfig, setSelectedComponentForConfig] = useState(null);
  const [configProps, setConfigProps] = useState({ showDescription: true });
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const [isExportPopoverOpen, setIsExportPopoverOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("theme");
  const [themes, setThemes] = useState([]);

  // Refs
  const containerRef = useRef(null);
  const dragImageRef = useRef(null);
  const dragThumbnailRef = useRef(null);
  const dragNameRef = useRef(null);

  useEffect(() => {
    const loadThemes = async () => {
      const loadedThemes = await getThemes();
      setThemes(loadedThemes);
    };
    loadThemes();
  }, []);

  const handleThemeSelect = useCallback((themeId) => {
    setSelectedThemeId(themeId);
    setToasterMessage(`Theme switched to ${themeId}`);
    setToasterType("success");
    setShowToaster(true);
  }, []);


  useEffect(() => {
    const themeLink = document.getElementById("theme-stylesheet");
    if (themeLink && themes.length > 0) {
      const selectedTheme = themes.find(t => t.id === selectedThemeId);
      const newThemeHref = selectedTheme ? selectedTheme.path : "/themes/theme.css";
      themeLink.href = newThemeHref;
    }
  }, [selectedThemeId, themes]);

  // Load saved template from localStorage on mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('lunar-template-builder');
    if (savedTemplate) {
      try {
        const parsed = JSON.parse(savedTemplate);

        // Rehydrate components (restore the component function reference)
        const rehydratedComponents = (parsed.components || []).map(savedComp => {
          // Find the original component definition in the library
          let originalComp = null;
          Object.values(componentLibrary).forEach(category => {
            const found = category.find(c => c.id === savedComp.id);
            if (found) originalComp = found;
          });

          if (originalComp) {
            return {
              ...savedComp,
              component: originalComp.component
            };
          }
          return null;
        }).filter(Boolean);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedComponents(rehydratedComponents);
        setAnalyticsData(parsed.analytics || {
          metaDescription: "",
          googleAnalyticsId: "",
          tikTokPixel: "",
          metaPixel: "",
          hotjarId: ""
        });
      } catch (error) {
        console.error('Error loading saved template:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever components or analytics change (Debounced)
  useEffect(() => {
    const saveToLocalStorage = () => {
      if (selectedComponents.length > 0 || analyticsData.metaDescription || analyticsData.googleAnalyticsId || analyticsData.tikTokPixel || analyticsData.metaPixel || analyticsData.hotjarId) {
        const dataToSave = {
          components: selectedComponents,
          analytics: analyticsData,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem('lunar-template-builder', JSON.stringify(dataToSave));
      }
    };

    const timeoutId = setTimeout(saveToLocalStorage, 1000); // 1s debounce

    return () => clearTimeout(timeoutId);
  }, [selectedComponents, analyticsData]);

  useEffect(() => {
    if (showToaster) {
      const timer = setTimeout(() => {
        setShowToaster(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToaster]);

  const toggleCategory = useCallback((category, forceOpen = false) => {
    setOpenCategories(prev => {
      if (forceOpen) {
        return { [category]: true };
      }
      if (prev[category]) {
        return {};
      }
      return { [category]: true };
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };


    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragStart = useCallback((e, index, componentName, thumbnail) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";


    if (dragImageRef.current) {
      if (dragThumbnailRef.current) dragThumbnailRef.current.src = thumbnail || "";
      if (dragNameRef.current) dragNameRef.current.innerText = componentName || "Section";

      e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedItemIndex !== index) {
      setDropTargetIndex(index);
    }
  }, [draggedItemIndex]);

  const handleDrop = useCallback((e, index) => {
    e.preventDefault();
    setDropTargetIndex(null);
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newComponents = [...selectedComponents];
    const draggedItem = newComponents[draggedItemIndex];
    newComponents.splice(draggedItemIndex, 1);
    newComponents.splice(index, 0, draggedItem);

    setSelectedComponents(newComponents);
    setDraggedItemIndex(null);
  }, [draggedItemIndex, selectedComponents]);

  const generateSectionId = (category) => {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${slug}-${random}`;
  };

  const addComponent = useCallback((componentData, category, event) => {

    if (componentData.config && componentData.config.length > 0) {

      const rect = event.currentTarget.getBoundingClientRect();

      const popoverWidth = containerRef.current ?
        parseInt(getComputedStyle(containerRef.current).getPropertyValue('--popover-width')) || 362
        : 362;

      setPopoverPosition({
        top: rect.top,
        left: rect.left - popoverWidth - 10
      });

      setSelectedComponentForConfig({ ...componentData, category, selected: true });


      const initialProps = {};
      componentData.config.forEach(prop => {
        initialProps[prop.name] = prop.default;
      });
      setConfigProps(initialProps);
    } else {
      const sectionId = generateSectionId(category);
      setSelectedComponents(prev => [...prev, {
        ...componentData,
        uniqueId: Date.now(),
        sectionId: sectionId,
        props: componentData.props || {}
      }]);

      setToasterMessage(`${componentData.name} added`);
      setToasterType("success");
      setShowToaster(true);
    }
  }, []);

  const insertComponent = useCallback(() => {
    if (!selectedComponentForConfig) return;

    const sectionId = generateSectionId(selectedComponentForConfig.category);
    setSelectedComponents(prev => [...prev, {
      ...selectedComponentForConfig,
      uniqueId: Date.now(),
      sectionId: sectionId,
      props: { ...configProps }
    }]);

    setSelectedComponentForConfig(null);
    setToasterMessage(`${selectedComponentForConfig.name} added`);
    setToasterType("success");
    setShowToaster(true);
  }, [selectedComponentForConfig, configProps]);

  const removeComponent = useCallback((uniqueId) => {
    const componentToRemove = selectedComponents.find(c => c.uniqueId === uniqueId);
    if (componentToRemove) {
      setToasterMessage(`${componentToRemove.name} deleted`);
      setToasterType("delete");
      setShowToaster(true);
      setSelectedComponents(prev => prev.filter(c => c.uniqueId !== uniqueId));
    }
  }, [selectedComponents]);

  const moveUp = useCallback((index) => {
    if (index === 0) return;
    setSelectedComponents(prev => {
      const newComponents = [...prev];
      [newComponents[index - 1], newComponents[index]] = [newComponents[index], newComponents[index - 1]];
      return newComponents;
    });
  }, []);

  const moveDown = useCallback((index) => {
    if (index === selectedComponents.length - 1) return;
    setSelectedComponents(prev => {
      const newComponents = [...prev];
      [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
      return newComponents;
    });
  }, [selectedComponents.length]);

  const updateComponent = useCallback((uniqueId, newProps) => {
    setSelectedComponents(prev => prev.map(comp => {
      if (comp.uniqueId === uniqueId) {
        return {
          ...comp,
          props: { ...comp.props, ...newProps }
        };
      }
      return comp;
    }));
  }, []);

  const updateSectionId = useCallback((uniqueId, newId) => {
    setSelectedComponents(prev => prev.map(comp => {
      if (comp.uniqueId === uniqueId) {
        return {
          ...comp,
          sectionId: newId
        };
      }
      return comp;
    }));
  }, []);

  const handleExport = useCallback(() => {
    setIsExportPopoverOpen(true);
  }, []);

  const handleExportConfirm = useCallback((csvLink) => {
    handleExportTemplate(selectedComponents, analyticsData);
    setIsExportPopoverOpen(false);
  }, [selectedComponents, analyticsData]);

  const onDownloadCsv = useCallback(() => {
    handleExportCsv(selectedComponents);
  }, [selectedComponents]);



  return (
    <div className={styles.container} ref={containerRef}>
      <TopBar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
        handleExport={handleExport}
        onThemeClick={() => setIsThemePickerOpen(true)}
        isThemePickerOpen={isThemePickerOpen}
        selectedThemeId={selectedThemeId}
        themes={themes}
      />

      <div className={styles.mainContent}>
        <Canvas
          selectedComponents={selectedComponents}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          draggedItemIndex={draggedItemIndex}
          dropTargetIndex={dropTargetIndex}
          setDraggedItemIndex={setDraggedItemIndex}
          moveUp={moveUp}
          moveDown={moveDown}
          removeComponent={removeComponent}
          updateComponent={updateComponent}
          updateSectionId={updateSectionId}
        />

        {isSidebarVisible && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            componentLibrary={componentLibrary}
            openCategories={openCategories}
            toggleCategory={toggleCategory}
            addComponent={addComponent}
            selectedComponentForConfig={selectedComponentForConfig}
            analyticsData={analyticsData}
            setAnalyticsData={setAnalyticsData}
          />
        )}
      </div>

      {/* Custom Drag Image (Hidden) */}
      <div
        id="custom-drag-image"
        ref={dragImageRef}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="drag-thumbnail-image"
            ref={dragThumbnailRef}
            src={null}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <span
          id="drag-name-content"
          ref={dragNameRef}
          style={{
            fontSize: "var(--typography-font-size-80)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--content-neutral--title)"
          }}></span>
      </div>

      <ConfigPopover
        selectedComponent={selectedComponentForConfig}
        position={popoverPosition}
        configProps={configProps}
        setConfigProps={setConfigProps}
        onClose={() => setSelectedComponentForConfig(null)}
        onInsert={insertComponent}
      />
      {isThemePickerOpen && (
        <ThemePickerPopover
          isOpen={isThemePickerOpen}
          onClose={() => setIsThemePickerOpen(false)}
          onSelectTheme={handleThemeSelect}
          currentTheme={selectedThemeId}
          themes={themes}
        />
      )}
      {isExportPopoverOpen && (
        <ExportPopover
          isOpen={isExportPopoverOpen}
          onClose={() => setIsExportPopoverOpen(false)}
          onExport={handleExportConfirm}
          onDownloadCsv={onDownloadCsv}
        />
      )} {/* Toaster Notification */}
      {showToaster && (
        <div className={`${styles.toaster} ${toasterType === "delete" ? styles.toasterDelete : ""}`}>
          {toasterType === "delete" ? (
            <TrashIcon className={styles.toasterIcon} />
          ) : (
            <BellAlertIcon className={styles.toasterIcon} />
          )}
          {toasterMessage}
        </div>
      )}
    </div>
  );
}