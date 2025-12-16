import { useState } from "react";
import styles from "../page.module.css";
import BasePopover from "./utils/base-popover";

export default function ExportPopover({
    isOpen,
    onClose,
    onExport,
    onDownloadCsv,
    position,
    className = ""
}) {
    const [csvLink, setCsvLink] = useState("");

    const handleExportClick = () => {
        if (csvLink.trim()) {
            onExport(csvLink);
            onClose();
        }
    };

    const hasLink = csvLink.trim().length > 0;

    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            className={`${styles.exportPopover} ${className}`}
            width={362}
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
        </BasePopover>
    );
}
