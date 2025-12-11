/**
 * Helper utilities for template components
 */

/**
 * Creates an update handler function for component props
 * Reduces boilerplate by generating callback functions
 * 
 * @param {Function} onUpdate - The component's onUpdate callback
 * @param {string} key - The prop key to update
 * @returns {Function} Handler function that updates the specified key
 * 
 * @example
 * const updateHandler = createUpdateHandler(onUpdate);
 * <BuilderButton onLabelChange={updateHandler('buttonText')} />
 */
export const createUpdateHandler = (onUpdate) => (key) => (value) => {
    onUpdate?.({ [key]: value });
};
