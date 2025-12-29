"use client";
import { useRef, useMemo } from "react";
import { BellAlertIcon, TrashIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";

// Feature Components
import Sidebar from "@/app/page-builder-components/sidebar";
import TopBar from "@/app/page-builder-components/topbar";
import Canvas from "@/app/page-builder-components/canvas";
import ThemePickerPopover from "@/app/page-builder-components/theme-picker-popover";
import UATPopover from "@/app/page-builder-components/uat-popover";
import StagingPopover from "@/app/page-builder-components/staging-popover";
import ComponentsPopover from "@/app/page-builder-components/components-popover";

// Helper Utilities
import { componentLibrary } from "@/app/page-builder-components/content/component-library";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";

// Hook
import { useTemplateLogic } from "@/app/page-builder-components/utils/hooks";

/**
 * Template Generator Page
 * Main page for building landing page templates
 */
export default function TemplateGeneratorPage() {
  const containerRef = useRef(null);

  const { state, actions } = useTemplateLogic();

  // Destructure state for easier access in render
  const {
    selectedComponents,
    analyticsData,
    themes,
    selectedThemeId,
    isSidebarVisible,
    activeTab,
    activePopoverId,
    popoverPositions,
    activeElementId,
    toaster,
    dragDrop
  } = state;

  const {
    setAnalyticsData,
    setIsSidebarVisible,
    setActiveTab,
    setActiveElementId,
    setActivePopoverId,
    handleThemeSelect,
    handleExport,
    handleStaging,
    handleDirectExport,
    addComponent,
    removeComponent,
    updateComponent,
    updateSectionId,
    handleAddClick,
    closePopover,
    togglePopover
  } = actions;

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
  } = dragDrop;

  // Context
  const selectionContext = useMemo(() => ({
    activeElementId,
    setActiveElementId,
    activePopoverId,
    setActivePopoverId,
    selectedComponents,
    updateComponent
  }), [activeElementId, activePopoverId, selectedComponents, updateComponent, setActiveElementId, setActivePopoverId]);

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
          handleStaging={handleStaging}
          isStagingPopoverOpen={activePopoverId === 'staging'}
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
          <UATPopover
            isOpen
            onClose={closePopover}
            selectedComponents={selectedComponents}
            position={popoverPositions.export}
            className="z-system-modal-floating"
            activeThemePath={themes.find(t => t.id === selectedThemeId)?.path || "/themes/theme.css"}
            analyticsData={analyticsData}
          />
        )}

        {activePopoverId === 'staging' && (
          <StagingPopover
            selectedComponents={selectedComponents}
            analyticsData={analyticsData}
            onClose={closePopover}
            position={popoverPositions.staging}
            className="z-system-modal-floating"
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