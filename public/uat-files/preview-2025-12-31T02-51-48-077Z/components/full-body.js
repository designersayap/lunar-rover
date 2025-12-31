import Link from 'next/link';
import { createUpdateHandler } from "./component-helpers";
import styles from "./full-body.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
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

export default function FullBody({ image, imageId, imageVisible, sectionId, onUpdate }) {
    const update = createUpdateHandler(onUpdate);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const portalRoot = document.getElementById("canvas-background-root");

    // Fallback: If root not found (e.g. in other contexts), return null or render inline (but inline might break layout)
    if (!portalRoot) return null;

    // We render the wrapper into the portal root
    // The previous implementation had a wrapper div with styles.container.
    // We keep that to maintain style structure.
    return createPortal(
        <div className={styles.container}>
            <div className={`container-grid container-full ${styles.imageWrapper}`}>
                <BuilderImage
                    src={image}
                    onSrcChange={undefined}
                    alt="Background Image"
                    className={styles.image}
                    isVisible={imageVisible}
                    sectionId={sectionId}
                    id={imageId}
                    onIdChange={undefined}
                    suffix="full-body-bg"
                    showLinkControls={false}
                />
            </div>
        </div>,
        portalRoot
    );
}
