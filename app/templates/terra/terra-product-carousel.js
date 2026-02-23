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
    categories = componentDefaults["terra-product-carousel"].categories,
    products = componentDefaults["terra-product-carousel"].products,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const scrollContainerRef = useRef(null);
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || null);

    // Calculate which products to show based on active category
    const filteredProducts = products.filter(p => p.categoryId === activeCategoryId || !activeCategoryId);

    // Fix: Use a ref to hold the latest state so the callback can be stable
    const latestStateRef = useRef({ categories, products, onUpdate });
    latestStateRef.current = { categories, products, onUpdate };

    const updateProduct = useCallback((index, key, value) => {
        const { products: currentProducts, onUpdate: currentOnUpdate } = latestStateRef.current;
        if (!currentOnUpdate) return;

        const newProducts = [...currentProducts];
        newProducts[index] = { ...newProducts[index], [key]: value };
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
                        <div className={`tabs ${styles.scrollableTabs}`}>
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

                    {/* Carousel */}
                    <div className={styles.carouselContainer}>
                        {/* Navigation Buttons (Desktop mostly) */}
                        <button className={`btn btn-outline btn-icon btn-md ${styles.navButtonWrapper} ${styles.navLeft}`} onClick={scrollLeft}>
                            <ArrowUpRightIcon className="icon" style={{ transform: 'rotate(-135deg)' }} />
                        </button>

                        <div ref={scrollContainerRef} className={styles.cardsWrapper}>
                            {products.map((item, index) => {
                                // Find if this item should be visible in current category
                                const isVisibleInCategory = activeCategoryId ? item.categoryId === activeCategoryId : true;

                                return (
                                    <BuilderElement
                                        key={index}
                                        tagName="div"
                                        className={styles.itemWrapper}
                                        id={item.cardId}
                                        sectionId={sectionId}
                                        onIdChange={(val) => updateProduct(index, 'cardId', val)}
                                        elementProps={`product-${index}`}
                                        isVisible={item.visible !== false && isVisibleInCategory}
                                    >
                                        <div className={styles.card}>
                                            <div className={styles.imageContainer}>
                                                <BuilderImage
                                                    src={item.image}
                                                    onSrcChange={(val) => updateProduct(index, "image", val)}
                                                    className={`${styles.productImage} imagePlaceholder-1-1 object-cover`}
                                                    id={item.imageId}
                                                    sectionId={sectionId}
                                                    isVisible={item.imageVisible !== false}
                                                    onIdChange={(val) => updateProduct(index, "imageId", val)}
                                                    onVisibilityChange={(val) => updateProduct(index, "imageVisible", val)}
                                                    suffix={`image-${index}`}
                                                    href={item.imageUrl || item.buttonUrl}
                                                    onHrefChange={(val) => updateProduct(index, "imageUrl", val)}
                                                    linkType={item.imageLinkType}
                                                    onLinkTypeChange={(val) => updateProduct(index, "imageLinkType", val)}
                                                    targetDialogId={item.imageTargetDialogId}
                                                    onTargetDialogIdChange={(val) => updateProduct(index, "imageTargetDialogId", val)}
                                                />

                                                {/* The Action Button (Arrow) */}
                                                {item.buttonVisible !== false && (
                                                    <div className={styles.actionButtonWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                                                        <BuilderLink
                                                            className={`btn btn-neutral btn-icon btn-sm ${styles.actionButton}`}
                                                            href={item.buttonUrl}
                                                            onHrefChange={(val) => updateProduct(index, "buttonUrl", val)}
                                                            linkType={item.buttonLinkType}
                                                            onLinkTypeChange={(val) => updateProduct(index, "buttonLinkType", val)}
                                                            targetDialogId={item.buttonTargetDialogId}
                                                            onTargetDialogIdChange={(val) => updateProduct(index, "buttonTargetDialogId", val)}
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
                                                    className={`subheader-h2 truncate-1-line ${styles.productName}`}
                                                    content={item.name}
                                                    onChange={(val) => updateProduct(index, "name", val)}
                                                    sectionId={sectionId}
                                                    tooltipIfTruncated={true}
                                                />

                                                <BuilderText
                                                    tagName="div"
                                                    className={`caption-regular truncate-2-lines ${styles.productDescription}`}
                                                    content={item.description}
                                                    onChange={(val) => updateProduct(index, "description", val)}
                                                    sectionId={sectionId}
                                                    tooltipIfTruncated={true}
                                                />
                                            </div>
                                        </div>
                                    </BuilderElement>
                                )
                            })}
                        </div>

                        <button className={`btn btn-outline btn-icon btn-md ${styles.navButtonWrapper} ${styles.navRight}`} onClick={scrollRight}>
                            <ArrowUpRightIcon className="icon" style={{ transform: 'rotate(45deg)' }} />
                        </button>
                    </div>

                    {/* Simple Scroll Indicator underneath */}
                    <div className={styles.scrollIndicatorPills}>
                        <div className={styles.indicatorPillActive} />
                        <div className={styles.indicatorPill} />
                        <div className={styles.indicatorPill} />
                    </div>

                </div>
            </div>
        </BuilderSection >
    );
}
