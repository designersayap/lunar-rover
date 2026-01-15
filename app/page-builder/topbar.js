import { useEffect, useRef } from "react";
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

    // Ref for the staging button to calculate popover position
    const stagingButtonRef = useRef(null);

    // Keyboard Shortcut for Staging (Cmd+S / Ctrl+S)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault(); // Prevent browser save
                e.stopPropagation();

                if (stagingButtonRef.current) {
                    const rect = stagingButtonRef.current.getBoundingClientRect();
                    handleStaging({
                        top: rect.bottom + 4,
                        left: rect.right
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleStaging]);

    return (
        <div className={`${styles.topBar} z-layout-topbar`} data-builder-ui="true">
            {/* ... left part ... */}
            <div className={styles.topBarLeft}>
                <Image
                    src="https://res.cloudinary.com/dp3tcw3wj/image/upload/v1768450282/logo_lunar_lunar_white_m0tyym.svg"
                    alt="Lunar Logo"
                    width={24}
                    height={24}
                />
                <h1 className={`body-bold ${styles.logo}`}>Lunar</h1>
            </div>
            <div className={styles.topBarRight}>
                {/* ... other buttons ... */}
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
                        ref={stagingButtonRef}
                        className={`${styles.generatorButton} ${styles.splitButtonDropdown} ${isStagingPopoverOpen ? styles.splitButtonActive : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            handleStaging({
                                top: rect.bottom + 4,
                                left: rect.right
                            });
                        }}
                        data-tooltip="Stage Preview (Cmd+S)"
                    >
                        <ChevronDownIcon style={{ width: "12px", height: "12px", strokeWidth: 2 }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
