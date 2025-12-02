"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import styles from './lacto-product-carousel.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";

import { componentDefaults } from "../content/component-defaults";

export default function LactoProductCarousel({
    // Lacto Product Carousel Component
    products = componentDefaults["lacto-product-carousel"].products,
    buttonText = componentDefaults["lacto-product-carousel"].buttonText,
    buttonStyle = "primary", // primary, neutral, ghost, outline, link
    buttonSize = "lg", // sm, md, lg
    onUpdate,
    sectionId
}) {
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

    const handleProductUpdate = (index, key, value) => {
        if (!onUpdate) return;
        const newProducts = [...products];
        newProducts[index] = { ...newProducts[index], [key]: value };
        onUpdate({ products: newProducts });
    };

    const prevProduct = getProduct(-1);
    const activeProduct = getProduct(0);
    const nextProduct = getProduct(1);

    // Calculate actual index of active product in the original array
    const activeProductIndex = (activeIndex + products.length) % products.length;

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
                                <h3 className={`h3 ${styles.title}`}>
                                    <BuilderText
                                        tagName="span"
                                        content={activeProduct.title}
                                        onChange={(val) => handleProductUpdate(activeProductIndex, "title", val)}
                                        sectionId={sectionId}
                                    />
                                </h3>
                                <BuilderText
                                    tagName="h1"
                                    className={`subheader-h1 ${styles.description}`}
                                    content={activeProduct.subtitle}
                                    onChange={(val) => handleProductUpdate(activeProductIndex, "subtitle", val)}
                                    sectionId={sectionId}
                                />
                            </div>
                            <BuilderButton
                                label={buttonText}
                                iconLeft={<ShoppingCartIcon className={styles.icon} />}
                                href="#"
                                sectionId={sectionId}
                                className={`btn btn-${buttonStyle} btn-${buttonSize}`}
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                            />
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
