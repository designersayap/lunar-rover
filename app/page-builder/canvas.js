import { useMemo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { isComponentSticky } from "./utils/component-manager";
import { useBuilderSelection } from "@/app/page-builder/utils/builder/builder-controls";
import styles from "../page.module.css";
import { useStickyStacking } from "./utils/sticky-stacking";
import { componentLibrary } from "@/app/page-builder/content/component-library";
import { CanvasContext } from "./utils/canvas-context";

export default function Canvas({
    selectedComponents,
    updateComponent
}) {
    const { setActiveElementId, activeElementId, selectedElementIds = [], toggleElementSelection } = useBuilderSelection();

    // Resize state
    const [canvasWidth, setCanvasWidth] = useState('100%');
    const [isResizing, setIsResizing] = useState(false);
    const canvasInnerRef = useRef(null);
    const resizeStartX = useRef(0);
    const resizeStartWidth = useRef(0);

    // Indicator visibility logic
    const [showIndicator, setShowIndicator] = useState(false);

    useEffect(() => {
        let timeout;
        if (isResizing || canvasWidth !== '100%') {
            setShowIndicator(true);
            timeout = setTimeout(() => {
                setShowIndicator(false);
            }, 5000); // Hide after 5 seconds of inactivity
        } else {
            setShowIndicator(false);
        }
        return () => clearTimeout(timeout);
    }, [canvasWidth, isResizing]);

    // Resize logic
    // Resize logic
    useEffect(() => {
        if (!isResizing) return;

        let animationFrameId;

        const handleMouseMove = (e) => {
            if (animationFrameId) return; // Skip if already scheduled

            animationFrameId = requestAnimationFrame(() => {
                const delta = e.clientX - resizeStartX.current;
                // Use offsetWidth to be more stable against scrollbar toggling, or just fallback to window
                const parentEl = canvasInnerRef.current?.parentElement;
                const parentWidth = parentEl ? parentEl.clientWidth : window.innerWidth;
                const maxAllowedWidth = parentWidth - 32; // 16px margin on each side

                // Symmetric resize: multiply delta by 2
                let newWidth = resizeStartWidth.current + (delta * 2);

                // Clamp
                newWidth = Math.min(maxAllowedWidth, Math.max(360, newWidth));

                setCanvasWidth(`${newWidth}px`);
                animationFrameId = null;
            });
        };

        const handleMouseUp = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            setIsResizing(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isResizing]);

    const startResize = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        resizeStartX.current = e.clientX;
        if (canvasInnerRef.current) {
            resizeStartWidth.current = canvasInnerRef.current.offsetWidth;
        }
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    };

    const resetResize = (e) => {
        e.stopPropagation();
        setCanvasWidth('100%');
    };

    // Sort components: Pinned items first
    const displayComponents = useMemo(() => {
        // Safe guard: Remove duplicates based on uniqueId
        const uniqueComponents = [];
        const seenIds = new Set();

        selectedComponents.forEach(comp => {
            if (comp.uniqueId && !seenIds.has(comp.uniqueId)) {
                seenIds.add(comp.uniqueId);
                uniqueComponents.push(comp);
            }
        });

        return [
            ...uniqueComponents.filter(c => isComponentSticky(c)),
            ...uniqueComponents.filter(c => !isComponentSticky(c))
        ];
    }, [selectedComponents]);

    const { stickyStyles, setRef } = useStickyStacking(displayComponents);

    // Auto-scroll logic
    const scrollRefs = useRef(new Map());
    const lastScrollTarget = useRef(null);

    useEffect(() => {
        // Find the "first" selected item based on visual order (displayComponents order)
        const topSelected = displayComponents.find(c =>
            c.uniqueId === activeElementId || selectedElementIds.includes(c.uniqueId)
        );

        if (topSelected) {
            // 1. "anchoring (auto scroll) to the layer"
            // 2. "if it select multiple layer it stay on the top selected layer" 
            //    (because we pick the first one from display list, and if we add a lower selection, the top one doesn't change, so no scroll happen)
            if (lastScrollTarget.current !== topSelected.uniqueId) {
                const el = scrollRefs.current.get(topSelected.uniqueId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    lastScrollTarget.current = topSelected.uniqueId;
                }
            }
        } else {
            lastScrollTarget.current = null;
        }
    }, [activeElementId, selectedElementIds, displayComponents]);

    // Default to desktop style
    const canvasClassName = `${styles.canvas} ${styles.canvasDesktop}`;

    return (
        <div id="canvas-scroll-container" className={canvasClassName} onClick={() => setActiveElementId(null)}>
            <CanvasContext.Provider value={{ canvasWidth }}>
                {/* Canvas Content */}
                <div
                    id="canvas-inner"
                    className={styles.canvasInner}
                    ref={canvasInnerRef}
                    style={{
                        width: canvasWidth,
                        transition: isResizing ? 'none' : 'width 0.3s ease, max-width 0.3s ease',
                        flex: 'none'
                    }}
                >
                    {/* Resize Handle */}
                    <div
                        className={`${styles.resizeHandle} ${isResizing ? styles.resizeHandleActive : ''}`}
                        onMouseDown={startResize}
                        onDoubleClick={resetResize}
                        title="Drag to resize, double-click to reset"
                    >
                        <div className={styles.resizeHandleBar} />
                    </div>

                    <div id="canvas-background-root" className={styles.canvasBackgroundRoot} />
                    {displayComponents.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateText}>
                                <div className={styles.canvasWrapper}>
                                    <Image
                                        src="https://space.lunaaar.site/assets-lunar/empty-state.svg"
                                        alt="Empty state illustration"
                                        fill
                                        priority
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <p className={`body-regular ${styles.canvasText}`}>
                                    Select components from the sidebar to build your template
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div data-canvas="true">
                            {(() => {
                                let hasSeenStacked = false;

                                return displayComponents.map((item) => {
                                    const Component = item.component || Object.values(componentLibrary).flat().find(c => c.id === item.id)?.component;
                                    const stickyStyle = stickyStyles[item.uniqueId] || {};
                                    const isSelected = selectedElementIds.includes(item.uniqueId);

                                    const isStacked = item.props?.scrollEffect === 'stacked';

                                    // This prevents the stacked item (which is stuck at top) from showing through transparent sections.
                                    let forcedBgStyle = {};


                                    if (hasSeenStacked && !isStacked) {
                                        forcedBgStyle = { backgroundColor: 'var(--pb-white)', position: 'relative', zIndex: 1 };
                                    }

                                    if (isStacked) {
                                        hasSeenStacked = true;
                                    }

                                    return (
                                        <div
                                            key={item.uniqueId}
                                            className={`${styles.componentWrapper} ${isSelected ? styles.activeWrapper : ''} ${isSelected ? styles.componentSelected : ''}`}
                                            style={{
                                                ...forcedBgStyle,
                                                ...stickyStyle,
                                                backgroundColor: isSelected ? undefined : (forcedBgStyle.backgroundColor || "transparent"),
                                            }}
                                            ref={(el) => {
                                                setRef(item.uniqueId, el);
                                                if (el) scrollRefs.current.set(item.uniqueId, el);
                                                else scrollRefs.current.delete(item.uniqueId);
                                            }}
                                            onClickCapture={(e) => {
                                                if (e.metaKey || e.ctrlKey) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleElementSelection(item.uniqueId, true);
                                                }
                                            }}
                                        >
                                            <Component
                                                {...item.props}
                                                sectionId={item.sectionId}
                                                uniqueId={item.uniqueId}
                                                onUpdate={(newProps) => updateComponent(item.uniqueId, newProps)}
                                                updateComponent={updateComponent}
                                            />
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    )}
                    {/* Resolution Indicator */}
                    {showIndicator && (
                        <div className={styles.resolutionIndicator}>
                            <span style={{ opacity: 0.7 }}>Device Width:</span>
                            <strong>{canvasWidth === '100%' ? 'Full' : canvasWidth}</strong>
                            {isResizing && <span style={{ opacity: 0.5, marginLeft: 'var(--pb-space-xs)' }}>(Resizing)</span>}
                        </div>
                    )}
                </div>
            </CanvasContext.Provider>
            {/* Portal container for dialogs */}
            <div id="dialog-portal-root" className={`z-system-modal-fullscreen ${styles.overlayFixed}`} />
        </div>
    );
}
