import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from './dialog-section.module.css';

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
    // === State & Control ===
    
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);

    // Support both controlled (via props) and uncontrolled modes
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    // === Portal Setup ===
    // We render into document.body to ensure we escape any stacking contexts (like transforms in builder)
    useEffect(() => {
        setPortalContainer(document.body);
    }, []);

    const toggleOpen = useCallback((value) => {
        if (isControlled) {
            
        } else {
            setInternalIsOpen(value);
        }
    }, [isControlled]);

    
    useEffect(() => {
        if (typeof window !== 'undefined' && sectionId) {
            const checkHash = () => {
                if (window.location.hash === `#${sectionId}`) {
                    setInternalIsOpen(true);
                }
            };
            checkHash();
            window.addEventListener('hashchange', checkHash);
            return () => window.removeEventListener('hashchange', checkHash);
        }
    }, [sectionId]);

    useEffect(() => {
        if (!isOpen && typeof window !== 'undefined' && sectionId) {
            if (window.location.hash === `#${sectionId}`) {
                history.replaceState(null, document.title, window.location.pathname + window.location.search);
            }
        }
    }, [isOpen, sectionId]);

    useEffect(() => {
        if (!sectionId || typeof window === 'undefined') return;

        const handleGlobalClick = (e) => {
            const anchor = e.target.closest('a');
            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href === `#${sectionId}`) {
                     setInternalIsOpen(true);
                }
            }
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [sectionId]);
            

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

    // 2. Escape Key to Close
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => e.key === 'Escape' && toggleOpen(false);
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, toggleOpen]);

    // === Render Logic ===
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
                    {/* Centered Modal Column */}
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

                            {(imageVisible ?? true) && ((image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image)) ? (
                    <video src={image} controls autoPlay muted loop playsInline className={`${styles.imageContainer} imagePlaceholder-16-9`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (image && /\.(mp3|wav)(\?.*)?$/i.test(image)) ? (
                    <audio src={image} controls className={`${styles.imageContainer} imagePlaceholder-16-9`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (
                    <img src={image || null} alt="" className={`${styles.imageContainer} imagePlaceholder-16-9`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ))}

                            {(title || description) && (
                                <div className={styles.textContainer}>
                                    {title && (
                                        <h4 className={`h4 ${styles.title}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h4` : undefined)}>{title}</h4>
                                    )}
                                    {description && (
                                        <p className={`body-regular ${styles.description}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined)}>{description}</p>
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
