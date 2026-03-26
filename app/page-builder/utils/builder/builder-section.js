
"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { createPortal } from "react-dom"; // Added
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay"; // Added
import { Cog6ToothIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";
import { getContainerClasses } from "../section-utils";

// Helper to check if a component is pinned (sticky)
import { isComponentSticky } from "../component-manager";

export default function BuilderSection({
    sectionId,
    fullWidth = false,
    removePaddingLeft = false,
    removePaddingRight = false,
    onUpdate,
    children,
    className = "",
    style = {},
    isVisible = true,
    tagName = "div",
    innerContainer = false,
    isOverlay = false, // Added prop
    showFullWidthControl = true, 
    showFullWidthOnStaging = false, // New prop
    showMenuColorToggle = false, 
    menuColor, 
    showFloatingToggle = false, 
    hasFloatingEffect = true, 
    showAutoScrollToggle = false, 
    showAutoScrollOnStaging = false, // New prop
    autoScroll = true, 
    autoScrollEffect = 'slide', 
    marqueeDuration = 120 
}) {
    const sectionRef = useRef(null);
    const [popoverPosition, setPopoverPosition] = useState(null);

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, isStaging } = useContext(BuilderSelectionContext);

    // Use sectionId as identifier (must be unique)
    const elementId = sectionId;
    const isActive = activeElementId === elementId;
    const myPopoverBase = `popover-${elementId}`;
    const showSettings = activePopoverId && activePopoverId.startsWith(myPopoverBase);
    const isStyleOpen = activePopoverId === `${myPopoverBase}-style`;

    const [overlayRect, setOverlayRect] = useState(null);

    // Overlay Constraint Logic:
    // Only show "Overlay Content" setting if Component is Pinned (Sticky)
    const currentComponent = selectedComponents?.find(c => c.sectionId === sectionId || c.uniqueId === sectionId);
    // If not found, default to false (safe) or true? Default false matches "only pinned".
    const isSticky = currentComponent ? (isComponentSticky(currentComponent) || currentComponent._isSticky) : false;

    // Always show Overlay Toggle ONLY if sticky
    const showOverlayToggle = isSticky;

    useEffect(() => {
        if (isActive && sectionRef.current) {
            const updatePosition = () => {
                if (sectionRef.current) {
                    const rect = sectionRef.current.getBoundingClientRect();
                    setOverlayRect(rect);
                    if (showSettings) {
                        setPopoverPosition({
                            top: rect.top,
                            left: rect.left + rect.width / 2
                        });
                    }
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
    }, [isActive, showSettings]);

    // Hook must be called unconditionally
    const overlayStyle = useActiveOverlayPosition(overlayRect);

    if (!isVisible && !isActive) return null;

    const handleClick = (e) => {
        // Prevent bubbling to parent elements
        e.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    const handleStyleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isStyleOpen && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }

        setActivePopoverId(prev => prev === `${myPopoverBase}-style` ? null : `${myPopoverBase}-style`);
    };
    const handleLayoutChange = (changes) => {
        if (onUpdate) {
            onUpdate(changes);
        }
    };

    const containerClasses = getContainerClasses({
        fullWidth: fullWidth === true || fullWidth === "true",
        removePaddingLeft,
        removePaddingRight
    });

    const rootContainerClasses = !innerContainer ? containerClasses : "";
    const innerContainerClasses = innerContainer ? containerClasses : "";

    const combinedClassName = `${rootContainerClasses} ${className} ${isActive ? styles.activeWrapper : ''}`.trim();

    const Tag = tagName;

    // Visibility Logic for Staging
    const hasFullWidth = !isStaging || showFullWidthOnStaging;
    const hasAutoScroll = !isStaging || showAutoScrollOnStaging;
    const hasOverlayToggle = !isStaging && showOverlayToggle; // Usually hide section-level sticky/overlay on staging
    const hasMenuColor = !isStaging && showMenuColorToggle;
    const hasFloating = !isStaging && showFloatingToggle;

    return (
        <>
            <Tag
                ref={sectionRef}
                id={elementId}
                className={combinedClassName}
                onClick={handleClick}
                style={style}
            >
                {isActive && <div className={styles.activeBorderOutline} />}

                {
                    innerContainer ? (
                        <div className={innerContainerClasses} >
                            {children}
                        </div>
                    ) : (
                        children
                    )}
            </Tag >

            {isActive && overlayRect && createPortal(
                <div
                    className={styles.activeOverlay}
                    style={overlayStyle}
                >
                    <div className={styles.overlayLabel}>
                        <span className={styles.overlayIdText}>#{elementId}</span>
                    </div>
                    {!!onUpdate && (() => {
                        const showSettingsBtn = (hasFullWidth && showFullWidthControl) || 
                                              (hasAutoScroll && showAutoScrollToggle) || 
                                              hasOverlayToggle || hasMenuColor || hasFloating;

                        if (!showSettingsBtn) return null;

                        return (
                            <button
                                type="button"
                                className={`${styles.settingsButton} ${isStyleOpen ? styles.settingsButtonActive : ''}`}
                                onClick={handleStyleSettingsClick}
                                data-tooltip="Style Settings"
                            >
                                <PaintBrushIcon className={styles.overlayIcon} />
                            </button>
                        );
                    })()}
                </div>,
                document.body
            )}

            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    position={popoverPosition}
                    mode="style"
                    fullWidth={fullWidth}
                    removePaddingLeft={removePaddingLeft}
                    removePaddingRight={removePaddingRight}
                    onLayoutChange={handleLayoutChange}
                    showLinkType={false} 
                    showVariant={false} 
                    showUrl={false} 
                    url={""}

                    // Overlay Props
                    showOverlayToggle={hasOverlayToggle}
                    isOverlay={isOverlay}
                    onOverlayChange={(val) => onUpdate && onUpdate({ isOverlay: val })}
                    // Menu Color Props
                    showMenuColorToggle={hasMenuColor}
                    menuColor={menuColor}
                    onMenuColorChange={(val) => onUpdate && onUpdate({ menuColor: val })}

                    // Floating Effect Props
                    showFloatingToggle={hasFloating}
                    hasFloatingEffect={hasFloatingEffect}
                    onFloatingEffectChange={(val) => onUpdate && onUpdate({ hasFloatingEffect: val })}

                    // Auto Scroll Props
                    // Auto Scroll Props
                    autoScroll={autoScroll}
                    onAutoScrollChange={(val) => onUpdate && onUpdate({ autoScroll: val })}
                    autoScrollEffect={autoScrollEffect}
                    onAutoScrollEffectChange={(val) => onUpdate && onUpdate({ autoScrollEffect: val })}
                    marqueeDuration={marqueeDuration}
                    onMarqueeDurationChange={(val) => onUpdate && onUpdate({ marqueeDuration: val })}

                    // Staging Visibility Overrides
                    showFullWidthToggle={(hasFullWidth && showFullWidthControl) && (!isStaging || showFullWidthOnStaging)}
                    showAutoScrollToggle={(hasAutoScroll && showAutoScrollToggle) && (!isStaging || showAutoScrollOnStaging)}
                    
                    isVisible={isVisible}
                    onVisibilityChange={(val) => onUpdate && onUpdate({ isVisible: val })}
                    popoverTitle="Section Settings"
                />
            )
            }
        </>
    );
}
