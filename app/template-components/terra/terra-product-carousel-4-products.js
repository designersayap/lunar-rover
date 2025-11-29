"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import styles from "./terra-product-carousel-4-products.module.css";
import BuilderText from "../../page-builder-components/utils/BuilderText";

/**
 * Terra Product Carousel - 4 Products
 * Displays product carousel with tabs and horizontal scroll
 */
export default function TerraProductCarousel4Products({
    title = "Featured Products",
    products = {
        fabric: [
            { name: "Softener Fresh", description: "Long-lasting freshness", image: "/placeholder-product.jpg", price: "$12.99" },
            { name: "Detergent Pods", description: "Deep cleaning power", image: "/placeholder-product.jpg", price: "$15.99" },
            { name: "Stain Remover", description: "Tough on stains", image: "/placeholder-product.jpg", price: "$8.99" },
            { name: "Fabric Mist", description: "Instant refresh", image: "/placeholder-product.jpg", price: "$6.99" },
            { name: "Wool Care", description: "Gentle protection", image: "/placeholder-product.jpg", price: "$10.99" },
            { name: "Color Guard", description: "Protects vibrancy", image: "/placeholder-product.jpg", price: "$11.99" },
        ],
        food: [
            { name: "Organic Coffee", description: "Rich arabica blend", image: "/placeholder-product.jpg", price: "$18.99" },
            { name: "Green Tea", description: "Antioxidant rich", image: "/placeholder-product.jpg", price: "$14.99" },
            { name: "Oat Milk", description: "Creamy & dairy-free", image: "/placeholder-product.jpg", price: "$4.99" },
            { name: "Protein Bar", description: "Fuel for your day", image: "/placeholder-product.jpg", price: "$2.99" },
            { name: "Fruit Snacks", description: "Natural sweetness", image: "/placeholder-product.jpg", price: "$3.99" },
            { name: "Sparkling Water", description: "Crisp refreshment", image: "/placeholder-product.jpg", price: "$1.99" },
        ],
        home: [
            { name: "Surface Cleaner", description: "Kills 99.9% germs", image: "/placeholder-product.jpg", price: "$5.99" },
            { name: "Dish Soap", description: "Grease cutting", image: "/placeholder-product.jpg", price: "$3.99" },
            { name: "Air Purifier", description: "Clean home air", image: "/placeholder-product.jpg", price: "$199.99" },
            { name: "Glass Spray", description: "Streak-free shine", image: "/placeholder-product.jpg", price: "$4.99" },
            { name: "Floor Polish", description: "Restores shine", image: "/placeholder-product.jpg", price: "$9.99" },
            { name: "Laundry Basket", description: "Durable storage", image: "/placeholder-product.jpg", price: "$24.99" },
        ],
        personal: [
            { name: "Daily Moisturizer", description: "Hydrating formula", image: "/placeholder-product.jpg", price: "$22.99" },
            { name: "Gentle Cleanser", description: "For sensitive skin", image: "/placeholder-product.jpg", price: "$16.99" },
            { name: "Sunscreen SPF50", description: "Broad spectrum", image: "/placeholder-product.jpg", price: "$28.99" },
            { name: "Night Cream", description: "Repair while sleeping", image: "/placeholder-product.jpg", price: "$32.99" },
            { name: "Body Wash", description: "Refreshing scent", image: "/placeholder-product.jpg", price: "$8.99" },
            { name: "Hand Cream", description: "Softens dry hands", image: "/placeholder-product.jpg", price: "$5.99" },
        ],
    },
    onUpdate
}) {
    const scrollContainerRef = useRef(null);
    const [activeTab, setActiveTab] = useState("fabric");

    const tabs = [
        { id: "fabric", label: "Fabric Care" },
        { id: "food", label: "Food & Beverage" },
        { id: "home", label: "Home Care" },
        { id: "personal", label: "Personal Care" },
    ];

    const handleProductUpdate = (index, field, value) => {
        if (!onUpdate) return;
        const newProducts = { ...products };
        newProducts[activeTab] = [...newProducts[activeTab]];
        newProducts[activeTab][index] = { ...newProducts[activeTab][index], [field]: value };
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
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h2"
                                className={`h2 ${styles.title}`}
                            />
                            <div className="tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`tabs-button ${activeTab === tab.id ? 'tabs-button-active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
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
                                {products[activeTab].map((product, index) => (
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
                                                <BuilderText
                                                    initialText={product.name}
                                                    onUpdate={(updates) => handleProductUpdate(index, 'name', updates.name)}
                                                    propName="name"
                                                    as="h3"
                                                    className={`${styles.productName} truncate-1-line`}
                                                />
                                                <BuilderText
                                                    initialText={product.description}
                                                    onUpdate={(updates) => handleProductUpdate(index, 'description', updates.description)}
                                                    propName="description"
                                                    as="p"
                                                    className={`${styles.productDescription} truncate-2-lines`}
                                                />
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
