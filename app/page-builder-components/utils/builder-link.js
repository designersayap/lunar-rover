"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useBuilderSelection } from "@/app/page-builder-components/utils/builder-controls";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "../../page.module.css";

/**
 * BuilderLink Component
 * Renders a link with consistent ID generation and builder-safe navigation.
 * 
 * @param {string} href - Link URL
 * @param {string} className - CSS classes
 * @param {string} sectionId - Parent section ID
 * @param {string} suffix - ID suffix (e.g. 'product-1')
 * @param {object} style - Inline styles
 * @param {React.ReactNode} children - Link content
 */
export default function BuilderLink({
    href = "#",
    id,
    className = "",
    sectionId,
    suffix,
    children,
    onIdChange,
    style = {}
}) {
    // Generate ID: {sectionId}-{suffix} or {sectionId}-link if no suffix
    const generatedId = sectionId ? `${sectionId}-${suffix || 'link'}` : undefined;
    const linkId = id || generatedId;
    const { activeElementId, setActiveElementId } = useBuilderSelection();
    const isActive = activeElementId === linkId && linkId !== undefined;

    const prefix = sectionId ? `${sectionId}-` : "";
    const [tempId, setTempId] = useState("");

    useEffect(() => {
        if (linkId && linkId.startsWith(prefix)) {
            setTempId(linkId.slice(prefix.length));
        } else {
            setTempId(linkId);
        }
    }, [linkId, prefix]);

    // Sync ID when sectionId changes
    const prevSectionIdRef = useRef(sectionId);
    useEffect(() => {
        const prevSectionId = prevSectionIdRef.current;
        if (prevSectionId && prevSectionId !== sectionId) {
            const prefix = `${prevSectionId}-`;
            if (linkId && linkId.startsWith(prefix)) {
                const suffix = linkId.slice(prefix.length);
                const newId = `${sectionId}-${suffix}`;
                if (onIdChange) {
                    onIdChange(newId);
                }
            }
        }
        prevSectionIdRef.current = sectionId;
    }, [sectionId, linkId, onIdChange]);

    const handleIdChange = (e) => {
        // Replace spaces with underscores
        const newValue = e.target.value.replace(/\s/g, '-');
        setTempId(newValue);
    };

    const handleIdBlur = () => {
        // If empty, revert to original ID (suffix)
        if (!tempId || tempId.trim() === '') {
            setTempId(linkId.startsWith(prefix) ? linkId.slice(prefix.length) : linkId);
            return;
        }

        const newFullId = prefix + tempId;
        if (newFullId !== linkId && onIdChange) {
            onIdChange(newFullId);
        }
    };

    const handleIdKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
        e.stopPropagation();
    };

    const handleClick = (e) => {
        // Prevent navigation in builder
        e.preventDefault();
        e.stopPropagation();
        if (linkId) {
            setActiveElementId(linkId);
        }
    };

    return (
        <Link
            id={linkId}
            href={href || "#"}
            className={`${className} ${isActive ? styles.activeBorder : ''}`}
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
            {children}
        </Link>
    );
}
