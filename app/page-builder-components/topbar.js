import Image from "next/image";
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    SwatchIcon,
    RocketLaunchIcon,
    ChevronDownIcon,
    DocumentPlusIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";
/**
 * TopBar: Renders the top navigation bar with theme picker and export controls.
 */
export default function TopBar({
    isSidebarVisible,
    setIsSidebarVisible,
    handleExport,
    handleDirectExport,
    onThemeClick,
    isThemePickerOpen,
    isExportPopoverOpen,
    selectedThemeId,
    themes = [],
    handleStaging,
    isStagingPopoverOpen,
    activeBreakpoint,
    onBreakpointChange
}) {
    const selectedTheme = themes.find(t => t.id === selectedThemeId);
    const selectedThemeName = selectedTheme ? selectedTheme.name : "Themes";

    return (
        <div className={`${styles.topBar} z-layout-topbar`}>
            <div className={styles.topBarLeft}>
                <Image
                    src="/logo.svg"
                    alt="Lunar Logo"
                    width={24}
                    height={24}
                />
                <h1 className={`body-bold ${styles.logo}`}>Lunar</h1>
            </div>

            {/* Breakpoint Controls */}
            <div className={styles.breakpointControls}>
                <button
                    onClick={() => onBreakpointChange('mobile')}
                    className={`${styles.topBarButton} ${activeBreakpoint === 'mobile' ? styles.topBarButtonActive : ''}`}
                    data-tooltip="Mobile View"
                >
                    <DevicePhoneMobileIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
                </button>
                <button
                    onClick={() => onBreakpointChange('tablet')}
                    className={`${styles.topBarButton} ${activeBreakpoint === 'tablet' ? styles.topBarButtonActive : ''}`}
                    data-tooltip="Tablet View"
                >
                    <DeviceTabletIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
                </button>
                <button
                    onClick={() => onBreakpointChange('desktop')}
                    className={`${styles.topBarButton} ${activeBreakpoint === 'desktop' ? styles.topBarButtonActive : ''}`}
                    data-tooltip="Desktop View"
                >
                    <ComputerDesktopIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
                </button>
            </div>

            <div className={styles.topBarRight}>
                <button
                    onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                    className={`${styles.topBarButton} ${styles.topBarButtonBordered}`}
                    data-tooltip={isSidebarVisible ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                    {isSidebarVisible ? (
                        <ChevronDoubleRightIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
                    ) : (
                        <ChevronDoubleLeftIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
                    )}
                </button>

                <button
                    className={`${styles.topBarButton} ${styles.topBarButtonBordered} ${isExportPopoverOpen ? styles.topBarButtonActive : ''}`}
                    data-tooltip="Create UAT"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        handleExport({
                            top: rect.bottom + 4,
                            left: rect.left + rect.width / 2
                        });
                    }}
                >
                    <DocumentPlusIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
                </button>
                <button
                    className={`${styles.generatorButton} ${styles.topBarButtonWide} ${isThemePickerOpen ? styles.topBarButtonActive : ''}`}
                    data-tooltip={selectedThemeName}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        onThemeClick({
                            top: rect.bottom + 4,
                            left: rect.left + rect.width / 2
                        });
                    }}
                >
                    <SwatchIcon style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                    <span className={`${styles.topBarButtonText} truncate-1-line`}>{selectedThemeName}</span>
                </button>
                <div className={styles.splitButtonContainer}>
                    <button
                        className={`${styles.generatorButton} ${styles.splitButtonMain}`}
                        onClick={handleDirectExport}
                        data-tooltip="Quick Export (ZIP)"
                    >
                        <RocketLaunchIcon style={{ width: "16px", height: "16px" }} />
                        Export
                    </button>
                    <button
                        className={`${styles.generatorButton} ${styles.splitButtonDropdown} ${isStagingPopoverOpen ? styles.splitButtonActive : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            handleStaging({
                                top: rect.bottom + 4,
                                left: rect.right
                            });
                        }}
                        data-tooltip="Stage Preview"
                    >
                        <ChevronDownIcon style={{ width: "12px", height: "12px", strokeWidth: 2 }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
