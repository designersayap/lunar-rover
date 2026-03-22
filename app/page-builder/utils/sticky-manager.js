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
export default function StickyManager({ children, stickyIndices = [], stackedIndices = [], blurIndices = [], overlayIndices = [] }) {
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

                    if (!isStacked && !overlayIndices.includes(index)) {
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
        const resizeObserver = new ResizeObserver(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(stickyIndices), JSON.stringify(stackedIndices)]); // Use stringified to react to array value changes

    // Stacked Blur and Background Effect
    useEffect(() => {
        if (stackedIndices.length === 0) return;

        // Cache for DOM elements to avoid querySelector in scroll handler
        const elementCache = {};

        const handleScroll = () => {
            stackedIndices.forEach(index => {
                const container = refs.current[index];
                if (!container) return;

                if (!elementCache[index]) {
                    elementCache[index] = {
                        overlay: container.querySelector('.stacked-white-overlay'),
                        content: container.querySelector('.stacked-content-blur'),
                        next: container.nextElementSibling,
                        lastProgress: -1
                    };
                }

                const cache = elementCache[index];
                const { overlay, content, next: nextElement } = cache;
                const isBlurred = blurIndices.includes(index);

                if (!nextElement) return;

                if (!isBlurred) {
                    // Logic for NON-BLURRED stacked items: Only run once or if cache invalidated
                    if (cache.lastProgress === 0) return;
                    
                    if (overlay && overlay.style.opacity !== '0') overlay.style.opacity = '0';
                    if (content && content.style.filter !== 'none') content.style.filter = 'none';

                    let sibling = nextElement;
                    let count = 0;
                    const targetBg = 'var(--background-neutral--default, #ffffff)';
                    
                    while (sibling && count < 8) { 
                        if (sibling.style) {
                            if (sibling.style.backgroundColor !== targetBg) {
                                sibling.style.setProperty('background-color', targetBg, 'important');
                            }
                            if (sibling.style.position !== 'relative') {
                                sibling.style.setProperty('position', 'relative', 'important');
                            }
                            if (sibling.style.zIndex !== '10') {
                                sibling.style.setProperty('z-index', '10', 'important');
                            }
                        }
                        sibling = sibling.nextElementSibling;
                        count++;
                    }
                    cache.lastProgress = 0;
                    return;
                }

                // Logic for BLURRED stacked items
                const rect = nextElement.getBoundingClientRect();
                const winH = window.innerHeight;

                const startPoint = winH;
                const endPoint = winH * 0.5;
                const current = rect.top;

                let progress = 0;
                if (current < startPoint) {
                    progress = (startPoint - current) / (startPoint - endPoint);
                }
                progress = Math.max(0, Math.min(1, progress));

                // Throttling by progress change
                if (Math.abs(progress - cache.lastProgress) < 0.005) return;
                cache.lastProgress = progress;

                if (overlay) {
                    overlay.style.opacity = progress.toFixed(3);
                }
                if (content) {
                    content.style.filter = `blur(${progress * 10}px)`;
                }

                if (nextElement.style) {
                    const inverseBlur = (1 - progress) * 10;
                    nextElement.style.filter = `blur(${inverseBlur.toFixed(2)}px)`;
                }

                const targetBg = progress >= 0.99 ? 'var(--background-neutral--default, #ffffff)' : 'transparent';

                let sibling = nextElement;
                let count = 0;
                while (sibling && count < 5) { 
                    if (sibling.style) {
                        if (sibling.style.backgroundColor !== targetBg) {
                            sibling.style.setProperty('background-color', targetBg, 'important');
                        }
                        if (sibling.style.position !== 'relative') {
                            sibling.style.setProperty('position', 'relative', 'important');
                        }
                        if (sibling.style.zIndex !== '10') {
                            sibling.style.setProperty('z-index', '10', 'important');
                        }
                    }
                    sibling = sibling.nextElementSibling;
                    count++;
                }
            });
        };

        let rafId = null;
        const throttledScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                handleScroll();
                rafId = null;
            });
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        window.addEventListener('resize', throttledScroll);
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            window.removeEventListener('resize', throttledScroll);
            if (rafId) cancelAnimationFrame(rafId);

            // Cleanup phase: Reset backgrounds on unmount/update
            stackedIndices.forEach(index => {
                const container = refs.current[index];
                // Clean up multiple siblings
                if (container) {
                    let sibling = container.nextElementSibling;
                    let count = 0;
                    while (sibling && count < 20) {
                        if (sibling.style) {
                            sibling.style.backgroundColor = '';
                            sibling.style.zIndex = '';
                            sibling.style.position = '';
                        }
                        sibling = sibling.nextElementSibling;
                        count++;
                    }
                }
            });
        };
    }, [JSON.stringify(stackedIndices), JSON.stringify(blurIndices)]);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {(() => {


                return Children.map(children, (child, index) => {
                    if (!child) return null;

                    const isSticky = stickyIndices.includes(index);
                    const isStacked = stackedIndices.includes(index);
                    const isOverlay = overlayIndices.includes(index);



                    if (!isSticky) {
                        return child;
                    }

                    const topOffset = offsets[index] || 0;

                    return (
                        <div
                            ref={el => refs.current[index] = el}
                            style={{
                                // ...forcedBgStyle, is removed
                                position: 'sticky',
                                top: topOffset,
                                // Invert z-index: Earlier items (higher up) should be on top of later items
                                // This prevents the Navbar from covering the Top Bar during initial load or overlap
                                zIndex: isStacked ? 0 : 100 - index,
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: isOverlay ? `-${refs.current[index]?.offsetHeight || 100}px` : undefined
                            }}
                        >
                            {isStacked ? (
                                <>
                                    <div
                                        className="stacked-white-overlay"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'var(--background-neutral--default, #ffffff)',
                                            zIndex: 2,
                                            pointerEvents: 'none',
                                            opacity: 0,
                                        }}
                                    />
                                    <div
                                        className="stacked-content-blur"
                                        style={{
                                            position: 'relative',
                                            zIndex: 1,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        {child}
                                    </div>
                                </>
                            ) : (
                                child
                            )}
                        </div>
                    );
                });
            })()}
        </div>
    );
}
