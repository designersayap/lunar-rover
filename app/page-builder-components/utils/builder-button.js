"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import BuilderText from "./builder-text";
import { useBuilderSelection } from "@/app/page-builder-components/utils/builder-controls";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "../../page.module.css";

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
    style = {},
    iconLeft,
    iconRight
}) {
    // Extract the button variant class (e.g., btn-primary, btn-ghost) from className
    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    const generatedId = sectionId ? `${sectionId}-${variantClass}${suffix ? `-${suffix}` : ''}` : undefined;
    const buttonId = id || generatedId;
    const { activeElementId, setActiveElementId } = useBuilderSelection();
    const isActive = activeElementId === buttonId && buttonId !== undefined;

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

    const handleClick = (e) => {
        // Prevent navigation in builder
        e.preventDefault();
        e.stopPropagation();
        if (buttonId) {
            setActiveElementId(buttonId);
        }
    };

    return (
        <Link
            id={buttonId}
            href={href || "#"}
            className={`${className} ${isActive ? styles.activeWrapper : ''} ${isActive ? styles.activeBorder : ''}`}
            onClick={handleClick}
            style={style}
        >
            {isActive && (
                <div className={styles.activeOverlay}>
                    <div className={styles.overlayLabel}>
                        <input
                            type="text"
                            className={styles.overlayInput}
                            value={tempId || ''}
                            onChange={handleIdChange}
                            onBlur={handleIdBlur}
                            onKeyDown={handleIdKeyDown}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <button className={styles.settingsButton}>
                        <Cog6ToothIcon className={styles.overlayIcon} />
                    </button>
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'inherit', width: '100%', height: '100%' }}>
                {iconLeft}
                <BuilderText
                    tagName="span"
                    content={label}
                    onChange={onLabelChange}
                    placeholder="Button Label"
                    multiline={false}
                    noId={true}
                />
                {iconRight}
            </div>
        </Link>
    );
}
