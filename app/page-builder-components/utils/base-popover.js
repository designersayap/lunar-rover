import styles from "../../page.module.css";

/**
 * BasePopover: Shared wrapper for all popover components with consistent styling and positioning.
 */
export default function BasePopover({
    isOpen,
    onClose,
    position,
    className = "",
    centerByDefault = true,
    width = 362,
    children
}) {
    if (!isOpen) return null;

    // Calculate constrained position
    let popoverStyle = centerByDefault ? {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        pointerEvents: "auto"
    } : {};

    if (position && typeof window !== 'undefined') {
        const padding = 16;
        const windowWidth = window.innerWidth;
        const minLeft = width / 2 + padding;
        const maxLeft = windowWidth - width / 2 - padding;
        const constrainedLeft = Math.max(minLeft, Math.min(position.left, maxLeft));

        popoverStyle = {
            position: "fixed",
            top: `${position.top}px`,
            left: `${constrainedLeft}px`,
            transform: "translateX(-50%)",
            margin: 0,
            pointerEvents: "auto"
        };
    }

    return (
        <>
            <div
                className={styles.popoverOverlay}
                onClick={onClose}
                style={{ pointerEvents: onClose ? "auto" : "none" }}
            />
            <div
                className={`${styles.popoverContainer} ${className}`}
                style={popoverStyle}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </>
    );
}
