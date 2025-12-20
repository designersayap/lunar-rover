
import { useState, useEffect, useRef } from 'react';
import { isComponentSticky } from "./component-manager";

/**
 * Hook to manage stacking of sticky elements.
 */
export function useStickyStacking(components) {
    const [stickyStyles, setStickyStyles] = useState({});

    // We need to keep references to the DOM elements to measure height
    // We'll use a Map keyed by uniqueId
    const elementRefs = useRef(new Map());
    const lastStickyStylesRef = useRef("");

    useEffect(() => {
        // 1. Identify sticky components in order
        const stickyComponents = components.filter(isComponentSticky);

        if (stickyComponents.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStickyStyles({});
            return;
        }

        // 2. Measure heights and calculate offsets
        const newStyles = {};
        let currentTop = 0;

        // Use a ResizeObserver to detect height changes (simplified logic for now)

        const updateOffsets = () => {
            let offset = 0;
            const nextStyles = {};

            stickyComponents.forEach((comp, index) => {
                const el = elementRefs.current.get(comp.uniqueId);
                const height = el ? el.offsetHeight : 0;
                // Add specific adjustment for Nav vs Banner if needed? 
                // No, standard flow: sticky 1 is top 0. sticky 2 is top H1.

                // However, we want them to stack relative to the viewport top
                // So Sticky 1 gets top: 0
                // Sticky 2 gets top: Sticky1Height

                nextStyles[comp.uniqueId] = {
                    position: 'sticky',
                    top: offset,
                    zIndex: 100 - index // Descending z-index so top items are above bottom items
                };

                offset += height;
            });

            // Check if styles actually changed to prevent infinite loops
            const nextStylesStr = JSON.stringify(nextStyles);
            if (nextStylesStr !== lastStickyStylesRef.current) {
                lastStickyStylesRef.current = nextStylesStr;
                setStickyStyles(nextStyles);
            }
        };

        // Initialize ResizeObserver for all sticky elements
        const ro = new ResizeObserver(() => {
            updateOffsets();
        });

        stickyComponents.forEach(comp => {
            const el = elementRefs.current.get(comp.uniqueId);
            if (el) ro.observe(el);
        });

        // Initial calculation
        updateOffsets();

        return () => ro.disconnect();

    }, [components]);

    return {
        stickyStyles,
        setRef: (id, el) => {
            if (el) elementRefs.current.set(id, el);
            else elementRefs.current.delete(id);
        }
    };
}
