"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import BuilderText from "./builder-text";
import { useBuilderSelection, BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useActiveOverlay, ActiveOverlayPortal } from "../hooks/use-active-overlay";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";
import BuilderControlsPopover from "./builder-controls-popover";

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

    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const generatedId = normalizedSectionId ? (suffix ? `${normalizedSectionId}-${suffix}` : `${normalizedSectionId}-${variantClass}`) : undefined;
    const normalizedId = id?.replace(/-+/g, '-') || '';
    const buttonId = normalizedId || generatedId;

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, updateComponent, isStaging } = useContext(BuilderSelectionContext);

    const myPopoverId = `popover-${buttonId}`;
    const showSettings = activePopoverId === myPopoverId;

    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : "";
    const [tempId, setTempId] = useState("");

    useEffect(() => {
        const newTempId = (buttonId && buttonId.startsWith(prefix))
            ? buttonId.slice(prefix.length)
            : buttonId;

        if (newTempId !== tempId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTempId(newTempId);
        }
    }, [buttonId, prefix, tempId]);

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
        const newValue = e.target.value.replace(/\s/g, '-');
        setTempId(newValue);
    };

    const handleIdBlur = () => {
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

    const {
        wrapperRef,
        overlayRect,
        isActive,
        handleActivate
    } = useActiveOverlay(buttonId);
    useEffect(() => {
        if (isActive && overlayRect && showSettings) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPopoverPosition({
                top: overlayRect.top,
                left: overlayRect.left + overlayRect.width / 2
            });
        }
    }, [isActive, overlayRect, showSettings]);

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
            // Compare as strings to handle potential type mismatch (number vs string)
            dialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));
        }

        if (!dialogComponent) {
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog' || c.id === 'dialog-accordion');
        }

        if (dialogComponent) {
            // Dispatch global event for immediate client-side handling (Staging/Live)
            if (dialogComponent.sectionId) {
                window.dispatchEvent(new CustomEvent('lunar:open-dialog', {
                    detail: { id: dialogComponent.sectionId }
                }));
            }

            // Also persist state if in Builder (for saving/exporting state)
            if (updateComponent) {
                updateComponent(dialogComponent.uniqueId, { isOpen: true });
            }
        } else {
            alert("No Dialog component found on the page. Please add one from the Components menu.");
        }
    };

    let targetDialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));

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
                    </>
                }
            />

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
                        showLinkType={!isStaging}
                        showVariant={!isStaging}
                    />
                )
            }
        </>
    );
}
