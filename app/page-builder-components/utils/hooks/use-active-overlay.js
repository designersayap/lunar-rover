"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import styles from "../../../page.module.css";

/**
 * useActiveOverlay: Manages position tracking and active state for the builder overlay.
 */
export function useActiveOverlay(elementId) {
    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === elementId;

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

    // Handle click to activate element
    const handleActivate = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    return {
        wrapperRef,
        overlayRect,
        isActive,
        setActiveElementId,
        activePopoverId,
        setActivePopoverId,
        handleActivate
    };
}

/**
 * ActiveOverlayPortal: Renders the active overlay UI via a portal.
 */
export function ActiveOverlayPortal({ isActive, overlayRect, elementId, actions }) {
    if (!isActive || !overlayRect) return null;

    const anchorStyle = {
        position: 'fixed',
        top: overlayRect.top,
        left: overlayRect.left,
        width: overlayRect.width,
        height: overlayRect.height,
        pointerEvents: 'none'
    };

    return createPortal(
        <div style={anchorStyle} className="z-system-builder-overlay" data-builder-ui>
            <div className={styles.activeOverlay} style={{ pointerEvents: 'auto' }}>
                <div className={styles.overlayLabel}>
                    <span className={styles.overlayIdText}>#{elementId}</span>
                </div>
                {actions}
            </div>
        </div>,
        document.body
    );
}
