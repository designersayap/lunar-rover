"use client";

import { useContext, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import { useIdSync } from "../hooks/use-id-sync";
import styles from "../../../page.module.css";

/**
 * BuilderImage Component
 * Renders an image with consistent styling and placeholder support.
 */
export default function BuilderImage({
    src,
    alt = "#",
    className = "",
    style = {},
    id,
    sectionId,
    isVisible = true,
    onVisibilityChange,
    onIdChange,
    suffix
}) {
    // ID Sync Hook
    const { elementId } = useIdSync({ id, sectionId, suffix: suffix || "image", onIdChange });

    // Context
    const { activeElementId, setActiveElementId } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === elementId;

    // Overlay position
    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);

    // Update overlay position when active
    useEffect(() => {
        if (isActive && wrapperRef.current) {
            const updatePosition = () => {
                if (wrapperRef.current) {
                    setOverlayRect(wrapperRef.current.getBoundingClientRect());
                }
            };

            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);

            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isActive]);

    if (!isVisible) return null;

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    // Render Portal for Active Overlay
    const renderActiveOverlay = () => {
        if (!isActive || !overlayRect) return null;

        const anchorStyle = {
            position: 'fixed',
            top: overlayRect.top,
            left: overlayRect.left,
            width: overlayRect.width,
            height: overlayRect.height,
            pointerEvents: 'none',
            zIndex: 101
        };

        return createPortal(
            <div style={anchorStyle}>
                <div className={styles.activeOverlay} style={{ pointerEvents: 'auto' }}>
                    <div className={styles.overlayLabel}>
                        <span className={styles.overlayIdText}>#{elementId}</span>
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    const imageSrc = src || "/images/placeholder.svg";
    const isPlaceholder = !src || src === "/images/placeholder.svg";
    const finalStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        backgroundColor: isPlaceholder ? "#676767" : "transparent",
        opacity: isVisible ? 1 : 0.5,
        ...style
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className={`${isActive ? styles.activeWrapper : ''} ${className}`}
                style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}
                onClick={handleClick}
            >
                {isActive && <div className={styles.activeBorderOutline} />}
                <img
                    id={elementId}
                    src={imageSrc}
                    alt={alt}
                    style={finalStyle}
                />
            </div>
            {renderActiveOverlay()}
        </>
    );
}
