import { useMemo } from "react";
import { isComponentSticky } from "./utils/component-manager";
import { useBuilderSelection } from "@/app/page-builder/utils/builder/builder-controls";
import styles from "../page.module.css";
import { useStickyStacking } from "./utils/sticky-stacking";

export default function Canvas({
    selectedComponents,
    updateComponent
}) {
    const { setActiveElementId, selectedElementIds = [], toggleElementSelection } = useBuilderSelection();

    // Sort components: Pinned items first
    const displayComponents = useMemo(() => [
        ...selectedComponents.filter(c => isComponentSticky(c)),
        ...selectedComponents.filter(c => !isComponentSticky(c))
    ], [selectedComponents]);

    const { stickyStyles, setRef } = useStickyStacking(displayComponents);

    // Default to desktop style
    const canvasClassName = `${styles.canvas} ${styles.canvasDesktop}`;

    return (
        <div id="canvas-scroll-container" className={canvasClassName} onClick={() => setActiveElementId(null)}>
            {/* Canvas Content */}
            <div className={styles.canvasInner}>
                <div id="canvas-background-root" className={styles.canvasBackgroundRoot} />
                {displayComponents.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateText}>
                            <img
                                src="/images/empty-state.svg"
                                alt="Empty state illustration"
                                style={{
                                    width: "200px",
                                    height: "auto",
                                    marginBottom: "var(--space-100)"
                                }}
                            />
                            <p className="body-regular" style={{ color: "var(--content-neutral--caption)" }}>
                                Select components from the sidebar to build your template
                            </p>
                        </div>
                    </div>
                ) : (
                    <div data-canvas="true">
                        {(() => {
                            let hasSeenStacked = false;

                            return displayComponents.map((item) => {
                                const Component = item.component;
                                const stickyStyle = stickyStyles[item.uniqueId] || {};
                                const isSelected = selectedElementIds.includes(item.uniqueId);

                                const isStacked = item.props?.scrollEffect === 'stacked';

                                // Logic: If we have passed a stacked group, and the current item is NOT stacked/sticky,
                                // and has no background image, force white background.
                                // This prevents the stacked item (which is stuck at top) from showing through transparent sections.
                                let forcedBgStyle = {};


                                if (hasSeenStacked && !isStacked) {
                                    forcedBgStyle = { backgroundColor: 'var(--base-white)', position: 'relative', zIndex: 1 };
                                }

                                if (isStacked) {
                                    // hasSeenStacked = true;
                                }

                                return (
                                    <div
                                        key={item.uniqueId}
                                        className={`${styles.componentWrapper} ${isSelected ? styles.activeWrapper : ''}`}
                                        style={{
                                            ...stickyStyle,
                                            ...forcedBgStyle,
                                            outline: isSelected ? "1px solid var(--lunar-300)" : "none",
                                            backgroundColor: isSelected ? "var(--lunar-50)" : "transparent",
                                            outlineOffset: "-1px",
                                        }}
                                        ref={(el) => setRef(item.uniqueId, el)}
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
                                            onUpdate={(newProps) => updateComponent(item.uniqueId, newProps)}
                                            updateComponent={updateComponent}
                                        />
                                    </div>
                                );
                            });
                        })()}
                    </div>
                )}
            </div>
            {/* Portal container for dialogs */}
            <div id="dialog-portal-root" className="z-system-modal-fullscreen" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />
        </div>
    );
}
