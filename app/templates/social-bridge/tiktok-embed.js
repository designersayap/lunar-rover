"use client";
import { useState, useRef, useEffect, useCallback, useContext, memo } from "react";
import styles from "./tiktok-embed.module.css";
import parentStyles from "../media/media.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderElement from "@/app/page-builder/utils/builder/builder-element";
import BuilderControlsPopover from "@/app/page-builder/utils/builder/builder-controls-popover";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import { useIdSync } from "@/app/page-builder/utils/hooks/use-id-sync";
import { Cog6ToothIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import { useActiveOverlayPosition } from "@/app/page-builder/utils/hooks/use-active-overlay";
import builderStyles from "@/app/page.module.css";

// --- Helper Functions ---
const getTikTokVideoId = (url) => {
    if (!url) return null;
    const regex = /\/(?:video|v|embed(?:[^\/]*)\/v\d|player\/v1)\/(\d+)/i;
    const match = url.match(regex);
    if (match && match[1]) return match[1];
    if (/^\d+$/.test(url)) return url;
    return null;
};

const isShortUrl = (url) => url?.includes('tiktok.com/') && (url?.includes('vt.') || url?.includes('vm.') || url?.includes('/t/'));

// --- Sub-components ---
const TikTokCard = memo(({
    item,
    index, // Original index in videos array
    displayIndex, // Index in filtered display list
    sectionId,
    videos,
    onUpdate,
    updateVideo,
    playingIndex,
    handlePlay,
}) => {
    const { elementId } = useIdSync({
        id: item.cardId,
        sectionId: sectionId,
        suffix: `video-${index}`,
        onIdChange: (val) => updateVideo(index, 'cardId', val)
    });

    const {
        activeElementId,
        setActiveElementId,
        activePopoverId,
        setActivePopoverId,
    } = useContext(BuilderSelectionContext);

    const isSelfActive = activeElementId === elementId;
    const myPopoverBase = `popover-${elementId}`;
    const isLinkOpen = activePopoverId === `${myPopoverBase}-link`;
    const showSettings = activePopoverId && activePopoverId.startsWith(myPopoverBase);

    const cardRef = useRef(null);
    const [overlayRect, setOverlayRect] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState(null);

    useEffect(() => {
        if (isSelfActive && cardRef.current) {
            const updatePosition = () => {
                if (cardRef.current) {
                    const rect = cardRef.current.getBoundingClientRect();
                    setOverlayRect(rect);
                    if (showSettings) {
                        setPopoverPosition({
                            top: rect.top,
                            left: rect.left + rect.width / 2
                        });
                    }
                }
            };
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isSelfActive, showSettings]);

    const overlayStyle = useActiveOverlayPosition(overlayRect);

    const [localMetadata, setLocalMetadata] = useState({
        thumbnailUrl: item.thumbnailUrl,
        name: item.name,
        description: item.description
    });

    const handleRefreshMetadata = () => {
        // Clear fetchedUrl and thumbnailUrl to trigger useEffect re-fetch
        if (onUpdate) {
            const newVideos = [...videos];
            newVideos[index] = {
                ...newVideos[index],
                fetchedUrl: null,
                thumbnailUrl: null
            };
            onUpdate({ videos: newVideos });
        } else {
            // Local fallback for production
            setLocalMetadata(prev => ({ ...prev, thumbnailUrl: null }));
        }
    };

    const handleLinkSettingsClick = (e) => {

        e.preventDefault();
        e.stopPropagation();
        if (!isLinkOpen && cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top,
                left: rect.left + rect.width / 2
            });
        }
        setActivePopoverId(prev => prev === `${myPopoverBase}-link` ? null : `${myPopoverBase}-link`);
    };

    const videoId = getTikTokVideoId(item.videoUrl);
    const isPlayed = playingIndex === displayIndex;
    const [hasLoaded, setHasLoaded] = useState(false);
    const iframeRef = useRef(null);

    // Keep-Alive Logic: Once played, stay loaded
    useEffect(() => {
        if (isPlayed && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [isPlayed, hasLoaded]);

    // Zero-Reload Playback Control via postMessage
    useEffect(() => {
        if (!hasLoaded || !iframeRef.current) return;

        const message = {
            type: isPlayed ? "play" : "pause",
            "x-tiktok-player": true
        };

        // Small delay to ensure iframe internal player is ready
        const timer = setTimeout(() => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage(message, "*");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isPlayed, hasLoaded]);

    // Auto-fetch metadata
    useEffect(() => {
        if (!item.videoUrl) return;

        // In builder: skip if already fetched
        // In production: skip only if we have a valid thumbnail (not null)
        if (onUpdate && item.videoUrl === item.fetchedUrl) return;
        if (!onUpdate && localMetadata.thumbnailUrl) return;

        const vId = getTikTokVideoId(item.videoUrl);
        if (vId) {
            fetch(`/api/oembed?url=${encodeURIComponent(item.videoUrl)}`)
                .then(res => res.json())
                .then(data => {
                    const updates = { fetchedUrl: item.videoUrl };

                    if (data && !data.error) {
                        if (data.title) updates.name = data.title;
                        const author = data.author_name || 'TikTok Creator';
                        updates.description = data.description || `Video by ${author}`;
                        if (data.thumbnail_url) updates.thumbnailUrl = data.thumbnail_url;
                    }

                    if (onUpdate) {
                        const newVideos = [...videos];
                        newVideos[index] = { ...newVideos[index], ...updates };
                        onUpdate({ videos: newVideos });
                    } else if (updates.thumbnailUrl) {
                        // Production fallback: set local state only if we got a thumbnail
                        setLocalMetadata({
                            thumbnailUrl: updates.thumbnailUrl,
                            name: updates.name,
                            description: updates.description
                        });
                    }
                })
                .catch(err => {
                    console.warn("TikTok metadata fetch failed.", err);
                    if (onUpdate) {
                        updateVideo(index, 'fetchedUrl', item.videoUrl);
                    }
                });
        }
    }, [item.videoUrl, item.fetchedUrl, index, videos, onUpdate, updateVideo, localMetadata.thumbnailUrl]);

    return (
        <>
            <BuilderElement
                tagName="div"
                className={`${styles.itemWrapper} ${isPlayed ? styles.active : ""}`}
                id={elementId}
                sectionId={sectionId}
                onIdChange={(val) => updateVideo(index, 'cardId', val)}
                elementProps={`video-${index}`}
                isVisible={item.visible !== false}
            >
                <div className={styles.card} ref={cardRef} onClick={() => setActiveElementId(elementId)}>
                    <div className={styles.videoContainer}>
                        {!item.videoUrl ? (
                            <div className={styles.emptyState}>
                                <VideoCameraIcon className={styles.emptyIcon} />
                                <p>Add TikTok URL</p>
                            </div>
                        ) : videoId ? (
                            <>
                                {/* Render Iframe if it is active OR if it has been loaded before (Keep-Alive) */}
                                {(isPlayed || hasLoaded) && videoId && (
                                    <iframe
                                        ref={iframeRef}
                                        src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=1&muted=1&loop=1`}
                                        className={styles.iframe}
                                        style={{ display: isPlayed ? 'block' : 'none' }}
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                        title={localMetadata.name || item.name || "TikTok Video"}
                                        aria-label={localMetadata.description || item.description || localMetadata.name || item.name || "TikTok Video"}
                                    />
                                )}

                                {/* Only show facade if NOT currently playing */}
                                {!isPlayed && (
                                    <div
                                        className={styles.facade}
                                        onClick={(e) => { e.stopPropagation(); handlePlay(displayIndex); }}
                                        style={(localMetadata.thumbnailUrl || item.thumbnailUrl) ? {
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${localMetadata.thumbnailUrl || item.thumbnailUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        } : {}}
                                    >
                                        {/* Hidden tracker to detect expired TikTok thumbnails and auto-refresh them */}
                                        {(localMetadata.thumbnailUrl || item.thumbnailUrl) && (localMetadata.thumbnailUrl || item.thumbnailUrl).includes('tiktokcdn.com') && (
                                            <img
                                                src={localMetadata.thumbnailUrl || item.thumbnailUrl}
                                                style={{ display: 'none' }}
                                                onError={(e) => {
                                                    console.warn("[TikTokEmbed] Thumbnail expired, auto-refreshing...");
                                                    handleRefreshMetadata();
                                                }}
                                                alt=""
                                            />
                                        )}
                                        <div className={styles.overlay} />

                                        <div className={styles.playButton} onClick={(e) => { e.stopPropagation(); handlePlay(displayIndex); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                {/* Indexable Semantic Content for Search Engines */}
                                <div className={styles.visuallyHidden}>
                                    <h3>{item.name || "TikTok Video"}</h3>
                                    <p>{item.description || "Watch this video on TikTok"}</p>
                                    <a href={item.videoUrl}>View original post</a>
                                </div>
                            </>
                        ) : (
                            <div className={styles.errorState}>
                                <p>Invalid TikTok URL</p>
                            </div>
                        )}
                    </div>
                </div>
            </BuilderElement>

            {isSelfActive && overlayRect && createPortal(
                <div className={builderStyles.activeOverlay} style={overlayStyle}>
                    <div className={builderStyles.overlayLabel}>
                        <span className={builderStyles.overlayIdText}>#{elementId}</span>
                    </div>
                    <button
                        type="button"
                        className={`${builderStyles.settingsButton} ${isLinkOpen ? builderStyles.settingsButtonActive : ''}`}
                        onClick={handleLinkSettingsClick}
                        data-tooltip="Video Settings"
                    >
                        <Cog6ToothIcon className={builderStyles.overlayIcon} />
                    </button>
                </div>,
                document.body
            )}

            {isSelfActive && (
                <BuilderControlsPopover
                    isOpen={showSettings}
                    onClose={() => setActivePopoverId(null)}
                    mode="style"
                    imageSrc={item.videoUrl}
                    onImageSrcChange={(val) => updateVideo(index, 'videoUrl', val)}
                    showImageSrc={true}
                    title={item.name}
                    onTitleChange={(val) => updateVideo(index, 'name', val)}
                    showTitle={true}
                    subtitle={item.description}
                    onSubtitleChange={(val) => updateVideo(index, 'description', val)}
                    showSubtitle={true}
                    showUrl={false}
                    showLinkType={false}
                    showVariant={false}
                    showFullWidthToggle={false}
                    position={popoverPosition}
                    onRefreshMetadata={handleRefreshMetadata}
                />

            )}
        </>
    );
});

// --- Main Component ---
export default function TikTokEmbed({
    videos: rawVideos = componentDefaults["social-bridge-tiktok"].videos,
    onUpdate,
    sectionId,
    fullWidth,
    allowAutoplay = true,
    removePaddingLeft,
    removePaddingRight,
}) {
    // Sanitize data
    const videos = (rawVideos || []).filter(item => item !== null && typeof item === 'object');

    const scrollContainerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [playingIndex, setPlayingIndex] = useState(allowAutoplay ? 0 : null);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);

    // Intersection Observer to detect visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const update = createUpdateHandler(onUpdate);

    // Latest state ref for stable callbacks
    const latestStateRef = useRef({ videos, onUpdate });
    latestStateRef.current = { videos, onUpdate };

    const updateVideo = useCallback((index, key, value) => {
        const { videos: currentVideos, onUpdate: currentOnUpdate } = latestStateRef.current;
        if (!currentOnUpdate) return;

        const newVideos = [...currentVideos];
        newVideos[index] = { ...newVideos[index], [key]: value };
        currentOnUpdate({ videos: newVideos });
    }, []);

    const updateVideoId = (index, newId) => {
        updateVideo(index, 'cardId', newId);
    };

    const visibleCount = videos.filter(v => v && v.visible !== false).length;
    const filteredVideos = videos
        .map((v, i) => ({ ...v, originalIndex: i }))
        .filter(v => v && v.visible !== false);

    let displayVideos = filteredVideos;
    if (filteredVideos.length === 0 && videos.length > 0) {
        const validFallback = videos.find(v => v !== null && typeof v === 'object');
        displayVideos = validFallback ? [{ ...validFallback, originalIndex: 0 }] : [];
    }

    // Ensure playingIndex is valid for displayVideos
    useEffect(() => {
        if (playingIndex !== null && playingIndex >= displayVideos.length) {
            setPlayingIndex(displayVideos.length > 0 ? 0 : null);
        }
    }, [displayVideos.length, playingIndex]);

    // Carousel Logic
    const visibleVideosString = filteredVideos.map(v => v?.visible).join(',');

    useEffect(() => {
        const calculatePages = () => {
            if (!scrollContainerRef.current) return;
            const container = scrollContainerRef.current;
            const containerWidth = container.scrollWidth;
            const viewportWidth = container.clientWidth;
            if (containerWidth && viewportWidth > 0) {
                const pages = Math.ceil(containerWidth / viewportWidth);
                setTotalPages(Number.isFinite(pages) ? Math.max(1, pages) : 1);
            } else {
                setTotalPages(1);
            }
        };

        const timer = setTimeout(calculatePages, 100);
        window.addEventListener('resize', calculatePages);
        return () => {
            window.removeEventListener('resize', calculatePages);
            clearTimeout(timer);
        };
    }, [displayVideos.length, visibleVideosString]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const viewportWidth = container.clientWidth;
            const page = Math.round(scrollLeft / viewportWidth);
            setCurrentPage(page);
        };
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToPage = (pageIndex) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const viewportWidth = container.clientWidth;
        container.scrollTo({
            left: pageIndex * viewportWidth,
            behavior: 'smooth'
        });
    };

    const scrollToCard = useCallback((index) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const card = container.children[index];
        if (card) {
            const containerWidth = container.clientWidth;
            const cardWidth = card.clientWidth;
            // Calculate scroll position to center the card
            const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, []);

    const PLAY_INTERVAL = 30000; // Time in milliseconds between videos

    // Sequential Auto-Play Timer
    useEffect(() => {
        if (!allowAutoplay || !isInView || playingIndex === null || displayVideos.length <= 1) return;

        const interval = setInterval(() => {
            const nextIndex = (playingIndex + 1) % displayVideos.length;
            setPlayingIndex(nextIndex);
            scrollToCard(nextIndex);
        }, PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [playingIndex, filteredVideos.length, scrollToCard, allowAutoplay, isInView]);

    const handlePlay = (index) => {
        setPlayingIndex(index);
        scrollToCard(index);
    };

    // JSON-LD Generation
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": displayVideos.map((video, idx) => {
            if (!video) return null;
            const vId = getTikTokVideoId(video.videoUrl);
            return {
                "@type": "ListItem",
                "position": idx + 1,
                "item": {
                    "@type": "VideoObject",
                    "name": video.name || `TikTok Video ${idx + 1}`,
                    "description": video.description || "TikTok video content",
                    "thumbnailUrl": vId ? `https://www.tiktok.com/api/v1/thumbnail?video_id=${vId}` : "",
                    "contentUrl": video.videoUrl,
                    "embedUrl": vId ? `https://www.tiktok.com/player/v1/${vId}` : "",
                    "uploadDate": "2024-01-01T00:00:00Z" // Stable fallback
                }
            };
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BuilderSection
                tagName="section"
                className={styles.container}
                innerContainer={!fullWidth}
                sectionId={sectionId}
                fullWidth={fullWidth}
                removePaddingLeft={removePaddingLeft}
                removePaddingRight={removePaddingRight}
                onUpdate={onUpdate}
            >
                <div className="grid" ref={containerRef}>
                    <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                        <div
                            ref={scrollContainerRef}
                            className={styles.cardsWrapper}
                            style={{ justifyContent: totalPages === 1 ? 'center' : 'start' }}
                        >
                            {displayVideos.map((item, index) => item && (
                                <TikTokCard
                                    key={item.originalIndex}
                                    item={item}
                                    index={item.originalIndex}
                                    displayIndex={index}
                                    sectionId={sectionId}
                                    videos={videos}
                                    onUpdate={onUpdate}
                                    updateVideo={updateVideo}
                                    playingIndex={playingIndex}
                                    handlePlay={handlePlay}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="scroll-indicator-pills">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={currentPage === index ? "indicator-pill-active" : "indicator-pill"}
                                        onClick={() => scrollToPage(index)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Go to page ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </BuilderSection >
        </>
    );
}
