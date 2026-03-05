
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import styles from "../../page.module.css";
import StickyManager from "@/app/page-builder/utils/sticky-manager";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { COMPONENT_REGISTRY } from "@/app/page-builder/utils/component-registry";
import { componentDefaults } from "@/app/templates/content/data";

// Helper: Create ID Resolver (replicated from stage-preview.js logic)
const getPropResolver = (components) => {
    const sectionIdMap = new Map();
    const mapIds = (list) => {
        if (!list || !Array.isArray(list)) return;
        list.forEach(item => {
            if (item.uniqueId && item.sectionId) {
                sectionIdMap.set(String(item.uniqueId), item.sectionId);
            }
            if (item.components) mapIds(item.components);
            if (item.props?.components) mapIds(item.props.components);
        });
    };
    mapIds(components);

    const resolveProps = (props) => {
        if (!props) return props;
        const newProps = Array.isArray(props) ? [...props] : { ...props };
        Object.keys(newProps).forEach(key => {
            const val = newProps[key];
            if (typeof val === 'string') {
                if (sectionIdMap.has(val)) newProps[key] = sectionIdMap.get(val);
                if (key.includes('TargetDialogId')) {
                    const resolvedId = sectionIdMap.get(val) || val;
                    if (resolvedId !== val) newProps[key] = resolvedId;
                    if (val) {
                        const linkTypeKey = key.replace('TargetDialogId', 'LinkType');
                        const urlKey = key.replace('TargetDialogId', 'Url');
                        if ((!newProps[linkTypeKey] || newProps[linkTypeKey] === 'url') &&
                            (!newProps[urlKey] || newProps[urlKey] === '#' || newProps[urlKey] === '')) {
                            newProps[linkTypeKey] = 'dialog';
                        }
                    }
                }
            } else if (typeof val === 'object' && val !== null) {
                newProps[key] = resolveProps(val);
            }
        });
        return newProps;
    };
    return resolveProps;
};

export default function StagingClientPage({ initialData, folderName, activeThemePath }) {
    const searchParams = useSearchParams();
    const dataUrl = searchParams.get('dataUrl');

    const [localData, setLocalData] = useState(initialData?.builderData || {});
    const [componentsTree, setComponentsTree] = useState(initialData?.components || []);
    const [themePath, setThemePath] = useState(initialData?.activeThemePath || activeThemePath);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    const [activeElementId, setActiveElementId] = useState(null);
    const [activePopoverId, setActivePopoverId] = useState(null);
    const lastEditedComponentIdRef = useRef(null);

    const [toaster, setToaster] = useState({ show: false, message: '', type: 'info' });

    const showToast = (message, type = 'info') => {
        setToaster({ show: true, message, type });
        if (type !== 'loading') {
            setTimeout(() => {
                setToaster(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    };

    useEffect(() => {
        const handleToastEvent = (e) => {
            const { message, type } = e.detail || {};
            if (message) {
                showToast(message, type || 'info');
            }
        };

        window.addEventListener('lunar:toast', handleToastEvent);
        return () => window.removeEventListener('lunar:toast', handleToastEvent);
    }, []);

    const handleUpdate = async (uniqueId, newData) => {
        lastEditedComponentIdRef.current = uniqueId;
        setLocalData(prev => ({
            ...prev,
            [uniqueId]: { ...(prev[uniqueId] || {}), ...newData }
        }));
        // Auto-save disabled to prevent creating new files on every keystroke.
        // User must manually save (CMD+S).
    };

    const handleManualSave = useCallback(async (e) => {
        // Prevent default browser save
        e.preventDefault();

        // FORCE BLUR to ensure any pending edits in contentEditable are committed
        if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // Small delay to allow blur events and React state updates to flush
        await new Promise(resolve => setTimeout(resolve, 100));

        showToast('Saving changes...', 'loading');

        try {
            console.log("Saving staging data...", {
                folderName,
                dataSize: JSON.stringify(localData).length,
                componentId: lastEditedComponentIdRef.current
            });

            const response = await fetch('/api/save-staging-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folderName,
                    builderData: localData, // Send the full current state
                    componentId: lastEditedComponentIdRef.current
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: response.statusText }));
                console.error("Save API Error:", errorData);
                throw new Error(errorData.error || `Save failed: ${response.status}`);
            }

            showToast('Changes saved successfully!', 'success');
            lastEditedComponentIdRef.current = null; // Clear after save
        } catch (err) {
            console.error("Manual Save Error:", err);
            showToast(`Failed to save: ${err.message}`, 'error');
        }
    }, [folderName, localData]);

    // Keyboard Shortcut Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                handleManualSave(e);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleManualSave]);

    // CSR Fallback: Fetch data if server-side failed
    useEffect(() => {
        if (!initialData) {
            console.log("Staging: Fetching data client-side for folder:", folderName);
            setIsLoading(true);

            // Construct API URL
            const apiUrl = `/api/load-staging-data?folder=${folderName}`;

            // Append timestamp to prevent browser/proxy caching of the API response
            const fetchData = async (retries = 20, delay = 1000) => {
                const bustUrl = apiUrl + '&t=' + new Date().getTime();
                console.log(`[Staging] Fetching: ${bustUrl} (Retries left: ${retries})`);

                try {
                    const res = await fetch(bustUrl, { cache: 'no-store' });
                    if (!res.ok) {
                        // Special handling for 404s (Propagation Delay or Not Found)
                        if (res.status === 404) {
                            if (retries > 0) {
                                console.warn(`[Staging] 404 Not Found, retrying... (${retries} attempts left)`);
                                // Cap delay at 3 seconds to avoid "infinite" feeling wait
                                const nextDelay = Math.min(delay * 1.5, 3000);
                                setTimeout(() => fetchData(retries - 1, nextDelay), delay);
                                return;
                            }
                            // No retries left for 404
                            throw new Error(`Data not found (404) after multiple attempts.`);
                        }

                        // Other errors (e.g. 500)
                        throw new Error(`Status ${res.status}: ${res.statusText}`);
                    }

                    const data = await res.json();
                    setLocalData(data.builderData || {});
                    setComponentsTree(data.components || []);
                    if (data.activeThemePath) setThemePath(data.activeThemePath);
                    setIsLoading(false);
                    setError(null);
                } catch (err) {
                    console.error(`Staging Load Attempt Failed (${retries} retries left):`, err);

                    if (retries > 0) {
                        // Retry on network errors or non-404 errors if we think they might be transient
                        // Cap delay at 3 seconds
                        const nextDelay = Math.min(delay * 1.5, 3000);
                        console.log(`Retrying due to error... waiting ${delay}ms`);
                        setTimeout(() => fetchData(retries - 1, nextDelay), delay);
                    } else {
                        // API failure - no raw URL fallback possible anymore since we hid it.
                        setError(`Failed to load staging data. Error: ${err.message}`);
                        setIsLoading(false);
                    }
                }
            };
            fetchData();
        }
    }, [initialData, folderName]);

    useEffect(() => {
        if (themePath) {
            let themeLink = document.getElementById("theme-stylesheet");

            // Dynamic injection to avoid server-side preload warnings
            if (!themeLink) {
                themeLink = document.createElement("link");
                themeLink.id = "theme-stylesheet";
                themeLink.rel = "stylesheet";
                document.head.appendChild(themeLink);
            }

            if (themeLink.getAttribute('href') !== themePath) {
                themeLink.href = themePath;
            }
        }
    }, [themePath]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
                <div className={styles.spinner} />
                <p style={{ fontFamily: 'var(--font-family-body)', fontSize: '14px', fontWeight: 500 }}>Loading Staging Preview...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
                <p>Error: {error}</p>
            </div>
        );
    }

    // Flatten for stickiness check
    const processedComponents = componentsTree.map((item, index) => {
        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};
        const isSticky = item.props?.isSticky ?? compDefaults.isSticky ?? false;
        return { ...item, _isSticky: isSticky, _originalIndex: index };
    }).sort((a, b) => {
        if (a._isSticky && !b._isSticky) return -1;
        if (!a._isSticky && b._isSticky) return 1;
        return 0;
    });

    const stickyIndices = [];
    const stackedIndices = [];
    const blurIndices = [];
    const overlayIndices = [];

    processedComponents.forEach((item, index) => {
        const isSticky = item._isSticky; // Already sorted
        const isStacked = item.props?.scrollEffect === 'stacked';

        // Fix: Stacked items must be tracked as sticky so StickyManager renders them with the wrapper
        if (isSticky || isStacked) stickyIndices.push(index);

        if (isStacked) {
            stackedIndices.push(index);
            if (item.enableBlur || item.props?.enableBlur) blurIndices.push(index);
        }

        // item.isOverlay is top-level default, item.props.isOverlay is override
        // logic: prop takes precedence
        if (item.props?.isOverlay || (item.isOverlay && item.props?.isOverlay !== false)) {
            overlayIndices.push(index);
        }
    });

    const resolveProps = getPropResolver(processedComponents);

    const contextValue = {
        activeElementId,
        setActiveElementId,
        activePopoverId,
        setActivePopoverId,
        selectedComponents: processedComponents,
        updateComponent: handleUpdate,
        isStaging: true,
        localData
    };

    return (
        <main style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'clip', containerType: 'inline-size', containerName: 'root-container' }}>
            <BuilderSelectionContext.Provider value={contextValue}>
                <div id="canvas-background-root" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto', overflow: 'hidden' }} />
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <StickyManager stickyIndices={stickyIndices} stackedIndices={stackedIndices} blurIndices={blurIndices} overlayIndices={overlayIndices}>
                        {processedComponents.map((item, index) => {
                            const Component = COMPONENT_REGISTRY[item.id];
                            if (!Component) return null;

                            // Resolve props
                            let props = { ...item, ...(item.props || {}) };
                            props = resolveProps(props);

                            // Clean props
                            delete props.id; delete props.name; delete props.componentId; delete props.category;
                            delete props.isSticky; delete props.uniqueId; delete props.config;
                            delete props.isOpen; delete props.sectionId; delete props.props; delete props.component;

                            const finalSectionId = item.sectionId || item.uniqueId;
                            if (finalSectionId) props.sectionId = finalSectionId;

                            // Special handling for nested components (ScrollGroup)
                            if (Array.isArray(props.components)) {
                                props.components = props.components.map(child => ({
                                    ...child,
                                    component: COMPONENT_REGISTRY[child.id] || null,
                                    // Should also resolve props recursively here if needed
                                }));
                            }

                            return (
                                <Component
                                    key={index}
                                    {...props}
                                    {...localData[finalSectionId]}
                                    onUpdate={(newData) => handleUpdate(finalSectionId, newData)}
                                    updateComponent={handleUpdate}
                                    disableEffects={item.id === 'scroll-group'}
                                />
                            );
                        })}
                    </StickyManager>
                </div>

                {/* Toaster */}
                {toaster.show && (
                    <div className={`toast toast-${toaster.type}`}>
                        {toaster.type === "success" && <CheckCircleIcon className="toast-icon" style={{ color: 'var(--system-color-green-300)' }} />}
                        {toaster.type === "error" && <ExclamationCircleIcon className="toast-icon" style={{ color: 'var(--system-color-red-300)' }} />}
                        {toaster.type === "loading" && (
                            <div className="spinner" />
                        )}
                        {toaster.message}
                    </div>
                )}
            </BuilderSelectionContext.Provider>
        </main >
    );
}
