import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createUpdateHandler } from "./component-helpers";
import styles from "./banner-information.module.css";
import { getContainerClasses } from "./section-utils";

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
};

// Shim for BuilderText
const BuilderText = ({ tagName = 'p', content, className, style, children, id, sectionId, suffix }) => {
  const Tag = tagName;
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  const effectiveSuffix = suffix || (className ? className.split(' ')[0] : tagName);
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + effectiveSuffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  if (content) {
    return <Tag id={finalId} className={className} style={style} dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <Tag id={finalId} className={className} style={style}>{children}</Tag>;
};

// Shim for BuilderButton
const BuilderButton = ({ label, href, openInNewTab, className, style, children, linkType, targetDialogId, id, sectionId, suffix }) => {
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  if (linkType === 'dialog' && targetDialogId) {
    return (
      <button
        id={finalId}
        className={className}
        style={style}
        onClick={(e) => {
             e.preventDefault();
             openDialog(targetDialogId);
        }}
      >
        {label || children}
      </button>
    );
  }
  return (
    <Link 
      id={finalId}
      href={href || '#'} 
      className={className} 
      style={style}
      target={openInNewTab ? '_blank' : undefined}
    >
        {label || children}
    </Link>
  );
};

export default function BannerInformation({
    title = "Information Banner",

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
                                    onChange={undefined}
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
                            onLabelChange={undefined}
                            onHrefChange={undefined}
                            onVisibilityChange={undefined}
                            linkType={buttonLinkType}
                            onLinkTypeChange={undefined}
                            targetDialogId={buttonTargetDialogId}
                            onTargetDialogIdChange={undefined}
                            id={buttonId}
                            onIdChange={undefined}
                            suffix="button"
                        />
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
