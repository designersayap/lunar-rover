"use client";
import Link from 'next/link';
import { useRef, useState, useEffect } from "react";
import styles from "./terra-testimony.module.css";
import { componentDefaults } from "./data";

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
};

// Shim for BuilderSection
const BuilderSection = ({ tagName = 'div', className, innerContainer, fullWidth, style, children, id, sectionId }) => {
  const Tag = tagName;
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || normalizedSectionId;
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  const containerClass = `container-grid ${fullWidth ? 'container-full' : ''}`;

  if (innerContainer) {
    return (
      <Tag id={finalId} className={className} style={style}>
        <div className={containerClass}>
          {children}
        </div>
      </Tag>
    );
  }

  return <Tag id={finalId} className={`${containerClass} ${className || ''}`} style={style}>{children}</Tag>;
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

const BuilderImage = ({ src, mobileSrc, alt, className, style, mobileRatio, href, linkType, openInNewTab, targetDialogId, id, sectionId, suffix, isPortrait }) => {
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  const effectiveAlt = (!alt || alt === '#') && normalizedSectionId ? normalizedSectionId : (alt || '');
  let finalClassName = className || '';

  if (isPortrait === true || String(isPortrait) === 'true') {
    const portraitMap = {
        'imagePlaceholder-4-3': 'imagePlaceholder-3-4',
        'imagePlaceholder-16-9': 'imagePlaceholder-9-16',
        'imagePlaceholder-21-9': 'imagePlaceholder-9-21',
        'imagePlaceholder-5-4': 'imagePlaceholder-4-5'
    };
    Object.entries(portraitMap).forEach(([landscape, portrait]) => {
        finalClassName = finalClassName.replace(landscape, portrait);
    });
  }

  if (mobileRatio) {
     finalClassName += ` mobile-aspect-${mobileRatio}`;
  }

  const defaultStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const isVideoFile = (url) => url && typeof url === 'string' && url.match(/\.(mp4|webm|ogg|mov)$/i);
  const isYoutube = (url) => url && typeof url === 'string' && url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/);
  const isVimeo = (url) => url && typeof url === 'string' && url.match(/^(https?:\/\/)?(www\.)?(vimeo\.com)\/.*$/);

  const getYoutubeEmbedUrl = (url) => {
      if (!url) return '';
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const id = (match && match[2].length === 11) ? match[2] : null;
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0` : url;
  };

  const getVimeoEmbedUrl = (url) => {
      if (!url) return '';
      const regExp = /vimeo\.com\/(\d+)/;
      const match = url.match(regExp);
      const id = match ? match[1] : null;
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&background=1` : url;
  };

  let mediaContent;
  if (isYoutube(src)) {
      mediaContent = (
          <iframe
              id={finalId}
              src={getYoutubeEmbedUrl(src)}
              className={finalClassName}
              style={{ ...defaultStyle, ...style, height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="YouTube video"
          />
      );
  } else if (isVimeo(src)) {
      mediaContent = (
          <iframe
              id={finalId}
              src={getVimeoEmbedUrl(src)}
              className={finalClassName}
              style={{ ...defaultStyle, ...style, height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video"
          />
      );
  } else if (isVideoFile(src)) {
      mediaContent = (
          <video
              id={finalId}
              className={finalClassName}
              style={{ ...defaultStyle, ...style, height: '100%' }}
              autoPlay
              loop
              muted
              playsInline
          >
              {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" />}
              <source src={src} />
              Your browser does not support the video tag.
          </video>
      );
  } else {
      mediaContent = (
        <>
          {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
          <img 
            id={finalId}
            src={src} 
            alt={effectiveAlt} 
            className={finalClassName} 
            style={{ ...defaultStyle, ...style }} 
          />
        </>
      );
  }

  const content = (mobileSrc && !isVideoFile(src) && !isYoutube(src) && !isVimeo(src)) ? (
     <picture style={{ display: 'contents' }}>{mediaContent}</picture>
  ) : mediaContent;

  if (href || (linkType === 'dialog' && targetDialogId)) {
    const isNewTab = linkType === 'external' || openInNewTab;
    const isDialog = linkType === 'dialog' && targetDialogId;

    if (isDialog) {
        return (
            <button
                className={finalClassName}
                style={{ ...style, display: 'block', width: '100%', height: '100%', border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }}
                onClick={(e) => {
                     e.preventDefault();
                     openDialog(targetDialogId);
                }}
            >
                {content}
            </button>
        );
    }

    return (
      <Link 
         href={href || '#'} 
         target={isNewTab ? '_blank' : undefined}
         className={finalClassName}
         style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {content}
      </Link>
    );
  }

  return content;
};

// Shim for BuilderElement
const BuilderElement = ({ tagName = 'div', className, style, children, id, sectionId, elementProps }) => {
  const Tag = tagName;
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  const suffix = elementProps || 'element';
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  return <Tag id={finalId} className={className} style={style}>{children}</Tag>;
};

export default function TestimonialTerra({
    testimonies = componentDefaults["testimonial-terra"].testimonies,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const scrollContainerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const updateTestimony = (index, key, value) => {
        if (!onUpdate) return;
        const newTestimonies = [...testimonies];
        newTestimonies[index] = { ...newTestimonies[index], [key]: value };
        onUpdate({ testimonies: newTestimonies });
    };

    const updateCardId = (index, newId) => {
        updateTestimony(index, 'cardId', newId);
    };

    const visibleCardsString = testimonies.map(t => t.visible).join(',');

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
    }, [testimonies.length, visibleCardsString]);

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

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            if (!scrollContainerRef.current) return;

            const nextPage = (currentPage + 1) % totalPages;
            scrollToPage(nextPage);
        }, 5000); // 5 seconds

        return () => clearInterval(autoScrollInterval);
    }, [currentPage, totalPages]);

    const visibleCount = testimonies.filter(t => t.visible !== false).length;

    return (
        <BuilderSection
            tagName="section"
            className={styles.container}
            innerContainer={true}
            sectionId={sectionId}
            fullWidth={fullWidth}
            removePaddingLeft={removePaddingLeft}
            removePaddingRight={removePaddingRight}

        >
            <div className="grid">
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div
                        ref={scrollContainerRef}
                        className={styles.cardsWrapper}
                        style={{ justifyContent: visibleCount === 3 ? 'center' : 'initial' }}
                    >
                        {testimonies.map((item, index) => (
                            <BuilderElement
                                key={index}
                                tagName="div"
                                className={styles.itemWrapper}
                                id={item.cardId}
                                sectionId={sectionId}
                                onIdChange={(val) => updateCardId(index, val)}
                                elementProps={`testimony-${index}`}
                                isVisible={item.visible !== false}
                            >
                                <div className={styles.card}>
                                    <BuilderImage
                                        src={item.image}
                                        onSrcChange={(val) => updateTestimony(index, "image", val)}
                                        className={`${styles.terraTestimoniImage} imagePlaceholder-4-5 object-cover`}
                                        id={item.imageId}
                                        sectionId={sectionId}
                                        isVisible={item.imageVisible}
                                        onIdChange={(val) => updateTestimony(index, "imageId", val)}
                                        onVisibilityChange={(val) => updateTestimony(index, "imageVisible", val)}
                                        suffix={`background-${index}`}
                                        href={item.imageUrl}
                                        onHrefChange={(val) => updateTestimony(index, "imageUrl", val)}
                                        linkType={item.imageLinkType}
                                        onLinkTypeChange={(val) => updateTestimony(index, "imageLinkType", val)}
                                        targetDialogId={item.imageTargetDialogId}
                                        onTargetDialogIdChange={(val) => updateTestimony(index, "imageTargetDialogId", val)}
                                    />

                                    <div className={styles.terraTestimoniDescriptionCard}>
                                        <div className={`imageWrapper ${styles.avatarImg}`}>
                                            <BuilderImage
                                                src={item.avatar}
                                                onSrcChange={(val) => updateTestimony(index, "avatar", val)}
                                                className={'imagePlaceholder-1-1 object-cover'}
                                                id={item.avatarId}
                                                style={{ borderRadius: "var(--border-radius-round)" }}
                                                sectionId={sectionId}
                                                isVisible={item.avatarVisible}
                                                onIdChange={(val) => updateTestimony(index, "avatarId", val)}
                                                onVisibilityChange={(val) => updateTestimony(index, "avatarVisible", val)}
                                                suffix={`avatar-${index}`}
                                                href={item.avatarUrl}
                                                onHrefChange={(val) => updateTestimony(index, "avatarUrl", val)}
                                                linkType={item.avatarLinkType}
                                                onLinkTypeChange={(val) => updateTestimony(index, "avatarLinkType", val)}
                                                targetDialogId={item.avatarTargetDialogId}
                                                onTargetDialogIdChange={(val) => updateTestimony(index, "avatarTargetDialogId", val)}
                                            />
                                        </div>
                                        <BuilderText
                                            tagName="div"
                                            className={`h6 truncate-1-line ${styles.name}`}
                                            content={item.name}
                                            onChange={(val) => updateTestimony(index, "name", val)}
                                            sectionId={sectionId}
                                            tooltipIfTruncated={true}
                                        />
                                        <BuilderText
                                            tagName="div"
                                            className={`caption-regular truncate-1-line ${styles.role}`}
                                            content={item.role}
                                            onChange={(val) => updateTestimony(index, "role", val)}
                                            sectionId={sectionId}
                                            tooltipIfTruncated={true}
                                        />
                                        <BuilderText
                                            tagName="div"
                                            className={`body-regular truncate-2-lines ${styles.description}`}
                                            content={item.description}
                                            onChange={(val) => updateTestimony(index, "description", val)}
                                            sectionId={sectionId}
                                            tooltipIfTruncated={true}
                                        />
                                    </div>
                                </div>
                            </BuilderElement>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className={styles.paginator}>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.dot} ${currentPage === index ? styles.activeDot : ''}`}
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
