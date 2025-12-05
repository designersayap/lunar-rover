"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import BuilderText from "./builder-text";
import { useBuilderSelection, BuilderSelectionContext } from "@/app/page-builder-components/utils/builder-controls";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "../../page.module.css";
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
    iconRight
}) {
    const buttonRef = useRef(null);
    const [popoverPosition, setPopoverPosition] = useState(null);

    // Extract the button variant class (e.g., btn-primary, btn-ghost) from className
    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    const generatedId = sectionId ? (suffix ? `${sectionId}-${suffix}` : `${sectionId}-${variantClass}`) : undefined;
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

    // If href is empty, we still render the button in builder mode to allow editing
    // if (!href) return null;

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

        if (!showSettings && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.bottom + 4, // 4px gap
                left: rect.left + rect.width / 2
            });
        }

        setActivePopoverId(prev => prev === myPopoverId ? null : myPopoverId);
    };

    return (
        <>
            <Link
                id={buttonId}
                href={href || "#"}
                className={`${className} ${isActive ? styles.activeWrapper : ''}`}
                onClick={handleClick}
                style={{ ...style, opacity: isVisible ? 1 : 0.5 }}
                data-tooltip={label}
            >
                {isActive && <div className={styles.activeBorderOutline} />}
                <div ref={buttonRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'inherit', width: '100%', height: '100%', position: 'relative' }}>
                    {isActive && (
                        <div className={styles.activeOverlay}>
                            <div className={styles.overlayLabel}>
                                <span className={styles.overlayIdText}>#{buttonId}</span>
                            </div>
                            <button
                                type="button"
                                className={styles.settingsButton}
                                onClick={handleSettingsClick}
                            >
                                <Cog6ToothIcon className={styles.overlayIcon} />
                            </button>
                        </div>
                    )}
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
            </Link>

            {/* We render the popover outside the Link to avoid nesting issues */}
            {isActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    url={href}
                    onUrlChange={onHrefChange}
                    variant={variantClass.replace('btn-', '')}
                    onVariantChange={onVariantChange}
                    isVisible={isVisible}
                    onVisibilityChange={onVisibilityChange}
                    position={popoverPosition}
                />
            )}
        </>
    );
}
