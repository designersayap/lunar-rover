// Component management utilities for the template builder

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

    return [...components, {
        ...componentData,
        uniqueId: Date.now(),
        sectionId,
        props: { ...initialProps, ...(componentData.props || {}) }
    }];
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
 * Move a component up in the list
 * @param {Array} components - Current components array
 * @param {number} index - Index of component to move
 * @returns {Array} New components array
 */
export function moveComponentUp(components, index) {
    if (index === 0) return components;
    const arr = [...components];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    return arr;
}

/**
 * Move a component down in the list
 * @param {Array} components - Current components array
 * @param {number} index - Index of component to move
 * @returns {Array} New components array
 */
export function moveComponentDown(components, index) {
    if (index >= components.length - 1) return components;
    const arr = [...components];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    return arr;
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
 * Reorder components via drag and drop
 * @param {Array} components - Current components array
 * @param {number} fromIndex - Source index
 * @param {number} toIndex - Target index
 * @returns {Array} New components array
 */
export function reorderComponents(components, fromIndex, toIndex) {
    if (fromIndex === toIndex) return components;
    const arr = [...components];
    const [item] = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item);
    return arr;
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
