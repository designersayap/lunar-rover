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
    const [isMarquee, setIsMarquee] = useState(false);
    const [marqueeOffset, setMarqueeOffset] = useState(0);
    const [marqueeDuration, setMarqueeDuration] = useState(10); // Default duration
    const textWrapperRef = useRef(null);
    const textRef = useRef(null);

    // Check for overflow to toggle marquee
    useEffect(() => {
        const checkOverflow = () => {
            if (textWrapperRef.current && textRef.current) {
                const wrapper = textWrapperRef.current;
                const scrollWidth = wrapper.scrollWidth;
                const clientWidth = wrapper.clientWidth;

                // If content is wider, calculate how much it needs to scroll
                // We want to scroll until the END of content aligns with END of wrapper.
                // Distance = scrollWidth - clientWidth
                if (scrollWidth > clientWidth) {
                    setIsMarquee(true);
                    setMarqueeOffset(scrollWidth - clientWidth);
                    // Calculate duration based on speed (e.g. 50px/s)
                    // Min duration 8s to avoid too fast startup/short scroll
                    const duration = Math.max(8, (scrollWidth - clientWidth) / 50);
                    setMarqueeDuration(duration);
                } else {
                    setIsMarquee(false);
                    setMarqueeOffset(0);
                }
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [title, buttonVisible]); // Re-check when content changes

    if (isClosed || isVisible === false) return null;

    return (
        <div

            className={`${styles.banner} z-xl ${className}`}
            data-section-id={sectionId}
        >
            <div className={styles.content}>
                <div
                    className={`${styles.marqueeWrapper} ${isMarquee ? styles.marqueeMask : ''}`}
                    ref={textWrapperRef}
                >
                    <div
                        ref={textRef}
                        style={{
                            display: isMarquee ? 'inline-block' : 'block',
                            width: isMarquee ? 'auto' : '100%',
                            '--marquee-offset': `-${marqueeOffset}px`,
                            '--marquee-duration': `${marqueeDuration}s`
                        }}
                    >
                        <BuilderText
                            tagName="p"
                            className={`body-regular ${styles.title} ${isMarquee ? styles.marquee : ''}`}
                            content={title}
                            onChange={(val) => onUpdate?.({ title: val })}
                            sectionId={sectionId}
                            multiline={false}
                        />
                    </div>
                </div>
                <BuilderButton
                    label={buttonText}
                    href={buttonUrl}
                    isVisible={buttonVisible}
                    sectionId={sectionId}
                    className="btn btn-outline btn-sm"
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
            </div>

            <div className={styles.actions}>

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
