"use client";

import { useContext, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import { useIdSync } from "../hooks/use-id-sync";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import BuilderControlsPopover from "./builder-controls-popover";
import styles from "../../../page.module.css";

/**
 * BuilderImage Component
 * Renders an image with consistent styling and placeholder support.
 */
const defaultPlaceholder = "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"; // Change this to any URL to use a remote image as placeholder

export default function BuilderImage({
    src,
    alt = "#",
    className = "",
    style = {},
    id,
    sectionId,
    isVisible = true,
    onVisibilityChange,
    onIdChange,
    suffix,
    href,
    onHrefChange,
    linkType = 'url',
    onLinkTypeChange,
    targetDialogId,
    onTargetDialogIdChange,
    disableSettings = false,
    isPortrait,
    onIsPortraitChange,
    mobileRatio,
    onMobileRatioChange
}) {
    // ID Sync Hook
    const { elementId } = useIdSync({ id, sectionId, suffix: suffix || "image", onIdChange });

    // Context
    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, updateComponent } = useContext(BuilderSelectionContext);
    const isActive = activeElementId === elementId;
    const myPopoverId = `popover-${elementId}`;
    const showSettings = activePopoverId === myPopoverId;

    // Overlay position
    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState(null);

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

    const handleOpenDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Find the Dialog component
        let dialogComponent;
        if (targetDialogId) {
            // Compare as strings to handle potential type mismatch (number vs string)
            dialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));
        }

        // Fallback to first if not found or not set
        if (!dialogComponent) {
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog' || c.id === 'dialog-accordion');
        }

        if (dialogComponent) {
            // Open it
            if (updateComponent) {
                updateComponent(dialogComponent.uniqueId, { isOpen: true });
            }
        } else {
            alert("No Dialog component found on the page. Please add one from the Components menu.");
        }
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

                    {/* specific trigger for dialog if selected */}
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

                    {/* Show simple settings toggle if NOT disabled */}
                    {!disableSettings && (
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

    const imageSrc = src || defaultPlaceholder;
    const isPlaceholder = !src || src === defaultPlaceholder;
    const finalStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        backgroundColor: isPlaceholder ? "#676767" : "transparent",
        opacity: isVisible ? 1 : 0.5,
        ...style
    };

    let targetDialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));

    // Fallback if not found (matching logic)
    if (!targetDialogComponent && linkType === 'dialog') {
        targetDialogComponent = selectedComponents?.find(c => c.id === 'dialog' || c.id === 'dialog-accordion');
    }

    const targetDialogSectionId = targetDialogComponent?.sectionId;

    const Wrapper = href || linkType === 'dialog' ? 'a' : 'div';
    const wrapperProps = href || linkType === 'dialog' ? {
        href: href || "#",
        'data-dialog-trigger': linkType === 'dialog' ? "" : undefined,
        'data-dialog-target': linkType === 'dialog' ? targetDialogSectionId : undefined
    } : {};

    // Ratio logic
    let finalClassName = `${isActive ? styles.activeWrapper : ''} ${className}`;
    if (onIsPortraitChange && isPortrait) {
        finalClassName = finalClassName
            .replace('imagePlaceholder-4-3', 'imagePlaceholder-3-4')
            .replace('imagePlaceholder-16-9', 'imagePlaceholder-9-16')
            .replace('imagePlaceholder-21-9', 'imagePlaceholder-9-21')
            .replace('imagePlaceholder-5-4', 'imagePlaceholder-4-5');
    }

    if (mobileRatio) {
        finalClassName += ` mobile-aspect-${mobileRatio}`;
    }

    return (
        <>
            <Wrapper
                {...wrapperProps}
                ref={wrapperRef}
                className={finalClassName}
                style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}
                onClick={handleClick}
            >
                {isActive && <div className={styles.activeBorderOutline} />}
                <img
                    id={elementId}
                    src={imageSrc}
                    alt={(!alt || alt === "#") && sectionId ? sectionId : alt}
                    style={finalStyle}
                />
            </Wrapper>

            {renderActiveOverlay()}

            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    url={href}
                    onUrlChange={onHrefChange}
                    linkType={linkType}
                    onLinkTypeChange={onLinkTypeChange}
                    position={popoverPosition}
                    dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog' || c.id === 'dialog-accordion').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.uniqueId })) : []}
                    targetDialogId={targetDialogId}
                    onTargetDialogIdChange={onTargetDialogIdChange}
                    showVariant={false}
                    showPortraitToggle={!!onIsPortraitChange}
                    isPortrait={isPortrait}
                    onIsPortraitChange={onIsPortraitChange}
                    showMobileRatio={!!onMobileRatioChange}
                    mobileRatio={mobileRatio}
                    onMobileRatioChange={onMobileRatioChange}
                />
            )}
        </>
    );
}
