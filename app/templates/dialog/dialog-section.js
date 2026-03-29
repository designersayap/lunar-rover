"use client";

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import styles from "./dialog-section.module.css";
import { createUpdateHandler } from "../utils/component-helpers";

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
    imageUrl,
    imageLinkType,
    imageTargetDialogId,
    titleVisible,
    descriptionVisible,
    onTitleVisibleChange,
    onDescriptionVisibleChange,
    onImageVisibleChange,
    imageEnableAudio,
    onImageEnableAudioChange,
    imageAutoplay = true,
    onImageAutoplayChange
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
            update('isOpen')(newValue);
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
                                onSrcChange={update('image')}
                                id={imageId}
                                sectionId={sectionId}
                                isVisible={imageVisible !== false}
                                onVisibilityChange={onImageVisibleChange}
                                onIdChange={update('imageId')}
                                suffix="image"
                                href={imageUrl}
                                onHrefChange={update('imageUrl')}
                                linkType={imageLinkType}
                                onLinkTypeChange={update('imageLinkType')}
                                targetDialogId={imageTargetDialogId}
                                onTargetDialogIdChange={update('imageTargetDialogId')}
                                showLinkControls={false}
                                alwaysShowSrc={true}
                                enableAudio={imageEnableAudio}
                                onEnableAudioChange={onImageEnableAudioChange || update('imageEnableAudio')}
                                autoplay={imageAutoplay}
                                onAutoplayChange={onImageAutoplayChange || update('imageAutoplay')}
                            />

                            {(title || description) && (
                                <div className={styles.textContainer}>
                                    {title && (
                                        <BuilderText
                                            tagName="div"
                                            className={`h4 ${styles.title}`}
                                            content={title}
                                            isVisible={titleVisible !== false}
                                            onChange={update('title')}
                                            onVisibilityChange={onTitleVisibleChange}
                                            placeholder="Dialog Title"
                                            sectionId={sectionId}
                                            suffix="title"
                                        />
                                    )}
                                    {description && (
                                        <BuilderText
                                            tagName="div"
                                            className={`body-regular ${styles.description}`}
                                            content={description}
                                            isVisible={descriptionVisible !== false}
                                            onChange={update('description')}
                                            onVisibilityChange={onDescriptionVisibleChange}
                                            placeholder="Enter dialog description here..."
                                            sectionId={sectionId}
                                            suffix="description"
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
