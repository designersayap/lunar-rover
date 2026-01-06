import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as HeroIcons from "@heroicons/react/24/solid";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import { createUpdateHandler } from "../utils/component-helpers";
import styles from "./osm-banner.module.css";
import { componentDefaults } from "../content/data";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function OsmBanner({
    title = "Information Banner",

    buttonText = componentDefaults["osm-banner"].buttonText,
    buttonUrl = componentDefaults["osm-banner"].buttonUrl,
    buttonLinkType = componentDefaults["osm-banner"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["osm-banner"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["osm-banner"].buttonIconLeft,
    buttonIconRight = componentDefaults["osm-banner"].buttonIconRight,
    buttonId,
    buttonVisible = componentDefaults["osm-banner"].buttonVisible,

    onUpdate,
    sectionId,
    className = "",
    isVisible = true,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const update = createUpdateHandler(onUpdate);
    const [isClosed, setIsClosed] = useState(false);
    const [isMarquee, setIsMarquee] = useState(false);
    const [marqueeOffset, setMarqueeOffset] = useState(0);
    const [marqueeDuration, setMarqueeDuration] = useState(10); // Default duration
    const textWrapperRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (textWrapperRef.current && textRef.current) {
                const wrapper = textWrapperRef.current;
                const scrollWidth = wrapper.scrollWidth;
                const clientWidth = wrapper.clientWidth;
                if (scrollWidth > clientWidth) {
                    setIsMarquee(true);
                    setMarqueeOffset(scrollWidth - clientWidth);
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
            className={`${styles.banner} z-content-1 ${className}`}
            id={sectionId}
        >
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })} style={{ width: '100%' }}>
                <div className="grid align-center">
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-12 ${styles.content}`}>
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
                                    onChange={update('title')}
                                    sectionId={sectionId}
                                    multiline={false}
                                    suffix="title"
                                />
                            </div>
                        </div>
                        {buttonVisible && (
                            <BuilderButton
                                label={buttonText}
                                href={buttonUrl}
                                isVisible={buttonVisible}
                                sectionId={sectionId}
                                className="btn btn-outline btn-sm"
                                onLabelChange={update('buttonText')}
                                onHrefChange={update('buttonUrl')}
                                onVisibilityChange={update('buttonVisible')}
                                linkType={buttonLinkType}
                                onLinkTypeChange={update('buttonLinkType')}
                                targetDialogId={buttonTargetDialogId}
                                onTargetDialogIdChange={update('buttonTargetDialogId')}
                                iconLeft={buttonIconLeft}
                                iconRight={buttonIconRight}
                                onIconLeftChange={update('buttonIconLeft')}
                                onIconRightChange={update('buttonIconRight')}
                                id={buttonId}
                                onIdChange={update('buttonId')}
                                suffix="button"
                            />
                        )}
                        <div className={`${styles.actions} z-content-1`}>
                            <button
                                className="btn btn-icon btn-neutral btn-sm"
                                onClick={() => setIsClosed(true)}
                                aria-label="Close banner"
                            >
                                <XMarkIcon style={{ width: 20, height: 20 }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
