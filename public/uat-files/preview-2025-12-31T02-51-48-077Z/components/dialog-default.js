import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { componentDefaults } from "./data";
import styles from "./dialog-section.module.css";
import DialogSection from "./dialog-section";

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
};

// Shim for BuilderLink
const BuilderLink = ({ label, href, openInNewTab, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight, justify }) => {
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  const content = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify || 'center', width: '100%', height: '100%', gap: 'inherit' }}>
         {iconLeft && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconLeft}</span>}
         <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: justify || 'center' }}>
            {label || children}
         </div>
         {iconRight && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconRight}</span>}
      </div>
  );

  if (linkType === 'dialog' && targetDialogId) {
    return (
      <a
        id={finalId}
        href="#"
        className={className}
        style={style}
        onClick={(e) => {
            e.preventDefault();
            openDialog(targetDialogId);
        }}
      >
        {content}
      </a>
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
      {content}
    </Link>
  );
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

export default function DialogDefault({
    title = "Title",
    description = "Description",
    isOpen,
    onUpdate,
    sectionId,
    className = "",
    image,
    imageId,
    imageVisible,
    items = componentDefaults.dialog.items
}) {
    const updateItem = (index, field, value) => {
        if (!onUpdate) return;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ items: newItems });
    };

    const updateItemId = (index, newId) => {
        updateItem(index, 'itemId', newId);
    };

    return (
        <DialogSection
            title={title}
            description={description}
            isOpen={isOpen}

            sectionId={sectionId}
            className={className}
            image={image}
            imageId={imageId}
            imageVisible={imageVisible}
        >
            <div className={styles.listContainer}>
                {items.map((item, i) => (
                    <BuilderLink
                        key={i}
                        label={item.label}
                        href={item.url}
                        className={`${styles.listItem} body-regular ${i === items.length - 1 ? styles.lastItem : ''}`}
                        sectionId={sectionId}
                        suffix={`item-${i}`}
                        id={item.itemId}
                        isVisible={item.visible !== false}
                        onVisibilityChange={(val) => updateItem(i, 'visible', val)}
                        onIdChange={(val) => updateItemId(i, val)}
                        justify="flex-start"
                        fullWidth={true}
                        onLabelChange={(val) => updateItem(i, 'label', val)}
                        onHrefChange={(val) => updateItem(i, 'url', val)}
                        tooltipIfTruncated={true}
                        showLinkType={false}
                        iconLeft={
                            <div className={styles.itemIcon}>
                                <BuilderImage className="imagePlaceholder-1-1" src={item.image} onSrcChange={(val) => updateItem(i, 'image', val)} />
                            </div>
                        }
                        iconRight={<ArrowRightIcon className={styles.itemArrow} />}
                    />
                ))}
            </div>
        </DialogSection>
    );
}

