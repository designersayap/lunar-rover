
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
        // We no longer generate file content strings.
        // We prepare a JSON payload describing the page.

        // 1. Component Tree: The list of components as they appear on the canvas
        // We need to clean this list to be JSON-serializable (remove functions, recursive refs if any)
        // basic JSON.stringify does a good job, but we might want to be explicit.

        // Use the same logic as `extractBuilderData` to get the PROPS map (by ID)
        // effectively flattening the data for easy updates.
        const builderData = extractBuilderData(selectedComponents);

        // 2. The Tree Structure
        // We save `selectedComponents` directly as the tree source of truth.
        // But we should probably clean it up a bit (remove large unused props if possible),
        // but for now sending it as-is (serialized) is safest to preserve structure.

        // 3. Analytics & Metadata
        // We pass this to be saved in the JSON so the server page can read it.

        const payload = {
            folderName,
            // fileContent: null, // No longer needed
            // layoutContent: null, // No longer needed
            components: selectedComponents, // The Tree
            builderData, // The Props Map (for individual updates)
            analytics,
            activeThemePath
        };

        // Note: The API at `app/api/staging-preview` expects { folderName, builderData, ... }
        // We need to update the API to accept and save `components` and `analytics` too.
        // I will update the API to just save the whole body (minus explicit file contents) into the JSON.

        // 4. Upload to Vercel Blob (Client Side)



        const { upload } = await import('@vercel/blob/client');

        const newBlob = await upload(`staging-data/${folderName}.json`, JSON.stringify(payload), {
            access: 'public',
            handleUploadUrl: '/api/blob/upload-final',
            contentType: 'application/json', // Explicit content type
            addRandomSuffix: false, // Ensure we overwrite existing files
        });

        // 5. Update Index (staging/index.json)
        // We calculate the index URL based on the uploaded file's URL
        let indexData = { folders: [], mappings: {} };

        // Updating Index for Listing purposes
        // We try to fetch `index.json` from the standard location (assuming fixed name support).

        const indexUrl = newBlob.url.split('/').slice(0, -1).join('/') + '/index.json';

        try {
            const idxRes = await fetch(indexUrl, { cache: 'no-store' });
            if (idxRes.ok) {
                indexData = await idxRes.json();
            }
        } catch (e) {
            // ignore
        }

        if (!indexData.folders.includes(folderName)) {
            indexData.folders.push(folderName);
            await upload(`staging-data/index.json`, JSON.stringify(indexData), {
                access: 'public',
                handleUploadUrl: '/api/blob/upload-final',
                contentType: 'application/json',
            });
        }

        // Open in new tab with explicit data URL to support client-side fetching (proxy bypass)
        window.open(`/staging/${folderName}?dataUrl=${encodeURIComponent(newBlob.url)}`, '_blank');
    } catch (e) {
        console.error("Error staging preview", e);
        alert("Error staging preview");
        return false;
    }
};
