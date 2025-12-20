"use client";

import { useIdSync } from "../hooks/use-id-sync";
import styles from "../../../page.module.css";
import { useActiveOverlay, ActiveOverlayPortal } from "../hooks/use-active-overlay";

export default function BuilderElement({
    tagName: Tag = "div",
    className = "",
    style = {},
    children,
    id,
    elementProps, // serving as suffix
    sectionId,
    onIdChange,
    isVisible = true
}) {
    // Use standardized ID hook
    const { elementId } = useIdSync({
        id,
        sectionId,
        suffix: elementProps || "element",
        onIdChange
    });

    // Use hook for active state and overlay
    const {
        wrapperRef,
        overlayRect,
        isActive,
        handleActivate
    } = useActiveOverlay(elementId);

    if (!isVisible && !isActive) return null;

    return (
        <>
            <Tag
                id={elementId}
                ref={wrapperRef}
                className={`${className} ${isActive ? styles.activeWrapper : ''}`}
                style={{ ...style, position: 'relative' }}
                onClick={handleActivate}
            >
                {isActive && <div className={styles.activeBorderOutline} />}
                {children}
            </Tag>

            <ActiveOverlayPortal
                isActive={isActive}
                overlayRect={overlayRect}
                elementId={elementId}
            />
        </>
    );
}
