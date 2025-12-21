import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from './banner-information.module.css';

function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}

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
    fullWidth,
    removePaddingLeft,
    removePaddingRight
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
                                    // Use CSS Custom Properties for animation
                                    // Consider moving style logic to CSS module or styled-component if possible for cleaner JSX
                                    '--marquee-offset': `-${marqueeOffset}px`,
                                    '--marquee-duration': `${marqueeDuration}s`
                                }}
                            >
                                <p className={`body-regular ${styles.title} ${isMarquee ? styles.marquee : ''}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined)}>{title}</p>
                            </div>
                        </div>
                        <Link href={(
                   (buttonLinkType === 'dialog' && buttonTargetDialogId)
                     ? '#' + buttonTargetDialogId
                     : (buttonUrl || "#")
                )} className="btn btn-outline btn-sm" id={(buttonId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-button` : undefined))} onClick={(e) => { if (buttonLinkType === 'dialog' && buttonTargetDialogId) { window.location.hash = '#' + buttonTargetDialogId; } }}>{buttonText}</Link>
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
