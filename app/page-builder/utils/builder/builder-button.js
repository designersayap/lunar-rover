"use client";

import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import BuilderText from "./builder-text";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay";
import { useIdSync } from "../hooks/use-id-sync";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";
import { Icons } from "./builder-icons";

// Builder Button Component
export default function BuilderButton({
    label = "Label",
    id,
    href = "#",
    suffix,
    sectionId,
    className = "",
    onLabelChange,
    onIdChange,
    onHrefChange,
    onVariantChange,
    onVisibilityChange,
    isVisible = true,
    style = {},
    iconLeft,
    iconRight,
    onIconLeftChange,
    onIconRightChange,
    linkType = 'url',
    onLinkTypeChange,
    targetDialogId,
    onTargetDialogIdChange,
    disableSettings = false,
    showLinkOnStaging = false, // New prop
    showVariantOnStaging = false // New prop
}) {
    const [popoverPosition, setPopoverPosition] = useState(null);

    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    const { elementId: buttonId, tempId, setTempId } = useIdSync({
        id,
        sectionId,
        suffix: suffix || variantClass.replace('btn-', ''),
        onIdChange
    });

    const {
        selectedComponents,
        updateComponent,
        isStaging,
        toggleElementSelection,
        activePopoverId,
        setActivePopoverId,
        activeElementId,
        setActiveElementId,
        selectedElementIds
    } = useContext(BuilderSelectionContext);

    const myPopoverBase = `popover-${buttonId}`;
    const showSettings = activePopoverId && activePopoverId.startsWith(myPopoverBase);

    // Check SPECIFICALLY which mode is open
    const isStyleOpen = activePopoverId === `${myPopoverBase}-style`;
    const isLinkOpen = activePopoverId === `${myPopoverBase}-link`;

    const isSelfActive = activeElementId === buttonId;
    const isActive = isSelfActive || selectedElementIds?.includes(buttonId);
    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);

    const safeUseLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    safeUseLayoutEffect(() => {
        if (isActive && wrapperRef.current) {
            let rafId;
            const updatePosition = () => {
                if (wrapperRef.current) {
                    const rect = wrapperRef.current.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        setOverlayRect(rect);
                        if (showSettings) {
                            setPopoverPosition({
                                top: rect.top,
                                left: rect.left + rect.width / 2
                            });
                        }
                    }
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
    }, [isActive, showSettings]);

    const overlayStyle = useActiveOverlayPosition(overlayRect);

    const handleActivate = (e) => {
        // Prevent default navigation if we are NOT in live/staging (Builder mode)
        if (e && (!isStaging || setActiveElementId || toggleElementSelection)) {
            e.preventDefault();
        }
        if (e) {
            e.stopPropagation();
        }

        if (toggleElementSelection) {
            toggleElementSelection(buttonId, e.metaKey || e.ctrlKey);
        } else if (setActiveElementId) {
            setActiveElementId(buttonId);
        }
    };

    if (!isVisible && !isActive) return null;

    const handleStyleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActivePopoverId(prev => prev === `${myPopoverBase}-style` ? null : `${myPopoverBase}-style`);
    };

    const handleLinkSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActivePopoverId(prev => prev === `${myPopoverBase}-link` ? null : `${myPopoverBase}-link`);
    };
    const handleOpenDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let dialogComponent;
        if (targetDialogId) {
            dialogComponent = selectedComponents?.find(c =>
                String(c.uniqueId) === String(targetDialogId) ||
                c.sectionId === targetDialogId
            );
        }

        if (!dialogComponent && !targetDialogId) {
            // Only fallback if no target was ever specified
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form');
        }

        if (dialogComponent) {
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

    let targetDialogComponent = selectedComponents?.find(c =>
        String(c.uniqueId) === String(targetDialogId) ||
        c.sectionId === targetDialogId
    );

    if (!targetDialogComponent && linkType === 'dialog' && !targetDialogId) {
        targetDialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form');
    }

    const targetDialogSectionId = targetDialogComponent?.sectionId;

    const renderIcon = (icon) => {
        if (!icon) return null;
        if (typeof icon === 'string' && Icons[icon]) {
            const IconComponent = Icons[icon];
            return <IconComponent className="w-5 h-5" />;
        }
        return icon;
    };

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Ensure href is safe string to avoid hydration mismatch
    const safeHref = (href && typeof href === 'string') ? href : "#";

    return (
        <div style={{ display: 'contents' }} suppressHydrationWarning>
            <a
                href={safeHref}
                id={hasMounted ? buttonId : undefined}
                className={`btn ${className} ${(hasMounted && isActive) ? styles.activeWrapper : ''}`}
                onClick={handleActivate}
                style={{ ...style, opacity: isVisible ? 1 : 0.5 }}
                data-tooltip={label}
                data-dialog-trigger={linkType === 'dialog' ? "" : undefined}
                data-dialog-target={linkType === 'dialog' ? targetDialogSectionId : undefined}
                suppressHydrationWarning
            >
                {(hasMounted && isActive) && <div className={styles.activeBorderOutline} />}
                <div ref={wrapperRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'inherit', width: '100%', height: '100%', position: 'relative' }}>
                    {renderIcon(iconLeft) && (
                        <span style={{ display: 'flex', flexShrink: 0 }}>
                            {renderIcon(iconLeft)}
                        </span>
                    )}
                    <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                        <BuilderText
                            tagName="div"
                            content={label}
                            onChange={onLabelChange}
                            placeholder="Button Label"
                            multiline={false}
                            noId={true}
                            className={!(hasMounted && isActive) ? "truncate-1-line" : ""}
                            style={{ minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap' }}
                            disableLinkPaste={true}
                        />
                    </div>
                    {renderIcon(iconRight) && (
                        <span style={{ display: 'flex', flexShrink: 0 }}>
                            {renderIcon(iconRight)}
                        </span>
                    )}
                </div>
            </a>

            {isActive && overlayRect && createPortal(
                <div
                    className={styles.activeOverlay}
                    style={overlayStyle}
                    data-builder-ui="true"
                >
                    <div className={styles.overlayLabel}>
                        <span className={styles.overlayIdText}>#{buttonId || 'button'}</span>
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

                    {(() => {
                        const hasStyleControls = !isStaging || showVariantOnStaging;
                        const hasLinkControls = !isStaging || showLinkOnStaging || (isStaging && (linkType === 'url' || linkType === 'dialog'));

                        const hasAvailableSettings = !disableSettings && (hasStyleControls || hasLinkControls);
                        if (!hasAvailableSettings) return null;

                        return (
                            <>
                                {hasStyleControls && (onVariantChange || onIconLeftChange || onIconRightChange) && (
                                    <button
                                        type="button"
                                        className={`${styles.settingsButton} ${isStyleOpen ? styles.settingsButtonActive : ''}`}
                                        onClick={handleStyleSettingsClick}
                                        data-tooltip="Style Settings"
                                    >
                                        <PaintBrushIcon className={styles.overlayIcon} />
                                    </button>
                                )}

                                {hasLinkControls && (
                                    <button
                                        type="button"
                                        className={`${styles.settingsButton} ${isLinkOpen ? styles.settingsButtonActive : ''}`}
                                        onClick={handleLinkSettingsClick}
                                        data-tooltip="Link Settings"
                                    >
                                        <Cog6ToothIcon className={styles.overlayIcon} />
                                    </button>
                                )}
                            </>
                        );
                    })()}
                </div>,
                document.body
            )}

            {
                isActive && (
                    <BuilderControlsPopover
                        isOpen={showSettings}
                        onClose={() => setActivePopoverId(null)}
                        // Pass specific mode based on active ID
                        mode={isStyleOpen ? 'style' : (isLinkOpen ? 'link' : 'all')}
                        url={safeHref}
                        onUrlChange={onHrefChange}
                        linkType={linkType}
                        onLinkTypeChange={onLinkTypeChange}
                        variant={variantClass.replace('btn-', '')}
                        onVariantChange={onVariantChange}
                        isVisible={isVisible}
                        onVisibilityChange={onVisibilityChange}
                        position={popoverPosition}
                        dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.sectionId || c.uniqueId })) : []}
                        targetDialogId={targetDialogId}
                        onTargetDialogIdChange={onTargetDialogIdChange}
                        showLinkType={!isStaging || showLinkOnStaging}
                        showVariant={!isStaging || showVariantOnStaging}
                        iconLeft={iconLeft}
                        onIconLeftChange={(!isStaging || showVariantOnStaging) ? onIconLeftChange : undefined}
                        iconRight={iconRight}
                        onIconRightChange={(!isStaging || showVariantOnStaging) ? onIconRightChange : undefined}
                        showUrl={!isStaging || showLinkOnStaging || (isStaging && linkType === 'url')}
                        showDialogSelector={!isStaging || showLinkOnStaging || (isStaging && linkType === 'dialog')}
                        popoverTitle="Button Settings"
                    />
                )
            }
        </div>
    );
}
