"use client";

import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import styles from "./terra-testimony.module.css";

/**
 * Testimony Component
 * Displays 6 testimonial cards with background images and floating content
 */
import BuilderText from "@/app/page-builder-components/utils/BuilderText";

/**
 * Testimony Component
 * Displays 6 testimonial cards with background images and floating content
 */
export default function TerraTestimony({
    testimonials = [
        { name: "Uzair Nunez", role: "Web Developer", quote: "Terra transformed our brand! The flexible layouts boosted our team's creativity" },
        { name: "Cecily Garcia", role: "Project Manager", quote: "This one is top-notch! Our customers love the modern designs" },
        { name: "Maja Nash", role: "UX Designer", quote: "I love the sleek design! This template made our site modern and user-friendly." },
        { name: "Sarah Johnson", role: "Marketing Director", quote: "The attention to detail is outstanding! Our conversion rates improved significantly." },
        { name: "Michael Chen", role: "Product Designer", quote: "Beautiful components that are easy to customize. Saved us weeks." },
        { name: "Emma Williams", role: "CEO", quote: "Professional, modern, and exactly what we needed. Highly recommend Terra!" },
    ],
    onUpdate
}) {
    const scrollContainerRef = useRef(null);

    const handleTestimonialUpdate = (index, key, value) => {
        if (!onUpdate) return;
        const newTestimonials = [...testimonials];
        newTestimonials[index] = { ...newTestimonials[index], [key]: value };
        onUpdate({ testimonials: newTestimonials });
    };

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
                            className={`btn btn-outline btn-icon btn-md ${styles.navButton} ${styles.navButtonLeft}`}
                            onClick={scrollLeft}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            className={`btn btn-outline btn-icon btn-md ${styles.navButton} ${styles.navButtonRight}`}
                            onClick={scrollRight}
                            aria-label="Next testimonial"
                        >
                            <ChevronRightIcon />
                        </button>

                        {/* Cards Grid */}
                        <div ref={scrollContainerRef} className={styles.cardContainer}>
                            {testimonials.map((item, index) => (
                                <div key={index} className={`col-mobile-2 col-tablet-8 col-desktop-4 ${styles.terraTestimoniContent}`}>
                                    <div className={`imagePlaceholder-4-5 ${styles.cardWrapper}`}>
                                        <div className={styles.cardContent}>
                                            {/* Profile Image */}
                                            <div className={styles.profileImageWrapper}>
                                                <div className={styles.profileImage} style={{ backgroundColor: '#CBD5E1' }}></div>
                                            </div>

                                            {/* Text Content */}
                                            <div className={'titleheader'}>
                                                <h5 className={`h5 truncate-1-line ${styles.name}`}>
                                                    <BuilderText
                                                        tagName="span"
                                                        content={item.name}
                                                        onChange={(val) => handleTestimonialUpdate(index, "name", val)}
                                                    />
                                                </h5>
                                                <p className={`caption-regular truncate-1-lines ${styles.role}`}>
                                                    <BuilderText
                                                        tagName="span"
                                                        content={item.role}
                                                        onChange={(val) => handleTestimonialUpdate(index, "role", val)}
                                                    />
                                                </p>
                                            </div>
                                            <p className={`caption-regular truncate-2-lines ${styles.description}`}>
                                                "<BuilderText
                                                    tagName="span"
                                                    content={item.quote}
                                                    onChange={(val) => handleTestimonialUpdate(index, "quote", val)}
                                                />"
                                            </p>

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
