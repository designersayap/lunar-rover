"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import BuilderText from "./builder-text";
import { useBuilderSelection, BuilderSelectionContext } from "@/app/page-builder-components/utils/builder-controls";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";

/**
 * BuilderLink Component
 * Renders a link with consistent styling, ID generation, and editing capabilities.
 * Similar to BuilderButton but without button variant options in settings.
 * 
 * @param {string} label - Link text
 * @param {string} href - Link URL
 * @param {string} suffix - ID suffix
 * @param {string} sectionId - Parent section ID
 * @param {string} className - CSS classes
 * @param {function} onLabelChange - Callback when label changes
 * @param {function} onHrefChange - Callback when href changes
 */
export default function BuilderLink({
    label = "Link",
    id,
    href = "#",
    suffix,
    sectionId,
    className = "",
    onLabelChange,
    onIdChange,
    onHrefChange,
    onVisibilityChange,
    isVisible = true,
    style = {},
    iconLeft,
    iconRight
}) {
    const buttonRef = useRef(null);
    const wrapperRef = useRef(null); // Ref for the wrapper span
    const [popoverPosition, setPopoverPosition] = useState(null);
    const [overlayRect, setOverlayRect] = useState(null); // State for portal position

    const generatedId = sectionId ? (suffix ? `${sectionId}-${suffix}` : `${sectionId}-link`) : undefined;
    const buttonId = id || generatedId;
    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === buttonId;

    // Unique ID for this button's popover
    const myPopoverId = `popover-${buttonId}`;
    const showSettings = activePopoverId === myPopoverId;

    const prefix = sectionId ? `${sectionId}-` : "";
    const [tempId, setTempId] = useState("");

    useEffect(() => {
        if (buttonId && buttonId.startsWith(prefix)) {
            setTempId(buttonId.slice(prefix.length));
        } else {
            setTempId(buttonId);
        }
    }, [buttonId, prefix]);

    // Sync ID when sectionId changes
    const prevSectionIdRef = useRef(sectionId);
    useEffect(() => {
        const prevSectionId = prevSectionIdRef.current;
        if (prevSectionId && prevSectionId !== sectionId) {
            const oldPrefix = `${prevSectionId}-`;
            if (buttonId && buttonId.startsWith(oldPrefix)) {
                const suffixPart = buttonId.slice(oldPrefix.length);
                const newId = `${sectionId}-${suffixPart}`;
                if (onIdChange) {
                    onIdChange(newId);
                }
            }
        }
        prevSectionIdRef.current = sectionId;
    }, [sectionId, buttonId, onIdChange]);

    // Update overlay position
    useEffect(() => {
        if (isActive && wrapperRef.current) {
            const updatePosition = () => {
                if (wrapperRef.current) {
                    setOverlayRect(wrapperRef.current.getBoundingClientRect());
                }
            };

            updatePosition();
            // Capture scroll events to update position while scrolling
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);

            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isActive]);


    if (!isVisible && !isActive) return null;

    const handleClick = (e) => {
        // Prevent navigation in builder
        e.preventDefault();
        e.stopPropagation();
        if (buttonId) {
            setActiveElementId(buttonId);
        }
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!showSettings && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.bottom + 4, // 4px gap
                left: rect.left + rect.width / 2
            });
        }

        setActivePopoverId(prev => prev === myPopoverId ? null : myPopoverId);
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
            pointerEvents: 'none', // Allow clicking through the anchor area
            zIndex: 101 // Using global active overlay Z-index
        };

        return createPortal(
            <div style={anchorStyle}>
                <div className={styles.activeOverlay} style={{ pointerEvents: 'auto' }}>
                    <div className={styles.overlayLabel}>
                        <span className={styles.overlayIdText}>#{buttonId}</span>
                    </div>
                    <button
                        type="button"
                        className={`${styles.settingsButton} ${showSettings ? styles.settingsButtonActive : ''}`}
                        onClick={handleSettingsClick}
                    >
                        <Cog6ToothIcon className={styles.overlayIcon} />
                    </button>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <>
            <span
                ref={wrapperRef}
                className={`${isActive ? styles.activeWrapper : ''}`}
                style={{ display: 'inline-flex', position: 'relative', height: '100%', ...style }} // Propagate style to wrapper
                onClick={handleClick} // Move click handler to wrapper to capture all interactions
            >
                {isActive && <div className={styles.activeBorderOutline} />}

                <Link
                    id={buttonId}
                    href={href || "#"}
                    className={className}
                    style={{ opacity: isVisible ? 1 : 0.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'inherit', width: '100%', height: '100%' }}
                    data-tooltip={label}
                >
                    <div ref={buttonRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'inherit', width: '100%', height: '100%', position: 'relative' }}>
                        {iconLeft && <span style={{ display: 'flex', flexShrink: 0 }}>{iconLeft}</span>}
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                            <BuilderText
                                tagName="span"
                                content={label}
                                onChange={onLabelChange}
                                placeholder="Link Label"
                                multiline={false}
                                noId={true}
                                className={!isActive ? "truncate-1-line" : ""}
                                style={{ minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap' }}
                            />
                        </div>
                        {iconRight && <span style={{ display: 'flex', flexShrink: 0 }}>{iconRight}</span>}
                    </div>
                </Link>
            </span>

            {renderActiveOverlay()}

            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    url={href}
                    onUrlChange={onHrefChange}
                    showVariant={false} // Hide variant for BuilderLink
                    isVisible={isVisible}
                    onVisibilityChange={onVisibilityChange}
                    position={popoverPosition}
                />
            )}
        </>
    );
}
