/**
 * Helper utilities for template components
 */

/**
 * Creates an update handler function for component props
 * @param {Function} onUpdate - The component's onUpdate callback
 */
export const createUpdateHandler = (onUpdate) => (key) => (value) => {
    onUpdate?.({ [key]: value });
};
