"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { BellAlertIcon, TrashIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";

// Feature Components
import Sidebar from "@/app/page-builder/sidebar";
import SidebarMobile from "@/app/page-builder/sidebar-mobile";
import TopBar from "@/app/page-builder/topbar";

import Canvas from "@/app/page-builder/canvas";
import ThemePickerPopover from "@/app/page-builder/popover-theme-picker";
import UATPopover from "@/app/page-builder/popover-uat";
import StagingPopover from "@/app/page-builder/popover-staging";
import ComponentsPopover from "@/app/page-builder/popover-components";
import ExportPopover from "@/app/page-builder/popover-export";
import NotificationPopover from "@/app/page-builder/popover-notifications";

// Helper Utilities
import { componentLibrary } from "@/app/page-builder/content/component-library";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";


// Hook
import { useTemplateLogic } from "@/app/page-builder/utils/hooks";

/**
 * Template Generator Page
 * Main page for building landing page templates
 */
export default function TemplateGeneratorPage() {
  const containerRef = useRef(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  // Fetch unread count on mount so badge shows without opening the popover
  useEffect(() => {
    fetch(`/api/notifications?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : { notifications: [] })
      .then(data => {
        const unread = (data.notifications || []).filter(n => !n.read).length;
        setUnreadNotificationCount(unread);
      })
      .catch(() => { });
  }, []);

  const { state, actions } = useTemplateLogic();

  // Destructure state for easier access in render
  const {
    selectedComponents,
    analyticsData,
    themes,
    selectedThemeId,
    isSidebarVisible,
    isBottomSheetOpen,
    activeTab,
    activePopoverId,
    popoverPositions,
    activeElementId,
    selectedElementIds,
    toaster,
    dragDrop
  } = state;

  const {
    setAnalyticsData,
    setIsSidebarVisible,
    setIsBottomSheetOpen,
    toggleSidebar,
    setActiveTab,
    setActiveElementId,
    toggleElementSelection,
    setActivePopoverId,
    handleThemeSelect,
    handleExport,
    handleStaging,
    handleDirectExport,
    handleReset,
    addComponent,
    removeComponent,
    updateComponent,
    updateSectionId,
    handleAddClick,
    closePopover,
    togglePopover,
    setSelectedComponents,
    handleGroup,
    handleUngroup,
    handleNotificationClick
  } = actions;

  const {
    draggedIndex,
    dropTargetIndex,
    setDraggedIndex,
    dragImageRef,
    dragThumbnailRef,
    dragNameRef,
    dragImageWrapperRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  } = dragDrop;

  // Context
  const selectionContext = useMemo(() => ({
    activeElementId,
    setActiveElementId,
    selectedElementIds,
    toggleElementSelection,
    activePopoverId,
    setActivePopoverId,
    selectedComponents,
    updateComponent
  }), [activeElementId, activePopoverId, selectedComponents, updateComponent, setActiveElementId, setActivePopoverId, selectedElementIds, toggleElementSelection]);

  // Environmental data for components
  const activeTheme = themes.find(t => t.id === selectedThemeId);
  const brandName = activeTheme?.brand || "Lunar";
  const pageTitle = analyticsData?.websiteTitle || "";

  return (
    <div className={styles.container} ref={containerRef}>
      <BuilderSelectionContext.Provider value={selectionContext}>

        {/* Top Bar */}
        <TopBar
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          handleExport={handleExport}
          handleDirectExport={handleDirectExport}
          onExportClick={(pos) => togglePopover('export-flow', pos)}
          onThemeClick={(pos) => togglePopover('theme', pos)}
          isThemePickerOpen={activePopoverId === 'theme'}
          isExportPopoverOpen={activePopoverId === 'export' || activePopoverId === 'export-flow'}
          selectedThemeId={selectedThemeId}
          themes={themes}
          handleStaging={handleStaging}
          handleReset={handleReset}
          isStagingPopoverOpen={activePopoverId === 'staging'}
          onNotificationClick={handleNotificationClick}
          isNotificationOpen={activePopoverId === 'notifications'}
          unreadCount={unreadNotificationCount}
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
            brandName={brandName}
            pageTitle={pageTitle}
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
              onGroup={handleGroup}
              onUngroup={handleUngroup}
              selectedElementIds={selectedElementIds}

              toggleElementSelection={toggleElementSelection}
              className={styles.desktopSidebar}
            />

          )}
        </div>

        {/* Mobile/Tablet Bottom Sheet Sidebar */}
        <SidebarMobile
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          title={activeTab === "elements" ? "Layers" : "Settings"}
        >
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
            onGroup={handleGroup}
            onUngroup={handleUngroup}
            selectedElementIds={selectedElementIds}
            toggleElementSelection={toggleElementSelection}
            className={styles.mobileSidebar}
          />
        </SidebarMobile>

        {/* Hidden Drag Image */}
        <div ref={dragImageRef} className={`${styles.customDragImage} z-hidden`}>
          <div ref={dragImageWrapperRef} className={styles.dragImageContainer}>
            <img ref={dragThumbnailRef} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span ref={dragNameRef} className={styles.dragImageText} />
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

        {activePopoverId === 'export-flow' && (
          <ExportPopover
            isOpen
            onClose={closePopover}
            position={popoverPositions['export-flow']}
            className="z-system-modal-floating"
            analyticsData={analyticsData}
            setAnalyticsData={setAnalyticsData}
            handleDirectExport={handleDirectExport}
            themes={themes}
            selectedThemeId={selectedThemeId}
          />
        )}

        {activePopoverId === 'staging' && (
          <StagingPopover
            selectedComponents={selectedComponents}
            analyticsData={analyticsData}
            onClose={closePopover}
            position={popoverPositions.staging}
            className="z-system-modal-floating"
            onRestore={(data, themePath, analytics) => {
              setSelectedComponents(data);

              if (analytics) {
                setAnalyticsData(prev => ({ ...prev, ...analytics }));
              }

              if (themePath) {
                // Find and select theme
                const theme = themes.find(t => t.path === themePath);
                if (theme) {
                  handleThemeSelect(theme.id);
                }
              }

              setActiveElementId(null);
              setActivePopoverId(null);
            }}
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

        {activePopoverId === 'notifications' && (
          <NotificationPopover
            position={popoverPositions.notifications}
            onClose={closePopover}
            className="z-system-modal-floating"
            onUnreadCountChange={setUnreadNotificationCount}
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