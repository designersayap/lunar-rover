import { useState, useEffect } from "react";
import { FolderIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
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
            fetchFolders();
        }
    }, [isOpen]);

    const fetchFolders = () => {
        setIsLoading(true);
        fetch('/api/uat-preview')
            .then(res => res.json())
            .then(data => {
                if (data.folders) {
                    setExistingFolders(data.folders);
                }
            })
            .catch(err => console.error("Failed to fetch folders", err))
            .finally(() => setIsLoading(false));
    };

    const handleOpenClick = (folder, e) => {
        e.stopPropagation(); // Prevent selecting the folder
        // Local UAT path
        const url = `/uat-files/${folder}/index.html`;
        window.open(url, '_blank');
    };

    const onSaveClick = async () => {
        if (!folderName.trim()) {
            alert("Please enter a folder name.");
            return;
        }

        setIsSaving(true);
        try {
            const finalName = folderName.trim();
            // Save: No Download + Save to specified folder
            await handleExportNextjs(selectedComponents, activeThemePath, {
                download: false,
                savePreview: true,
                previewFolder: finalName,
                analytics: analyticsData
            });

            // Ask to open
            const openNow = confirm("Upload successful! Do you want to open the UAT site now?");
            if (openNow) {
                handleOpenClick(finalName, { stopPropagation: () => { } });
            }

            // Update list and close
            fetchFolders();
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
                        Saves to S3 Bucket (Private)
                    </code>
                </div>

                <div className={styles.exportInputWrapper}>
                    <label className={styles.formInputTitle}>Existing Projects (Select to overwrite):</label>
                    <div className={styles.popoverList}>
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
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '8px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <FolderIcon className={styles.iconSmall} />
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{folder}</span>
                                    </div>
                                    <button
                                        onClick={(e) => handleOpenClick(folder, e)}
                                        className={styles.actionButton}
                                        title={`Open ${folder}`}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: '4px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: 'var(--pb-color-text-secondary)',
                                            borderRadius: '4px'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-color-bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <ArrowTopRightOnSquareIcon className={styles.iconSmall} />
                                    </button>
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
                        {isSaving ? "Saving..." : "Create / Update UAT"}
                    </button>
                </div>
            </div>
        </BasePopover>
    );
}
