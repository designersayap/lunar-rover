import Image from "next/image";
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    SwatchIcon,
    RocketLaunchIcon,
    ChevronDownIcon,
    DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";
/**
 * TopBar: Navigation and controls.
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
    isStagingPopoverOpen
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
                    data-tooltip="UAT File"
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
