"use client";

import { useState, useEffect, useCallback } from "react";
import { BellAlertIcon, TrashIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";
import { handleExportTemplate } from "@/app/page-builder-components/utils/export-template";
import { componentLibrary } from "@/app/page-builder-components/content/component-library";
import Sidebar from "@/app/page-builder-components/Sidebar";
import TopBar from "@/app/page-builder-components/TopBar";
import Canvas from "@/app/page-builder-components/Canvas";
import ConfigPopover from "@/app/page-builder-components/ConfigPopover";

/**
 * Template Generator Page
 * Allows users to select and preview section components
 */
export default function TemplateGeneratorPage() {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("success"); // success | delete

  useEffect(() => {
    if (showToaster) {
      const timer = setTimeout(() => {
        setShowToaster(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToaster]);

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("elements"); // "elements" | "analytics"
  const [analyticsData, setAnalyticsData] = useState({
    googleAnalyticsId: "",
    tikTokPixel: "",
    metaPixel: "",
    hotjarId: ""
  });

  const [openCategories, setOpenCategories] = useState({ "Hero Banner": true });

  // Popover State
  const [selectedComponentForConfig, setSelectedComponentForConfig] = useState(null);
  const [configProps, setConfigProps] = useState({ showDescription: true });
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const toggleCategory = useCallback((category) => {
    setOpenCategories(prev => {
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

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragStart = useCallback((e, index, componentName, thumbnail) => {
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

  const addComponent = useCallback((componentData, event) => {
    // Calculate position based on clicked element
    const rect = event.currentTarget.getBoundingClientRect();

    // Get popover width from CSS variable or fallback
    const container = document.querySelector(`.${styles.container}`);
    const popoverWidth = container ?
      parseInt(getComputedStyle(container).getPropertyValue('--popover-width')) || 362
      : 362;

    setPopoverPosition({
      top: rect.top,
      left: rect.left - popoverWidth - 10 // Width of popover + 10px spacing
    });

    setSelectedComponentForConfig({ ...componentData, selected: true });

    // Initialize config props based on component definition
    const initialProps = {};
    if (componentData.config) {
      componentData.config.forEach(prop => {
        initialProps[prop.name] = prop.default;
      });
    }
    setConfigProps(initialProps);
  }, []);

  const insertComponent = useCallback(() => {
    if (!selectedComponentForConfig) return;

    setSelectedComponents(prev => [...prev, {
      ...selectedComponentForConfig,
      uniqueId: Date.now(),
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

  const handleExport = useCallback(() => {
    handleExportTemplate(selectedComponents);
  }, [selectedComponents]);

  return (
    <div className={styles.container}>
      <TopBar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
        handleExport={handleExport}
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

      <ConfigPopover
        selectedComponent={selectedComponentForConfig}
        position={popoverPosition}
        configProps={configProps}
        setConfigProps={setConfigProps}
        onClose={() => setSelectedComponentForConfig(null)}
        onInsert={insertComponent}
      />

      {/* Toaster Notification */}
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