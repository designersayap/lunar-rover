"use client";

import { createContext, useContext, useState } from "react";

const BuilderSelectionContext = createContext({
    activeElementId: null,
    setActiveElementId: () => { }
});

export function BuilderSelectionProvider({ children }) {
    const [activeElementId, setActiveElementId] = useState(null);

    return (
        <BuilderSelectionContext.Provider value={{ activeElementId, setActiveElementId }}>
            {children}
        </BuilderSelectionContext.Provider>
    );
}

export function useBuilderSelection() {
    return useContext(BuilderSelectionContext);
}
