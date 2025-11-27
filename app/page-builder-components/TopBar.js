import Image from "next/image";
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    ArrowDownTrayIcon,
    CodeBracketIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";

export default function TopBar({
    isSidebarVisible,
    setIsSidebarVisible,
    handleExport
}) {
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
                        <ChevronDoubleRightIcon style={{ width: "16px", height: "16px", color: "var(--content-neutral--body)" }} />
                    ) : (
                        <ChevronDoubleLeftIcon style={{ width: "16px", height: "16px", color: "var(--content-neutral--body)" }} />
                    )}
                </button>
                <button
                    className={`${styles.topBarButton} ${styles.topBarButtonBordered}`}
                    data-tooltip="Download Code"
                >
                    <ArrowDownTrayIcon style={{ width: "16px", height: "16px", color: "var(--content-neutral--body)" }} />
                </button>
                <button
                    className={styles.topBarButtonWide}
                    data-tooltip="Import JSON"
                >
                    <CodeBracketIcon style={{ width: "16px", height: "16px" }} />
                    Import JSON
                </button>
                <button
                    className={styles.topBarButtonExport}
                    onClick={handleExport}
                    data-tooltip="Export Template"
                >
                    <RocketLaunchIcon style={{ width: "16px", height: "16px" }} />
                    Export
                </button>
            </div>
        </div>
    );
}
