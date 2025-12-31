import Link from 'next/link';
import styles from "./media.module.css";
import { componentDefaults } from "./data";
import { createUpdateHandler } from "./component-helpers";

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

  const imageContent = (
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

  const imgElement = mobileSrc ? (
     <picture style={{ display: 'contents' }}>{imageContent}</picture>
  ) : (
    <img 
      id={finalId}
      src={src} 
      alt={effectiveAlt} 
      className={finalClassName} 
      style={{ ...defaultStyle, ...style }} 
    />
  );

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
                {mobileSrc ? <picture style={{ display: 'contents' }}>{imageContent}</picture> : 
                <img 
                    id={finalId}
                    src={src} 
                    alt={effectiveAlt} 
                    style={{ ...defaultStyle, ...style, width: '100%', height: '100%' }} 
                />}
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
        {mobileSrc ? <picture style={{ display: 'contents' }}>{imageContent}</picture> :
        <img 
            id={finalId}
            src={src} 
            alt={effectiveAlt} 
            style={{ ...defaultStyle, ...style }} 
        />}
      </Link>
    );
  }

  return imgElement;
};

export default function Media21x9({
    image = componentDefaults["media-21-9"].image,
    imageId,
    imageVisible,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    imageHref,
    imageLinkType,
    imageTargetDialogId,
    imageIsPortrait,
    imageMobileRatio,
    imageMobileSrc
}) {
    const update = createUpdateHandler(onUpdate);

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
                    <div className="imageWrapper">
                        <BuilderImage
                            src={image}
                            onSrcChange={undefined}
                            className={`${styles.image} imagePlaceholder-21-9 object-cover`}
                            id={imageId}
                            sectionId={sectionId}
                            isVisible={imageVisible}
                            onIdChange={undefined}
                            suffix="image"
                            href={imageHref}
                            onHrefChange={undefined}
                            linkType={imageLinkType}
                            onLinkTypeChange={undefined}
                            targetDialogId={imageTargetDialogId}
                            onTargetDialogIdChange={undefined}
                            isPortrait={imageIsPortrait}
                            onIsPortraitChange={undefined}
                            mobileRatio={imageMobileRatio}
                            onMobileRatioChange={undefined}
                            mobileSrc={imageMobileSrc}
                            onMobileSrcChange={undefined}
                        />
                    </div>
                </div>
            </div>
        </BuilderSection >
    );
}
