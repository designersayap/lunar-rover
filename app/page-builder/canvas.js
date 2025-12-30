import { useMemo } from "react";
import { isComponentSticky } from "./utils/component-manager";
import { useBuilderSelection } from "@/app/page-builder/utils/builder/builder-controls";
import styles from "../page.module.css";
import { useStickyStacking } from "./utils/sticky-stacking";

export default function Canvas({
    selectedComponents,
    updateComponent
}) {
    const { setActiveElementId } = useBuilderSelection();

    // Sort components: Pinned items first
    const displayComponents = useMemo(() => [
        ...selectedComponents.filter(c => isComponentSticky(c)),
        ...selectedComponents.filter(c => !isComponentSticky(c))
    ], [selectedComponents]);

    const { stickyStyles, setRef } = useStickyStacking(displayComponents);

    // Default to desktop style
    const canvasClassName = `${styles.canvas} ${styles.canvasDesktop}`;

    return (
        <div className={canvasClassName} onClick={() => setActiveElementId(null)}>
            {/* Canvas Content */}
            <div className={styles.canvasInner}>
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
                        {displayComponents.map((item, index) => {
                            const Component = item.component;
                            const stickyStyle = stickyStyles[item.uniqueId] || {};

                            return (
                                <div
                                    key={item.uniqueId}
                                    className={styles.componentWrapper}
                                    style={stickyStyle}
                                    ref={(el) => setRef(item.uniqueId, el)}
                                >
                                    <Component
                                        {...item.props}
                                        sectionId={item.sectionId}
                                        onUpdate={(newProps) => updateComponent(item.uniqueId, newProps)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {/* Portal container for dialogs */}
            <div id="dialog-portal-root" className="z-system-modal-fullscreen" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />
        </div>
    );
}
