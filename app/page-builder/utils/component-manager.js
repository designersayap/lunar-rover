// Component management utilities for the template builder
import { componentDefaults } from "@/app/template-components/content/data";

/**
 * Add a new component to the list.
 */
export function addComponentToList(components, componentData, sectionId) {
    // Build initial props
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

    const isSticky = Boolean(initialProps.isSticky);

    if (isSticky) {
        const pinnedItems = components.filter(c => c.props?.isSticky);
        const otherItems = components.filter(c => !c.props?.isSticky);

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
 * Set value at path immutably.
 */
function setIn(obj, path, value) {
    if (!path || path.length === 0) return value;

    const [head, ...rest] = Array.isArray(path) ? path : path.split('.');

    // Handle leaf case
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
 * Get value at path.
 */
export function getValueAt(obj, path) {
    if (!path || !obj) return undefined;

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
                updatedProps = setIn(updatedProps, key, value);
            } else {
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
            const oldSectionId = c.sectionId?.replace(/-+$/, '') || '';
            const normalizedNewSectionId = newSectionId?.replace(/-+$/, '') || '';
            const oldPrefix = `${oldSectionId}-`;
            const newPrefix = `${normalizedNewSectionId}-`;

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

    if (isPinned) {
        let targetIndex = toIndex;
        if (targetIndex >= pinnedCount) targetIndex = pinnedCount - 1;

        const newPinned = [...pinnedItems];
        const fromRelative = pinnedItems.findIndex(c => c.uniqueId === item.uniqueId);
        newPinned.splice(fromRelative, 1);
        newPinned.splice(targetIndex, 0, item);

        return [...newPinned, ...otherItems];
    } else {
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

/**
 * Filters the component library based on a search query.
 */
export const searchComponents = (query, library) => {
    if (!query) return library;

    const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const filteredLibrary = {};

    Object.keys(library).forEach(category => {
        const lowerCategory = category.toLowerCase();

        const filteredComponents = library[category].filter(component => {
            const lowerName = component.name.toLowerCase();
            const combinedSearchableText = `${lowerCategory} ${lowerName}`;
            return queryTerms.every(term => combinedSearchableText.includes(term));
        });

        if (filteredComponents.length > 0) {
            filteredLibrary[category] = filteredComponents;
        }
    });

    return filteredLibrary;
};
