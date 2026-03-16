// ... imports
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "../../../page.module.css";
import { createPortal } from "react-dom";
import { useBuilderSelection } from "@/app/page-builder/utils/builder/builder-controls";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay";
import { useIdSync } from "../hooks/use-id-sync";

export default function BuilderElement({
    tagName: Tag = "div",
    className = "",
    style = {},
    children,
    id,
    elementProps,
    sectionId,
    onIdChange,
    isVisible = true,
    ref
}) {
    const { elementId } = useIdSync({
        id,
        sectionId,
        suffix: elementProps || "element",
        onIdChange
    });

    const { selectedComponents, toggleElementSelection } = useBuilderSelection();
    const isActive = selectedComponents?.some(c => c.uniqueId === elementId) || false;
    const [overlayRect, setOverlayRect] = useState(null);

    // Use layout effect to prevent visual jitter on selection
    const safeUseLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    safeUseLayoutEffect(() => {
        if (isActive && wrapperRef.current) {
            let rafId;
            const updatePosition = () => {
                if (wrapperRef.current) {
                    setOverlayRect(wrapperRef.current.getBoundingClientRect());
                }
            };

            const onScrollOrResize = () => {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(updatePosition);
            };

            updatePosition();
            window.addEventListener('scroll', onScrollOrResize, true);
            window.addEventListener('resize', onScrollOrResize);

            return () => {
                window.removeEventListener('scroll', onScrollOrResize, true);
                window.removeEventListener('resize', onScrollOrResize);
                cancelAnimationFrame(rafId);
            };
        } else {
            setOverlayRect(null);
        }
    }, [isActive]);

    const handleActivate = (e) => {
        e.stopPropagation();
        if (toggleElementSelection) {
            toggleElementSelection({
                uniqueId: elementId,
                type: 'element',
                sectionId: sectionId
            }, e.metaKey || e.ctrlKey);
        }
    };

    const overlayStyle = useActiveOverlayPosition(overlayRect);

    if (!isVisible && !isActive) return null;

    return (
        <>
            <Tag
                id={elementId}
                ref={ref}
                className={`${className} ${isActive ? styles.activeWrapper : ''}`}
                style={{ ...style, position: 'relative' }}
                onClick={handleActivate}
            >
                {isActive && <div className={styles.activeBorderOutline} />}
                {children}
            </Tag>

            {isActive && overlayRect && createPortal(
                <div
                    className={styles.activeOverlay}
                    style={overlayStyle}
                >
                    <span className={styles.activeOverlayLabel}>{elementProps || "Element"}</span>
                </div>,
                document.body
            )}
        </>
    );
}
