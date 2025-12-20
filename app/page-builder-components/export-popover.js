import { useState, useEffect } from "react";
import styles from "../page.module.css";
import BasePopover from "./utils/base-popover";
import { handleExportNextjs } from "./utils/export-nextjs";

export default function ExportPopover({
    isOpen,
    onClose,
    selectedComponents,
    position,
    className = "",
    activeThemePath
}) {
    const [isExporting, setIsExporting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [folderName, setFolderName] = useState("draft");
    const [existingFolders, setExistingFolders] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // Fetch existing folders when popover opens
            fetch('/api/save-preview')
                .then(res => res.json())
                .then(data => {
                    if (data.folders) {
                        setExistingFolders(data.folders);
                    }
                })
                .catch(err => console.error("Failed to fetch folders", err));
        }
    }, [isOpen]);

    const onExportClick = async () => {
        setIsExporting(true);
        try {
            // Export: Download ZIP + Save History to auto-generated folder
            await handleExportNextjs(selectedComponents, activeThemePath, {
                download: true,
                savePreview: true
            });
            onClose();
        } catch (error) {
            console.error("Export failed", error);
            alert("Export failed. Check console for details.");
        } finally {
            setIsExporting(false);
        }
    };

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
            width={340}
        >
            {/* Content */}
            <div className={styles.popoverContent}>
                <div style={{ padding: '16px', color: '#666' }}>
                    <p style={{ marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
                        Export your selected components.
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', fontWeight: '500' }}>
                            Save Destination (Public Preview):
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input
                                type="text"
                                value={folderName}
                                onChange={(e) => {
                                    // Sanitize input: allow only alphanumeric, dash, and underscore
                                    const val = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
                                    setFolderName(val);
                                }}
                                placeholder="Enter folder name (e.g. draft)"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '13px'
                                }}
                            />
                            {existingFolders.length > 0 && (
                                <select
                                    onChange={(e) => setFolderName(e.target.value)}
                                    value=""
                                    style={{
                                        width: '100%',
                                        padding: '6px',
                                        borderRadius: '4px',
                                        border: '1px solid #eee',
                                        fontSize: '12px',
                                        background: '#fafafa'
                                    }}
                                >
                                    <option value="" disabled>Select existing folder...</option>
                                    {existingFolders.map(f => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
                        Items will be saved to <code>/public/testing-page/{folderName || '...'}</code>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className={`${styles.popoverFooter} ${styles.themePickerFooter}`} style={{ justifyContent: 'space-between', padding: '12px 16px', gap: '8px' }}>
                <button
                    className={styles.generatorAction}
                    style={{
                        flex: 1,
                        background: '#f3f4f6',
                        color: '#374151',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500'
                    }}
                    onClick={onSaveClick}
                    disabled={isSaving || isExporting}
                >
                    {isSaving ? "Saving..." : "Save Only"}
                </button>
                <button
                    className={styles.generatorButton}
                    style={{ flex: 1 }}
                    onClick={onExportClick}
                    disabled={isSaving || isExporting}
                >
                    {isExporting ? "Exporting..." : "Export ZIP"}
                </button>
            </div>
        </BasePopover>
    );
}
