import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";

export default function ExportPopover({
    isOpen,
    onClose,
    onExport,
    onDownloadCsv,
    position
}) {
    const [csvLink, setCsvLink] = useState("");

    if (!isOpen) return null;

    const handleExportClick = () => {
        if (csvLink.trim()) {
            onExport(csvLink);
            onClose();
        }
    };

    const hasLink = csvLink.trim().length > 0;

    // Calculate constrained position
    let popoverStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        pointerEvents: "auto"
    };

    if (position && typeof window !== 'undefined') {
        const popoverWidth = 362;
        const padding = 16;
        const windowWidth = window.innerWidth;
        const minLeft = popoverWidth / 2 + padding;
        const maxLeft = windowWidth - popoverWidth / 2 - padding;
        const constrainedLeft = Math.max(minLeft, Math.min(position.left, maxLeft));

        popoverStyle = {
            ...popoverStyle,
            top: `${position.top}px`,
            left: `${constrainedLeft}px`,
            transform: "translateX(-50%)"
        };
    }

    return (
        <div className={styles.popoverOverlay} style={{ pointerEvents: "none" }}>
            <div
                className={`${styles.popoverContainer} ${styles.exportPopover}`}
                style={popoverStyle}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Content */}
                <div className={styles.popoverContent}>
                    <div className={styles.exportInputWrapper}>
                        <textarea
                            className={`${styles.formInput} ${styles.formTextarea} ${styles.exportTextarea}`}
                            placeholder="Paste your csv link here"
                            value={csvLink}
                            onChange={(e) => setCsvLink(e.target.value)}
                        />
                        <div className={styles.exportHelperText}>
                            <span
                                className={styles.exportLink}
                                onClick={onDownloadCsv}
                            >
                                Download CSV
                            </span>
                            <span className={styles.exportLinkText}> and publish from your google sheet</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={`${styles.popoverFooter} ${styles.themePickerFooter}`}>
                    <button
                        className={styles.generatorButton}
                        onClick={handleExportClick}
                        disabled={!hasLink}
                    >
                        Export HTML
                    </button>
                </div>
            </div>
        </div>
    );
}
