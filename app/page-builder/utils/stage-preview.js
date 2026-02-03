
import { COMPONENT_PATHS } from './component-paths';
import { componentDefaults } from '@/app/templates/content/data';

// Helper to extract component name from path
const getComponentName = (filePath) => {
    if (!filePath) return null;
    const filename = filePath.split('/').pop();
    return filename.replace('.js', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
};

// Helper: Create ID Resolver
const getPropResolver = (components) => {
    // 0. Pre-process: Build Map of UniqueID -> SectionID
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

    // Recursive Prop Resolver
    const resolveProps = (props) => {
        if (!props) return props;

        // Deep clone to avoid mutating original objects if shared
        const newProps = Array.isArray(props) ? [...props] : { ...props };

        Object.keys(newProps).forEach(key => {
            const val = newProps[key];

            // 1. Strings: Check for ID match
            if (typeof val === 'string') {
                if (sectionIdMap.has(val)) {
                    newProps[key] = sectionIdMap.get(val);
                }
                // Special: TargetDialogId Logic
                if (key.includes('TargetDialogId')) {
                    // Start by resolving the ID itself (already handled by block above if it matches hash)
                    // If the val didn't match directly, check if it's a known uniqueID reference
                    const resolvedId = sectionIdMap.get(val) || val;
                    if (resolvedId !== val) {
                        newProps[key] = resolvedId;
                    }

                    // Check if we need to force linkType to 'dialog'
                    // This happens if we have a valid target dialog ID
                    if (val) {
                        const linkTypeKey = key.replace('TargetDialogId', 'LinkType');
                        const urlKey = key.replace('TargetDialogId', 'Url');

                        // If linkType is missing/url AND url is empty/#, switch to dialog
                        if ((!newProps[linkTypeKey] || newProps[linkTypeKey] === 'url') &&
                            (!newProps[urlKey] || newProps[urlKey] === '#' || newProps[urlKey] === '')) {
                            newProps[linkTypeKey] = 'dialog';
                        }
                    }
                }
            }
            // 2. Objects/Arrays: Recurse
            else if (typeof val === 'object' && val !== null) {
                newProps[key] = resolveProps(val);
            }
        });
        return newProps;
    };

    return resolveProps;
};

// Code generation functions removed as we now use dynamic staging pages with JSON data.


export const extractBuilderData = (components) => {
    const data = {};
    const resolveProps = getPropResolver(components);

    // Flatten all components first to ensure we catch everything
    const flatList = [];
    const collect = (list) => {
        if (!list || !Array.isArray(list)) return;
        list.forEach(item => {
            flatList.push(item);
            if (item.components && Array.isArray(item.components)) {
                collect(item.components);
            }
            if (item.props && item.props.components && Array.isArray(item.props.components)) {
                collect(item.props.components);
            }
        });
    };
    collect(components);

    // Process the flat list
    flatList.forEach(item => {
        const finalId = item.sectionId || item.uniqueId;
        if (finalId) {
            // Extract props: Flatten item and props just like generateStagingPageContent
            let cleanItem = { ...item, ...(item.props || {}) };

            // FIX: Resolve IDs in data.js to match page.js
            cleanItem = resolveProps(cleanItem);

            // Cleanup metadata and internal keys
            delete cleanItem.id;
            delete cleanItem.name;
            delete cleanItem.componentId;
            delete cleanItem.category;
            delete cleanItem.isSticky;
            delete cleanItem.uniqueId;
            delete cleanItem.config;
            delete cleanItem.isOpen;
            delete cleanItem.sectionId;
            delete cleanItem.props;
            delete cleanItem.component;

            // Re-add sectionId if valuable
            if (finalId) {
                cleanItem.sectionId = finalId;
            }

            // Do NOT include children arrays in the data object for this node
            delete cleanItem.components;

            data[finalId] = cleanItem;
        }
    });

    return data;
};

export const handleStagePreview = async (selectedComponents, folderName, analytics, activeThemePath) => {
    try {
        // 1. Prepare Payload
        const builderData = extractBuilderData(selectedComponents);

        const payload = {
            folderName,
            components: selectedComponents,
            builderData,
            analytics,
            activeThemePath
        };

        console.log(`[Stage Preview] Uploading payload via Server Proxy: ${selectedComponents.length} components, Folder: ${folderName}`);

        // 2. Server-Side Upload (Proxy)
        // Bypasses CORS issues by letting the Next.js server talk to B2 directly
        const endpoint = '/api/staging-preview';
        console.log(`[Stage Preview] Fetching endpoint: ${endpoint}`);
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || `Upload failed: ${res.statusText}`);
        }

        console.log("Upload completed via server proxy.");

        // 3. Open Stage Page
        console.log(`[Stage Preview] Opening staging page: /staging/${folderName}`);
        window.open(`/staging/${folderName}`, '_blank');
        return true;

    } catch (e) {
        console.error("Error staging preview", e);
        alert("Error staging preview: " + e.message);
        return false;
    }
};


