"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./testimony-landscape.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import BuilderElement from "@/app/page-builder/utils/builder/builder-element";
import { componentDefaults } from "../content/data";

export default function TestimonyLandscape({
    testimonies = componentDefaults["testimony-landscape"].testimonies,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const scrollContainerRef = useRef(null);
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

    const visibleCardsString = testimonies.map(t => t.visible).join(',');

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
        const scrollPosition = pageIndex * viewportWidth;

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            if (!scrollContainerRef.current || isPaused || totalPages <= 1) return;

            const nextPage = (currentPage + 1) % totalPages;
            scrollToPage(nextPage);
        }, 5000); // 5 seconds

        return () => clearInterval(autoScrollInterval);
    }, [currentPage, totalPages, isPaused]);

    const visibleCount = testimonies.filter(t => t.visible !== false).length;
    let filteredTestimonies = testimonies;
    if (visibleCount === 0 && testimonies.length > 0) {
        // If no visible testimonies, show the first one as a fallback (minimum 1 card)
        filteredTestimonies = [testimonies[0]];
    }

    return (
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
            <div className="grid">
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div
                        ref={scrollContainerRef}
                        className={styles.cardsWrapper}
                        style={{ justifyContent: totalPages === 1 ? 'center' : 'start' }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {filteredTestimonies.map((item, index) => (
                            <BuilderElement
                                key={index}
                                tagName="div"
                                className={styles.itemWrapper}
                                id={item.cardId}
                                sectionId={sectionId}
                                onIdChange={(val) => updateCardId(index, val)}
                                elementProps={`testimony-${index}`}
                                isVisible={item.visible !== false}
                            >
                                <div className={styles.card}>
                                    <BuilderImage
                                        src={item.image}
                                        onSrcChange={(val) => updateTestimony(index, "image", val)}
                                        className={styles.terraTestimoniImage}
                                        id={item.imageId}
                                        sectionId={sectionId}
                                        isVisible={item.imageVisible}
                                        onIdChange={(val) => updateTestimony(index, "imageId", val)}
                                        onVisibilityChange={(val) => updateTestimony(index, "imageVisible", val)}
                                        suffix={`background-${index}`}
                                        href={item.imageUrl}
                                        onHrefChange={(val) => updateTestimony(index, "imageUrl", val)}
                                        linkType={item.imageLinkType}
                                        onLinkTypeChange={(val) => updateTestimony(index, "imageLinkType", val)}
                                        targetDialogId={item.imageTargetDialogId}
                                        onTargetDialogIdChange={(val) => updateTestimony(index, "imageTargetDialogId", val)}
                                    />

                                    <div className={styles.terraTestimoniDescriptionCard}>
                                        <div className={styles.avatarImg}>
                                            <BuilderImage
                                                src={item.avatar}
                                                onSrcChange={(val) => updateTestimony(index, "avatar", val)}
                                                className={'imagePlaceholder-1-1 object-cover'}
                                                id={item.avatarId}
                                                style={{ borderRadius: "var(--border-radius-round)" }}
                                                sectionId={sectionId}
                                                isVisible={item.avatarVisible}
                                                onIdChange={(val) => updateTestimony(index, "avatarId", val)}
                                                onVisibilityChange={(val) => updateTestimony(index, "avatarVisible", val)}
                                                suffix={`avatar-${index}`}
                                                href={item.avatarUrl}
                                                onHrefChange={(val) => updateTestimony(index, "avatarUrl", val)}
                                                linkType={item.avatarLinkType}
                                                onLinkTypeChange={(val) => updateTestimony(index, "avatarLinkType", val)}
                                                targetDialogId={item.avatarTargetDialogId}
                                                onTargetDialogIdChange={(val) => updateTestimony(index, "avatarTargetDialogId", val)}
                                            />
                                        </div>
                                        <BuilderText
                                            tagName="div"
                                            className={`h5 truncate-1-line ${styles.name}`}
                                            content={item.name}
                                            onChange={(val) => updateTestimony(index, "name", val)}
                                            sectionId={sectionId}
                                            tooltipIfTruncated={true}
                                        />

                                        <BuilderText
                                            tagName="div"
                                            className={`caption-regular ${styles.role}`}
                                            content={item.role}
                                            onChange={(val) => updateTestimony(index, "role", val)}
                                            sectionId={sectionId}
                                        />

                                        <BuilderText
                                            tagName="div"
                                            className={`caption-regular truncate-3-lines ${styles.description}`}
                                            content={`“${item.description}”`}
                                            onChange={(val) => updateTestimony(index, "description", val)}
                                            sectionId={sectionId}
                                            tooltipIfTruncated={true}
                                        />
                                    </div>
                                </div>
                            </BuilderElement>
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
    );
}
