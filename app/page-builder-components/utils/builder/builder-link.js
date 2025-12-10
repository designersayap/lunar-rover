"use client";

import Link from "next/link";
import { useState, useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import BuilderText from "./builder-text";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import { useIdSync } from "../hooks/use-id-sync";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";

/**
 * BuilderLink Component
 * Renders a link with consistent styling, ID generation, and editing capabilities.
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
    iconRight,
    justify = "center",
    fullWidth = false
}) {
    // ID Sync Hook
    const { elementId } = useIdSync({ id, sectionId, suffix: suffix || "link", onIdChange });

    // Context
    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === elementId;

    // Popover state
    const myPopoverId = `popover-${elementId}`;
    const showSettings = activePopoverId === myPopoverId;
    const [popoverPosition, setPopoverPosition] = useState(null);

    // Overlay position
    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);

    // Display style
    const displayStyle = fullWidth ? 'flex' : 'inline-flex';
    const widthStyle = fullWidth ? '100%' : undefined;

    // Update overlay position when active
    // Update overlay position when active
    useEffect(() => {
        if (isActive && wrapperRef.current) {
            const updatePosition = () => {
                if (wrapperRef.current) {
                    const rect = wrapperRef.current.getBoundingClientRect();
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

    if (!isVisible) return null;

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!showSettings && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
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
            pointerEvents: 'none',
            zIndex: 101
        };

        return createPortal(
            <div style={anchorStyle}>
                <div
                    className={styles.activeOverlay}
                    style={{
                        pointerEvents: 'auto',
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
            </div>,
            document.body
        );
    };

    return (
        <>
            <span
                ref={wrapperRef}
                className={`${isActive ? styles.activeWrapper : ''}`}
                style={{ display: displayStyle, position: 'relative', height: '100%', width: widthStyle, ...style }}
                onClick={handleClick}
            >
                {isActive && <div className={styles.activeBorderOutline} />}

                <Link
                    id={elementId}
                    href={href || "#"}
                    className={className}
                    style={{ opacity: isVisible ? 1 : 0.5, display: displayStyle, alignItems: 'center', justifyContent: justify, width: '100%', height: '100%' }}
                    data-tooltip={label}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify, gap: 'inherit', width: '100%', height: '100%', position: 'relative' }}>
                        {iconLeft && <span style={{ display: 'flex', flexShrink: 0 }}>{iconLeft}</span>}
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', justifyContent: justify }}>
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
                    showVariant={false}
                    showLinkType={false}
                    isVisible={isVisible}
                    onVisibilityChange={onVisibilityChange}
                    position={popoverPosition}
                />
            )}
        </>
    );
}
