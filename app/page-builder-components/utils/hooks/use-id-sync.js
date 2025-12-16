"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for ID synchronization when sectionId changes
 * Handles:
 * - Generating IDs from sectionId + suffix
 * - Updating IDs when parent sectionId changes
 * - Managing temporary ID state for editing
 * 
 * @param {Object} options - Hook options
 * @param {string} options.id - Custom ID (overrides generated)
 * @param {string} options.sectionId - Parent section ID
 * @param {string} options.suffix - ID suffix (e.g., 'button', 'image')
 * @param {Function} options.onIdChange - Callback when ID changes
 * @returns {Object} Hook state and helpers
 */
export function useIdSync({ id, sectionId, suffix, onIdChange }) {
    // Normalize sectionId by removing trailing dashes to prevent double dashes
    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : "";
    const generatedId = normalizedSectionId ? (suffix ? `${normalizedSectionId}-${suffix}` : `${normalizedSectionId}-element`) : undefined;
    // Also normalize stored id prop to collapse consecutive dashes
    const normalizedId = id?.replace(/-+/g, '-') || '';
    const elementId = normalizedId || generatedId;

    const [tempId, setTempId] = useState("");
    const prevSectionIdRef = useRef(sectionId);

    // Update tempId when elementId changes
    useEffect(() => {
        const newTempId = (elementId && elementId.startsWith(prefix))
            ? elementId.slice(prefix.length)
            : (elementId || "");

        if (newTempId !== tempId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTempId(newTempId);
        }
    }, [elementId, prefix, tempId]);

    // Sync ID when sectionId changes
    useEffect(() => {
        const prevSectionId = prevSectionIdRef.current;
        if (prevSectionId && prevSectionId !== sectionId) {
            const oldPrefix = `${prevSectionId}-`;
            if (elementId && elementId.startsWith(oldPrefix)) {
                const suffixPart = elementId.slice(oldPrefix.length);
                const newId = `${sectionId}-${suffixPart}`;
                if (onIdChange) {
                    onIdChange(newId);
                }
            }
        }
        prevSectionIdRef.current = sectionId;
    }, [sectionId, elementId, onIdChange]);

    return {
        elementId,
        prefix,
        tempId,
        setTempId
    };
}
