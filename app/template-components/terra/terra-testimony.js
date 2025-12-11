"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./terra-testimony.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
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

        calculatePages();
        window.addEventListener('resize', calculatePages);
        return () => window.removeEventListener('resize', calculatePages);
    }, [testimonies]);

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

    // Auto-scroll timer - advance every 5 seconds
    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            if (!scrollContainerRef.current) return;

            const nextPage = (currentPage + 1) % totalPages;
            scrollToPage(nextPage);
        }, 5000); // 5 seconds

        return () => clearInterval(autoScrollInterval);
    }, [currentPage, totalPages]);

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

    return (
        <section className={styles.container}>
            <BuilderSection
                sectionId={sectionId}
                fullWidth={fullWidth}
                removePaddingLeft={removePaddingLeft}
                removePaddingRight={removePaddingRight}
                onUpdate={onUpdate}
            >
                <div className="grid">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div ref={scrollContainerRef} className={`grid ${styles.cardsWrapper}`}>
                            {testimonies.map((item, index) => (
                                <div key={index} className={`col-mobile-2 col-tablet-4 col-desktop-3 ${styles.itemWrapper}`}>
                                    <div className={styles.card}>
                                        <BuilderImage
                                            src={item.image}
                                            className={`${styles.terraTestimoniImage} imagePlaceholder-4-5`}
                                            id={item.imageId}
                                            sectionId={sectionId}
                                            isVisible={item.imageVisible}
                                            onIdChange={(val) => updateTestimony(index, "imageId", val)}
                                            onVisibilityChange={(val) => updateTestimony(index, "imageVisible", val)}
                                            suffix={`background-${index}`}
                                        />

                                        <div className={styles.terraTestimoniDescriptionCard}>
                                            <div className={`imageWrapper ${styles.avatarImg}`}>
                                                <BuilderImage
                                                    src={item.avatar}
                                                    className={'imagePlaceholder-1-1'}
                                                    id={item.avatarId}
                                                    style={{ borderRadius: "var(--border-radius-round)" }}
                                                    sectionId={sectionId}
                                                    isVisible={item.avatarVisible}
                                                    onIdChange={(val) => updateTestimony(index, "avatarId", val)}
                                                    onVisibilityChange={(val) => updateTestimony(index, "avatarVisible", val)}
                                                    suffix={`avatar-${index}`}
                                                />
                                            </div>
                                            <BuilderText
                                                tagName="div"
                                                className={`h6 truncate-1-line`}
                                                content={item.name}
                                                onChange={(val) => updateTestimony(index, "name", val)}
                                                sectionId={sectionId}
                                                title={item.name}
                                            />
                                            <BuilderText
                                                tagName="div"
                                                className={`caption-regular truncate-1-line ${styles.role}`}
                                                content={item.role}
                                                onChange={(val) => updateTestimony(index, "role", val)}
                                                sectionId={sectionId}
                                                title={item.role}
                                            />
                                            <BuilderText
                                                tagName="div"
                                                className={`caption-regular truncate-2-lines ${styles.description}`}
                                                content={item.description}
                                                onChange={(val) => updateTestimony(index, "description", val)}
                                                sectionId={sectionId}
                                                title={item.description}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

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
                    </div>
                </div>
            </BuilderSection>
        </section>
    );
}
