import {
    ArrowUpIcon,
    ArrowDownIcon,
    TrashIcon as TrashIconOutline,
} from "@heroicons/react/24/outline";
import { uspData, footerData } from "../template-components/content/data";
import styles from "../page.module.css";

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
    updateComponent
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
                                    {item.id === "usp-3col" || item.id === "usp-4col" ? (
                                        <Component
                                            title={uspData.title}
                                            features={uspData.features}
                                            {...item.props}
                                            onUpdate={(props) => updateComponent(item.uniqueId, props)}
                                        />
                                    ) : item.id === "footer" ? (
                                        <Component
                                            {...footerData}
                                            {...item.props}
                                            onUpdate={(props) => updateComponent(item.uniqueId, props)}
                                        />
                                    ) : (
                                        <Component
                                            {...item.props}
                                            onUpdate={(props) => updateComponent(item.uniqueId, props)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
