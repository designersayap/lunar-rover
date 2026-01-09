import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import styles from "../../../page.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { IconNames } from "./builder-icons";

export default function BuilderControlsPopover({
    isOpen,
    onClose,
    url,
    onUrlChange,
    imageSrc,
    onImageSrcChange,
    showImageSrc = false,
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
    showDialogSelector = true,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    onLayoutChange,
    showPortraitToggle,
    isPortrait,
    onIsPortraitChange,
    showMobileRatio,
    mobileRatio,
    onMobileRatioChange,
    mobileImageSrc,
    onMobileImageSrcChange,
    showMobileImageSrc = false,
    iconLeft,
    onIconLeftChange,
    iconRight,
    onIconRightChange,
    openInNewTab,
    onOpenInNewTabChange,
    showScrollEffect,
    scrollEffect,
    onScrollEffectChange
}) {


    const [portalContainer, setPortalContainer] = useState(null);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setPortalContainer(document.body);
        }
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
        maxHeight: "90vh",
        margin: 0,
        pointerEvents: "auto",
        overflowY: "auto"
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
    }, [position, variants, linkType]);

    if (position && typeof window !== 'undefined') {
        const popoverWidth = 320;
        const padding = 16;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const topBarHeight = 42;

        // Calculate Ideal Left (centered on target)
        // targetCenter = position.left
        let idealLeft = position.left - (popoverWidth / 2);

        // Clamp Left
        // Use a safe margin of 20px from the edges
        const safeMargin = 20;
        const maxLeft = windowWidth - popoverWidth - safeMargin;
        const minLeft = safeMargin;
        const finalLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft));

        if (isFlipped) {

            const bottomVal = (windowHeight - position.top) + 12;

            const maxH = position.top - topBarHeight - 24;

            popoverStyle = {
                position: "fixed",
                bottom: `${bottomVal}px`,
                left: `${finalLeft}px`,
                // transform: "translateX(0)", // Removed centering transform
                width: `${popoverWidth}px`,
                margin: 0,
                pointerEvents: "auto",
                maxHeight: `${Math.max(100, maxH)}px`,
                overflowY: "auto"
            };
        } else {
            // Standard: Below the target
            // Top of popover = target bottom + gap?
            // Actually usually we position at target.top + target.height + gap.
            // Or just position.top + gap if position.top is what we have.
            // The position prop passed is usually rect.top.

            // Standard behavior: Popover top = position.top + elementHeight?
            // We don't have elementHeight in 'position' prop usually, just top/left.
            // Wait, previous code used `constrainedTop = Math.max(minTop, position.top)`.
            // If position.top is top of FAB, we want popover to be *below* it? 
            // Or if it's a FAB (bottom right), usually menus open *above* (flipped).
            // If it's not flipped, it renders at 'top'.
            // If 'position' is center of element? No, usually bounding rect.
            // Let's assume position.top is reliable.

            const minTop = topBarHeight + padding;
            const constrainedTop = Math.max(minTop, position.top);

            const maxH = windowHeight - constrainedTop - padding;

            popoverStyle = {
                position: "fixed",
                top: `${constrainedTop}px`,
                left: `${finalLeft}px`,
                width: `${popoverWidth}px`,
                margin: 0,
                pointerEvents: "auto",
                maxHeight: `${Math.max(100, maxH)}px`,
                overflowY: "auto"
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

                        {/* URL INPUT (Hidden if showImageSrc is true) */}
                        {((linkType === 'url' || !showLinkType) && showUrl && !showImageSrc) && (
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

                        {showScrollEffect && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Scroll Effect</label>
                                <div className={styles.selectWrapper}>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={scrollEffect || 'parallax'}
                                        onChange={(e) => onScrollEffectChange && onScrollEffectChange(e.target.value)}
                                    >
                                        <option value="parallax">Parallax</option>
                                        <option value="sticky">Sticky on Top</option>
                                        <option value="stacked">Stacked</option>
                                    </select>
                                    <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                </div>
                            </div>
                        )}

                        {/* IMAGE SOURCE INPUT (Only if showImageSrc is true) */}
                        {showImageSrc && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Media Source</label>
                                <input
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={imageSrc || ''}
                                    onChange={(e) => onImageSrcChange && onImageSrcChange(e.target.value)}
                                    placeholder="https://example.com/image.jpg OR video.mp4"
                                />
                            </div>
                        )}

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

                        {showMobileImageSrc && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`} style={{ marginTop: '8px' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Mobile Media Source</label>
                                <input
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={mobileImageSrc || ''}
                                    onChange={(e) => onMobileImageSrcChange && onMobileImageSrcChange(e.target.value)}
                                    placeholder="Optional mobile image or video URL"
                                />
                            </div>
                        )}

                        {(linkType === 'dialog' && showDialogSelector) && (
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


                        {onIconLeftChange && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Icon Left</label>
                                <div className={styles.selectWrapper}>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={iconLeft || ''}
                                        onChange={(e) => onIconLeftChange && onIconLeftChange(e.target.value || null)}
                                    >
                                        <option value="">None</option>
                                        {IconNames.map(icon => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                    <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                </div>
                            </div>
                        )}

                        {onIconRightChange && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Icon Right</label>
                                <div className={styles.selectWrapper}>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={iconRight || ''}
                                        onChange={(e) => onIconRightChange && onIconRightChange(e.target.value || null)}
                                    >
                                        <option value="">None</option>
                                        {IconNames.map(icon => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                    <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                </div>
                            </div>
                        )}


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

                    </div>
                </div>
            </div>
        </div >
    );

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(content, document.body);
}
