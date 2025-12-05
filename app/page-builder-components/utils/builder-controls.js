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
