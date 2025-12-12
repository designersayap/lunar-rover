// Component management utilities for the template builder
import { componentDefaults } from "@/app/template-components/content/data";

/**
 * Add a new component to the list
 * @param {Array} components - Current components array
 * @param {Object} componentData - Component data from library
 * @param {string} sectionId - Generated section ID
 * @returns {Array} New components array
 */
export function addComponentToList(components, componentData, sectionId) {
    // Build initial props from config defaults
    const initialProps = {};
    componentData.config?.forEach(prop => {
        initialProps[prop.name] = prop.default;
    });

    const newItem = {
        ...componentData,
        uniqueId: Date.now(),
        sectionId,
        props: { ...initialProps, ...(componentData.props || {}) }
    };

    // Pinned components (isSticky: true) always go to the specific "Pinned Section" at top
    // We check defaults if not present in passed props (though it should be merged)
    const isSticky = Boolean(initialProps.isSticky);

    if (isSticky) {
        // Find existing pinned items by checking their props
        const pinnedItems = components.filter(c => c.props?.isSticky);
        const otherItems = components.filter(c => !c.props?.isSticky);

        // Add new pinned item at the end of the pinned group
        return [...pinnedItems, newItem, ...otherItems];
    }

    // Normal components just go to the end
    return [...components, newItem];
}

/**
 * Remove a component from the list
 * @param {Array} components - Current components array
 * @param {number} uniqueId - Unique ID of component to remove
 * @returns {Array} New components array
 */
export function removeComponentFromList(components, uniqueId) {
    return components.filter(c => c.uniqueId !== uniqueId);
}


/**
 * Update component props
 * @param {Array} components - Current components array
 * @param {number} uniqueId - Unique ID of component to update
 * @param {Object} newProps - New props to merge
 * @returns {Array} New components array
 */
export function updateComponentProps(components, uniqueId, newProps) {
    return components.map(c =>
        c.uniqueId === uniqueId
            ? { ...c, props: { ...c.props, ...newProps } }
            : c
    );
}

/**
 * Recursively update IDs in props when section ID changes
 * @param {Object} props - Component props
 * @param {string} oldPrefix - Old ID prefix (e.g. "old-section-")
 * @param {string} newPrefix - New ID prefix (e.g. "new-section-")
 * @returns {Object} Updated props
 */
function recursivelyUpdateIds(props, oldPrefix, newPrefix) {
    if (!props || typeof props !== 'object') return props;

    if (Array.isArray(props)) {
        return props.map(item => recursivelyUpdateIds(item, oldPrefix, newPrefix));
    }

    const newProps = { ...props };
    Object.keys(newProps).forEach(key => {
        const value = newProps[key];

        // If it's an ID string matching the old prefix, update it
        if (typeof value === 'string' && value.startsWith(oldPrefix)) {
            const suffix = value.slice(oldPrefix.length);
            newProps[key] = `${newPrefix}${suffix}`;
        }
        // Recurse for objects/arrays
        else if (typeof value === 'object' && value !== null) {
            newProps[key] = recursivelyUpdateIds(value, oldPrefix, newPrefix);
        }
    });

    return newProps;
}

/**
 * Update component section ID
 * @param {Array} components - Current components array
 * @param {number} uniqueId - Unique ID of component to update
 * @param {string} newSectionId - New section ID
 * @returns {Array} New components array
 */
export function updateComponentSectionId(components, uniqueId, newSectionId) {
    return components.map(c => {
        if (c.uniqueId === uniqueId) {
            // Calculate prefixes - normalize by removing trailing dashes
            const oldSectionId = c.sectionId?.replace(/-+$/, '') || '';
            const normalizedNewSectionId = newSectionId?.replace(/-+$/, '') || '';
            const oldPrefix = `${oldSectionId}-`;
            const newPrefix = `${normalizedNewSectionId}-`;

            // Recursively update props that start with the old prefix
            const updatedProps = recursivelyUpdateIds(c.props, oldPrefix, newPrefix);

            return {
                ...c,
                sectionId: newSectionId, // Allow trailing dashes while typing; finalization happens on blur
                props: updatedProps
            };
        }
        return c;
    });
}

/**
 * Helper to check if a component is sticky (pinned)
 * Checks both props and defaults
 */
export const isComponentSticky = (comp) => {
    return comp.props?.isSticky ?? componentDefaults[comp.id]?.isSticky ?? false;
};

/**
 * Reorder components via drag and drop
 * @param {Array} components - Current components array
 * @param {number} fromIndex - Source index
 * @param {number} toIndex - Target index
 * @returns {Array} New components array
 */
export function reorderComponents(components, fromIndex, toIndex) {
    if (fromIndex === toIndex) return components;

    const item = components[fromIndex];
    const isPinned = isComponentSticky(item);

    // Filter list into pinned and others
    const pinnedItems = components.filter(isComponentSticky);
    const otherItems = components.filter(c => !isComponentSticky(c));

    // Calculate boundaries
    const pinnedCount = pinnedItems.length;

    // SCENARIO 1: Dragging a PINNED item
    if (isPinned) {
        // If user tries to drop outside pinned zone, clamp to valid range
        let targetIndex = toIndex;
        if (targetIndex >= pinnedCount) targetIndex = pinnedCount - 1;

        const newPinned = [...pinnedItems];
        // We need to find the *relative* index within the pinned list
        const fromRelative = pinnedItems.findIndex(c => c.uniqueId === item.uniqueId);
        // Remove from old pos
        newPinned.splice(fromRelative, 1);
        // Insert at new pos
        newPinned.splice(targetIndex, 0, item);

        return [...newPinned, ...otherItems];
    }

    // SCENARIO 2: Dragging a NORMAL item
    else {
        // If user tries to drop inside pinned zone, clamp to valid range (start of unpinned)
        // Adjust target index because the unified list includes pinned items at start
        let targetRelative = toIndex - pinnedCount;
        if (targetRelative < 0) targetRelative = 0;

        const newOthers = [...otherItems];
        const fromRelative = otherItems.findIndex(c => c.uniqueId === item.uniqueId);
        newOthers.splice(fromRelative, 1);
        newOthers.splice(targetRelative, 0, item);

        return [...pinnedItems, ...newOthers];
    }
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
