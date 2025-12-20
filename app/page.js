"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { BellAlertIcon, TrashIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";

// Feature Components
import Sidebar from "@/app/page-builder-components/sidebar";
import TopBar from "@/app/page-builder-components/topbar";
import Canvas from "@/app/page-builder-components/canvas";
import ThemePickerPopover from "@/app/page-builder-components/theme-picker-popover";
import ExportPopover from "@/app/page-builder-components/export-popover";
import ComponentsPopover from "@/app/page-builder-components/components-popover";

// Helper Utilities
import { componentLibrary } from "@/app/page-builder-components/content/component-library";
import { getThemes } from "@/app/page-builder-components/utils/get-themes";

import { BuilderSelectionContext, calculatePopoverPosition } from "@/app/page-builder-components/utils/builder/builder-controls";
import {
  loadTemplate,
  saveTemplate,
  DEFAULT_ANALYTICS
} from "@/app/page-builder-components/utils/template-storage";
import {
  addComponentToList,
  removeComponentFromList,
  generateSectionId,
  updateComponentProps,
  updateComponentSectionId,
  reorderComponents
} from "@/app/page-builder-components/utils/component-manager";
import { useToast, useDragDrop } from "@/app/page-builder-components/utils/hooks";
import { handleExportNextjs } from "@/app/page-builder-components/utils/export-nextjs";

/**
 * Template Generator Page
 * Main page for building landing page templates
 */
export default function TemplateGeneratorPage() {
  // ==================== STATE MANAGEMENT ====================

  // Data Sources
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(DEFAULT_ANALYTICS);

  // Theme Selection
  const [themes, setThemes] = useState([]);
  const [selectedThemeId, setSelectedThemeId] = useState("theme");

  // Interface Visibility State
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("elements");

  // Popover & Overlay State
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [popoverPositions, setPopoverPositions] = useState({});

  // Selection State
  const [activeElementId, setActiveElementId] = useState(null);

  // ==================== HOOKS ====================

  // Toast Notifications
  const { toast: toaster, showToast } = useToast();

  // Drag and Drop Logic
  const {
    draggedIndex,
    dropTargetIndex,
    setDraggedIndex,
    dragImageRef,
    dragThumbnailRef,
    dragNameRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  } = useDragDrop({
    onReorder: (fromIndex, toIndex) => {
      setSelectedComponents(prev => reorderComponents(prev, fromIndex, toIndex));
    }
  });

  // ==================== DOM REFERENCES ====================

  const containerRef = useRef(null);

  const togglePopover = useCallback((id, position) => {
    if (position) {
      setPopoverPositions(prev => ({ ...prev, [id]: position }));
    }
    setActivePopoverId(prev => prev === id ? null : id);
  }, []);

  const closePopover = useCallback(() => {
    setActivePopoverId(null);
  }, []);

  // ==================== INITIALIZATION & SIDE EFFECTS ====================

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedComponents(saved.components);
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Responsive sidebar & Persistence
  const isInitialized = useRef(false);

  useEffect(() => {
    // 1. Load preference from localStorage
    const savedState = localStorage.getItem("lunar_sidebar_visible");

    if (savedState !== null) {
      setIsSidebarVisible(savedState === "true");
    } else {
      // Default behavior if no preference
      setIsSidebarVisible(window.innerWidth >= 1024);
    }

    isInitialized.current = true;

    // 2. Smarter Resize Handler
    const handleResize = () => {
      // Only auto-hide if we drop to mobile/tablet (< 1024px)
      // On desktop, we respect the user's manual toggle (persisted state)
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        // Optional: If you want to auto-show on desktop return if it was never set manually? 
        // For now, let's trust the persisted state on desktop resize events too, 
        // essentially doing nothing unless we crossed the boundary to mobile.
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("lunar_sidebar_visible", isSidebarVisible);
    }
  }, [isSidebarVisible]);

  // ==================== EVENT HANDLERS ====================

  // Theme
  const handleThemeSelect = useCallback((themeId) => {
    setSelectedThemeId(themeId);
    showToast(`Theme switched to ${themeId}`);
  }, [showToast]);


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

  // Export
  const handleExport = useCallback((position) => {
    togglePopover('export', position);
  }, [togglePopover]);

  const handleDirectExport = useCallback(async () => {
    try {
      showToast("Preparing export...", "info");
      const activeThemePath = themes.find(t => t.id === selectedThemeId)?.path || "/themes/theme.css";

      await handleExportNextjs(selectedComponents, activeThemePath, {
        download: true,
        savePreview: true
      });
      showToast("Export completed successfully");
    } catch (error) {
      console.error("Export failed", error);
      showToast("Export failed", "error");
    }
  }, [selectedComponents, themes, selectedThemeId, showToast]);



  // Add Component Popover
  const handleAddClick = useCallback((rect) => {
    if (rect) {
      const position = calculatePopoverPosition(rect, { padding: 4 });
      // Adjust for BasePopover centering (it applies translateX(-50%))
      // calculation returns left edge, so we add width/2 to get center
      position.left += 181;
      togglePopover('components', position);
    } else {
      togglePopover('components');
    }
  }, [togglePopover]);

  // ==================== CONTEXT PROVIDERS ====================

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
          handleDirectExport={handleDirectExport}
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
        <div ref={dragImageRef} className={`${styles.customDragImage} z-hidden`}>
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
            className="z-system-modal-floating"
          />
        )}

        {activePopoverId === 'export' && (
          <ExportPopover
            isOpen
            onClose={closePopover}
            selectedComponents={selectedComponents}
            position={popoverPositions.export}
            className="z-system-modal-floating"
            activeThemePath={themes.find(t => t.id === selectedThemeId)?.path || "/themes/theme.css"}
          />
        )}

        {activePopoverId === 'components' && (
          <ComponentsPopover
            isOpen
            onClose={closePopover}
            position={popoverPositions.components}
            componentLibrary={componentLibrary}
            addComponent={addComponent}
            className="z-system-modal-floating"
          />
        )}

        {/* Toaster */}
        {toaster.show && (
          <div className={`${styles.toaster} ${toaster.type === "delete" ? styles.toasterDelete : ""} z-system-modal-floating`}>
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