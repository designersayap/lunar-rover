import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../../page.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function BuilderControlsPopover({
    isOpen,
    onClose,
    url,
    onUrlChange,
    variant,
    onVariantChange,
    isVisible,
    onVisibilityChange,
    variants = ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
    position
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Calculate constrained position
    let popoverStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "320px",
        height: "auto",
        maxHeight: "none",
        margin: 0,
        pointerEvents: "auto"
    };

    if (position && typeof window !== 'undefined') {
        const popoverWidth = 320;
        const padding = 16;
        const windowWidth = window.innerWidth;
        const minLeft = popoverWidth / 2 + padding;
        const maxLeft = windowWidth - popoverWidth / 2 - padding;
        const constrainedLeft = Math.max(minLeft, Math.min(position.left, maxLeft));

        popoverStyle = {
            ...popoverStyle,
            top: `${position.top}px`,
            left: `${constrainedLeft}px`,
            transform: "translateX(-50%)"
        };
    }

    const content = (
        <div className={styles.popoverOverlay} style={{ pointerEvents: "none" }}>
            <div
                className={styles.popoverContainer}
                style={popoverStyle}
                onClick={(e) => e.stopPropagation()}
            >


                {/* Content */}
                <div className={styles.popoverContent}>
                    <div className={styles.popoverProperties}>
                        {/* Visibility Toggle */}
                        <div className={styles.propertyRow}>
                            <label className={styles.propertyLabel}>Show Button</label>
                            <label className={styles.toggleSwitch}>
                                <input
                                    type="checkbox"
                                    className={styles.toggleInput}
                                    checked={isVisible}
                                    onChange={(e) => onVisibilityChange && onVisibilityChange(e.target.checked)}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>

                        {/* URL Input */}
                        <div className={styles.propertyRow} style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                            <label className={styles.propertyLabel}>URL</label>
                            <input
                                type="text"
                                className={styles.searchBar}
                                style={{ marginBottom: 0 }}
                                value={url}
                                onChange={(e) => onUrlChange && onUrlChange(e.target.value)}
                                placeholder="write you link or page here"
                            />
                        </div>

                        {/* Variant Select */}
                        <div className={styles.propertyRow} style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                            <label className={styles.propertyLabel}>Variant</label>
                            <div className={styles.selectWrapper}>
                                <select
                                    className={styles.propertySelect}
                                    value={variant}
                                    onChange={(e) => onVariantChange && onVariantChange(e.target.value)}
                                >
                                    {variants.map(v => (
                                        <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

    if (!mounted || !isOpen) return null;

    return createPortal(content, document.body);
}
