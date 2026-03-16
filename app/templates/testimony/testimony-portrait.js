"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./testimony-portrait.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import BuilderElement from "@/app/page-builder/utils/builder/builder-element";
import { componentDefaults } from "../content/data";

export default function TestimonyPortrait({
    testimonies: rawTestimonies = componentDefaults["testimony-portrait"].testimonies,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    autoScroll = componentDefaults["testimony-portrait"].autoScroll,
    autoScrollEffect = componentDefaults["testimony-portrait"].autoScrollEffect,
    marqueeDuration = componentDefaults["testimony-portrait"].marqueeDuration
}) {
    // Sanitize data: remove null/undefined entries
    const testimonies = (rawTestimonies || []).filter(item => item !== null && typeof item === 'object');

    const isAutoScroll = autoScroll === true || autoScroll === "true";
    const isFullWidth = fullWidth === true || fullWidth === "true";

    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(testimonies.length);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Fix: Use a ref to hold the latest state so the callback can be stable
    // (BuilderText ignores prop changes to onChange for performance, so we must provide a stable function)
    const latestStateRef = useRef({ testimonies, onUpdate });
    latestStateRef.current = { testimonies, onUpdate };

    const updateTestimony = useCallback((index, key, value) => {
        const { testimonies: currentTestimonies, onUpdate: currentOnUpdate } = latestStateRef.current;
        if (!currentOnUpdate) return;

        const newTestimonies = [...currentTestimonies];
        newTestimonies[index] = { ...newTestimonies[index], [key]: value };
        currentOnUpdate({ testimonies: newTestimonies });
    }, []);

    const updateCardId = (index, newId) => {
        updateTestimony(index, 'cardId', newId);
    };

    const visibleCardsString = testimonies.map(t => t?.visible).join(',');

    useEffect(() => {
        const visibleTestimonies = testimonies.filter(t => t.visible !== false);
        setTotalItems(visibleTestimonies.length > 0 ? visibleTestimonies.length : (testimonies.length > 0 ? 1 : 0));
    }, [testimonies, visibleCardsString]);

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

        // Delay calculation slightly to ensure DOM has updated
        const timer = setTimeout(calculatePages, 100);

        window.addEventListener('resize', calculatePages);
        return () => {
            window.removeEventListener('resize', calculatePages);
            clearTimeout(timer);
        };
    }, [testimonies.length, visibleCardsString]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const viewportWidth = container.clientWidth;
            const scrollWidth = container.scrollWidth;
            const maxScroll = scrollWidth - viewportWidth;

            // 1. Calculate Active Index (for 1-by-1 slide sequence)
            const items = Array.from(container.querySelectorAll(`.${styles.itemWrapper}`))
                .filter(item => item.offsetParent !== null);

            if (items.length > 0) {
                let closestIndex = 0;
                let minDistance = Infinity;

                items.forEach((item, index) => {
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

            // 2. Calculate Current Page (for pagination indicators)
            // Use ratio-based calculation to handle small overflows correctly
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
    }, [activeIndex, currentPage]);

    const scrollToIndex = (index) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const items = Array.from(container.querySelectorAll(`.${styles.itemWrapper}`))
            .filter(item => item.offsetParent !== null);

        if (!items[index]) return;

        const item = items[index];
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

            // If we are at the end (or very close), reset to 0
            if (scrollLeft >= maxScroll - 10) {
                scrollToIndex(0);
            } else {
                scrollToIndex(activeIndex + 1);
            }
        }, 4000);

        return () => clearInterval(timer);
    }, [activeIndex, totalItems, isPaused, autoScroll, autoScrollEffect]);

    const visibleCount = testimonies.filter(t => t.visible !== false).length;
    let filteredTestimonies = testimonies;
    if (visibleCount === 0 && testimonies.length > 0) {
        // If no visible testimonies, show the first one as a fallback (minimum 1 card)
        const validFallback = testimonies.find(t => t !== null && typeof t === 'object');
        filteredTestimonies = validFallback ? [validFallback] : [];
    }

    // For marquee, we need enough items to fill the screen for a seamless loop
    const displayItems = [];
    let repeatCount = 1;

    // Filtered testimonies with their original indices
    const mappedTestimonies = filteredTestimonies.map((item, originalIndex) => ({
        data: item,
        originalIndex: testimonies.indexOf(item) // Get index from base testimonies array
    }));

    if (isAutoScroll && autoScrollEffect === 'marquee' && mappedTestimonies.length > 0) {
        // Aim for at least 24 items total to ensure the screen is always filled (matching landscape's wide buffer)
        repeatCount = Math.max(3, Math.ceil(24 / mappedTestimonies.length));
        for (let i = 0; i < repeatCount; i++) {
            displayItems.push(...mappedTestimonies);
        }
    } else {
        displayItems.push(...mappedTestimonies);
    }

    const shouldCenter = !isAutoScroll || (totalPages <= 1 && autoScrollEffect !== 'marquee');

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
                            {displayItems.map(({ data: item, originalIndex }, index) => item && (
                                <BuilderElement
                                    key={index}
                                    tagName="div"
                                    className={styles.itemWrapper}
                                    id={item.cardId}
                                    sectionId={sectionId}
                                    onIdChange={(val) => updateCardId(originalIndex, val)}
                                    elementProps={`testimony-${index}`}
                                    isVisible={item.visible !== false}
                                >
                                    <div className={styles.card}>
                                        <BuilderImage
                                            src={item.image}
                                            onSrcChange={(val) => updateTestimony(originalIndex, "image", val)}
                                            className={styles.backgroundImage}
                                            id={item.imageId}
                                            sectionId={sectionId}
                                            isVisible={item.imageVisible}
                                            onIdChange={(val) => updateTestimony(originalIndex, "imageId", val)}
                                            onVisibilityChange={(val) => updateTestimony(originalIndex, "imageVisible", val)}
                                            suffix={`background-${index}`}
                                            href={item.imageUrl}
                                            onHrefChange={(val) => updateTestimony(originalIndex, "imageUrl", val)}
                                            linkType={item.imageLinkType}
                                            onLinkTypeChange={(val) => updateTestimony(originalIndex, "imageLinkType", val)}
                                            targetDialogId={item.imageTargetDialogId}
                                            onTargetDialogIdChange={(val) => updateTestimony(originalIndex, "imageTargetDialogId", val)}
                                        />

                                        <div className={styles.contentCard}>
                                            <div className={styles.avatarWrapper}>
                                                <BuilderImage
                                                    src={item.avatar}
                                                    onSrcChange={(val) => updateTestimony(originalIndex, "avatar", val)}
                                                    className={'imagePlaceholder-1-1 object-cover'}
                                                    id={item.avatarId}
                                                    style={{ borderRadius: "var(--border-radius-round)" }}
                                                    sectionId={sectionId}
                                                    isVisible={item.avatarVisible}
                                                    onIdChange={(val) => updateTestimony(originalIndex, "avatarId", val)}
                                                    onVisibilityChange={(val) => updateTestimony(originalIndex, "avatarVisible", val)}
                                                    suffix={`avatar-${index}`}
                                                    href={item.avatarUrl}
                                                    onHrefChange={(val) => updateTestimony(originalIndex, "avatarUrl", val)}
                                                    linkType={item.avatarLinkType}
                                                    onLinkTypeChange={(val) => updateTestimony(originalIndex, "avatarLinkType", val)}
                                                    targetDialogId={item.avatarTargetDialogId}
                                                    onTargetDialogIdChange={(val) => updateTestimony(originalIndex, "avatarTargetDialogId", val)}
                                                />
                                            </div>
                                            <BuilderText
                                                tagName="div"
                                                className={`h5 truncate-1-line ${styles.name}`}
                                                content={item.name || ""}
                                                onChange={(val) => updateTestimony(originalIndex, "name", val)}
                                                sectionId={sectionId}
                                                tooltipIfTruncated={true}
                                                suffix="name"
                                            />

                                            <BuilderText
                                                tagName="div"
                                                className={`body-regular ${styles.role}`}
                                                content={item.role || ""}
                                                onChange={(val) => updateTestimony(originalIndex, "role", val)}
                                                sectionId={sectionId}
                                                suffix="role"
                                            />

                                            <BuilderText
                                                tagName="div"
                                                className={`body-regular truncate-2-lines ${styles.description}`}
                                                content={item.description || ""}
                                                onChange={(val) => updateTestimony(originalIndex, "description", val)}
                                                sectionId={sectionId}
                                                tooltipIfTruncated={true}
                                                suffix="description"
                                            />
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
