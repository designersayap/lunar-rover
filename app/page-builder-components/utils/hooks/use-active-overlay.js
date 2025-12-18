"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import styles from "../../../page.module.css";

/**
 * Custom hook for managing active element overlay
 * Provides:
 * - Overlay position tracking
 * - Active state management
 * - Portal rendering helper
 * 
 * @param {string} elementId - The unique ID of the element
 * @returns {Object} Hook state and helpers
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
 * Renders the active overlay portal
 * @param {Object} props - Component props
 * @param {boolean} props.isActive - Whether element is active
 * @param {DOMRect} props.overlayRect - Position rect
 * @param {string} props.elementId - Element ID to display
 * @param {React.ReactNode} props.actions - Optional action buttons
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
