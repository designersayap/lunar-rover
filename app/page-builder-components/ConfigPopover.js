import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";

export default function ConfigPopover({
    selectedComponent,
    position,
    configProps,
    setConfigProps,
    onClose,
    onInsert
}) {
    const [zoomState, setZoomState] = useState({ x: 0, y: 0, isHovering: false });

    if (!selectedComponent) return null;

    return (
        <div className={styles.popoverOverlay} onClick={onClose}>
            <div
                className={styles.popoverContainer}
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "absolute",
                    top: position.top,
                    left: position.left,
                    transform: "translateY(-50%)", // Center vertically relative to button
                    margin: 0
                }}
            >
                {/* Header */}
                <div className={styles.popoverHeader}>
                    <h3 className={`body-bold ${styles.popoverTitle}`}>
                        {selectedComponent.name}
                    </h3>
                    <button
                        className={styles.popoverClose}
                        onClick={onClose}
                    >
                        <XMarkIcon style={{ width: "20px", height: "20px" }} />
                    </button>
                </div>

                {/* Content */}
                <div className={styles.popoverContent}>
                    {/* Preview */}
                    <div
                        className={styles.popoverPreview}
                        onMouseMove={(e) => {
                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - left) / width) * 100;
                            const y = ((e.clientY - top) / height) * 100;
                            setZoomState(prev => ({ ...prev, x, y }));
                        }}
                        onMouseEnter={() => setZoomState(prev => ({ ...prev, isHovering: true }))}
                        onMouseLeave={() => setZoomState(prev => ({ ...prev, isHovering: false }))}
                    >
                        <img
                            src={selectedComponent.thumbnail}
                            alt="Preview"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transformOrigin: `${zoomState.x}% ${zoomState.y}%`,
                                transform: zoomState.isHovering ? "scale(2)" : "scale(1)",
                                transition: "transform 0.1s ease-out"
                            }}
                        />
                    </div>

                    {/* Properties */}
                    {selectedComponent.config && selectedComponent.config.length > 0 && (
                        <div className={styles.popoverProperties}>
                            <h4 className="body-bold">Properties</h4>

                            {selectedComponent.config.map(prop => (
                                <div key={prop.name} className={styles.propertyRow}>
                                    <span className={styles.propertyLabel}>{prop.label}</span>

                                    {prop.type === "boolean" && (
                                        <label className={styles.toggleSwitch}>
                                            <input
                                                type="checkbox"
                                                className={styles.toggleInput}
                                                checked={configProps[prop.name] || false}
                                                onChange={(e) => setConfigProps({ ...configProps, [prop.name]: e.target.checked })}
                                            />
                                            <span className={styles.toggleSlider}></span>
                                        </label>
                                    )}

                                    {prop.type === "select" && (
                                        <select
                                            className={`caption-regular ${styles.propertySelect}`}
                                            value={configProps[prop.name]}
                                            onChange={(e) => setConfigProps({ ...configProps, [prop.name]: e.target.value })}
                                        >
                                            {prop.options.map(option => (
                                                <option key={option} value={option}>
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {prop.type === "input" && (
                                        <input
                                            type="text"
                                            className={`caption-regular ${styles.propertyInput}`}
                                            value={configProps[prop.name] || ""}
                                            onChange={(e) => setConfigProps({ ...configProps, [prop.name]: e.target.value })}
                                            placeholder={prop.placeholder || ""}
                                            style={{
                                                width: "100%",
                                                padding: "var(--space-40) var(--space-80)",
                                                borderRadius: "var(--round-40)",
                                                border: "1px solid var(--grey-200)",
                                                backgroundColor: "var(--white)",
                                                color: "var(--content-neutral--body)",
                                                fontSize: "var(--typography-font-size-80)"
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={styles.popoverFooter}>
                    <button
                        className="btn btn-primary btn-sm"
                        style={{ width: "100%" }}
                        onClick={onInsert}
                    >
                        Insert Section
                    </button>
                </div>
            </div>
        </div>
    );
}
