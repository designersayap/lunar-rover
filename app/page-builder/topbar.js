import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    SwatchIcon,
    RocketLaunchIcon,
    ChevronDownIcon,
    DocumentPlusIcon,
    BellIcon,
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import Tooltip from "./tooltip";

export default function TopBar({
    isSidebarVisible,
    toggleSidebar,
    handleExport,
    handleDirectExport,
    onExportClick,
    onThemeClick,
    isThemePickerOpen,
    isExportPopoverOpen,
    selectedThemeId,
    themes = [],
    handleStaging,
    handleReset,
    isStagingPopoverOpen,
    onNotificationClick,
    isNotificationOpen,
    unreadCount
}) {
    const selectedTheme = themes.find(t => t.id === selectedThemeId);
    const selectedThemeName = selectedTheme ? selectedTheme.name : "Themes";

    // Ref for the staging button to calculate popover position
    const stagingButtonRef = useRef(null);
    const [isLocalhost, setIsLocalhost] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLocalhost(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        }
    }, []);

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
            <div className={styles.topBarLeft} onClick={handleReset} style={{ cursor: 'pointer' }}>
                <Image
                    src="https://res.cloudinary.com/dp3tcw3wj/image/upload/v1768450282/logo_lunar_lunar_white_m0tyym.svg"
                    alt="Lunar Logo"
                    width={24}
                    height={24}
                />
                <h1 className={`${styles.logo}`}>Lunar</h1>
            </div>
            <div className={styles.topBarRight}>
                {/* ... other buttons ... */}
                <Tooltip content="Toggle Sidebar" position="bottom">
                    <button
                        onClick={toggleSidebar}
                        className={`${styles.btn} ${styles.btnGhost} ${styles.btnIcon}`}
                    >
                        {isSidebarVisible ? (
                            <ChevronDoubleRightIcon className={styles.iconWhite} />
                        ) : (
                            <ChevronDoubleLeftIcon className={styles.iconWhite} />
                        )}
                    </button>
                </Tooltip>

                <Tooltip content="Notifications" position="bottom">
                    <button
                        className={`${styles.btn} ${styles.btnGhost} ${styles.btnIcon} ${isNotificationOpen ? styles.btnGhostActive : ''}`}
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            onNotificationClick({
                                top: rect.bottom + 4,
                                left: rect.left + rect.width / 2
                            });
                        }}
                        style={{ position: 'relative' }}
                    >
                        <BellIcon className={styles.iconWhite} />
                        {unreadCount > 0 && <span className={styles.notificationBadge} />}
                    </button>
                </Tooltip>

                {isLocalhost && (
                    <Tooltip content="UAT File" position="bottom">
                        <button
                            className={`${styles.btn} ${styles.btnGhost} ${styles.btnIcon} ${isExportPopoverOpen ? styles.btnGhostActive : ''}`}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                handleExport({
                                    top: rect.bottom + 4,
                                    left: rect.left + rect.width / 2
                                });
                            }}
                        >
                            <DocumentPlusIcon className={styles.iconWhite} />
                        </button>
                    </Tooltip>
                )}
                <Tooltip content={selectedThemeName} position="bottom">
                    <button
                        className={`${styles.btn} ${styles.btnSecondary} ${styles.topBarButtonWide} ${isThemePickerOpen ? styles.btnSecondaryActive : ''}`}
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            onThemeClick({
                                top: rect.bottom + 4,
                                left: rect.left + rect.width / 2
                            });
                        }}
                    >
                        <SwatchIcon className={styles.iconSmall} />
                        <span className={`${styles.topBarButtonText} truncate-1-line`}>{selectedThemeName}</span>
                    </button>
                </Tooltip>
                <div className={styles.splitButtonContainer}>
                    <Tooltip content="Quick Export (ZIP)" position="bottom">
                        <button
                            className={`${styles.btn} ${styles.btnSecondary} ${styles.splitButtonMain} ${isExportPopoverOpen ? styles.splitButtonActive : ''}`}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                onExportClick({
                                    top: rect.bottom + 4,
                                    left: rect.left + rect.width / 2
                                });
                            }}
                        >
                            <RocketLaunchIcon className={styles.iconSmall} />
                            Export
                        </button>
                    </Tooltip>
                    <Tooltip content="Stage Preview (Cmd+S)" position="bottom">
                        <button
                            ref={stagingButtonRef}
                            className={`${styles.btn} ${styles.btnSecondary} ${styles.splitButtonDropdown} ${isStagingPopoverOpen ? styles.splitButtonActive : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                handleStaging({
                                    top: rect.bottom + 4,
                                    left: rect.right
                                });
                            }}
                        >
                            <ChevronDownIcon className={styles.iconXs} strokeWidth={2} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
