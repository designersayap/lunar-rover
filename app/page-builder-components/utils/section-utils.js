
/**
 * Generates utility classes for section containers based on configuration
 * @param {Object} options
 * @param {boolean} options.removePaddingLeft - Remove left padding
 * @param {boolean} options.removePaddingRight - Remove right padding
 * @param {boolean} options.fullWidth - Remove max-width constraint
 * @returns {string} - Class names string
 */
export function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];

    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");

    return classes.join(" ");
}
