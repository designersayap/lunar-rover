import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import styles from "../../../page.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

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
    onLayoutChange,
    showPortraitToggle,
    isPortrait,
    onIsPortraitChange,
    showMobileRatio,
    mobileRatio,
    onMobileRatioChange
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Positioning Logic:
    const containerRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    // Center by default if no position
    const centerByDefault = !position;

    // Calculate constrained position
    let popoverStyle = centerByDefault ? {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "320px",
        height: "auto",
        maxHeight: "none",
        margin: 0,
        pointerEvents: "auto"
    } : {};

    useLayoutEffect(() => {
        if (position && containerRef.current && typeof window !== 'undefined') {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - position.top;

            // If popover height > space below, flip it
            // Buffer of 20px
            if (rect.height > spaceBelow - 20) {
                setIsFlipped(true);
            } else {
                setIsFlipped(false);
            }
        }
    }, [position, variants, linkType]); // Re-run when content might change height

    if (position && typeof window !== 'undefined') {
        const popoverWidth = 320;
        const padding = 16;
        const windowWidth = window.innerWidth;
        const topBarHeight = 42;
        const minLeft = popoverWidth / 2 + padding;
        const maxLeft = windowWidth - popoverWidth / 2 - padding;
        const constrainedLeft = Math.max(minLeft, Math.min(position.left, maxLeft));

        if (isFlipped) {
            // Flip: Position bottom relative to window bottom
            // Distance from screen bottom to element top = window.innerHeight - position.top
            // We want bottom to be at (element top) - (active overlay tag ~24px) - (padding 8px)
            // So bottom value = (window.innerHeight - position.top) + 10
            const bottomVal = (window.innerHeight - position.top) + 32;

            popoverStyle = {
                position: "fixed",
                bottom: `${bottomVal}px`,
                left: `${constrainedLeft}px`,
                transform: "translateX(-50%)",
                width: "320px",
                margin: 0,
                pointerEvents: "auto"
            };
        } else {
            // Standard: Top Boundary Check
            const minTop = topBarHeight + padding;
            const constrainedTop = Math.max(minTop, position.top);

            popoverStyle = {
                position: "fixed",
                top: `${constrainedTop}px`,
                left: `${constrainedLeft}px`,
                transform: "translateX(-50%)",
                width: "320px",
                margin: 0,
                pointerEvents: "auto"
            };
        }
    }

    const content = (
        <div className={`${styles.popoverOverlay} z-system-builder-overlay`} style={{ pointerEvents: "none" }} data-builder-ui>
            <div
                ref={containerRef}
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

                        {/* Portrait Mode Toggle */}
                        {showPortraitToggle && (
                            <>
                                <div style={{ borderTop: '1px solid var(--bdr)', margin: '8px 0', width: '100%' }} />
                                <div className={styles.propertyRow} style={{ marginTop: '0' }}>
                                    <label className={`caption-bold ${styles.formInputTitle}`} style={{ marginBottom: 0 }}>Portrait</label>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            className={styles.toggleInput}
                                            checked={isPortrait === true}
                                            onChange={(e) => onIsPortraitChange && onIsPortraitChange(e.target.checked)}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Mobile Aspect Ratio Selector */}
                        {showMobileRatio && (
                            <>
                                <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                    <label className={`caption-bold ${styles.formInputTitle}`}>Mobile Aspect Ratio</label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            className={`${styles.formInput} ${styles.formSelect}`}
                                            value={mobileRatio || ''}
                                            onChange={(e) => onMobileRatioChange && onMobileRatioChange(e.target.value)}
                                        >
                                            <option value="">Default</option>
                                            <option value="1-1">1:1 Square</option>
                                            <option value="4-5">4:5 Vertical</option>
                                            <option value="3-4">3:4 Vertical</option>
                                            <option value="9-16">9:16 Vertical</option>
                                            <option value="16-9">16:9 Landscape</option>
                                            <option value="4-3">4:3 Landscape</option>
                                            <option value="21-9">21:9 Ultrawide</option>
                                            <option value="5-4">5:4 Landscape</option>
                                        </select>
                                        <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                    </div>
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
