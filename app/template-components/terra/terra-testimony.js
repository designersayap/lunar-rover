"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./terra-testimony.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
import BuilderElement from "@/app/page-builder-components/utils/builder/builder-element";
import { componentDefaults } from "../content/data";

export default function TerraTestimony({
    testimonies = componentDefaults["terra-testimony"].testimonies,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const scrollContainerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const updateTestimony = (index, key, value) => {
        if (!onUpdate) return;
        const newTestimonies = [...testimonies];
        newTestimonies[index] = { ...newTestimonies[index], [key]: value };
        onUpdate({ testimonies: newTestimonies });
    };

    const updateCardId = (index, newId) => {
        updateTestimony(index, 'cardId', newId);
    };

    const visibleCardsString = testimonies.map(t => t.visible).join(',');

    // Calculate total pages based on viewport width
    useEffect(() => {
        const calculatePages = () => {
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const containerWidth = container.scrollWidth;
            const viewportWidth = container.clientWidth;

            const pages = Math.ceil(containerWidth / viewportWidth);
            setTotalPages(pages);
        };

        // Delay calculation slightly to ensure DOM has updated
        const timer = setTimeout(calculatePages, 100);

        window.addEventListener('resize', calculatePages);
        return () => {
            window.removeEventListener('resize', calculatePages);
            clearTimeout(timer);
        };
    }, [testimonies.length, visibleCardsString]);

    // Track scroll position to update active page
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

    // Handle dot click to scroll to specific page
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

    // Auto-scroll timer - advance every 5 seconds
    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            if (!scrollContainerRef.current) return;

            const nextPage = (currentPage + 1) % totalPages;
            scrollToPage(nextPage);
        }, 5000); // 5 seconds

        return () => clearInterval(autoScrollInterval);
    }, [currentPage, totalPages]);

    const visibleCount = testimonies.filter(t => t.visible !== false).length;

    return (
        <BuilderSection
            tagName="section"
            className={styles.container}
            innerContainer={true}
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
                        style={{ justifyContent: visibleCount === 3 ? 'center' : 'initial' }}
                    >
                        {testimonies.map((item, index) => (
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
                                        className={`${styles.terraTestimoniImage} imagePlaceholder-4-5 object-cover`}
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
                                        <div className={`imageWrapper ${styles.avatarImg}`}>
                                            <BuilderImage
                                                src={item.avatar}
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
                                            className={`h6 truncate-1-line`}
                                            content={item.name}
                                            onChange={(val) => updateTestimony(index, "name", val)}
                                            sectionId={sectionId}
                                            data-tooltip={item.name}
                                        />
                                        <BuilderText
                                            tagName="div"
                                            className={`caption-regular truncate-1-line ${styles.role}`}
                                            content={item.role}
                                            onChange={(val) => updateTestimony(index, "role", val)}
                                            sectionId={sectionId}
                                            data-tooltip={item.role}
                                        />
                                        <BuilderText
                                            tagName="div"
                                            className={`body-regular truncate-2-lines ${styles.description}`}
                                            content={item.description}
                                            onChange={(val) => updateTestimony(index, "description", val)}
                                            sectionId={sectionId}
                                            data-tooltip={item.description}
                                        />
                                    </div>
                                </div>
                            </BuilderElement>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className={styles.paginator}>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.dot} ${currentPage === index ? styles.activeDot : ''}`}
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
