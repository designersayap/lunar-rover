"use client";

import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import styles from "./terra-testimony.module.css";

/**
 * Testimony Component
 * Displays 6 testimonial cards with background images and floating content
 */
export default function TerraTestimony() {
    const scrollContainerRef = useRef(null);

    const testimonials = [
        {
            name: "Uzair Nunez",
            role: "Web Developer",
            quote: "Terra transformed our brand! The flexible layouts boosted our team's creativity",
        },
        {
            name: "Cecily Garcia",
            role: "Project Manager",
            quote: "This one is top-notch! Our customers love the modern designs especially the illustrations",
        },
        {
            name: "Maja Nash",
            role: "UX Designer",
            quote: "I love the sleek design! This template made our site modern and user-friendly.",
        },
        {
            name: "Sarah Johnson",
            role: "Marketing Director",
            quote: "The attention to detail is outstanding! Our conversion rates improved significantly.",
        },
        {
            name: "Michael Chen",
            role: "Product Designer",
            quote: "Beautiful components that are easy to customize. Saved us weeks of development time.",
        },
        {
            name: "Emma Williams",
            role: "CEO",
            quote: "Professional, modern, and exactly what we needed. Highly recommend Terra!",
        },
    ];

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(`.${styles.terraTestimoniContent}`)?.offsetWidth || 0;
            scrollContainerRef.current.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(`.${styles.terraTestimoniContent}`)?.offsetWidth || 0;
            scrollContainerRef.current.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    {/* Main Content Wrapper */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-12 ${styles.container}`}>

                        {/* Navigation Buttons */}
                        <button
                            className={`${styles.navButton} ${styles.navButtonLeft}`}
                            onClick={scrollLeft}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeftIcon className={styles.icon} />
                        </button>
                        <button
                            className={`${styles.navButton} ${styles.navButtonRight}`}
                            onClick={scrollRight}
                            aria-label="Next testimonial"
                        >
                            <ChevronRightIcon className={styles.icon} />
                        </button>

                        {/* Cards Grid */}
                        <div ref={scrollContainerRef} className={`grid ${styles.cardContainer}`}>
                            {testimonials.map((item, index) => (
                                <div key={index} className={`col-mobile-2 col-tablet-8 col-desktop-4 ${styles.terraTestimoniContent}`}>
                                    <div className={`imagePlaceholder-4-5 ${styles.cardWrapper}`}>
                                        <div className={styles.cardContent}>
                                            {/* Profile Image */}
                                            <div className={styles.profileImageWrapper}>
                                                <div className={styles.profileImage} style={{ backgroundColor: '#CBD5E1' }}></div>
                                            </div>

                                            {/* Text Content */}
                                            <h5 className={`h5 ${styles.name}`}>{item.name}</h5>
                                            <p className={`caption-regular ${styles.role}`}>{item.role}</p>
                                            <p className={`caption-regular ${styles.description}`}>"{item.quote}"</p>

                                            {/* Stars */}
                                            <div className={styles.stars}>
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className={styles.starIcon} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
