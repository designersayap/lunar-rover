"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./media-grid-col-2.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";

export default function MediaGridCol2({
    images: rawImages = componentDefaults["media-grid-col-2"].images,
    onUpdate,
    sectionId,
    fullWidth,
    hasFloatingEffect = componentDefaults["media-grid-col-2"].hasFloatingEffect
}) {
    // Sanitize data
    const images = (rawImages || []).filter(item => item !== null && typeof item === 'object');

    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleUpdateImage = (index, key, value) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [key]: value };
        onUpdate({ images: newImages });
    };

    // Filter only visible images for the layout
    const visibleImages = images.map((img, i) => ({ ...img, originalIndex: i }))
        .filter(img => img && img.visible !== false);

    return (
        <BuilderSection
            tagName="section"
            className={styles.container}
            innerContainer={true}
            sectionId={sectionId}
            fullWidth={fullWidth}
            onUpdate={onUpdate}
            showFullWidthControl={false}
            showFloatingToggle={true}
            hasFloatingEffect={hasFloatingEffect}
        >
            <div
                ref={containerRef}
                className={`${styles.mediaGrid} ${isVisible ? styles.animated : ""}`}
            >
                {visibleImages.map((item, index) => (
                    <div
                        key={item.cardId || index}
                        className={`${styles.itemWrapper} ${isVisible ? (hasFloatingEffect ? (index % 2 === 0 ? "animate-bounce-and-float" : "animate-bounce-and-float-alt") : "animate-bounce-in-down") : ""}`}
                        style={{ animationDelay: isVisible ? `${index * 0.15}s` : "0s" }}
                    >
                        <div className={styles.imageWrapper}>
                            <BuilderImage
                                src={item.image}
                                onSrcChange={(val) => handleUpdateImage(item.originalIndex, 'image', val)}
                                className={styles.image}
                                id={item.cardId}
                                sectionId={sectionId}
                                isVisible={item.visible}
                                onIdChange={(val) => handleUpdateImage(item.originalIndex, 'cardId', val)}
                                suffix={`image-${item.originalIndex}`}
                                href={item.imageUrl}
                                onHrefChange={(val) => handleUpdateImage(item.originalIndex, 'imageUrl', val)}
                                linkType={item.imageLinkType}
                                onLinkTypeChange={(val) => handleUpdateImage(item.originalIndex, 'imageLinkType', val)}
                                targetDialogId={item.imageTargetDialogId}
                                onTargetDialogIdChange={(val) => handleUpdateImage(item.originalIndex, 'imageTargetDialogId', val)}
                                isPortrait={item.imageIsPortrait}
                                onIsPortraitChange={(val) => handleUpdateImage(item.originalIndex, 'imageIsPortrait', val)}
                                showPortraitToggle={false}
                                mobileRatio={item.imageMobileRatio}
                                onMobileRatioChange={(val) => handleUpdateImage(item.originalIndex, 'imageMobileRatio', val)}
                                showMobileRatio={false}
                                enableAudio={item.imageEnableAudio}
                                onEnableAudioChange={(val) => handleUpdateImage(item.originalIndex, 'imageEnableAudio', val)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </BuilderSection>
    );
}
