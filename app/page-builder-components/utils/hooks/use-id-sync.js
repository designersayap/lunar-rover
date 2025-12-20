"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useIdSync: Synchronizes element IDs with parent section changes and handles unique ID generation.
 */
export function useIdSync({ id, sectionId, suffix, onIdChange }) {
    // Normalize sectionId, generate fallback, and normalize stored ID
    const normalizedSectionId = sectionId?.replace(/-+$/, '') || '';
    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : "";
    const generatedId = normalizedSectionId ? (suffix ? `${normalizedSectionId}-${suffix}` : `${normalizedSectionId}-element`) : undefined;
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
