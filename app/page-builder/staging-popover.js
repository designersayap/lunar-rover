import { useState, useEffect, useRef } from 'react';
import { FolderIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
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
    onRestore,
    activeThemePath
}) {
    const [folderName, setFolderName] = useState("");
    const [existingFolders, setExistingFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // Use ref to access latest props in async handlers/closures
    const selectedComponentsRef = useRef(selectedComponents);
    useEffect(() => {
        selectedComponentsRef.current = selectedComponents;
    }, [selectedComponents]);

    useEffect(() => {
        let isFirstLoad = true;

        const fetchFolders = async () => {
            if (isFirstLoad) setIsLoading(true);

            try {
                // Set a timeout for the fetch to avoid hanging indefinitely if the API is blocked
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

                // Append timestamp to prevent browser caching of the API request itself
                const res = await fetch(`/api/staging-preview?t=${Date.now()}`, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    setExistingFolders(data.folders || []);
                }
            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.warn("Failed to fetch folders (likely proxy issue), proceeding without list", e);
                    // Only show error on first load to avoid annoying UI flickering/toasts
                    if (isFirstLoad) {
                        setError(e.message || "Failed to fetch staging folders");
                    }
                }
            } finally {
                if (isFirstLoad) {
                    setIsLoading(false);
                    isFirstLoad = false;
                }
            }
        };

        fetchFolders();
        // Removed setInterval to reduce API calls as requested.
        // Data is now fetched only on mount (page load/refresh) and updated locally on create.
    }, []);

    const handleSave = async () => {
        if (!folderName.trim()) {
            alert("Please enter a folder name");
            return;
        }

        setIsSaving(true);
        // FORCE BLUR to ensure any pending edits in contentEditable are committed
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // Small delay to allow blur events and React state updates to flush
        await new Promise(resolve => setTimeout(resolve, 500));

        const finalFolderName = folderName.trim();
        const success = await handleStagePreview(selectedComponentsRef.current, finalFolderName, analyticsData, activeThemePath);
        setIsSaving(false);

        if (success) {
            // Optimistically update the list so the user sees it next time without re-fetching
            setExistingFolders(prev => {
                if (prev.includes(finalFolderName)) return prev;
                return [...prev, finalFolderName].sort((a, b) => a.localeCompare(b));
            });
            onClose();
        }
    };

    const handleRestore = async (e, folder) => {
        e.stopPropagation(); // Prevent clicking the folder item
        if (!confirm(`Replace current canvas with content from '${folder}'?`)) return;


        try {
            const res = await fetch(`/api/load-staging-data?folder=${folder}&t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                if (data.components) {
                    if (onRestore) {
                        // 1. Build Reverse Map (SectionID -> UniqueID)
                        const sectionIdToUniqueId = new Map();
                        const buildReverseMap = (list) => {
                            if (!Array.isArray(list)) return;
                            list.forEach(item => {
                                // Prefer current uniqueId if available, but if coming from data.js,
                                // the item.sectionId is the key. item.uniqueId might be stale or generated.
                                // Actually, data.js stores sectionId as the key for props, but uniqueId is in the object too.
                                if (item.sectionId && item.uniqueId) {
                                    sectionIdToUniqueId.set(item.sectionId, item.uniqueId);
                                }
                                if (item.components) buildReverseMap(item.components);
                                if (item.props?.components) buildReverseMap(item.props.components);
                            });
                        };
                        buildReverseMap(data.components);

                        // 2. Recursive Prop Resolver (Reverse)
                        const resolveIdsBack = (props) => {
                            if (!props || typeof props !== 'object') return props;

                            if (Array.isArray(props)) {
                                return props.map(item => resolveIdsBack(item));
                            }

                            const newProps = { ...props };
                            Object.keys(newProps).forEach(key => {
                                const val = newProps[key];

                                // Check if value is a known SectionID
                                if (typeof val === 'string' && sectionIdToUniqueId.has(val)) {
                                    newProps[key] = sectionIdToUniqueId.get(val);
                                }
                                // Recurse
                                else if (typeof val === 'object' && val !== null) {
                                    newProps[key] = resolveIdsBack(val);
                                }
                            });
                            return newProps;
                        };

                        // Rehydrate components with their render functions/classes
                        const rehydrate = (list) => {
                            if (!Array.isArray(list)) return [];
                            return list.map(item => {
                                let definition = null;
                                for (const category of Object.values(componentLibrary)) {
                                    const found = category.find(c => c.id === item.id);
                                    if (found) {
                                        definition = found;
                                        break;
                                    }
                                }

                                const newItem = { ...item };

                                if (definition) {
                                    newItem.component = definition.component;
                                } else {
                                    console.warn(`Component definition not found for id: ${item.id}`);
                                }

                                // FIX: Ensure dialogs/popovers start closed on restore
                                delete newItem.isOpen;
                                if (newItem.props) {
                                    delete newItem.props.isOpen;
                                }

                                // FIX: Reverse Resolve IDs in Props
                                if (newItem.props) {
                                    newItem.props = resolveIdsBack(newItem.props);
                                }

                                // Case 1: props.components (ScrollGroup)
                                if (newItem.props && newItem.props.components && Array.isArray(newItem.props.components)) {
                                    newItem.props = {
                                        ...newItem.props,
                                        components: rehydrate(newItem.props.components)
                                    };
                                }

                                // Case 2: components (Direct children)
                                if (newItem.components && Array.isArray(newItem.components)) {
                                    newItem.components = rehydrate(newItem.components);
                                }

                                return newItem;
                            });
                        };

                        const rehydrated = rehydrate(data.components);

                        // Pass activeThemePath to onRestore if available
                        onRestore(rehydrated, data.activeThemePath);
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
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className={`${styles.exportInputWrapper}`}>
                        <span className="caption-bold">New Staging Page</span>
                        <div style={{ display: 'flex', gap: 'var(--pb-space-sm)' }}>
                            <input
                                type="text"
                                className={styles.formInput}
                                placeholder="folder-name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value.replace(/\s/g, '-'))}
                                style={{ flex: 1 }}
                            />
                        </div>
                        <code className={styles.exportHelperText}>
                            Creates <code>app/staging/{folderName || '...'}</code>
                        </code>
                    </div>

                    {/* Hidden submit button to allow Enter key to submit */}
                    <button type="submit" style={{ display: 'none' }} />

                    <div className={styles.exportInputWrapper}>
                        <span className="caption-bold">Or overwrite existing:</span>
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
                            ) : error ? (
                                <div className={styles.errorMessage}>
                                    {error}
                                </div>
                            ) : existingFolders.length === 0 ? (
                                <div className={styles.emptyStateMessage}>
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
                                            type="button"
                                            className={`${styles.generatorButton} ${styles.sidebarAddButton}`}
                                            style={{ marginLeft: 'auto' }}
                                            title="Restore to Builder"
                                            onClick={(e) => handleRestore(e, folder)}
                                        >
                                            <ArrowPathIcon style={{ width: 'var(--pb-space-lg)', height: 'var(--pb-space-lg)' }} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={styles.generatorButton}
                            style={{ width: '100%' }}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--pb-space-sm)' }}>
                                    <div className={styles.spinner} />
                                    <span>Creating Staging</span>

                                </div>
                            ) : "Create Staging"}
                        </button>
                    </div>
                </form>
            </div>
        </BasePopover>
    );
}
