
import { useState, useEffect, useRef } from 'react';
import { isComponentSticky } from "./component-manager";

/**
 * Hook to manage stacking of sticky elements.
 */
export function useStickyStacking(components) {
    const [stickyStyles, setStickyStyles] = useState({});

    const elementRefs = useRef(new Map());
    const lastStickyStylesRef = useRef("");

    useEffect(() => {
        // Identify sticky components
        const stickyComponents = components.filter(isComponentSticky);

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

                nextStyles[comp.uniqueId] = {
                    position: 'sticky',
                    top: offset,
                    zIndex: 100 - index
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
