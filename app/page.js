"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { BellAlertIcon, TrashIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";

// Components
import Sidebar from "@/app/page-builder-components/sidebar";
import TopBar from "@/app/page-builder-components/topbar";
import Canvas from "@/app/page-builder-components/canvas";
import ThemePickerPopover from "@/app/page-builder-components/theme-picker-popover";
import ExportPopover from "@/app/page-builder-components/export-popover";
import ComponentsPopover from "@/app/page-builder-components/components-popover";

// Utilities
import { componentLibrary } from "@/app/page-builder-components/content/component-library";
import { getThemes } from "@/app/page-builder-components/utils/get-themes";
import { handleExportTemplate } from "@/app/page-builder-components/utils/export-template";
import { handleExportCsv } from "@/app/page-builder-components/utils/export-csv";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder-controls";
import {
  loadTemplate,
  saveTemplate,
  generateSectionId,
  calculatePopoverPosition,
  DEFAULT_ANALYTICS
} from "@/app/page-builder-components/utils/template-storage";
import {
  addComponentToList,
  removeComponentFromList,
  moveComponentUp,
  moveComponentDown,
  updateComponentProps,
  updateComponentSectionId,
  reorderComponents
} from "@/app/page-builder-components/utils/component-manager";

/**
 * Template Generator Page
 * Main page for building landing page templates
 */
export default function TemplateGeneratorPage() {
  // ==================== STATE ====================

  // Components & Data
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(DEFAULT_ANALYTICS);

  // Theme
  const [themes, setThemes] = useState([]);
  const [selectedThemeId, setSelectedThemeId] = useState("theme");

  // UI State
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("elements");
  const [openCategories, setOpenCategories] = useState({ "Hero Banner": true });

  // Toaster
  const [toaster, setToaster] = useState({ show: false, message: "", type: "success" });

  // Drag & Drop
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  // Popovers
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [popoverPositions, setPopoverPositions] = useState({});

  // Active Element
  const [activeElementId, setActiveElementId] = useState(null);

  // ==================== REFS ====================

  const containerRef = useRef(null);
  const dragImageRef = useRef(null);
  const dragThumbnailRef = useRef(null);
  const dragNameRef = useRef(null);

  // ==================== HELPERS ====================

  const showToast = useCallback((message, type = "success") => {
    setToaster({ show: true, message, type });
  }, []);

  const togglePopover = useCallback((id, position) => {
    if (position) {
      setPopoverPositions(prev => ({ ...prev, [id]: position }));
    }
    setActivePopoverId(prev => prev === id ? null : id);
  }, []);

  const closePopover = useCallback(() => {
    setActivePopoverId(null);
  }, []);

  // ==================== EFFECTS ====================

  // Load themes on mount
  useEffect(() => {
    getThemes().then(setThemes);
  }, []);

  // Apply theme stylesheet
  useEffect(() => {
    const themeLink = document.getElementById("theme-stylesheet");
    if (themeLink && themes.length) {
      const theme = themes.find(t => t.id === selectedThemeId);
      themeLink.href = theme?.path || "/themes/theme.css";
    }
  }, [selectedThemeId, themes]);

  // Load saved template on mount
  useEffect(() => {
    const saved = loadTemplate(componentLibrary);
    if (saved) {
      setSelectedComponents(saved.components);
      setAnalyticsData(saved.analytics);
    }
  }, []);

  // Auto-save template (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveTemplate(selectedComponents, analyticsData);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedComponents, analyticsData]);

  // Auto-hide toaster
  useEffect(() => {
    if (!toaster.show) return;
    const timeoutId = setTimeout(() => {
      setToaster(t => ({ ...t, show: false }));
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [toaster.show]);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => setIsSidebarVisible(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ==================== HANDLERS ====================

  // Theme
  const handleThemeSelect = useCallback((themeId) => {
    setSelectedThemeId(themeId);
    showToast(`Theme switched to ${themeId}`);
  }, [showToast]);

  // Categories
  const toggleCategory = useCallback((category, forceOpen = false) => {
    setOpenCategories(prev =>
      forceOpen || !prev[category] ? { [category]: true } : {}
    );
  }, []);

  // Components
  const addComponent = useCallback((componentData, category) => {
    const sectionId = generateSectionId(category);
    setSelectedComponents(prev => addComponentToList(prev, componentData, sectionId));
    showToast(`${componentData.name} added`);
  }, [showToast]);

  const removeComponent = useCallback((uniqueId) => {
    const comp = selectedComponents.find(c => c.uniqueId === uniqueId);
    if (comp) {
      showToast(`${comp.name} deleted`, "delete");
      setSelectedComponents(prev => removeComponentFromList(prev, uniqueId));
    }
  }, [selectedComponents, showToast]);



  const updateComponent = useCallback((uniqueId, newProps) => {
    setSelectedComponents(prev => updateComponentProps(prev, uniqueId, newProps));
  }, []);

  const updateSectionId = useCallback((uniqueId, newId) => {
    setSelectedComponents(prev => updateComponentSectionId(prev, uniqueId, newId));
  }, []);

  // Drag & Drop
  const handleDragStart = useCallback((e, index, name, thumbnail) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";

    if (dragImageRef.current) {
      if (dragThumbnailRef.current) dragThumbnailRef.current.src = thumbnail || "";
      if (dragNameRef.current) dragNameRef.current.innerText = name || "Section";
      e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex !== index) {
      setDropTargetIndex(index);
    }
  }, [draggedIndex]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  }, []);

  const handleDrop = useCallback((e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setSelectedComponents(prev => reorderComponents(prev, draggedIndex, index));
    }
    handleDragEnd();
  }, [draggedIndex, handleDragEnd]);

  // Export
  const handleExport = useCallback((position) => {
    togglePopover('export', position);
  }, [togglePopover]);

  const handleExportConfirm = useCallback((csvLink) => {
    handleExportTemplate(selectedComponents, csvLink, analyticsData);
    closePopover();
  }, [selectedComponents, analyticsData, closePopover]);

  const onDownloadCsv = useCallback(() => {
    handleExportCsv(selectedComponents);
  }, [selectedComponents]);

  // Add Component Popover
  const handleAddClick = useCallback((rect) => {
    if (rect) {
      const position = calculatePopoverPosition(rect);
      togglePopover('components', position);
    } else {
      togglePopover('components');
    }
  }, [togglePopover]);

  // ==================== CONTEXT VALUE ====================

  const selectionContext = useMemo(() => ({
    activeElementId,
    setActiveElementId,
    activePopoverId,
    setActivePopoverId,
    selectedComponents,
    updateComponent
  }), [activeElementId, activePopoverId, selectedComponents, updateComponent]);

  // ==================== RENDER ====================

  return (
    <div className={styles.container} ref={containerRef}>
      <BuilderSelectionContext.Provider value={selectionContext}>

        {/* Top Bar */}
        <TopBar
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
          handleExport={handleExport}
          onThemeClick={(pos) => togglePopover('theme', pos)}
          isThemePickerOpen={activePopoverId === 'theme'}
          isExportPopoverOpen={activePopoverId === 'export'}
          selectedThemeId={selectedThemeId}
          themes={themes}
        />

        {/* Main Content */}
        <div className={styles.mainContent}>
          <Canvas
            selectedComponents={selectedComponents}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            draggedItemIndex={draggedIndex}
            dropTargetIndex={dropTargetIndex}
            setDraggedItemIndex={setDraggedIndex}
            updateComponent={updateComponent}
          />

          {isSidebarVisible && (
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              analyticsData={analyticsData}
              setAnalyticsData={setAnalyticsData}
              selectedComponents={selectedComponents}
              updateSectionId={updateSectionId}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
              activeElementId={activeElementId}
              setActiveElementId={setActiveElementId}
              onAddClick={handleAddClick}
              isAddPopoverOpen={activePopoverId === 'components'}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragEnd={handleDragEnd}
              draggedIndex={draggedIndex}
              dropTargetIndex={dropTargetIndex}
            />
          )}
        </div>

        {/* Hidden Drag Image */}
        <div ref={dragImageRef} className={styles.customDragImage}>
          <div style={{ height: 60, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--grey-50)", borderRadius: "var(--round-80)", border: "1px solid var(--grey-200)", overflow: "hidden" }}>
            <img ref={dragThumbnailRef} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span ref={dragNameRef} style={{ fontSize: "var(--typography-font-size-80)", fontWeight: "var(--font-weight-bold)", color: "var(--content-neutral--title)" }} />
        </div>

        {/* Popovers */}
        {activePopoverId === 'theme' && (
          <ThemePickerPopover
            isOpen
            onClose={closePopover}
            onSelectTheme={handleThemeSelect}
            currentTheme={selectedThemeId}
            themes={themes}
            position={popoverPositions.theme}
          />
        )}

        {activePopoverId === 'export' && (
          <ExportPopover
            isOpen
            onClose={closePopover}
            onExport={handleExportConfirm}
            onDownloadCsv={onDownloadCsv}
            position={popoverPositions.export}
          />
        )}

        {activePopoverId === 'components' && (
          <ComponentsPopover
            isOpen
            onClose={closePopover}
            position={popoverPositions.components}
            componentLibrary={componentLibrary}
            openCategories={openCategories}
            toggleCategory={toggleCategory}
            addComponent={addComponent}
          />
        )}

        {/* Toaster */}
        {toaster.show && (
          <div className={`${styles.toaster} ${toaster.type === "delete" ? styles.toasterDelete : ""}`}>
            {toaster.type === "delete"
              ? <TrashIcon className={styles.toasterIcon} />
              : <BellAlertIcon className={styles.toasterIcon} />
            }
            {toaster.message}
          </div>
        )}

      </BuilderSelectionContext.Provider>
    </div>
  );
}