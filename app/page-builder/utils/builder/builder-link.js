"use client";

import Link from "next/link";
import { useState, useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import BuilderText from "./builder-text";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useIdSync } from "../hooks/use-id-sync";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";

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
    fullWidth = false,
    linkType,
    onLinkTypeChange,
    targetDialogId,
    onTargetDialogIdChange,
    tooltipIfTruncated,
    showLinkType = true,
    hideLabel = false
}) {
    const { elementId } = useIdSync({ id, sectionId, suffix: suffix || "link", onIdChange });

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, updateComponent, isStaging } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === elementId;
    const myPopoverId = `popover-${elementId}`;
    const showSettings = activePopoverId === myPopoverId;
    const [popoverPosition, setPopoverPosition] = useState(null);
    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);
    const displayStyle = fullWidth ? 'flex' : 'inline-flex';
    const widthStyle = fullWidth ? '100%' : undefined;

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

    const handleOpenDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let dialogComponent;
        if (targetDialogId) {
            // Compare as strings to handle potential type mismatch (number vs string)
            dialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));
        }

        if (!dialogComponent) {
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion');
        }

        if (dialogComponent) {
            // Dispatch global event for immediate client-side handling (Staging/Live)
            if (dialogComponent.sectionId) {
                window.dispatchEvent(new CustomEvent('lunar:open-dialog', {
                    detail: { id: dialogComponent.sectionId }
                }));
            }

            if (updateComponent) {
                updateComponent(dialogComponent.uniqueId, { isOpen: true });
            }
        } else {
            alert("No Dialog component found on the page. Please add one from the Components menu.");
        }
    };

    const renderActiveOverlay = () => {
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
            <div style={anchorStyle} className="z-system-builder-overlay">
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
                    {linkType === 'dialog' && (
                        <button
                            type="button"
                            className={styles.settingsButton}
                            onClick={handleOpenDialog}
                            data-tooltip="Open Dialog"
                        >
                            <ChatBubbleLeftEllipsisIcon className={styles.overlayIcon} />
                        </button>
                    )}
                    {(!isStaging || linkType !== 'dialog') && (
                        <button
                            type="button"
                            className={`${styles.settingsButton} ${showSettings ? styles.settingsButtonActive : ''}`}
                            onClick={handleSettingsClick}
                        >
                            <Cog6ToothIcon className={styles.overlayIcon} />
                        </button>
                    )}
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

                {(() => {
                    let safeHref = href || "#";
                    try {
                        if (/^[a-z]+:/i.test(safeHref)) {
                            new URL(safeHref); // Will throw if invalid
                        }
                    } catch (e) {
                        // Fallback to "#" to prevent crash
                        safeHref = "#";
                    }

                    return (
                        <Link
                            id={elementId}
                            href={safeHref}
                            className={className}
                            style={{ opacity: isVisible ? 1 : 0.5, display: displayStyle, alignItems: 'center', justifyContent: justify, width: '100%', height: '100%' }}
                            data-tooltip={!tooltipIfTruncated ? label : undefined}
                            prefetch={false} // Disable prefetch to be extra safe during editing
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify, gap: 'inherit', width: '100%', height: '100%', position: 'relative' }}>
                                {iconLeft && <span style={{ display: 'flex', flexShrink: 0 }}>{iconLeft}</span>}
                                {!hideLabel && (
                                    <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', justifyContent: justify }}>
                                        <BuilderText
                                            tagName="span"
                                            content={label}
                                            onChange={onLabelChange}
                                            placeholder="Link Label"
                                            multiline={false}
                                            noId={true}
                                            className={!isActive ? "truncate-1-line" : ""}
                                            style={{ minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap', display: 'block' }}
                                            tooltipIfTruncated={tooltipIfTruncated}
                                            disableLinkPaste={true}
                                        />
                                    </div>
                                )}
                                {iconRight && <span style={{ display: 'flex', flexShrink: 0 }}>{iconRight}</span>}
                            </div>
                        </Link>
                    );
                })()}
            </span>

            {renderActiveOverlay()}

            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    url={href}
                    onUrlChange={onHrefChange}
                    showVariant={false}
                    showLinkType={showLinkType && !isStaging}
                    linkType={linkType}
                    onLinkTypeChange={onLinkTypeChange}
                    targetDialogId={targetDialogId}
                    onTargetDialogIdChange={onTargetDialogIdChange}
                    isVisible={isVisible}
                    onVisibilityChange={onVisibilityChange}
                    position={popoverPosition}
                    dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.uniqueId })) : []}
                />
            )}
        </>
    );
}
