import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import styles from "./dialog-section.module.css";

export default function DialogSection({
    title,
    description,
    children,
    isOpen: controlledIsOpen,
    onUpdate,
    sectionId,

    className = "",
    // New Props for Image
    image,
    imageId,
    imageVisible,
}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    // Find the portal container on mount
    useEffect(() => {
        const container = document.getElementById('dialog-portal-root');
        setPortalContainer(container);
    }, []);

    const toggleOpen = (value) => {
        if (isControlled) {
            onUpdate && onUpdate({ isOpen: value });
        } else {
            setInternalIsOpen(value);
        }
    };

    // Lock scroll logic
    useEffect(() => {
        if (!isOpen) return;

        if (portalContainer) {
            const canvas = portalContainer.parentElement;
            if (canvas) {
                canvas.style.overflow = 'hidden';
                return () => { canvas.style.overflow = ''; };
            }
        } else {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen, portalContainer]);

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => e.key === 'Escape' && toggleOpen(false);
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    const dialogContent = (
        <div
            className={`${styles.overlay} z-xl ${className}`}
            style={{ display: isOpen ? 'flex' : 'none', pointerEvents: 'auto' }}
            onClick={(e) => e.target === e.currentTarget && toggleOpen(false)}
            data-section-id={sectionId}
            data-dialog-overlay
        >
            <div className="container-grid" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid" style={{ width: '100%' }}>
                    <div className="col-1 col-tablet-4 col-desktop-6 offset-desktop-3 offset-tablet-2">
                        <div
                            className={styles.dialog}
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeButton} onClick={() => toggleOpen(false)} aria-label="Close dialog" data-dialog-close>
                                <XMarkIcon style={{ width: 20, height: 20 }} />
                            </button>

                            <BuilderImage
                                className={`${styles.imageContainer} imagePlaceholder-16-9`}
                                src={image}
                                id={imageId}
                                sectionId={sectionId}
                                isVisible={imageVisible}
                                onIdChange={(val) => onUpdate && onUpdate({ imageId: val })}
                                suffix="image"
                            />

                            {(title || description) && (
                                <div className={styles.textContainer}>
                                    {title && (
                                        <BuilderText
                                            tagName="h4"
                                            className={`h4 ${styles.title}`}
                                            content={title}
                                            onChange={(val) => onUpdate?.({ title: val })}
                                            sectionId={sectionId}
                                        />
                                    )}
                                    {description && (
                                        <BuilderText
                                            tagName="p"
                                            className={`body-regular ${styles.description}`}
                                            content={description}
                                            onChange={(val) => onUpdate?.({ description: val })}
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

    return portalContainer ? createPortal(dialogContent, portalContainer) : dialogContent;
}
