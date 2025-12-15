"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import BuilderText from "./builder-text";
import { useBuilderSelection, BuilderSelectionContext } from "@/app/page-builder-components/utils/builder/builder-controls";
import { useActiveOverlay, ActiveOverlayPortal } from "../hooks/use-active-overlay";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";

/**
 * BuilderButton Component
 * Renders a button or link with consistent styling and ID generation.
 * 
 * @param {string} label - Button text
 * @param {string} href - Link URL
 * @param {string} variant - ID variant suffix (e.g. 'cta', 'primary')
 * @param {string} sectionId - Parent section ID
 * @param {string} className - CSS classes
 * @param {function} onLabelChange - Callback when label changes
 * @param {function} onHrefChange - Callback when href changes (not yet implemented in UI but good to have)
 */
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
    linkType = 'url',
    onLinkTypeChange,
    targetDialogId,
    onTargetDialogIdChange
}) {
    const [popoverPosition, setPopoverPosition] = useState(null);

    // Extract the button variant class (e.g., btn-primary, btn-ghost) from className
    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    // Normalize sectionId by removing trailing dashes to prevent double dashes
    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const generatedId = normalizedSectionId ? (suffix ? `${normalizedSectionId}-${suffix}` : `${normalizedSectionId}-${variantClass}`) : undefined;
    // Also normalize stored id prop to collapse consecutive dashes
    const normalizedId = id?.replace(/-+/g, '-') || '';
    const buttonId = normalizedId || generatedId;
    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, updateComponent } = useContext(BuilderSelectionContext);


    // Unique ID for this button's popover
    const myPopoverId = `popover-${buttonId}`;
    const showSettings = activePopoverId === myPopoverId;

    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : "";
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

    const handleIdChange = (e) => {
        // Replace spaces with underscores
        const newValue = e.target.value.replace(/\s/g, '-');
        setTempId(newValue);
    };

    const handleIdBlur = () => {
        // If empty, revert to original ID (suffix)
        if (!tempId || tempId.trim() === '') {
            setTempId(buttonId.startsWith(prefix) ? buttonId.slice(prefix.length) : buttonId);
            return;
        }

        const newFullId = prefix + tempId;
        if (newFullId !== buttonId && onIdChange) {
            onIdChange(newFullId);
        }
    };

    const handleIdKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
        e.stopPropagation();
    };

    // Use hook for active state and overlay
    const {
        wrapperRef,
        overlayRect,
        isActive,
        handleActivate
    } = useActiveOverlay(buttonId);



    // Update popover position based on overlay rect from hook
    useEffect(() => {
        if (isActive && overlayRect && showSettings) {
            setPopoverPosition({
                top: overlayRect.top,
                left: overlayRect.left + overlayRect.width / 2
            });
        }
    }, [isActive, overlayRect, showSettings]);

    // If href is empty, we still render the button in builder mode to allow editing
    // if (!href) return null;

    if (!isVisible && !isActive) return null;





    const handleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

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
                // Optional: show toast or feedback?
            }
        } else {
            alert("No Dialog component found on the page. Please add one from the Components menu.");
        }
    };

    let targetDialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));

    // Fallback if not found (matching handleOpenDialog logic)
    if (!targetDialogComponent && linkType === 'dialog') {
        targetDialogComponent = selectedComponents?.find(c => c.id === 'dialog' || c.id === 'dialog-accordion');
    }

    const targetDialogSectionId = targetDialogComponent?.sectionId;

    return (
        <>
            <Link
                href={href}
                id={buttonId}
                className={`btn ${className} ${isActive ? styles.activeWrapper : ''}`}
                onClick={handleActivate}
                style={{ ...style, opacity: isVisible ? 1 : 0.5 }}
                data-tooltip={label}
                data-dialog-trigger={linkType === 'dialog' ? "" : undefined}
                data-dialog-target={linkType === 'dialog' ? targetDialogSectionId : undefined}
                prefetch={false}
            >
                <div ref={wrapperRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'inherit', width: '100%', height: '100%', position: 'relative' }}>

                    {iconLeft && <span style={{ display: 'flex', flexShrink: 0 }}>{iconLeft}</span>}
                    <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                        <BuilderText
                            tagName="span"
                            content={label}
                            onChange={onLabelChange}
                            placeholder="Button Label"
                            multiline={false}
                            noId={true}
                            className={!isActive ? "truncate-1-line" : ""}
                            style={{ minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    {iconRight && <span style={{ display: 'flex', flexShrink: 0 }}>{iconRight}</span>}
                </div>
            </Link >

            <ActiveOverlayPortal
                isActive={isActive}
                overlayRect={overlayRect}
                elementId={buttonId}
                actions={
                    <>
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

                        <button
                            type="button"
                            className={`${styles.settingsButton} ${showSettings ? styles.settingsButtonActive : ''}`}
                            onClick={handleSettingsClick}
                        >
                            <Cog6ToothIcon className={styles.overlayIcon} />
                        </button>
                    </>
                }
            />

            {/* We render the popover outside the Link to avoid nesting issues */}
            {
                isActive && (
                    <BuilderControlsPopover
                        isOpen={showSettings}
                        onClose={() => setActivePopoverId(null)}
                        url={href}
                        onUrlChange={onHrefChange}
                        linkType={linkType}
                        onLinkTypeChange={onLinkTypeChange}
                        variant={variantClass.replace('btn-', '')}
                        onVariantChange={onVariantChange}
                        isVisible={isVisible}
                        onVisibilityChange={onVisibilityChange}
                        position={popoverPosition}
                        dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog' || c.id === 'dialog-accordion').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.uniqueId })) : []}
                        targetDialogId={targetDialogId}
                        onTargetDialogIdChange={onTargetDialogIdChange}
                    />
                )
            }
        </>
    );
}
