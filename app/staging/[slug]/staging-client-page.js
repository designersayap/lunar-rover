
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    const [activeElementId, setActiveElementId] = useState(null);
    const [activePopoverId, setActivePopoverId] = useState(null);

    // CSR Fallback: Fetch data if server-side failed
    useEffect(() => {
        if (!initialData && dataUrl) {
            console.log("Staging: Fetching data client-side from", dataUrl);
            setIsLoading(true);
            fetch(dataUrl, { cache: 'no-store' })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to load staging data");
                    return res.json();
                })
                .then(data => {
                    setLocalData(data.builderData || {});
                    setComponentsTree(data.components || []);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Staging Load Error:", err);
                    setError(err.message);
                    setIsLoading(false);
                });
        } else if (!initialData && !dataUrl) {
            setError("No data source found");
            setIsLoading(false);
        }
    }, [initialData, dataUrl]);

    useEffect(() => {
        if (activeThemePath) {
            const themeLink = document.getElementById("theme-stylesheet");
            if (themeLink) themeLink.href = activeThemePath;
        }
    }, [activeThemePath]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: '2rem', height: '2rem', border: '3px solid #ccc', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p>Loading Staging Preview...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
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

    const handleUpdate = async (uniqueId, newData) => {
        setLocalData(prev => ({
            ...prev,
            [uniqueId]: { ...(prev[uniqueId] || {}), ...newData }
        }));

        try {
            await fetch('/api/save-staging-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folderName,
                    componentId: uniqueId,
                    updates: newData
                })
            });
            console.log("Saved update for", uniqueId);
        } catch (e) {
            console.error("Failed to save update", e);
        }
    };

    // Reconstruct component tree from builderData or a separate schema? 
    // CURRENT LIMITATION: The 'builderData' only contains the PROPS. It doesn't contain the TREE STRUCTURE (which component is where).
    // The previous implementation wrote the component tree into `page.js` as hardcoded JSX.
    // We need the TREE STRUCTURE to be saved in the JSON as well.
    // Assuming `initialData.builderData` contains the PROPS, but where is the TREE?
    // We need to modify `stage - preview.js` to save the component list (tree) into the JSON as well.
    // Let's assume `initialData.components` will contain the tree.

    // Components Tree is now managing by state (componentsTree) derived from initialData or fetch
    // const componentsTree = initialData?.components || []; // REMOVED

    // Sort components: Sticky items first
    // Note: We need to process the tree similar to `stage - preview.js`

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
        if (isSticky) stickyIndices.push(index);

        const isStacked = item.props?.scrollEffect === 'stacked';
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
            </BuilderSelectionContext.Provider>
        </main>
    );
}
