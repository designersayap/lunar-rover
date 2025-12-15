"use client";

import { useEffect, useRef, useState, useContext } from "react";
import styles from "../../../page.module.css";
import { useActiveOverlay, ActiveOverlayPortal } from "../hooks/use-active-overlay";

export default function BuilderElement({
    tagName: Tag = "div",
    className = "",
    style = {},
    children,
    id,
    elementProps,
    sectionId,
    onIdChange,
    isVisible = true
}) {
    // Normalize user ID logic (keep existing normalization logic)
    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const generatedId = normalizedSectionId && elementProps ? `${normalizedSectionId}-${elementProps}` : undefined;
    const normalizedId = id?.replace(/-+/g, '-') || '';
    const elementId = normalizedId || generatedId;

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
