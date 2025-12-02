"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import styles from "./terra-product-carousel-4-products.module.css";

/**
 * Terra Product Carousel - 4 Products
 * Displays product carousel with tabs and horizontal scroll
 */
import BuilderText from "@/app/page-builder-components/utils/builder-text";

import { componentDefaults } from "../content/component-defaults";

/**
 * Terra Product Carousel - 4 Products
 * Displays product carousel with tabs and horizontal scroll
 */
export default function TerraProductCarousel4Products({
    tabs = [
        { id: "fabric", label: "Fabric Care" },
        { id: "food", label: "Food & Beverage" },
        { id: "home", label: "Home Care" },
        { id: "personal", label: "Personal Care" },
    ],
    products = componentDefaults["product-carousel-4"].products,
    onUpdate
}) {
    const scrollContainerRef = useRef(null);
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "fabric");

    const handleTabUpdate = (index, val) => {
        if (!onUpdate) return;
        const newTabs = [...tabs];
        newTabs[index] = { ...newTabs[index], label: val };
        onUpdate({ tabs: newTabs });
    };

    const handleProductUpdate = (tabId, index, key, val) => {
        if (!onUpdate) return;
        const newProducts = { ...products };
        const newTabProducts = [...newProducts[tabId]];
        newTabProducts[index] = { ...newTabProducts[index], [key]: val };
        newProducts[tabId] = newTabProducts;
        onUpdate({ products: newProducts });
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(`.${styles.productCard}`)?.offsetWidth || 0;
            scrollContainerRef.current.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(`.${styles.productCard}`)?.offsetWidth || 0;
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
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        {/* Tabs */}
                        <div className={styles.tabsWrapper}>
                            <div className="tabs">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab.id}
                                        className={`tabs-button ${activeTab === tab.id ? 'tabs-button-active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <BuilderText
                                            tagName="span"
                                            content={tab.label}
                                            onChange={(val) => handleTabUpdate(index, val)}
                                            sectionId={sectionId}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div className={styles.carouselContainer}>
                            {/* Left Arrow */}
                            <button
                                className={`btn btn-md btn-outline ${styles.navButton} ${styles.navButtonLeft}`}
                                onClick={scrollLeft}
                                aria-label="Previous product"
                            >
                                <ChevronLeftIcon className={styles.icon} />
                            </button>

                            {/* Right Arrow */}
                            <button
                                className={`btn btn-md btn-outline ${styles.navButton} ${styles.navButtonRight}`}
                                onClick={scrollRight}
                                aria-label="Next product"
                            >
                                <ChevronRightIcon className={styles.icon} />
                            </button>

                            {/* Products Grid */}
                            <div ref={scrollContainerRef} className={styles.productsGrid}>
                                {products[activeTab] && products[activeTab].map((product, index) => (
                                    <div key={index} className={styles.productCard}>
                                        <div className={styles.cardWrapper}>
                                            {/* Product Image */}
                                            <div className={styles.imageWrapper}>
                                                <div className="imagePlaceholder-1-1">
                                                    {/* Placeholder for product image */}
                                                </div>
                                                {/* Add to Cart Button */}
                                                <button className={`btn btn-md ${styles.addButton}`}>
                                                    <img src="/arrow.svg" alt="View details" className={styles.arrowIcon} />
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className={styles.cardContent}>
                                                <h3 className={`${styles.productName} truncate-1-line`}>
                                                    <BuilderText
                                                        tagName="span"
                                                        content={product.name}
                                                        onChange={(val) => handleProductUpdate(activeTab, index, "name", val)}
                                                        sectionId={sectionId}
                                                    />
                                                </h3>
                                                <p className={`${styles.productDescription} truncate-2-lines`}>
                                                    <BuilderText
                                                        tagName="span"
                                                        className={`body-regular ${styles.description}`}
                                                        content={product.subtitle}
                                                        onChange={(val) => handleProductUpdate(index, "subtitle", val)}
                                                        sectionId={sectionId}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
