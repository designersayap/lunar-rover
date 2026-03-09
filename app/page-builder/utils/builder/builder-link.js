"use client";

import Link from "next/link";
import { useState, useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import BuilderText from "./builder-text";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useIdSync } from "../hooks/use-id-sync";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay";

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
    linkType = 'url',
    onLinkTypeChange,
    targetDialogId,
    onTargetDialogIdChange,
    tooltipIfTruncated,
    showLinkType = true,
    hideLabel = false
}) {
    // Normalize linkType to 'url' if it is null or undefined or empty string
    // This ensures legacy data or null props don't break the popover logic
    const safeLinkType = linkType || 'url';

    const { elementId } = useIdSync({ id, sectionId, suffix: suffix || "link", onIdChange });
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, updateComponent, isStaging } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === elementId;
    const myPopoverBase = `popover-${elementId}`;
    const showSettings = activePopoverId && activePopoverId.startsWith(myPopoverBase);
    const isStyleOpen = activePopoverId === `${myPopoverBase}-style`;
    const isLinkOpen = activePopoverId === `${myPopoverBase}-link`;

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

    // Hook must be called unconditionally
    const overlayStyle = useActiveOverlayPosition(overlayRect);

    if (!isVisible) return null;

    const handleClick = (e) => {
        // Prevent default navigation if we are NOT in live/staging (Builder mode)
        // OR if we are in Staging but selection is enabled (Editable Staging)
        if (e && (!isStaging || setActiveElementId)) {
            e.preventDefault();
        }
        if (e) {
            e.stopPropagation();
        }
        if (elementId && setActiveElementId) {
            setActiveElementId(elementId);
        }
    };

    const handleStyleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isStyleOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }
        setActivePopoverId(prev => prev === `${myPopoverBase}-style` ? null : `${myPopoverBase}-style`);
    };

    const handleLinkSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLinkOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }
        setActivePopoverId(prev => prev === `${myPopoverBase}-link` ? null : `${myPopoverBase}-link`);
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
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form');
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

        return createPortal(
            <div style={{
                position: 'fixed',
                top: overlayRect.top,
                left: overlayRect.left,
                width: overlayRect.width,
                height: overlayRect.height,
                pointerEvents: 'none'
            }} className="z-system-builder-overlay">
                <div
                    className={styles.activeOverlay}
                    style={overlayStyle}
                >
                    <div className={styles.overlayLabel}>
                    </div>
                    {safeLinkType === 'dialog' && (
                        <button
                            type="button"
                            className={styles.settingsButton}
                            onClick={handleOpenDialog}
                            data-tooltip="Open Dialog"
                        >
                            <ChatBubbleLeftEllipsisIcon className={styles.overlayIcon} />
                        </button>
                    )}

                    {((!isStaging && (true /* Link settings always avail */ || !!onLinkTypeChange)) || (isStaging && safeLinkType === 'url')) && (
                        <>
                            {/* Sparkle Button for Style Settings */}
                            {/* Only show if there are style props to configure */}
                            {(!isStaging && onLinkTypeChange /* Placeholder for potential style props check */ && false) && (
                                <button
                                    type="button"
                                    className={`${styles.settingsButton} ${isStyleOpen ? styles.settingsButtonActive : ''}`}
                                    onClick={handleStyleSettingsClick}
                                    data-tooltip="Style Settings"
                                >
                                    <PaintBrushIcon className={styles.overlayIcon} />
                                </button>
                            )}

                            {/* Cog Button for Link Settings */}
                            <button
                                type="button"
                                className={`${styles.settingsButton} ${isLinkOpen ? styles.settingsButtonActive : ''}`}
                                onClick={handleLinkSettingsClick}
                                data-tooltip="Link Settings"
                            >
                                <Cog6ToothIcon className={styles.overlayIcon} />
                            </button>
                        </>
                    )}
                </div>
            </div>,
            document.body
        );
    };

    return (
        <>
            {/* Use hasMounted pattern to prevent hydration mismatch for ID and dynamic classes */}
            <a
                ref={wrapperRef}
                id={hasMounted ? elementId : undefined}
                href={href || "#"}
                className={`${className} ${(hasMounted && isActive) ? styles.activeWrapper : ''}`}
                style={{
                    opacity: isVisible ? 1 : 0.5,
                    display: displayStyle,
                    alignItems: 'center',
                    justifyContent: justify,
                    width: widthStyle || '100%',
                    height: '100%',
                    position: 'relative',
                    ...style
                }}
                onClick={handleClick}
                data-tooltip={!tooltipIfTruncated ? label : undefined}
                suppressHydrationWarning
            >
                {(hasMounted && isActive) && <div className={styles.activeBorderOutline} />}

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
                                className={!(hasMounted && isActive) ? "truncate-1-line" : ""}
                                style={{ minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap', display: 'block' }}
                                tooltipIfTruncated={tooltipIfTruncated}
                                disableLinkPaste={true}
                            />
                        </div>
                    )}
                    {iconRight && <span style={{ display: 'flex', flexShrink: 0 }}>{iconRight}</span>}
                </div>
            </a>

            {renderActiveOverlay()}

            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    mode={isStyleOpen ? 'style' : (isLinkOpen ? 'link' : 'all')}
                    url={href}
                    showUrl={true}
                    onUrlChange={onHrefChange}
                    showVariant={false}
                    showLinkType={showLinkType && !isStaging}
                    linkType={safeLinkType}
                    onLinkTypeChange={onLinkTypeChange}
                    targetDialogId={targetDialogId}
                    onTargetDialogIdChange={onTargetDialogIdChange}
                    isVisible={isVisible}
                    onVisibilityChange={onVisibilityChange}
                    position={popoverPosition}
                    dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.uniqueId })) : []}
                />
            )}
        </>
    );
}
