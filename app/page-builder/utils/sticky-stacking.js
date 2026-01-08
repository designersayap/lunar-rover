
import { useState, useEffect, useRef } from 'react';
import { isComponentSticky } from "./component-manager";

export function useStickyStacking(components) {
    const [stickyStyles, setStickyStyles] = useState({});

    const elementRefs = useRef(new Map());
    const lastStickyStylesRef = useRef("");

    useEffect(() => {
        // Identify sticky components (Pinned OR Stacked)
        const stickyComponents = components.filter(c => isComponentSticky(c) || c.props?.scrollEffect === 'stacked');

        if (stickyComponents.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStickyStyles({});
            return;
        }

        const newStyles = {};
        let currentTop = 0;

        const updateOffsets = () => {
            let offset = 0;
            const nextStyles = {};

            stickyComponents.forEach((comp, index) => {
                const el = elementRefs.current.get(comp.uniqueId);
                const height = el ? el.offsetHeight : 0;

                const isStacked = comp.props?.scrollEffect === 'stacked';

                nextStyles[comp.uniqueId] = {
                    position: 'sticky',
                    top: offset,
                    // If stacked, it goes behind everything (z-index 0). 
                    // Normal sticky items (headers) stay on top.
                    zIndex: isStacked ? 0 : 100 - index
                };

                // Specific behavior for Stacked items:
                // They should stick at the current offset (under headers) but NOT push subsequent sticky items down.
                // This allows them to be "covered" by the next sliding element.
                if (!isStacked) {
                    offset += height;
                }
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
