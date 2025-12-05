import Image from "next/image";
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    SwatchIcon,
    CodeBracketIcon,
    RocketLaunchIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";

export default function TopBar({
    isSidebarVisible,
    setIsSidebarVisible,
    handleExport,
    onThemeClick,
    isThemePickerOpen,
    isExportPopoverOpen,
    selectedThemeId,
    themes = []
}) {
    const selectedTheme = themes.find(t => t.id === selectedThemeId);
    const selectedThemeName = selectedTheme ? selectedTheme.name : "Themes";

    return (
        <div className={styles.topBar}>
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
                    className={`${styles.topBarButton} ${styles.topBarButtonBordered}`}
                    data-tooltip="Import JSON"
                >
                    <CodeBracketIcon style={{ width: "16px", height: "16px", color: "var(--base-white)" }} />
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
                    <ChevronDownIcon style={{ width: "12px", height: "12px", marginLeft: "auto", strokeWidth: 2 }} />
                </button>
                <button
                    className={`${styles.generatorButton} ${styles.topBarButtonExport} ${isExportPopoverOpen ? styles.topBarButtonActive : ''}`}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        handleExport({
                            top: rect.bottom + 4,
                            left: rect.left + rect.width / 2
                        });
                    }}
                >
                    <RocketLaunchIcon style={{ width: "16px", height: "16px" }} />
                    Export
                </button>
            </div>
        </div>
    );
}
