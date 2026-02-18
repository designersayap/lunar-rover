
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
    showFullWidthControl = true, // Added prop
    showMenuColorToggle = false, // Added prop
    menuColor // Added prop
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
                    {!!onUpdate && !isStaging && (
                        <button
                            type="button"
                            className={`${styles.settingsButton} ${isStyleOpen ? styles.settingsButtonActive : ''}`}
                            onClick={handleStyleSettingsClick}
                        >
                            <PaintBrushIcon className={styles.overlayIcon} />
                        </button>
                    )}
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
                    showLinkType={false} // Section doesn't have link type
                    showVariant={false} // Section doesn't have variant
                    showUrl={false} // Section doesn't have URL
                    url={""}

                    // Overlay Props
                    showOverlayToggle={showOverlayToggle}
                    isOverlay={isOverlay}
                    onOverlayChange={(val) => onUpdate && onUpdate({ isOverlay: val })}
                    showFullWidthToggle={showFullWidthControl}

                    // Menu Color Props
                    showMenuColorToggle={showMenuColorToggle}
                    menuColor={menuColor}
                    onMenuColorChange={(val) => onUpdate && onUpdate({ menuColor: val })}
                />
            )
            }
        </>
    );
}
