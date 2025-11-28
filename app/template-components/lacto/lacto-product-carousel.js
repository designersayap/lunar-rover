"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import styles from './lacto-product-carousel.module.css';

const products = [
    {
        id: 1,
        title: "Meiji Oishii Gyunyu",
        description: "Vanilla flavored milk, packaged for your daily enjoyment.",
        image: "/images/placeholders/product-1.png", // We'll use a placeholder div if image missing
    },
    {
        id: 2,
        title: "Fresh Strawberry Milk",
        description: "Sweet and refreshing strawberry milk made from fresh.",
        image: "/images/placeholders/product-2.png",
    },
    {
        id: 3,
        title: "Classic Chocolate",
        description: "Rich chocolate milk that brings back childhood memories.",
        image: "/images/placeholders/product-3.png",
    }
];

export default function LactoProductCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const getProduct = (offset) => {
        const index = (activeIndex + offset + products.length) % products.length;
        return products[index];
    };

    const prevProduct = getProduct(-1);
    const activeProduct = getProduct(0);
    const nextProduct = getProduct(1);

    return (
        <section className={styles.section}>
            <div className={styles.carouselContainer}>

                <div className={styles.track}>
                    {/* Previous Item - Image Only */}
                    <div className={`${styles.item} ${styles.inactiveItem} ${styles.prevItem}`}>
                        <div className={`imagePlaceholder-1-1 ${styles.media}`}></div>
                    </div>

                    {/* Active Item - Full Content */}
                    <div className={`${styles.item} ${styles.activeItem}`}>
                        <div className={styles.mediaWrapper}>
                            <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous slide">
                                <ArrowLeftIcon className={styles.navIcon} />
                            </button>

                            <div className={`imagePlaceholder-1-1 ${styles.activeMedia}`}></div>

                            <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next slide">
                                <ArrowRightIcon className={styles.navIcon} />
                            </button>
                        </div>

                        <div className={styles.contentWrapper}>
                            <div className={styles.textWrapper}>
                                <h3 className={`h3 ${styles.title}`}>{activeProduct.title}</h3>
                                <h1 className={`subheader-h1 ${styles.description}`}>{activeProduct.description}</h1>
                            </div>
                            <button className="btn btn-primary btn-lg">
                                <ShoppingCartIcon className={styles.icon} />
                                Buy Product
                            </button>
                        </div>
                    </div>

                    {/* Next Item - Image Only */}
                    <div className={`${styles.item} ${styles.inactiveItem} ${styles.nextItem}`}>
                        <div className={`imagePlaceholder-1-1 ${styles.media}`}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
