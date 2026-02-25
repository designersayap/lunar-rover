"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./terra-product-carousel.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import BuilderElement from "@/app/page-builder/utils/builder/builder-element";
import BuilderLink from "@/app/page-builder/utils/builder/builder-link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { componentDefaults } from "../content/data";

export default function TerraProductCarousel({
    categories = componentDefaults["product-carousel-terra"].categories,
    products = componentDefaults["product-carousel-terra"].products,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const scrollContainerRef = useRef(null);
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const threshold = fullWidth ? 5 : 4;

    // Calculate which products to show based on active category
    let filteredProducts = products.filter(p => (p.categoryId === activeCategoryId || !activeCategoryId));

    if (!filteredProducts.some(p => p.visible !== false) && products.length > 0) {
        // If no visible products in this category, show the first visible product from any category
        const fallbackProduct = products.find(p => p.visible !== false) || products[0];
        filteredProducts = [fallbackProduct];
    }

    // Fix: Use a ref to hold the latest state so the callback can be stable
    const latestStateRef = useRef({ categories, products, onUpdate });
    latestStateRef.current = { categories, products, onUpdate };

    const visibleCardsString = products.map(p => p.visible).join(',');
    const visibleFilteredCardsString = filteredProducts.map(p => p.visible).join(',');

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
    }, [products.length, visibleCardsString, activeCategoryId, visibleFilteredCardsString]);

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

    const updateProduct = useCallback((index, key, value) => {
        const { products: currentProducts, onUpdate: currentOnUpdate } = latestStateRef.current;
        if (!currentOnUpdate) return;

        const newProducts = [...currentProducts];
        let updatedProduct = { ...newProducts[index], [key]: value };

        // Auto-sync image and button link properties
        if (key === 'imageUrl') updatedProduct.buttonUrl = value;
        if (key === 'buttonUrl') updatedProduct.imageUrl = value;
        if (key === 'imageLinkType') updatedProduct.buttonLinkType = value;
        if (key === 'buttonLinkType') updatedProduct.imageLinkType = value;
        if (key === 'imageTargetDialogId') updatedProduct.buttonTargetDialogId = value;
        if (key === 'buttonTargetDialogId') updatedProduct.imageTargetDialogId = value;

        newProducts[index] = updatedProduct;
        currentOnUpdate({ products: newProducts });
    }, []);

    const updateCategory = useCallback((index, key, value) => {
        const { categories: currentCategories, onUpdate: currentOnUpdate } = latestStateRef.current;
        if (!currentOnUpdate) return;

        const newCategories = [...currentCategories];
        newCategories[index] = { ...newCategories[index], [key]: value };
        currentOnUpdate({ categories: newCategories });
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollBy({ left: -container.clientWidth / 2, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
        }
    };

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

                    {/* Category Tabs */}
                    <div className={styles.tabsContainer}>
                        <div className={styles.scrollableTabs}>
                            <div className="tabs">
                                {categories.map((cat, index) => (
                                    <BuilderElement
                                        key={index}
                                        tagName="div"
                                        className={`tabs-button ${activeCategoryId === cat.id ? 'tabs-button-active' : ''}`}
                                        id={cat.id}
                                        sectionId={sectionId}
                                        onIdChange={(val) => updateCategory(index, 'id', val)}
                                        elementProps={`category-${index}`}
                                        isVisible={cat.visible !== false}
                                    >
                                        <span onClick={() => setActiveCategoryId(cat.id)}>
                                            <BuilderText
                                                tagName="span"
                                                content={cat.label}
                                                onChange={(val) => updateCategory(index, "label", val)}
                                                sectionId={sectionId}
                                            />
                                        </span>
                                    </BuilderElement>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className={`${styles.carouselContainer} ${fullWidth ? styles.fullWidthContainer : ''}`}>
                        {/* Navigation Buttons (Desktop mostly) */}
                        {filteredProducts.filter(p => p.visible !== false).length >= threshold && (
                            <button className={`btn btn-outline btn-icon btn-md ${styles.navButtonWrapper} ${styles.navLeft}`} onClick={scrollLeft}>
                                <ArrowUpRightIcon className="icon" style={{ transform: 'rotate(-135deg)' }} />
                            </button>
                        )}

                        <div
                            ref={scrollContainerRef}
                            className={styles.cardsWrapper}
                            style={{ justifyContent: filteredProducts.filter(p => p.visible !== false).length < threshold ? 'center' : 'start' }}
                        >
                            {categories.map((cat, catIndex) => {
                                const productsInCategory = products.filter(p => p.categoryId === cat.id || (!cat.id && !p.categoryId));
                                return (
                                    <BuilderElement
                                        key={catIndex}
                                        tagName="div"
                                        className={styles.categoryGroup}
                                        id={cat.id}
                                        sectionId={sectionId}
                                        elementProps={`category-group-${catIndex}`}
                                        isVisible={activeCategoryId === cat.id || !activeCategoryId}
                                    >
                                        {productsInCategory.map((item) => {
                                            const originalIndex = products.findIndex(p => p === item);
                                            return (
                                                <BuilderElement
                                                    key={originalIndex}
                                                    tagName="div"
                                                    className={styles.itemWrapper}
                                                    id={item.cardId}
                                                    sectionId={sectionId}
                                                    onIdChange={(val) => updateProduct(originalIndex, 'cardId', val)}
                                                    elementProps={`product-${originalIndex}`}
                                                    isVisible={item.visible !== false}
                                                >
                                                    <div className={styles.card}>
                                                        <div className={styles.imageContainer}>
                                                            <BuilderImage
                                                                src={item.image}
                                                                onSrcChange={(val) => updateProduct(originalIndex, "image", val)}
                                                                className={`${styles.productImage} imagePlaceholder-1-1 object-cover`}
                                                                id={item.imageId}
                                                                sectionId={sectionId}
                                                                isVisible={item.imageVisible !== false}
                                                                onIdChange={(val) => updateProduct(originalIndex, "imageId", val)}
                                                                onVisibilityChange={(val) => updateProduct(originalIndex, "imageVisible", val)}
                                                                suffix={`image-${originalIndex}`}
                                                                href={item.imageUrl || item.buttonUrl}
                                                                onHrefChange={(val) => updateProduct(originalIndex, "imageUrl", val)}
                                                                linkType={item.imageLinkType}
                                                                onLinkTypeChange={(val) => updateProduct(originalIndex, "imageLinkType", val)}
                                                                targetDialogId={item.imageTargetDialogId}
                                                                onTargetDialogIdChange={(val) => updateProduct(originalIndex, "imageTargetDialogId", val)}
                                                            />

                                                            {/* The Action Button (Arrow) */}
                                                            {item.buttonVisible !== false && (
                                                                <div className={styles.actionButtonWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                                                                    <BuilderLink
                                                                        className={`btn btn-neutral btn-icon btn-sm ${styles.actionButton}`}
                                                                        href={item.buttonUrl}
                                                                        onHrefChange={(val) => updateProduct(originalIndex, "buttonUrl", val)}
                                                                        linkType={item.buttonLinkType}
                                                                        onLinkTypeChange={(val) => updateProduct(originalIndex, "buttonLinkType", val)}
                                                                        targetDialogId={item.buttonTargetDialogId}
                                                                        onTargetDialogIdChange={(val) => updateProduct(originalIndex, "buttonTargetDialogId", val)}
                                                                        hideLabel={true}
                                                                        iconLeft={<ArrowUpRightIcon className="icon" />}
                                                                        style={{ padding: 0, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className={styles.textContent}>
                                                            <BuilderText
                                                                tagName="div"
                                                                className={`body-bold truncate-1-line ${styles.productName}`}
                                                                content={item.name}
                                                                onChange={(val) => updateProduct(originalIndex, "name", val)}
                                                                sectionId={sectionId}
                                                                tooltipIfTruncated={true}
                                                            />

                                                            <BuilderText
                                                                tagName="div"
                                                                className={`caption-regular truncate-2-lines ${styles.productDescription}`}
                                                                content={item.description}
                                                                onChange={(val) => updateProduct(originalIndex, "description", val)}
                                                                sectionId={sectionId}
                                                                tooltipIfTruncated={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </BuilderElement>
                                            )
                                        })}
                                    </BuilderElement>
                                )
                            })}
                        </div>

                        {filteredProducts.filter(p => p.visible !== false).length >= threshold && (
                            <button className={`btn btn-outline btn-icon btn-md ${styles.navButtonWrapper} ${styles.navRight}`} onClick={scrollRight}>
                                <ArrowUpRightIcon className="icon" style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        )}
                    </div>

                    {/* Simple Scroll Indicator underneath */}
                    {totalPages > 1 && filteredProducts.filter(p => p.visible !== false).length >= threshold && (
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
