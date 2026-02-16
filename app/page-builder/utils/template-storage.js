import { generateUniqueId } from "./component-manager";

const STORAGE_KEY = 'lunar-template-builder';

export const DEFAULT_ANALYTICS = {
    websiteTitle: "",
    favicon: "",
    canonicalUrl: "",
    metaDescription: "",
    metaKeywords: "",
    metaTag: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    googleTagManagerId: "",
    tikTokPixel: "",
    metaPixel: "",
    microsoftClarityId: ""
};

/**
 * Load saved template.
 */
export function loadTemplate(componentLibrary) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    try {
        const { components = [], analytics } = JSON.parse(saved);
        const seenIds = new Set();

        // Helper to find component definition
        const findDef = (id) => {
            for (const category of Object.values(componentLibrary)) {
                const found = category.find(c => c.id === id);
                if (found) return found;
            }
            return null;
        };

        // Recursive rehydration
        const rehydrate = (list) => {
            return list.map(comp => {
                const original = findDef(comp.id);
                if (!original) return null;

                // Sanitize Unique ID
                let uniqueId = comp.uniqueId;
                if (!uniqueId || seenIds.has(uniqueId)) {
                    uniqueId = generateUniqueId();
                }
                seenIds.add(uniqueId);

                const rehydratedComp = {
                    ...comp,
                    uniqueId, // Ensure unique ID is used
                    component: original.component
                };

                // Handle nested components (ParallaxGroup)
                if (rehydratedComp.props?.components) {
                    rehydratedComp.props = {
                        ...rehydratedComp.props,
                        components: rehydrate(rehydratedComp.props.components)
                    };
                }

                return rehydratedComp;
            }).filter(Boolean);
        };

        const rehydrated = rehydrate(components);

        return {
            components: rehydrated,
            analytics: analytics || DEFAULT_ANALYTICS
        };
    } catch (error) {
        console.error('Error loading template:', error);
        return null;
    }
}

/**
 * Save template.
 */
export function saveTemplate(components, analytics) {
    const hasData = components.length || Object.values(analytics).some(v => v);
    if (!hasData) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        components,
        analytics,
        lastSaved: new Date().toISOString()
    }));
}

/**
 * Clear saved template from localStorage.
 */
export function clearTemplate() {
    localStorage.removeItem(STORAGE_KEY);
}
