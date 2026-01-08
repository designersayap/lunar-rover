"use client";
import React, { useRef, useState, useEffect, Children } from 'react';

/**
 * StickyManager
 * 
 * Manages sticky positioning and stacking for children components.
 * Mimics the logic used in the internal page builder Canvas.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number[]} props.stickyIndices - Array of child indices that should be sticky
 */
export default function StickyManager({ children, stickyIndices = [], stackedIndices = [] }) {
    const [offsets, setOffsets] = useState({});
    const refs = useRef({});

    // We strictly use indices for keys to match the render order

    useEffect(() => {
        if (stickyIndices.length === 0) return;

        const updateOffsets = () => {
            let currentOffset = 0;
            const newOffsets = {};
            const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;

            stickyIndices.forEach(index => {
                const el = refs.current[index];
                if (el) {
                    const isStacked = stackedIndices.includes(index);

                    if (isStacked) {
                        // Dynamic top for stacked items (see useStickyStacking for logic details)
                        const height = el.offsetHeight;

                        // We store the calculated top in the offsets map for this index
                        // effectively 'currentOffset' acts as the base sticky pos (e.g. below header)
                        // but we adjust it down (negative) if the element is tall.
                        newOffsets[index] = Math.min(currentOffset, winH - height);
                    } else {
                        newOffsets[index] = currentOffset;
                    }

                    if (!isStacked) {
                        currentOffset += el.offsetHeight;
                    }
                }
            });

            // Deep comparison to avoid infinite loops if nothing changed
            setOffsets(prev => {
                const isSame = Object.keys(newOffsets).every(k => newOffsets[k] === prev[k]);
                return isSame ? prev : newOffsets;
            });
        };

        // Create observer
        const resizeObserver = new ResizeObserver(entries => {
            updateOffsets();
        });

        // Observe all sticky elements
        stickyIndices.forEach(index => {
            const el = refs.current[index];
            if (el) resizeObserver.observe(el);
        });

        window.addEventListener('resize', updateOffsets);

        // Initial check
        updateOffsets();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateOffsets);
        };
    }, [JSON.stringify(stickyIndices), JSON.stringify(stackedIndices)]); // Use stringified to react to array value changes

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {(() => {
                let hasSeenStacked = false;

                return Children.map(children, (child, index) => {
                    if (!child) return null;

                    const isSticky = stickyIndices.includes(index);
                    const isStacked = stackedIndices.includes(index);

                    // Logic: If we have passed a stacked group, and the current item is NOT stacked,
                    // force white background. This prevents the stacked item (which is stuck at top) 
                    // from showing through transparent sections.
                    let forcedBgStyle = {};
                    if (hasSeenStacked && !isStacked) {
                        forcedBgStyle = { backgroundColor: 'var(--base-white, #ffffff)', position: 'relative', zIndex: 1 };
                    }

                    if (isStacked) {
                        hasSeenStacked = true;
                    }

                    if (!isSticky) {
                        // If we need to force background, we must wrap the child
                        if (Object.keys(forcedBgStyle).length > 0) {
                            return (
                                <div style={{ width: '100%', ...forcedBgStyle }}>
                                    {child}
                                </div>
                            );
                        }
                        return child;
                    }

                    const topOffset = offsets[index] || 0;

                    return (
                        <div
                            ref={el => refs.current[index] = el}
                            style={{
                                position: 'sticky',
                                top: topOffset,
                                // Invert z-index: Earlier items (higher up) should be on top of later items
                                // This prevents the Navbar from covering the Top Bar during initial load or overlap
                                zIndex: isStacked ? 0 : 100 - index,
                                display: 'flex',
                                flexDirection: 'column',
                                ...forcedBgStyle
                            }}
                        >
                            {child}
                        </div>
                    );
                });
            })()}
        </div>
    );
}
