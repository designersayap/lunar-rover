import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";

export default function ExportPopover({
    isOpen,
    onClose,
    onExport,
    onDownloadCsv
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

    return (
        <div className={styles.popoverOverlay} onClick={onClose}>
            <div
                className={styles.exportPopover}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={styles.exportHeader}>
                    <div className={styles.exportTitle}>Link your File</div>
                    <button
                        className={styles.exportClose}
                        onClick={onClose}
                    >
                        <XMarkIcon style={{ width: "20px", height: "20px" }} />
                    </button>
                </div>

                {/* Content */}
                <div className={styles.exportContent}>
                    <div className={styles.exportInputWrapper}>
                        <textarea
                            className={styles.exportTextarea}
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
                            <span className={styles.exportLinkText}>, and publish from your google sheet</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.exportFooter}>
                    <button
                        className={`${styles.exportButton} ${hasLink ? styles.exportButtonActive : ''}`}
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
