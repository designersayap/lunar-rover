// Component management utilities for the template builder
import { componentDefaults } from "@/app/templates/content/data";
import { componentLibrary } from "@/app/page-builder/content/component-library";

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
 * Remove a component from the list (recursive).
 */
export function removeComponentFromList(components, uniqueId) {
    return components.reduce((acc, c) => {
        if (c.uniqueId === uniqueId) return acc;

        if (c.props?.components) {
            return [...acc, {
                ...c,
                props: {
                    ...c.props,
                    components: removeComponentFromList(c.props.components, uniqueId)
                }
            }];
        }

        return [...acc, c];
    }, []);
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
 * Update component props (recursive).
 */
export function updateComponentProps(components, uniqueId, newProps) {
    return components.map(c => {
        // Match found at this level
        if (c.uniqueId === uniqueId) {
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
        }

        // Check children if exists
        if (c.props?.components) {
            return {
                ...c,
                props: {
                    ...c.props,
                    components: updateComponentProps(c.props.components, uniqueId, newProps)
                }
            };
        }

        return c;
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
 * Update component section ID (recursive).
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

        // Check children
        if (c.props?.components) {
            return {
                ...c,
                props: {
                    ...c.props,
                    components: updateComponentSectionId(c.props.components, uniqueId, newSectionId)
                }
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
export function reorderComponents(components, from, to) {
    // Legacy support for plain indices
    const fromIndex = typeof from === 'object' ? from.index : from;
    const toIndex = typeof to === 'object' ? to.index : to;
    const parentId = typeof from === 'object' ? from.parentId : null;

    if (parentId && parentId !== 'main') {
        // Deep reorder inside a group
        return components.map(comp => {
            if (comp.uniqueId === parentId) {
                const list = comp.props.components || [];
                const newList = [...list];

                // Safety check
                if (fromIndex >= newList.length || toIndex > newList.length) return comp;

                const [removed] = newList.splice(fromIndex, 1);
                newList.splice(toIndex, 0, removed);

                return {
                    ...comp,
                    props: {
                        ...comp.props,
                        components: newList
                    }
                };
            }
            return comp;
        });
    }

    // Top-level reorder (handles pinned vs page layers internally via sticky check)
    if (typeof from === 'object' && from.parentId && from.parentId !== 'main') {

        return components;
    }

    const result = Array.from(components);
    const itemUniqueId = typeof from === 'object' ? from.uniqueId : null;

    // Fallback to index if uniqueId not provided, but prefer uniqueId
    let item;
    if (itemUniqueId) {
        item = result.find(c => c.uniqueId === itemUniqueId);
    } else {
        item = result[fromIndex];
    }

    if (!item) return result;

    // Existing Top-level Logic
    const isPinned = isComponentSticky(item);
    const pinnedItems = result.filter(isComponentSticky);
    const otherItems = result.filter(c => !isComponentSticky(c));
    const pinnedCount = pinnedItems.length;

    if (isPinned) {
        let targetIndex = toIndex;
        if (targetIndex >= pinnedCount) targetIndex = pinnedCount - 1;

        const newPinned = [...pinnedItems];
        const fromRelative = pinnedItems.findIndex(c => c.uniqueId === item.uniqueId);
        if (fromRelative !== -1) {
            newPinned.splice(fromRelative, 1);
            newPinned.splice(targetIndex, 0, item);
        }
        return [...newPinned, ...otherItems];
    } else {
        let targetRelative = toIndex - pinnedCount;
        if (targetRelative < 0) targetRelative = 0;

        const newOthers = [...otherItems];
        const fromRelative = otherItems.findIndex(c => c.uniqueId === item.uniqueId);
        if (fromRelative !== -1) {
            newOthers.splice(fromRelative, 1);
            newOthers.splice(targetRelative, 0, item);
        }
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
    const queryTerms = query ? query.toLowerCase().split(/\s+/).filter(Boolean) : [];
    const filteredLibrary = {};

    Object.keys(library).forEach(category => {
        const lowerCategory = category.toLowerCase();

        const filteredComponents = library[category].filter(component => {
            if (component.hidden) return false;

            if (!query) return true;

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

/**
 * Group selected components into a Parallax Group.
 */
export function groupComponents(components, selectedUniqueIds) {
    if (!selectedUniqueIds || selectedUniqueIds.length === 0) return components;

    // 1. Identify components to group
    const itemsToGroup = components.filter(c => selectedUniqueIds.includes(c.uniqueId));

    if (itemsToGroup.length === 0) return components;

    // 3. Create new Parallax Group
    const newGroupId = Date.now();

    // We need to resolve the component definition to assign the 'component' prop
    let scrollGroupDef = null;
    Object.values(componentLibrary).forEach(category => {
        const found = category.find(c => c.id === "scroll-group");
        if (found) scrollGroupDef = found;
    });

    const groupComponent = {
        id: "scroll-group",
        name: "Scroll Group",
        uniqueId: newGroupId,
        sectionId: generateSectionId("scroll-group"),
        component: scrollGroupDef?.component,
        props: {
            ...componentDefaults["scroll-group"],
            components: itemsToGroup
        }
    };

    const finalList = [];
    let groupInserted = false;

    for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        if (selectedUniqueIds.includes(comp.uniqueId)) {
            if (!groupInserted) {
                finalList.push(groupComponent);
                groupInserted = true;
            }
        } else {
            finalList.push(comp);
        }
    }

    return finalList;
}

/**
 * Ungroup a Parallax Group.
 */
export function ungroupComponent(components, groupUniqueId) {
    const groupIndex = components.findIndex(c => c.uniqueId === groupUniqueId);
    if (groupIndex === -1) return components;

    const group = components[groupIndex];

    // Safety check
    if (group.id !== "scroll-group" && !group.props?.components) return components;

    const children = group.props.components || [];

    // Insert children at group's position
    const newComponents = [...components];
    newComponents.splice(groupIndex, 1, ...children);

    return newComponents;
}

/**
 * Find a component by ID (recursive).
 */
export function findComponentById(components, uniqueId) {
    for (const component of components) {
        if (component.uniqueId === uniqueId) {
            return component;
        }

        if (component.props?.components) {
            const found = findComponentById(component.props.components, uniqueId);
            if (found) return found;
        }
    }
    return null;
}
