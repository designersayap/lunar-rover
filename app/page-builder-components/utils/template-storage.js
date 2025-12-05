// Template storage utilities for localStorage persistence

const STORAGE_KEY = 'lunar-template-builder';

export const DEFAULT_ANALYTICS = {
    metaDescription: "",
    googleAnalyticsId: "",
    tikTokPixel: "",
    metaPixel: "",
    hotjarId: ""
};

/**
 * Load saved template from localStorage
 * @param {Object} componentLibrary - The component library to rehydrate from
 * @returns {{ components: Array, analytics: Object } | null}
 */
export function loadTemplate(componentLibrary) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    try {
        const { components = [], analytics } = JSON.parse(saved);

        // Rehydrate component references
        const rehydrated = components.map(comp => {
            let original = null;
            Object.values(componentLibrary).forEach(category => {
                const found = category.find(c => c.id === comp.id);
                if (found) original = found;
            });
            return original ? { ...comp, component: original.component } : null;
        }).filter(Boolean);

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
 * Save template to localStorage
 * @param {Array} components - Selected components
 * @param {Object} analytics - Analytics data
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
 * Generate unique section ID from category name
 * @param {string} category - Category name
 * @returns {string} Section ID like "hero-banner-1234"
 */
export function generateSectionId(category) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${slug}-${random}`;
}

/**
 * Calculate popover position within viewport bounds
 * @param {DOMRect} triggerRect - Bounding rect of trigger element
 * @param {Object} options - Width/height/padding options
 * @returns {{ top: number, left: number }}
 */
export function calculatePopoverPosition(triggerRect, options = {}) {
    const { width = 362, height = 500, padding = 12 } = options;

    let left = triggerRect.right + padding;
    let top = triggerRect.top;

    // Flip to left if overflows right
    if (left + width > window.innerWidth) {
        left = triggerRect.left - width - padding;
    }

    // Clamp to viewport
    left = Math.max(padding, Math.min(left, window.innerWidth - width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - height - padding));

    return { top, left };
}
