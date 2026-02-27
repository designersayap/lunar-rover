import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import styles from "../../../page.module.css";
import { createPortal } from "react-dom";
import { useState, useRef, useLayoutEffect } from "react";
import { IconNames } from "./builder-icons";

// Secure Input that stops propagation of key events at the DOM level
const StopPropagationInput = (props) => {
    const inputRef = useRef(null);

    useLayoutEffect(() => {
        const el = inputRef.current;
        if (!el) return;

        const stopPropagation = (e) => {
            e.stopPropagation();
            // We do NOT prevent default, so the input can perform the action (e.g. paste, select all)
        };

        // Attach native listeners to ensure we catch events before they bubble to global window/document listeners
        el.addEventListener('keydown', stopPropagation);
        el.addEventListener('keyup', stopPropagation);
        el.addEventListener('keypress', stopPropagation);
        el.addEventListener('paste', stopPropagation);
        el.addEventListener('copy', stopPropagation);
        el.addEventListener('cut', stopPropagation);

        return () => {
            el.removeEventListener('keydown', stopPropagation);
            el.removeEventListener('keyup', stopPropagation);
            el.removeEventListener('keypress', stopPropagation);
            el.removeEventListener('paste', stopPropagation);
            el.removeEventListener('copy', stopPropagation);
            el.removeEventListener('cut', stopPropagation);
        };
    }, []);

    return <input ref={inputRef} {...props} />;
};

export default function BuilderControlsPopover({
    isOpen,
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
    showLinkType = true,
    showUrl = true,
    position,
    dialogOptions = [],
    targetDialogId,
    onTargetDialogIdChange,
    showDialogSelector = true,
    fullWidth,
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
    showScrollEffect,
    scrollEffect,
    onScrollEffectChange,
    showBlurToggle,
    enableBlur,
    onEnableBlurChange,
    showOverlayToggle,
    isOverlay,
    onOverlayChange,
    showMenuColorToggle, // Added prop
    menuColor, // Added prop
    onMenuColorChange, // Added prop
    showFullWidthToggle = true, // Added prop with default true
    showAspectRatio,
    aspectRatio,
    onAspectRatioChange,
    title,
    onTitleChange,
    showTitle = false,
    subtitle,
    onSubtitleChange,
    showSubtitle = false,
    mode = 'all' // 'all', 'style', 'link'
}) {




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
            const scrollHeight = containerRef.current.scrollHeight;
            const windowHeight = window.innerHeight;
            const startY = position.top;
            const topBarHeight = 42;
            const padding = 16;

            // Calculate exact available max heights (must match render logic)
            // Down: Popover Top = startY. Space = Window - Top - Padding.
            const maxH_Down = windowHeight - startY - padding;

            // Up: MaxH = (startY - 24) - 4 - 42 - 16 = startY - 86.
            const maxH_Up = startY - 86;

            const fitsBelow = scrollHeight <= maxH_Down;
            const fitsAbove = scrollHeight <= maxH_Up;

            // Hysteresis logic to prevent flip loops (e.g. scrollbar toggling)
            if (isFlipped) {
                // Currently Up
                // Flip down only if it fits comfortably (buffer for scrollbar diff)
                // or if it doesn't fit Up either and Down has more space
                if (fitsBelow && maxH_Down > scrollHeight + 30) {
                    setIsFlipped(false);
                } else if (!fitsAbove && maxH_Down > maxH_Up) {
                    setIsFlipped(false);
                }
            } else {
                // Currently Down
                // Flip up if it strictly doesn't fit below
                if (!fitsBelow) {
                    if (fitsAbove || maxH_Up > maxH_Down) {
                        setIsFlipped(true);
                    }
                }
            }
        }
    }, [position, variants, linkType, isFlipped]);

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
        // Use a safe margin of 8px from the edges
        const safeMargin = 8;
        const maxLeft = windowWidth - popoverWidth - safeMargin;
        const minLeft = safeMargin;
        const finalLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft));

        // Calculate limits for gap logic
        const overlayHeight = 20;
        const gap = 4;
        // The active overlay is positioned at Math.max(rect.top - 24, topBarHeight)
        // We replicate that here to find its exact visual boundary
        const overlayTop = Math.max(position.top - 24, topBarHeight);
        const overlayBottom = overlayTop + overlayHeight;

        if (isFlipped) {
            // Place popover ABOVE the overlay with 4px gap
            // CSS bottom = distance from viewport bottom to (overlayTop - gap)
            const bottomVal = windowHeight - (overlayTop - gap);
            const maxH = overlayTop - gap - topBarHeight - padding;

            popoverStyle = {
                position: "fixed",
                bottom: `${bottomVal}px`,
                left: `${finalLeft}px`,
                width: `${popoverWidth}px`,
                margin: 0,
                pointerEvents: "auto",
                maxHeight: `${Math.max(100, maxH)}px`,
                overflowY: "auto"
            };
        } else {
            // Place popover BELOW the overlay with 4px gap
            const topVal = overlayBottom + gap;
            const maxH = windowHeight - topVal - padding;

            popoverStyle = {
                position: "fixed",
                top: `${topVal}px`,
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
                onKeyDown={(e) => e.stopPropagation()} // Keep React stopPropagation as backup
            >
                {/* Content */}
                <div className={styles.popoverContent}>
                    <div className={styles.popoverProperties}>

                        {(mode === 'all' || mode === 'link') && showLinkType && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Link Type</label>
                                <div style={{ display: 'flex', gap: 'var(--pb-space-sm)', width: '100%' }}>
                                    <label
                                        className={`${styles.radioOption} ${linkType === 'url' ? styles.radioOptionSelected : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="linkType"
                                            value="url"
                                            checked={linkType === 'url'}
                                            onChange={() => onLinkTypeChange && onLinkTypeChange('url')}
                                            className={styles.radioOptionInput}
                                        />
                                        <span>Custom URL</span>
                                    </label>
                                    <label
                                        className={`${styles.radioOption} ${linkType === 'dialog' ? styles.radioOptionSelected : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="linkType"
                                            value="dialog"
                                            checked={linkType === 'dialog'}
                                            onChange={() => onLinkTypeChange && onLinkTypeChange('dialog')}
                                            className={styles.radioOptionInput}
                                        />
                                        <span>Dialog</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* URL INPUT (Hidden if showImageSrc is true) */}
                        {((mode === 'all' || mode === 'link') && (linkType === 'url' || (!linkType && !showLinkType)) && showUrl) && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>URL</label>
                                <StopPropagationInput
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={url || ''}
                                    onChange={(e) => onUrlChange && onUrlChange(e.target.value)}
                                    placeholder="write you link or page here"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showScrollEffect && (
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

                        {(mode === 'all' || mode === 'style') && showBlurToggle && (
                            <div className={styles.propertyRow} style={{ marginTop: 'var(--pb-space-sm)' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`} style={{ marginBottom: 0 }}>Enable Blur Effect</label>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={enableBlur === true}
                                        onChange={(e) => onEnableBlurChange && onEnableBlurChange(e.target.checked)}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showOverlayToggle && (
                            <div className={styles.propertyRow} style={{ marginTop: 'var(--pb-space-sm)' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`} style={{ marginBottom: 0 }}>Overlay Content</label>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={isOverlay === true}
                                        onChange={(e) => onOverlayChange && onOverlayChange(e.target.checked)}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showMenuColorToggle && isOverlay && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`} style={{ marginTop: 'var(--pb-space-sm)' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Menu Color</label>
                                <div className={styles.selectWrapper}>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={menuColor || 'default'}
                                        onChange={(e) => onMenuColorChange && onMenuColorChange(e.target.value)}
                                    >
                                        <option value="default">Default</option>
                                        <option value="invert">Invert</option>
                                    </select>
                                    <ChevronUpDownIcon width={16} height={16} className={styles.selectIcon} />
                                </div>
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showAspectRatio && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Aspect Ratio</label>
                                <div className={styles.selectWrapper}>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={aspectRatio || ''}
                                        onChange={(e) => onAspectRatioChange && onAspectRatioChange(e.target.value)}
                                    >
                                        <option value="">Default (1:1)</option>
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
                        )}

                        {(mode === 'all' || mode === 'link') && (linkType === 'dialog' && showDialogSelector) && (
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

                        {/* IMAGE SOURCE INPUT (Only if showImageSrc is true) */}
                        {(mode === 'all' || mode === 'style') && showImageSrc && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Media Source</label>
                                <StopPropagationInput
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={imageSrc || ''}
                                    onChange={(e) => onImageSrcChange && onImageSrcChange(e.target.value)}
                                    placeholder="https://example.com/image.jpg OR video.mp4"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showTitle && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`} style={{ marginTop: 'var(--pb-space-sm)' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>TikTok Metadata</label>
                                <StopPropagationInput
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={title || ''}
                                    onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
                                    placeholder="SEO Title / Video Name"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showSubtitle && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`} style={{ marginTop: 'var(--pb-space-sm)' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>aria-label</label>
                                <StopPropagationInput
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={subtitle || ''}
                                    onChange={(e) => onSubtitleChange && onSubtitleChange(e.target.value)}
                                    placeholder="Accessibility Description"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showMobileImageSrc && (
                            <div className={`${styles.propertyRow} ${styles.propertyRowStacked}`} style={{ marginTop: 'var(--pb-space-sm)' }}>
                                <label className={`caption-bold ${styles.formInputTitle}`}>Mobile Media Source</label>
                                <StopPropagationInput
                                    type="text"
                                    className={`${styles.formInput}`}
                                    value={mobileImageSrc || ''}
                                    onChange={(e) => onMobileImageSrcChange && onMobileImageSrcChange(e.target.value)}
                                    placeholder="Optional mobile image or video URL"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        )}

                        {(mode === 'all' || mode === 'style') && showMobileRatio && (
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

                        {(mode === 'all' || mode === 'style') && showVariant && (
                            <>
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


                        {(mode === 'all' || mode === 'style') && onIconLeftChange && (
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

                        {(mode === 'all' || mode === 'style') && onIconRightChange && (
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


                        {(mode === 'all' || mode === 'style') && onLayoutChange && showFullWidthToggle && (
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

                        {(mode === 'all' || mode === 'style') && showPortraitToggle && (
                            <>
                                <div className={styles.horizontalDivider} />
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
