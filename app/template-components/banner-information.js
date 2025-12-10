import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder/builder-button";
import styles from "./banner-information.module.css";

export default function BannerInformation({
    title = "Information Banner",

    // Button Props
    buttonText = "Label",
    buttonUrl = "",
    buttonLinkType = "url",
    buttonTargetDialogId = "",
    buttonId,
    buttonVisible = true,

    onUpdate,
    sectionId,
    className = "",
    isVisible = true,
}) {
    const [isClosed, setIsClosed] = useState(false);
    const actionsRef = useRef(null);
    const bannerRef = useRef(null);

    // Measure actions width and set CSS variable for content padding
    useEffect(() => {
        if (actionsRef.current && bannerRef.current) {
            const updateWidth = () => {
                const width = actionsRef.current.offsetWidth;
                // Add 16px gap as specified in requirements
                bannerRef.current.style.setProperty('--actions-width', `${width + 16}px`);
            };

            // Initial measure
            updateWidth();

            // Watch for size changes
            const observer = new ResizeObserver(updateWidth);
            observer.observe(actionsRef.current);

            return () => observer.disconnect();
        }
    }, [buttonVisible, buttonText]);

    if (isClosed || isVisible === false) return null;

    return (
        <div
            ref={bannerRef}
            className={`${styles.banner} ${className}`}
            data-section-id={sectionId}
        >
            <div className={styles.content}>
                <BuilderText
                    tagName="p"
                    className={`body-regular ${styles.title}`}
                    content={title}
                    onChange={(val) => onUpdate?.({ title: val })}
                    sectionId={sectionId}
                />
            </div>

            <div className={styles.actions} ref={actionsRef}>
                <BuilderButton
                    label={buttonText}
                    href={buttonUrl}
                    isVisible={buttonVisible}
                    sectionId={sectionId}
                    className="btn btn-neutral btn-md"
                    onLabelChange={(val) => onUpdate?.({ buttonText: val })}
                    onHrefChange={(val) => onUpdate?.({ buttonUrl: val })}
                    onVisibilityChange={(val) => onUpdate?.({ buttonVisible: val })}
                    linkType={buttonLinkType}
                    onLinkTypeChange={(val) => onUpdate?.({ buttonLinkType: val })}
                    targetDialogId={buttonTargetDialogId}
                    onTargetDialogIdChange={(val) => onUpdate?.({ buttonTargetDialogId: val })}
                    id={buttonId}
                    onIdChange={(val) => onUpdate?.({ buttonId: val })}
                    suffix="button"
                />

                <button
                    className="btn btn-icon btn-neutral btn-sm"
                    onClick={() => setIsClosed(true)}
                    aria-label="Close banner"
                >
                    <XMarkIcon style={{ width: 20, height: 20 }} />
                </button>
            </div>
        </div>
    );
}
