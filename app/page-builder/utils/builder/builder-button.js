"use client";

import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import BuilderText from "./builder-text";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
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
    disableSettings = false
}) {
    const [popoverPosition, setPopoverPosition] = useState(null);

    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const generatedId = normalizedSectionId ? (suffix ? `${normalizedSectionId}-${suffix}` : `${normalizedSectionId}-${variantClass}`) : undefined;
    const normalizedId = id?.replace(/-+/g, '-') || '';
    const buttonId = normalizedId || generatedId;

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
    const myPopoverId = `popover-${buttonId}`;
    const showSettings = activePopoverId === myPopoverId;

    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : "";
    const [tempId, setTempId] = useState("");

    useEffect(() => {
        const newTempId = (buttonId && buttonId.startsWith(prefix))
            ? buttonId.slice(prefix.length)
            : buttonId;

        if (newTempId !== tempId) {
            setTempId(newTempId);
        }
    }, [buttonId, tempId, prefix]);

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
    const handleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActivePopoverId(prev => prev === myPopoverId ? null : myPopoverId);
    };
    const handleOpenDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let dialogComponent;
        if (targetDialogId) {
            dialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));
        }

        if (!dialogComponent) {
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion');
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

    let targetDialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));

    if (!targetDialogComponent && linkType === 'dialog') {
        targetDialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion');
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
                        const hasControls = (!isStaging && (
                            true // Link settings are standard
                            || !!onVariantChange
                            || !!onIconLeftChange
                            || !!onIconRightChange
                        )) || (isStaging && linkType === 'url');

                        const hasAvailableSettings = !disableSettings && hasControls;

                        if (!hasAvailableSettings) return null;

                        return (
                            <button
                                type="button"
                                className={`${styles.settingsButton} ${showSettings ? styles.settingsButtonActive : ''}`}
                                onClick={handleSettingsClick}
                            >
                                <Cog6ToothIcon className={styles.overlayIcon} />
                            </button>
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
                        url={safeHref}
                        onUrlChange={onHrefChange}
                        linkType={linkType}
                        onLinkTypeChange={onLinkTypeChange}
                        variant={variantClass.replace('btn-', '')}
                        onVariantChange={onVariantChange}
                        isVisible={isVisible}
                        onVisibilityChange={onVisibilityChange}
                        position={popoverPosition}
                        dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.uniqueId })) : []}
                        targetDialogId={targetDialogId}
                        onTargetDialogIdChange={onTargetDialogIdChange}
                        showLinkType={!isStaging}
                        showVariant={!isStaging}
                        iconLeft={iconLeft}
                        onIconLeftChange={!isStaging ? onIconLeftChange : undefined}
                        iconRight={iconRight}
                        onIconRightChange={!isStaging ? onIconRightChange : undefined}
                        showUrl={true}
                    />
                )
            }
        </div>
    );
}
