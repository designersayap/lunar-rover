import { useState, useEffect } from "react";
import { useBuilderSelection } from "@/app/page-builder-components/utils/builder-controls";

import styles from "../page.module.css";



export default function Canvas({
    selectedComponents,
    handleDragStart,
    handleDragOver,
    handleDrop,
    draggedItemIndex,
    dropTargetIndex,
    setDraggedItemIndex,
    updateComponent
}) {
    const { setActiveElementId } = useBuilderSelection();

    return (
        <div className={styles.canvas} onClick={() => setActiveElementId(null)}>
            {/* Canvas Content */}
            <div className={styles.canvasInner}>
                {selectedComponents.length === 0 ? (
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
                        {selectedComponents.map((item, index) => {
                            const Component = item.component;
                            return (
                                <div
                                    key={item.uniqueId}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index, item.name || "Section", item.thumbnail)}
                                    onDragEnd={() => setDraggedItemIndex(null)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className={`${styles.componentWrapper} ${draggedItemIndex === index ? styles.componentWrapperDragging : ''}`}
                                    style={{
                                        marginTop: dropTargetIndex === index && draggedItemIndex !== index ? "var(--space-80)" : "0"
                                    }}
                                >
                                    {/* Drop Indicator */}
                                    {dropTargetIndex === index && draggedItemIndex !== index && (
                                        <div className={styles.dropIndicator}>
                                            <div className={styles.dropIndicatorCircle} />
                                        </div>
                                    )}
                                    {/* Removed Control Buttons per user request */}

                                    {/* Render Component */}
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
        </div>
    );
}
