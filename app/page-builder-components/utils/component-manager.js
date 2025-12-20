// Component management utilities for the template builder
import { componentDefaults } from "@/app/template-components/content/data";

/**
 * Add a new component to the list.
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
 * Remove a component from the list.
 */
export function removeComponentFromList(components, uniqueId) {
    return components.filter(c => c.uniqueId !== uniqueId);
}


/**
 * Helper to set value at path immutably (supports dot notation).
 */
function setIn(obj, path, value) {
    if (!path || path.length === 0) return value;

    const [head, ...rest] = Array.isArray(path) ? path : path.split('.');

    // Handle the leaf case
    if (rest.length === 0) {
        if (Array.isArray(obj)) {
            const newArr = [...obj];
            newArr[Number(head)] = value;
            return newArr;
        }
        return { ...obj, [head]: value };
    }

    // Recursive step
    const nextObj = obj && obj[head] ? obj[head] : (isNaN(Number(rest[0])) ? {} : []);

    if (Array.isArray(obj)) {
        const newArr = [...obj];
        newArr[Number(head)] = setIn(nextObj, rest, value);
        return newArr;
    }

    return {
        ...obj,
        [head]: setIn(nextObj, rest, value)
    };
}

/**
 * Helper to get value at path (supports dot notation).
 */
export function getValueAt(obj, path) {
    if (!path || !obj) return undefined;

    // If path is a key that exists directly, return it (optimization/fallback)
    if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];

    const parts = path.split('.');
    let current = obj;

    for (const part of parts) {
        if (current === null || current === undefined) return undefined;
        current = current[part];
    }

    return current;
}

/**
 * Update component props.
 */
export function updateComponentProps(components, uniqueId, newProps) {
    return components.map(c => {
        if (c.uniqueId !== uniqueId) return c;

        let updatedProps = { ...c.props };

        Object.keys(newProps).forEach(key => {
            const value = newProps[key];
            if (key.includes('.')) {
                // Handle nested update (e.g. "menuItems.0.linkVisible")
                updatedProps = setIn(updatedProps, key, value);
            } else {
                // Standard shallow update
                updatedProps[key] = value;
            }
        });

        return { ...c, props: updatedProps };
    });
}

/**
 * Recursively update IDs in props when section ID changes.
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
 * Update component section ID.
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
 * Helper to check if a component is sticky (pinned).
 */
export const isComponentSticky = (comp) => {
    return comp.props?.isSticky ?? componentDefaults[comp.id]?.isSticky ?? false;
};

/**
 * Reorder components via drag and drop.
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
 * Generate unique section ID from category name.
 */
export function generateSectionId(category) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${slug}-${random}`;
}
