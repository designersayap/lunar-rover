"use client";

import { useEffect, useRef, useState, useContext } from "react";
import styles from "../../../page.module.css";
import { useBuilderSelection, BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";

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
    // Context
    const { activeElementId, setActiveElementId } = useContext(BuilderSelectionContext);

    // Normalize sectionId
    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const generatedId = normalizedSectionId && elementProps ? `${normalizedSectionId}-${elementProps}` : undefined;
    const normalizedId = id?.replace(/-+/g, '-') || '';
    const elementId = normalizedId || generatedId;

    const isActive = activeElementId === elementId;
    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : "";
    const handleClick = (e) => {
        e.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    if (!isVisible && !isActive) return null;

    return (
        <Tag
            id={elementId}
            className={`${className} ${isActive ? styles.activeWrapper : ''}`}
            style={{ ...style, position: 'relative' }}
            onClick={handleClick}
        >
            {isActive && <div className={styles.activeBorderOutline} />}
            {isActive && (
                <div className={styles.activeOverlay}>
                    <div className={styles.overlayLabel}>
                        <span className={styles.overlayIdText}>#{elementId}</span>
                    </div>
                </div>
            )}
            {children}
        </Tag>
    );
}
