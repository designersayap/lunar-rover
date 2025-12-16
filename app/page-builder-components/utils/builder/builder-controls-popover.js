import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import styles from "../../../page.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function BuilderControlsPopover({
    isOpen,
    onClose,
    url,
    onUrlChange,
    linkType = 'url',
    onLinkTypeChange,
    variant,
    onVariantChange,
    variants = ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
    showVariant = true,

    showLinkType = true, // Set to false for BuilderLink
    showUrl = true, // Set to false to hide URL input
    position,
    dialogOptions = [],
    targetDialogId,
    onTargetDialogIdChange,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    onLayoutChange
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Positioning Logic:
    // Ensures the popover stays within the viewport and doesn't overlap the sidebar/topbar.
    // Calculates a "constrained" position.
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
        const sidebarWidth = 320;
        const topBarHeight = 42;
        const minLeft = sidebarWidth + popoverWidth / 2 + padding;
        const maxLeft = windowWidth - popoverWidth / 2 - padding;
        const constrainedLeft = Math.max(minLeft, Math.min(position.left, maxLeft));

        // Top Boundary: Prevent overlapping the TopBar
        const minTop = topBarHeight + padding;
        const constrainedTop = Math.max(minTop, position.top);

        popoverStyle = {
            ...popoverStyle,
            top: `${constrainedTop}px`,
            left: `${constrainedLeft}px`,
            transform: "translateX(-50%)"
        };
    }

    const content = (
        <div className={`${styles.popoverOverlay} z-system-modal-floating`} style={{ pointerEvents: "none" }}>
            <div
                className={styles.popoverContainer}
                style={popoverStyle}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Content */}
                <div className={styles.popoverContent}>
                    <div className={styles.popoverProperties}>

                        {/* Link Type Selector - only show for buttons */}
                        {showLinkType && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Link Type</label>
                                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                    <label
                                        className={`${styles.themeOption} ${linkType === 'url' ? styles.themeOptionSelected : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="linkType"
                                            value="url"
                                            checked={linkType === 'url'}
                                            onChange={() => onLinkTypeChange && onLinkTypeChange('url')}
                                            className={styles.themeOptionInput}
                                            style={{ margin: 0, marginRight: '8px' }}
                                        />
                                        <span className="caption-regular">Custom URL</span>
                                    </label>
                                    <label
                                        className={`${styles.themeOption} ${linkType === 'dialog' ? styles.themeOptionSelected : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="linkType"
                                            value="dialog"
                                            checked={linkType === 'dialog'}
                                            onChange={() => onLinkTypeChange && onLinkTypeChange('dialog')}
                                            className={styles.themeOptionInput}
                                            style={{ margin: 0, marginRight: '8px' }}
                                        />
                                        <span className="caption-regular">Dialog</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* URL Input - always show for links, or when linkType is 'url' for buttons */}
                        {((linkType === 'url' || !showLinkType) && showUrl) && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>URL</label>
                                <input
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={url || ''}
                                    onChange={(e) => onUrlChange && onUrlChange(e.target.value)}
                                    placeholder="write you link or page here"
                                />
                            </div>
                        )}

                        {/* Dialog Target Selection */}
                        {linkType === 'dialog' && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Dialog</label>
                                <div className={styles.selectWrapper}>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={targetDialogId || ''}
                                        onChange={(e) => onTargetDialogIdChange && onTargetDialogIdChange(e.target.value)}
                                    >
                                        <option value="">Select a Dialog</option>
                                        {dialogOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                </div>
                            </div>
                        )}

                        {/* Variant Select */}
                        {showVariant && (
                            <>
                                <div style={{ borderTop: '1px solid var(--bdr)', margin: '8px 0', width: '100%' }} />
                                <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                    <label className={`caption-bold ${styles.formInputTitle}`}>Variant</label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            className={`${styles.formInput} ${styles.formSelect}`}
                                            value={variant}
                                            onChange={(e) => onVariantChange && onVariantChange(e.target.value)}
                                        >
                                            {variants.map(v => (
                                                <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                                            ))}
                                        </select>
                                        <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                    </div>
                                </div>
                            </>
                        )}


                        {/* Section Layout Controls - Only show if onLayoutChange is provided */}
                        {onLayoutChange && (
                            <>
                                <div className={styles.propertyRow}>
                                    <label className={`caption-bold ${styles.formInputTitle}`} style={{ marginBottom: 0 }}>Full Width</label>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            className={styles.toggleInput}
                                            checked={fullWidth === true || fullWidth === "true"}
                                            onChange={(e) => onLayoutChange({ fullWidth: e.target.checked })}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );

    if (!mounted || !isOpen) return null;

    return createPortal(content, document.body);
}
