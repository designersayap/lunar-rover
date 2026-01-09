import styles from "../page.module.css";

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
        const padding = 8;
        const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

        // Decide whether to anchor Left or Right based on screen location
        const isRightHalf = position.left > windowWidth / 2;

        if (isRightHalf) {
            let idealRight = windowWidth - (position.left + width / 2);

            // Clamp: Must be at least `padding` away from screen edge
            idealRight = Math.max(padding, idealRight);

            popoverStyle = {
                position: "fixed",
                top: `${position.top}px`,
                right: `${idealRight}px`,
                left: "auto",
                margin: 0,
                pointerEvents: "auto",
                width: width,
                maxWidth: `calc(100vw - ${padding * 2}px)`
            };
        } else {
            // Anchor to LEFT edge
            let idealLeft = position.left - width / 2;

            // Clamp: Must be at least `padding` away from screen edge
            idealLeft = Math.max(padding, idealLeft);

            popoverStyle = {
                position: "fixed",
                top: `${position.top}px`,
                left: `${idealLeft}px`,
                right: "auto",
                margin: 0,
                pointerEvents: "auto",
                width: width,
                maxWidth: `calc(100vw - ${padding * 2}px)`
            };
        }
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
                data-builder-ui="true"
            >
                {children}
            </div>
        </>
    );
}
