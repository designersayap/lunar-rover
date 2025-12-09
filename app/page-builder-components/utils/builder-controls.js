"use client";

import { createContext, useContext, useState } from "react";

export const BuilderSelectionContext = createContext({
    activeElementId: null,
    setActiveElementId: () => { },
    activePopoverId: null,
    setActivePopoverId: () => { }
});

export function BuilderSelectionProvider({ children }) {
    const [activeElementId, setActiveElementId] = useState(null);
    const [activePopoverId, setActivePopoverId] = useState(null);

    return (
        <BuilderSelectionContext.Provider value={{
            activeElementId,
            setActiveElementId,
            activePopoverId,
            setActivePopoverId
        }}>
            {children}
        </BuilderSelectionContext.Provider>
    );
}

export function useBuilderSelection() {
    return useContext(BuilderSelectionContext);
}

/**
 * Calculate popover position within viewport bounds
 * @param {DOMRect} triggerRect - Bounding rect of trigger element
 * @param {Object} options - Width/height/padding options
 * @returns {{ top: number, left: number }}
 */
export function calculatePopoverPosition(triggerRect, options = {}) {
    const { width = 362, height = 500, padding = 12 } = options;

    let left = triggerRect.right + padding;
    let top = triggerRect.top;

    // Flip to left if overflows right
    if (left + width > window.innerWidth) {
        left = triggerRect.left - width - padding;
    }

    // Clamp to viewport
    left = Math.max(padding, Math.min(left, window.innerWidth - width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - height - padding));

    return { top, left };
}
