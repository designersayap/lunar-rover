"use client";

import { useContext, useRef, useEffect, useState, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useIdSync } from "../hooks/use-id-sync";
import { Cog6ToothIcon, ChatBubbleLeftEllipsisIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import BuilderControlsPopover from "./builder-controls-popover";
import styles from "../../../page.module.css";

import { DEFAULT_PLACEHOLDER_IMAGE, IMAGE_PORTRAIT_RATIO_MAP } from "@/app/constants";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay";
import { useCanvas } from "@/app/page-builder/utils/canvas-context";

export const defaultPlaceholder = DEFAULT_PLACEHOLDER_IMAGE;

const isVideoFile = (url) => {
    if (!url || typeof url !== 'string') return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i);
};

const isYoutube = (url) => {
    if (!url || typeof url !== 'string') return false;
    return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
};

const isVimeo = (url) => {
    if (!url || typeof url !== 'string') return false;
    return url.match(/^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/);
};

const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0` : url;
};

const getVimeoEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    const id = (match ? match[1] : null);
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&background=1` : url;
};


export default function BuilderImage({
    src,
    onSrcChange,
    alt = "#",
    className = "",
    style = {},
    id,
    sectionId,
    isVisible = true,
    onIdChange,
    suffix,
    href,
    onHrefChange,
    linkType = 'url',
    onLinkTypeChange,
    targetDialogId,
    onTargetDialogIdChange,
    disableSettings = false,
    showLinkControls = true,
    isPortrait,
    onIsPortraitChange,
    mobileRatio,
    onMobileRatioChange,
    mobileSrc,
    onMobileSrcChange,
    isActive: isActiveProp,
    alwaysShowSrc = false,
    readOnly = false,
    onVisibilityChange,
    aspectRatio,
    onAspectRatioChange,
    priority
}) {
    const { elementId } = useIdSync({
        id: id ? String(id) : undefined,
        sectionId: sectionId ? String(sectionId) : undefined,
        suffix: suffix || "image",
        onIdChange
    });

    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, selectedComponents, updateComponent, isStaging } = useContext(BuilderSelectionContext);
    const { canvasWidth } = useCanvas();

    const isSelfActive = activeElementId === elementId;
    const isActive = typeof isActiveProp !== 'undefined' ? isActiveProp : isSelfActive;
    const myPopoverBase = `popover-${elementId}`;
    const showSettings = activePopoverId && activePopoverId.startsWith(myPopoverBase);
    const isStyleOpen = activePopoverId === `${myPopoverBase}-style`;
    const isLinkOpen = activePopoverId === `${myPopoverBase}-link`;

    const wrapperRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    // Use layout effect to prevent visual jitter on selection
    const safeUseLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    safeUseLayoutEffect(() => {
        if (isActive && wrapperRef.current && !readOnly) {
            let rafId;
            const updatePosition = () => {
                if (wrapperRef.current) {
                    const rect = wrapperRef.current.getBoundingClientRect();
                    setOverlayRect(rect);
                    if (showSettings) {
                        setPopoverPosition({
                            top: rect.top,
                            left: rect.left + rect.width / 2
                        });
                    }
                }
            };

            const onScrollOrResize = () => {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(updatePosition);
            };

            updatePosition();
            window.addEventListener('scroll', onScrollOrResize, true);
            window.addEventListener('resize', onScrollOrResize);

            return () => {
                window.removeEventListener('scroll', onScrollOrResize, true);
                window.removeEventListener('resize', onScrollOrResize);
                cancelAnimationFrame(rafId);
            };
        }
    }, [isActive, showSettings, readOnly]);

    // Lazy load logic for videos
    useEffect(() => {
        const isVideo = isVideoFile(src) || isYoutube(src) || isVimeo(src);
        const hasSrc = src && src !== "";

        const isPlaceholder = src === defaultPlaceholder;
        
        // If it's a priority image, a placeholder, an empty source, or no IntersectionObserver, load immediately
        if (priority || isPlaceholder || !hasSrc || typeof window === 'undefined' || !window.IntersectionObserver) {
            setShouldLoad(true);
            return;
        }

        // If it's a video, OR if we want to be aggressive with non-priority images
        // We defer everything except priority assets

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(`[LazyLoad] Triggering for ${elementId}`, {
                        top: entry.boundingClientRect.top,
                        height: entry.boundingClientRect.height
                    });
                    setShouldLoad(true);
                    observer.disconnect();
                }
            });
        }, { 
            threshold: 0.01,
            rootMargin: '50px' 
        });

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => observer.disconnect();
        // Dependency array size must be constant. src, isStaging, and priority are now stable dependencies.
    }, [src, isStaging, priority]);

    // Context for canvas width simulation moved to top

    const isMobileSimulation = useMemo(() => {
        if (!canvasWidth || canvasWidth === '100%') return false;
        const width = parseInt(canvasWidth, 10);
        return !isNaN(width) && width <= 767;
    }, [canvasWidth]);

    // Hook must be called unconditionally
    const overlayStyle = useActiveOverlayPosition(overlayRect);

    if (!isVisible && !isStaging) return null;

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (elementId) {
            setActiveElementId(elementId);
        }
    };

    const handleStyleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isStyleOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }
        setActivePopoverId(prev => prev === `${myPopoverBase}-style` ? null : `${myPopoverBase}-style`);
    };

    const handleLinkSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLinkOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }
        setActivePopoverId(prev => prev === `${myPopoverBase}-link` ? null : `${myPopoverBase}-link`);
    };

    const handleOpenDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let dialogComponent;
        if (targetDialogId) {
            // Compare as strings to handle potential type mismatch (number vs string)
            dialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));
        }

        if (!dialogComponent) {
            dialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form');
        }

        if (dialogComponent) {
            // Dispatch global event for immediate client-side handling (Staging/Live)
            if (dialogComponent.sectionId) {
                window.dispatchEvent(new CustomEvent('lunar:open-dialog', {
                    detail: { id: dialogComponent.sectionId }
                }));
            }

            if (updateComponent) {
                updateComponent(dialogComponent.uniqueId, { isOpen: true });
            }
        } else {
            alert("No Dialog component found on the page. Please add one from the Components menu.");
        }
    };



    const renderActiveOverlay = () => {
        if (!isActive || !overlayRect || readOnly) return null;

        return createPortal(
            <div
                className={styles.activeOverlay}
                style={overlayStyle}
            >
                <div className={styles.overlayLabel}>
                    <span className={styles.overlayIdText}>#{elementId}</span>
                </div>

                {linkType === 'dialog' && (
                    <button
                        type="button"
                        className={styles.settingsButton}
                        onClick={handleOpenDialog}
                        data-tooltip="Open Dialog"
                    >
                        <ChatBubbleLeftEllipsisIcon className={styles.overlayIcon} />
                    </button>
                )}

                {(() => {
                    // Logic to determine if settings buttons should be visible
                    // Style Settings (Src, Mobile Src, Portrait, Ratio, Visibility)
                    const hasStyleControls = (isStaging || alwaysShowSrc) || (!isStaging && (!!onIsPortraitChange || !!onMobileRatioChange || !!onAspectRatioChange)) || (!!onVisibilityChange);

                    // Link Settings
                    const hasLinkControls = showLinkControls; // Always show link settings if enabled (includes URL input)

                    const hasAnySettings = !disableSettings && (hasStyleControls || hasLinkControls);

                    if (!hasAnySettings) return null;

                    return (
                        <>
                            {/* Sparkle Button for Style Settings */}
                            {(!disableSettings && hasStyleControls) && (
                                <button
                                    type="button"
                                    className={`${styles.settingsButton} ${isStyleOpen ? styles.settingsButtonActive : ''}`}
                                    onClick={handleStyleSettingsClick}
                                    data-tooltip="Style Settings"
                                >
                                    <PaintBrushIcon className={styles.overlayIcon} />
                                </button>
                            )}

                            {/* Cog Icon for Link Settings */}
                            {(!disableSettings && hasLinkControls) && (
                                <button
                                    type="button"
                                    className={`${styles.settingsButton} ${isLinkOpen ? styles.settingsButtonActive : ''}`}
                                    onClick={handleLinkSettingsClick}
                                    data-tooltip="Link Settings"
                                >
                                    <Cog6ToothIcon className={styles.overlayIcon} />
                                </button>
                            )}
                        </>
                    );
                })()}
            </div>,
            document.body
        );
    };

    const imageSrc = (src && src !== "") ? src : defaultPlaceholder;
    // const isPlaceholder = !src || src === defaultPlaceholder || (typeof src === 'string' && src.includes('placeholder_falj5i'));
    // Relaxed placeholder check slightly to allow initial strings, though logic stays mostly same.
    const isPlaceholder = !src || src === "" || src === defaultPlaceholder || (typeof src === 'string' && src.includes('assets-lunar/placeholder.svg'));

    const finalStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        backgroundColor: "transparent",
        opacity: isVisible ? 1 : 0.5,
        ...style
    };

    let targetDialogComponent = selectedComponents?.find(c => String(c.uniqueId) === String(targetDialogId));

    if (!targetDialogComponent && linkType === 'dialog') {
        targetDialogComponent = selectedComponents?.find(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form');
    }

    const targetDialogSectionId = targetDialogComponent?.sectionId;

    const Wrapper = href || linkType === 'dialog' ? 'a' : 'div';
    const wrapperProps = href || linkType === 'dialog' ? {
        href: href || "#",
        'data-dialog-trigger': linkType === 'dialog' ? "" : undefined,
        'data-dialog-target': linkType === 'dialog' ? targetDialogSectionId : undefined
    } : {};

    let finalClassName = `${isActive ? styles.activeWrapper : ''} ${className}`;
    if (onIsPortraitChange && isPortrait) {
        Object.entries(IMAGE_PORTRAIT_RATIO_MAP).forEach(([landscape, portrait]) => {
            finalClassName = finalClassName.replace(landscape, portrait);
        });
    }

    if (mobileRatio) {
        finalClassName += ` mobile-aspect-${mobileRatio}`;
    }

    let mediaContent;
    if (isYoutube(src)) {
        mediaContent = shouldLoad ? (
            <iframe
                id={elementId}
                src={getYoutubeEmbedUrl(src)}
                style={{ ...finalStyle, border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="video"
            />
        ) : <div style={finalStyle} />;
    } else if (isVimeo(src)) {
        mediaContent = shouldLoad ? (
            <iframe
                id={elementId}
                src={getVimeoEmbedUrl(src)}
                style={{ ...finalStyle, border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="video"
            />
        ) : <div style={finalStyle} />;
    } else if (isVideoFile(src)) {
        mediaContent = (
            <video
                id={elementId}
                style={finalStyle}
                autoPlay={shouldLoad}
                loop
                muted
                playsInline
                preload={shouldLoad ? "auto" : "none"}
            >
                {shouldLoad && (
                    <>
                        {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" />}
                        <source src={src} />
                    </>
                )}
                Your browser does not support the video tag.
            </video>
        );
    } else {
        // Fallback to Image
        const TRANSPARENT_PIXEL = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E";
        if (!shouldLoad && !priority) {
            mediaContent = (
                <img
                    id={elementId}
                    src={TRANSPARENT_PIXEL}
                    alt=""
                    style={finalStyle}
                    className={className}
                />
            );
        } else if (isMobileSimulation && mobileSrc) {
            // Force mobile source when simulating mobile in builder
            mediaContent = (
                <img
                    id={elementId}
                    src={mobileSrc}
                    alt={(!alt || alt === "#") && sectionId ? sectionId : alt}
                    style={finalStyle}
                    loading="lazy"
                    decoding="async"
                />
            );
        } else {
            // Standard responsive behavior (Desktop / Staging / Export)
            mediaContent = (
                <>
                    {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
                    <img
                        id={elementId}
                        src={imageSrc}
                        alt={(!alt || alt === "#") && sectionId ? sectionId : alt}
                        style={finalStyle}
                        loading={priority ? "eager" : "lazy"}
                        fetchPriority={priority ? "high" : undefined}
                        decoding="async"
                    />
                </>
            );
        }
    }

    return (
        <>
            <Wrapper
                {...wrapperProps}
                ref={wrapperRef}
                className={finalClassName}
                style={{
                    opacity: isVisible ? 1 : 0.5,
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'block'
                }}
                onClick={handleClick}
            >
                {isActive && <div className={styles.activeBorderOutline} />}
                {mobileSrc && !isVideoFile(src) && !isYoutube(src) && !isVimeo(src) ? (
                    <picture style={{ display: 'contents' }}>
                        {mediaContent}
                    </picture>
                ) : (
                    mediaContent
                )}
            </Wrapper>

            {renderActiveOverlay()}

            {isActive && !readOnly && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    mode={isStyleOpen ? 'style' : (isLinkOpen ? 'link' : 'all')}
                    url={href}
                    onUrlChange={onHrefChange}
                    imageSrc={src}
                    onImageSrcChange={onSrcChange}
                    linkType={linkType}
                    onLinkTypeChange={onLinkTypeChange}
                    showLinkType={!isStaging && showLinkControls}
                    showUrl={showLinkControls}
                    showImageSrc={isStaging || alwaysShowSrc}

                    position={popoverPosition}
                    dialogOptions={selectedComponents ? selectedComponents.filter(c => c.id === 'dialog-item-list' || c.id === 'dialog-accordion' || c.id === 'dialog-form').map(c => ({ label: c.sectionId || c.props?.title || 'Dialog', value: c.uniqueId })) : []}
                    targetDialogId={targetDialogId}
                    onTargetDialogIdChange={onTargetDialogIdChange}
                    showDialogSelector={showLinkControls}
                    showVariant={false}
                    showPortraitToggle={!isStaging && !!onIsPortraitChange}
                    isPortrait={isPortrait}
                    onIsPortraitChange={onIsPortraitChange}
                    isVisible={isVisible}
                    onVisibilityChange={onVisibilityChange}
                    showMobileRatio={!isStaging && !!onMobileRatioChange}
                    mobileRatio={mobileRatio}
                    onMobileRatioChange={onMobileRatioChange}
                    showMobileImageSrc={!!onMobileSrcChange && ((isStaging && !!mobileRatio) || alwaysShowSrc)}
                    mobileImageSrc={mobileSrc}
                    onMobileImageSrcChange={onMobileSrcChange}
                    showAspectRatio={!isStaging && !!onAspectRatioChange}
                    aspectRatio={aspectRatio}
                    onAspectRatioChange={onAspectRatioChange}

                />
            )}
        </>
    );
}
