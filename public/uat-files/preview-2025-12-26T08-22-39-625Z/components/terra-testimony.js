"use client";

import { useRef, useState, useEffect } from "react";
import styles from './terra-testimony.module.css';
import { componentDefaults } from "./data";

function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}

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
        <section className={styles.container} id={sectionId}>
<div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>

            <div className="grid">
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div
                        ref={scrollContainerRef}
                        className={styles.cardsWrapper}
                        style={{ justifyContent: visibleCount === 3 ? 'center' : 'initial' }}
                    >
                        {testimonies.map((item, index) => (
                            <div className={styles.itemWrapper} key={index} id={(item.cardId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-element` : undefined))}>
                                <div className={styles.card}>
                                    {(item.imageVisible ?? true) && ((item.image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(item.image)) ? (
                    <video src={item.image} controls autoPlay muted loop playsInline className={`${styles.terraTestimoniImage} imagePlaceholder-4-5 object-cover`} id={(item.imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (item.image && /\.(mp3|wav)(\?.*)?$/i.test(item.image)) ? (
                    <audio src={item.image} controls className={`${styles.terraTestimoniImage} imagePlaceholder-4-5 object-cover`} id={(item.imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (
                    <img src={item.image || null} alt="" className={`${styles.terraTestimoniImage} imagePlaceholder-4-5 object-cover`} id={(item.imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ))}

                                    <div className={styles.terraTestimoniDescriptionCard}>
                                        <div className={`imageWrapper ${styles.avatarImg}`}>
                                            {(item.avatarVisible ?? true) && ((item.avatar && /\.(mp4|webm|ogv)(\?.*)?$/i.test(item.avatar)) ? (
                    <video src={item.avatar} controls autoPlay muted loop playsInline className={'imagePlaceholder-1-1 object-cover'} id={(item.avatarId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ borderRadius: "var(--border-radius-round)" }} />
                ) : (item.avatar && /\.(mp3|wav)(\?.*)?$/i.test(item.avatar)) ? (
                    <audio src={item.avatar} controls className={'imagePlaceholder-1-1 object-cover'} id={(item.avatarId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ borderRadius: "var(--border-radius-round)" }} />
                ) : (
                    <img src={item.avatar || null} alt="" className={'imagePlaceholder-1-1 object-cover'} id={(item.avatarId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ borderRadius: "var(--border-radius-round)" }} />
                ))}
                                        </div>
                                        <div className={`h6 truncate-1-line ${styles.name}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-div` : undefined)}>{item.name}</div>
                                        <div className={`caption-regular truncate-1-line ${styles.role}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-div` : undefined)}>{item.role}</div>
                                        <div className={`body-regular truncate-2-lines ${styles.description}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-div` : undefined)}>{item.description}</div>
                                    </div>
                                </div>
                            </div>
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
        
</div>
</section>
    );
}
