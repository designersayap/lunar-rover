"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./instagram-feed.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import BuilderElement from "@/app/page-builder/utils/builder/builder-element";
import BuilderLink from "@/app/page-builder/utils/builder/builder-link";
import { componentDefaults } from "../content/data";

export default function InstagramFeed({
    items: rawItems = componentDefaults["social-bridge-instagram-feed"].items,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    autoScroll = componentDefaults["social-bridge-instagram-feed"].autoScroll,
    autoScrollEffect = componentDefaults["social-bridge-instagram-feed"].autoScrollEffect,
    marqueeDuration = componentDefaults["social-bridge-instagram-feed"].marqueeDuration
}) {
    // Sanitize data
    const items = (rawItems || []).filter(item => item !== null && typeof item === 'object');

    const isAutoScroll = autoScroll === true || autoScroll === "true";
    const isFullWidth = fullWidth === true || fullWidth === "true";

    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(items.length);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const latestStateRef = useRef({ items, onUpdate });
    latestStateRef.current = { items, onUpdate };

    const updateItem = useCallback((index, key, value) => {
        const { items: currentItems, onUpdate: currentOnUpdate } = latestStateRef.current;
        if (!currentOnUpdate) return;

        const newItems = [...currentItems];
        newItems[index] = { ...newItems[index], [key]: value };
        currentOnUpdate({ items: newItems });
    }, []);

    const updateCardId = (index, newId) => {
        updateItem(index, 'cardId', newId);
    };

    const visibleItemsString = items.map(t => t?.visible).join(',');

    useEffect(() => {
        const visibleItems = items.filter(t => t.visible !== false);
        setTotalItems(visibleItems.length > 0 ? visibleItems.length : (items.length > 0 ? 1 : 0));
    }, [items, visibleItemsString]);

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
    }, [items.length, visibleItemsString]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const viewportWidth = container.clientWidth;
            const scrollWidth = container.scrollWidth;
            const maxScroll = scrollWidth - viewportWidth;

            const listItems = Array.from(container.querySelectorAll(`.${styles.itemWrapper}`))
                .filter(item => item.offsetParent !== null);

            if (listItems.length > 0) {
                let closestIndex = 0;
                let minDistance = Infinity;

                listItems.forEach((item, index) => {
                    const distance = Math.abs(scrollLeft - item.offsetLeft);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                });

                if (closestIndex !== activeIndex) {
                    setActiveIndex(closestIndex);
                }
            }

            if (maxScroll > 0 && totalPages > 1) {
                const ratio = scrollLeft / maxScroll;
                const page = Math.round(ratio * (totalPages - 1));
                if (page !== currentPage) {
                    setCurrentPage(page);
                }
            } else if (currentPage !== 0) {
                setCurrentPage(0);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeIndex, currentPage, totalPages]);

    const scrollToIndex = (index) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const listItems = Array.from(container.querySelectorAll(`.${styles.itemWrapper}`))
            .filter(item => item.offsetParent !== null);

        if (!listItems[index]) return;

        const item = listItems[index];
        const scrollPosition = item.offsetLeft;

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    const scrollToPage = (pageIndex) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const viewportWidth = container.clientWidth;
        const scrollPosition = pageIndex * viewportWidth;

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!autoScroll || isPaused || totalItems <= 1 || autoScrollEffect !== 'slide') return;

        const timer = setInterval(() => {
            const container = scrollContainerRef.current;
            if (!container) return;

            const { scrollLeft, scrollWidth, clientWidth } = container;
            const maxScroll = scrollWidth - clientWidth;

            if (scrollLeft >= maxScroll - 10) {
                scrollToIndex(0);
            } else {
                scrollToIndex(activeIndex + 1);
            }
        }, 4000);

        return () => clearInterval(timer);
    }, [activeIndex, totalItems, isPaused, autoScroll, autoScrollEffect]);



    const visibleCount = items.filter(t => t.visible !== false).length;
    let filteredItems = items.map((item, idx) => ({ ...item, _originalIndex: idx }));

    if (visibleCount === 0 && items.length > 0) {
        const validFallbackIdx = items.findIndex(t => t !== null && typeof t === 'object');
        filteredItems = validFallbackIdx !== -1 ? [{ ...items[validFallbackIdx], _originalIndex: validFallbackIdx }] : [];
    }

    const displayItems = [];
    let repeatCount = 1;

    if (isAutoScroll && autoScrollEffect === 'marquee' && filteredItems.length > 0) {
        repeatCount = Math.max(3, Math.ceil(16 / filteredItems.length));
        for (let i = 0; i < repeatCount; i++) {
            displayItems.push(...filteredItems);
        }
    } else {
        displayItems.push(...filteredItems);
    }

    const shouldCenter = totalPages <= 1 && autoScrollEffect !== 'marquee';

    return (
        <BuilderSection
            tagName="section"
            className={styles.container}
            innerContainer={!isFullWidth}
            sectionId={sectionId}
            fullWidth={isFullWidth}
            removePaddingLeft={removePaddingLeft}
            removePaddingRight={removePaddingRight}
            onUpdate={onUpdate}
            showAutoScrollToggle={true}
            autoScroll={isAutoScroll}
            autoScrollEffect={autoScrollEffect}
            marqueeDuration={marqueeDuration}
        >
            <div className="grid">
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div className={styles.scrollWrapper}>
                        <div
                            ref={scrollContainerRef}
                            className={`${styles.cardsWrapper} ${isAutoScroll && autoScrollEffect === 'marquee' ? styles.marquee : ''}`}
                            style={{
                                justifyContent: shouldCenter ? 'center' : 'start',
                                '--marquee-repeat-count': repeatCount,
                                '--marquee-duration': `${marqueeDuration || 120}s`
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            data-paused={isPaused}
                        >
                            {displayItems.map((item, index) => item && (
                                <BuilderElement
                                    key={index}
                                    tagName="div"
                                    className={styles.itemWrapper}
                                    id={item.cardId}
                                    sectionId={sectionId}
                                    onIdChange={(val) => updateCardId(item._originalIndex, val)}
                                    elementProps={`instagram-feed-${index}`}
                                    isVisible={item.visible !== false}
                                >
                                        <div className={styles.card}>
                                            <BuilderImage
                                                src={item.image || DEFAULT_PLACEHOLDER_IMAGE}
                                                onSrcChange={(val) => updateItem(item._originalIndex, "image", val)}
                                                className={styles.backgroundImage}
                                                id={item.imageId}
                                                sectionId={sectionId}
                                                isVisible={true}
                                                onIdChange={(val) => updateItem(item._originalIndex, "imageId", val)}
                                                suffix={`bg-${index}`}
                                                href={item.url}
                                                onHrefChange={(val) => updateItem(item._originalIndex, "url", val)}
                                                linkType={item.linkType}
                                                onLinkTypeChange={(val) => updateItem(item._originalIndex, "linkType", val)}
                                                targetDialogId={item.targetDialogId}
                                                onTargetDialogIdChange={(val) => updateItem(item._originalIndex, "targetDialogId", val)}
                                                showPortraitToggle={false}
                                                showAspectRatio={false}
                                                showMobileRatio={false}
                                                enableAudio={item.enableAudio}
                                                onEnableAudioChange={(val) => updateItem(item._originalIndex, "enableAudio", val)}
                                            />

                                            <div className={styles.overlay}>
                                                <div className={styles.blurLayer} />

                                            <div className={styles.content}>
                                                <BuilderText
                                                    tagName="div"
                                                    className={`caption-bold ${styles.hashtag}`}
                                                    content={item.hashtag}
                                                    onChange={(val) => updateItem(item._originalIndex, "hashtag", val)}
                                                    sectionId={sectionId}
                                                />
                                                <BuilderText
                                                    tagName="div"
                                                    className={`body-regular ${styles.title} truncate-2-lines`}
                                                    content={item.title}
                                                    onChange={(val) => updateItem(item._originalIndex, "title", val)}
                                                    sectionId={sectionId}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </BuilderElement>
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && !(isAutoScroll && autoScrollEffect === 'marquee') && (
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
    );
}
