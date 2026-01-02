import { useState, useEffect } from 'react';
import { XMarkIcon, FolderIcon, DocumentPlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import styles from '../page.module.css';
import { handleStagePreview } from './utils/stage-preview';
import BasePopover from './base-popover';
import { componentLibrary } from './content/component-library';

export default function StagingPopover({
    position,
    onClose,
    selectedComponents,
    analyticsData,
    className,
    onRestore,  // Inject ability to restore
    activeThemePath
}) {
    const [folderName, setFolderName] = useState("");
    const [existingFolders, setExistingFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);

    useEffect(() => {
        const fetchFolders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/staging-preview');
                if (res.ok) {
                    const data = await res.json();
                    setExistingFolders(data.folders || []);
                }
            } catch (e) {
                console.error("Failed to fetch folders", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFolders();
    }, []);

    const handleSave = async () => {
        if (!folderName.trim()) {
            alert("Please enter a folder name");
            return;
        }

        setIsSaving(true);
        const success = await handleStagePreview(selectedComponents, folderName.trim(), analyticsData, activeThemePath);
        setIsSaving(false);

        if (success) {
            onClose();
        }
    };

    const handleRestore = async (e, folder) => {
        e.stopPropagation(); // Prevent clicking the folder item
        if (!confirm(`Replace current canvas with content from '${folder}'?`)) return;

        setIsRestoring(true);
        try {
            const res = await fetch(`/api/load-staging-data?folder=${folder}`);
            if (res.ok) {
                const data = await res.json();
                if (data.components) {
                    if (onRestore) {
                        // Rehydrate components with their render functions/classes
                        const rehydrated = data.components.map(item => {
                            // Find definition in library
                            let definition = null;
                            for (const category of Object.values(componentLibrary)) {
                                const found = category.find(c => c.id === item.id);
                                if (found) {
                                    definition = found;
                                    break;
                                }
                            }

                            if (definition) {
                                return {
                                    ...item,
                                    component: definition.component
                                };
                            } else {
                                console.warn(`Component definition not found for id: ${item.id}`);
                                return item;
                            }
                        });

                        onRestore(rehydrated);
                        onClose();
                        alert("Restored successfully!");
                    }
                }
            } else {
                alert("Failed to load staging data");
            }
        } catch (e) {
            console.error("Error restoring", e);
            alert("Error restoring staging data");
        } finally {
            setIsRestoring(false);
        }
    };

    if (!position) return null;

    return (
        <BasePopover
            isOpen={true}
            onClose={onClose}
            position={position}
            className={className}
        >
            <div className={styles.popoverContent}>
                <div className={styles.exportInputWrapper} style={{ marginBottom: '16px' }}>
                    <span className="caption-bold">New Staging Page</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="folder-name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value.replace(/\s/g, '-'))}
                            style={{ flex: 1 }}
                        />
                    </div>
                    <p className={styles.exportHelperText} style={{ color: 'var(--content-neutral--caption)' }}>
                        Creates <code>app/staging/{folderName || '...'}</code>
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
                                No existing staging pages found.
                            </div>
                        ) : (
                            existingFolders.map(folder => (
                                <div
                                    key={folder}
                                    onClick={() => setFolderName(folder)}
                                    className={`${styles.folderItem} ${folderName === folder ? styles.folderItemActive : ''}`}
                                >
                                    <FolderIcon className={styles.folderIcon} />
                                    {folder}
                                    <button
                                        className={`${styles.generatorButton} ${styles.sidebarAddButton}`}
                                        style={{ marginLeft: 'auto' }}
                                        title="Restore to Builder"
                                        onClick={(e) => handleRestore(e, folder)}
                                    >
                                        <ArrowPathIcon style={{ width: '16px', height: '16px' }} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.popoverFooter}>
                <button
                    className={styles.generatorButton}
                    style={{ width: '100%' }}
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Staging..." : "Create Staging"}
                </button>
            </div>
        </BasePopover>
    );
}
