"use client";
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from "./dialog-section.module.css";
import { createUpdateHandler } from "./component-helpers";

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

export default function DialogSection({
    title,
    description,
    children,
    isOpen: controlledIsOpen,
    onUpdate,
    sectionId,

    className = "",
    image,
    imageId,
    imageVisible,
}) {
    const update = createUpdateHandler(onUpdate);
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);

    // Support both controlled (via props) and uncontrolled modes
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    // We render into document.body to ensure we escape any stacking contexts (like transforms in builder)
    useEffect(() => {
        setPortalContainer(document.body);
    }, []);

    const toggleOpen = useCallback((value) => {
        const newValue = value === undefined ? !isOpen : value;
        if (isControlled) {
            undefined(newValue);
        } else {
            setInternalIsOpen(newValue);
        }
    }, [isControlled, update, isOpen]);

    // 1. Lock Body Scroll when Open
    useEffect(() => {
        if (!isOpen) return;

        if (portalContainer) {
            // If in builder/canvas, lock canvas scroll
            const canvas = portalContainer.parentElement;
            if (canvas) {
                // eslint-disable-next-line react-hooks/immutability
                canvas.style.overflow = 'hidden';
                // eslint-disable-next-line react-hooks/immutability
                return () => { canvas.style.overflow = ''; };
            }
        } else {
            // If standalone, lock body scroll
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen, portalContainer]);

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => e.key === 'Escape' && toggleOpen(false);
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, toggleOpen]);

    useEffect(() => {
        const handleOpenDialog = (e) => {
            if (e.detail?.id === sectionId) {
                toggleOpen(true);
            }
        };
        window.addEventListener('lunar:open-dialog', handleOpenDialog);
        return () => window.removeEventListener('lunar:open-dialog', handleOpenDialog);
    }, [sectionId, toggleOpen]);

    const dialogContent = (
        <div
            className={`overlay z-system-modal-fullscreen ${className}`}
            style={{ display: isOpen ? 'flex' : 'none', pointerEvents: 'auto' }}
            onClick={(e) => e.target === e.currentTarget && toggleOpen(false)}
            data-section-id={sectionId}
            data-dialog-overlay
        >
            <div className="container-grid" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid" style={{ width: '100%' }}>
                    <div className="col-mobile-4 col-tablet-6 col-desktop-6 offset-desktop-3 offset-tablet-1">
                        <div
                            className={styles.dialog}
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={`${styles.closeButton} z-content-2`} onClick={() => toggleOpen(false)} aria-label="Close dialog" data-dialog-close>
                                <XMarkIcon style={{ width: 20, height: 20 }} />
                            </button>

                            <BuilderImage
                                className={`${styles.imageContainer} imagePlaceholder-16-9`}
                                src={image}
                                id={imageId}
                                sectionId={sectionId}
                                isVisible={imageVisible}
                                onIdChange={undefined}
                                suffix="image"
                            />

                            {(title || description) && (
                                <div className={styles.textContainer}>
                                    {title && (
                                        <BuilderText
                                            tagName="h4"
                                            className={`h4 ${styles.title}`}
                                            content={title}
                                            onChange={undefined}
                                            sectionId={sectionId}
                                        />
                                    )}
                                    {description && (
                                        <BuilderText
                                            tagName="p"
                                            className={`body-regular ${styles.description}`}
                                            content={description}
                                            onChange={undefined}
                                            sectionId={sectionId}
                                        />
                                    )}
                                </div>
                            )}

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Use Portal if container exists, otherwise fallback to inline (SSR/mounting)
    return portalContainer ? createPortal(dialogContent, portalContainer) : dialogContent;
}
