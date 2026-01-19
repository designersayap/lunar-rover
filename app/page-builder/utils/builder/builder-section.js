
"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { createPortal } from "react-dom"; // Added
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay"; // Added
import { Cog6ToothIcon, SparklesIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";
import { getContainerClasses } from "../section-utils";

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
    const myPopoverBase = `popover-${elementId}`;
    const showSettings = activePopoverId && activePopoverId.startsWith(myPopoverBase);
    const isStyleOpen = activePopoverId === `${myPopoverBase}-style`;

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
                    {!!onUpdate && (
                        <button
                            type="button"
                            className={`${styles.settingsButton} ${isStyleOpen ? styles.settingsButtonActive : ''}`}
                            onClick={handleStyleSettingsClick}
                        >
                            <SparklesIcon className={styles.overlayIcon} />
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
