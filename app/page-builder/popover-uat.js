import { useState, useEffect } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import BasePopover from "./base-popover";
import { handleExportNextjs } from "./utils/export-nextjs";

export default function UATPopover({
    isOpen,
    onClose,
    selectedComponents,
    position,
    className = "",
    activeThemePath,
    analyticsData
}) {

    const [isSaving, setIsSaving] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [existingFolders, setExistingFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            // Fetch existing folders when popover opens
            fetch('/api/uat-preview')
                .then(res => res.json())
                .then(data => {
                    if (data.folders) {
                        setExistingFolders(data.folders);
                    }
                })
                .catch(err => console.error("Failed to fetch folders", err))
                .finally(() => setIsLoading(false));
        }
    }, [isOpen]);

    const onSaveClick = async () => {
        if (!folderName.trim()) {
            alert("Please enter a folder name.");
            return;
        }

        setIsSaving(true);
        try {
            // Save: No Download + Save to specified folder
            await handleExportNextjs(selectedComponents, activeThemePath, {
                download: false,
                savePreview: true,
                previewFolder: folderName.trim(),
                analytics: analyticsData
            });
            // Update list and close
            onClose();
        } catch (error) {
            console.error("Save failed", error);
            alert("Save failed. Check console for details.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            className={`${styles.exportPopover} ${className}`}
        >
            {/* Content */}
            <div className={styles.popoverContent}>
                <div className={`${styles.exportInputWrapper}`}>
                    <label className={styles.formInputTitle}>New UAT Project</label>
                    <div style={{ display: 'flex', gap: 'var(--pb-space-sm)' }}>
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => {
                                // Sanitize input: allow only alphanumeric, dash, and underscore
                                const val = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '-');
                                setFolderName(val);
                            }}
                            className={styles.formInput}
                            placeholder="folder-name"
                            style={{ flex: 1 }}
                        />
                    </div>
                    <code className={styles.exportHelperText}>
                        Saves to <code>/public/uat-files/{folderName || '...'}</code>
                    </code>
                </div>

                <div className={styles.exportInputWrapper}>
                    <label className={styles.formInputTitle}>Or overwrite existing:</label>
                    <div style={{
                        maxHeight: '160px',
                        overflowY: 'auto',
                        border: '1px solid var(--pb-bdr)',
                        borderRadius: 'var(--pb-radius)',
                        background: 'var(--pb-neutral-500)'
                    }}>
                        {isLoading ? (
                            <div className={styles.emptyStateMessage}>
                                Loading...
                            </div>
                        ) : existingFolders.length === 0 ? (
                            <div className={styles.emptyStateMessage}>
                                No existing folders found.
                            </div>
                        ) : (
                            existingFolders.map(folder => (
                                <div
                                    key={folder}
                                    onClick={() => setFolderName(folder)}
                                    className={`${styles.listItem} ${folderName === folder ? styles.listItemActive : ''}`}
                                >
                                    <FolderIcon className={styles.iconSmall} />
                                    {folder}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <button
                        className={`${styles.btn} ${styles.btnSecondary} ${styles.wFull}`}
                        onClick={onSaveClick}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Create UAT Folder"}
                    </button>
                </div>
            </div>
        </BasePopover>
    );
}
