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
export default function StickyManager({ children, stickyIndices = [] }) {
    const [offsets, setOffsets] = useState({});
    const refs = useRef({});

    // We strictly use indices for keys to match the render order

    useEffect(() => {
        if (stickyIndices.length === 0) return;

        const updateOffsets = () => {
            let currentOffset = 0;
            const newOffsets = {};

            stickyIndices.forEach(index => {
                const el = refs.current[index];
                if (el) {
                    newOffsets[index] = currentOffset;
                    currentOffset += el.offsetHeight;
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

        // Initial check
        updateOffsets();

        return () => {
            resizeObserver.disconnect();
        };
    }, [JSON.stringify(stickyIndices)]); // Use stringified to react to array value changes

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {Children.map(children, (child, index) => {
                if (!child) return null;

                const isSticky = stickyIndices.includes(index);

                if (!isSticky) {
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
                            zIndex: 1100 - index,
                            width: '100%'
                        }}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
}
