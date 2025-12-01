import { useState, useEffect } from "react";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    TrashIcon as TrashIconOutline,
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";

function SectionIdInput({ id, initialValue, onUpdate }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleBlur = () => {
        if (value !== initialValue) {
            onUpdate(id, value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    return (
        <div className={styles.controlId}>
            <span className={styles.controlIdHash}>#</span>
            <input
                type="text"
                className={styles.controlIdInput}
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/\s/g, '-'))}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default function Canvas({
    selectedComponents,
    handleDragStart,
    handleDragOver,
    handleDrop,
    draggedItemIndex,
    dropTargetIndex,
    setDraggedItemIndex,
    moveUp,
    moveDown,

    removeComponent,
    updateComponent,
    updateSectionId
}) {
    return (
        <div className={styles.canvas}>
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
                                    {/* Grouped Control Buttons */}
                                    <div className={styles.controlButtons}>
                                        {item.sectionId && (
                                            <SectionIdInput
                                                id={item.uniqueId}
                                                initialValue={item.sectionId}
                                                onUpdate={updateSectionId}
                                            />
                                        )}
                                        {index < selectedComponents.length - 1 && (
                                            <button
                                                onClick={() => moveDown(index)}
                                                className={`${styles.controlButton} ${styles.controlButtonBordered}`}
                                                data-tooltip="Move Down"
                                                data-tooltip-position="top"
                                            >
                                                <ArrowDownIcon style={{ width: "16px", height: "16px" }} />
                                            </button>
                                        )}
                                        {index > 0 && (
                                            <button
                                                onClick={() => moveUp(index)}
                                                className={`${styles.controlButton} ${styles.controlButtonBordered}`}
                                                data-tooltip="Move Up"
                                                data-tooltip-position="top"
                                            >
                                                <ArrowUpIcon style={{ width: "16px", height: "16px" }} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => removeComponent(item.uniqueId)}
                                            className={`${styles.controlButton} ${styles.controlButtonDelete}`}
                                            data-tooltip="Delete Section"
                                            data-tooltip-position="top"
                                        >
                                            <TrashIconOutline style={{ width: "16px", height: "16px" }} />
                                        </button>
                                    </div>

                                    {/* Render Component */}
                                    <Component
                                        {...item.props}
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
