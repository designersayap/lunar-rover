import { useState, useEffect } from "react";
import { FolderIcon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import BasePopover from "./base-popover";
import { handleExportNextjs } from "./utils/export-nextjs";

export default function UATPopover({
    isOpen,
    onClose,
    selectedComponents,
    position,
    className = "",
    activeThemePath
}) {
    const [isExporting, setIsExporting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [existingFolders, setExistingFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            // Fetch existing folders when popover opens
            fetch('/api/save-preview')
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
                previewFolder: folderName.trim()
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
                <div className={styles.exportInputWrapper} style={{ marginBottom: '16px' }}>
                    <span className="caption-bold">New UAT Project</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => {
                                // Sanitize input: allow only alphanumeric, dash, and underscore
                                const val = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
                                setFolderName(val);
                            }}
                            className={styles.formInput}
                            placeholder="folder-name"
                            style={{ flex: 1 }}
                        />
                    </div>
                    <p className={styles.exportHelperText} style={{ color: 'var(--content-neutral--caption)' }}>
                        Saves to <code>/public/testing-page/{folderName || '...'}</code>
                    </p>
                </div>

                <div className={styles.exportInputWrapper}>
                    <span className="caption-bold">Or overwrite existing:</span>
                    <div style={{
                        maxHeight: '160px',
                        overflowY: 'auto',
                        border: '1px solid var(--bdr)',
                        borderRadius: '6px',
                        background: 'var(--bg2)'
                    }}>
                        {isLoading ? (
                            <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', color: 'var(--grey-200)' }}>
                                Loading...
                            </div>
                        ) : existingFolders.length === 0 ? (
                            <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', color: 'var(--grey-200)' }}>
                                No existing folders found.
                            </div>
                        ) : (
                            existingFolders.map(folder => (
                                <div
                                    key={folder}
                                    onClick={() => setFolderName(folder)}
                                    style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid var(--bdr)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '13px',
                                        background: folderName === folder ? 'var(--bg4)' : 'transparent'
                                    }}
                                >
                                    <FolderIcon style={{ width: '14px', height: '14px', color: 'var(--grey-200)' }} />
                                    {folder}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.popoverFooter}>
                <button
                    className={styles.generatorButton}
                    style={{ width: '100%' }}
                    onClick={onSaveClick}
                    disabled={isSaving || isExporting}
                >
                    {isSaving ? "Saving..." : "Create UAT Folder"}
                </button>
            </div>
        </BasePopover>
    );
}
