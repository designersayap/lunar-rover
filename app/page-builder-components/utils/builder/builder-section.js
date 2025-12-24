
"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { useBuilderSelection, BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";
import { getContainerClasses } from "../section-utils";

/**
 * BuilderSection: Wraps content with builder controls (selection, settings) and container styling.
 */
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
    innerContainer = false
}) {
    const sectionRef = useRef(null);
    const [popoverPosition, setPopoverPosition] = useState(null);

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId } = useContext(BuilderSelectionContext);

    // Use sectionId as identifier (must be unique)
    const elementId = sectionId;
    const isActive = activeElementId === elementId;
    const myPopoverId = `popover-${elementId}`;
    const showSettings = activePopoverId === myPopoverId;

    const [overlayRect, setOverlayRect] = useState(null);

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

    if (!isVisible && !isActive) return null;

    const handleClick = (e) => {
        // Prevent bubbling to parent elements
        e.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!showSettings && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }

        setActivePopoverId(prev => prev === myPopoverId ? null : myPopoverId);
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

                {isActive && (
                    <div
                        className={styles.activeOverlay}
                        style={{
                            top: overlayRect ? Math.max(-24, 42 - overlayRect.top) : -24
                        }}
                    >
                        <div className={styles.overlayLabel}>
                            <span className={styles.overlayIdText}>#{elementId}</span>
                        </div>
                        <button
                            type="button"
                            className={`${styles.settingsButton} ${showSettings ? styles.settingsButtonActive : ''}`}
                            onClick={handleSettingsClick}
                        >
                            <Cog6ToothIcon className={styles.overlayIcon} />
                        </button>
                    </div>
                )}


                {
                    innerContainer ? (
                        <div className={innerContainerClasses} >
                            {children}
                        </div>
                    ) : (
                        children
                    )}
            </Tag >

            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    position={popoverPosition}
                    fullWidth={fullWidth}
                    removePaddingLeft={removePaddingLeft}
                    removePaddingRight={removePaddingRight}
                    onLayoutChange={handleLayoutChange}
                    showLinkType={false}
                    showVariant={false}
                    showUrl={false}
                    url={""}
                />
            )
            }
        </>
    );
}
