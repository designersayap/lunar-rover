
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

        const updateOffsets = () => {
            let offset = 0;
            const nextStyles = {};
            const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;

            stickyComponents.forEach((comp, index) => {
                const el = elementRefs.current.get(comp.uniqueId);
                const height = el ? el.offsetHeight : 0;

                const isStacked = comp.props?.scrollEffect === 'stacked';
                let top = offset;

                if (isStacked) {
                    top = Math.min(offset, winH - height);
                }

                nextStyles[comp.uniqueId] = {
                    position: 'sticky',
                    top: top,
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

        window.addEventListener('resize', updateOffsets);

        // Initial calculation
        updateOffsets();

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updateOffsets);
        };

    }, [components]);

    return {
        stickyStyles,
        setRef: (id, el) => {
            if (el) elementRefs.current.set(id, el);
            else elementRefs.current.delete(id);
        }
    };
}
