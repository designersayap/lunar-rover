import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderLink from "@/app/page-builder-components/utils/builder/builder-link";
import { componentDefaults } from "./content/data";
import styles from "./dialog.module.css";

export default function Dialog({
    title = "Title",
    description = "Description",

    isOpen: controlledIsOpen,
    onUpdate,
    sectionId,
    className = "",
    image,
    imageId,
    imageVisible,
    // List items are now provided by parent/data.js
    items = componentDefaults.dialog.items,
    // Individual IDs for list items passed from sidebar/page
    item0Id,
    item1Id,
    item2Id,
    item3Id,
    item4Id,
    item5Id,
    item6Id,
    item7Id,
    // Visibility for list items
    item0Visible,
    item1Visible,
    item2Visible,
    item3Visible,
    item4Visible,
    item5Visible,
    item6Visible,
    item7Visible,
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

    // Map item IDs and visibility for easy access
    const itemIds = [item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id];
    const itemVisibility = [item0Visible, item1Visible, item2Visible, item3Visible, item4Visible, item5Visible, item6Visible, item7Visible];

    const toggleOpen = (value) => {
        if (isControlled) {
            onUpdate && onUpdate({ isOpen: value });
        } else {
            setInternalIsOpen(value);
        }
    };

    const updateItem = (index, field, value) => {
        if (!onUpdate) return;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ items: newItems });
    };

    const updateItemId = (index, newId) => {
        if (onUpdate) {
            onUpdate({ [`item${index}Id`]: newId });
        }
    };

    // Lock scroll when dialog is open
    // - Builder: lock canvas scroll (when portal container exists)
    // - Production: lock body scroll (when no portal container)
    useEffect(() => {
        if (!isOpen) return;

        if (portalContainer) {
            // Builder mode: lock canvas scroll
            const canvas = portalContainer.parentElement;
            if (canvas) {
                canvas.style.overflow = 'hidden';
                return () => {
                    canvas.style.overflow = '';
                };
            }
        } else {
            // Production mode: lock body scroll
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
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
                    <div className="col-2 col-tablet-8 col-desktop-8 offset-desktop-2">
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

                            <div className={styles.textContainer}>
                                <BuilderText
                                    tagName="h4"
                                    className={`h4 ${styles.title}`}
                                    content={title}
                                    onChange={(val) => onUpdate?.({ title: val })}
                                    sectionId={sectionId}
                                />
                                <BuilderText
                                    tagName="p"
                                    className={`body-regular ${styles.description}`}
                                    content={description}
                                    onChange={(val) => onUpdate?.({ description: val })}
                                    sectionId={sectionId}
                                />
                            </div>

                            <div className={styles.listContainer}>
                                {items.map((item, i) => (
                                    <BuilderLink
                                        key={i}
                                        label={item.label}
                                        href={item.url}
                                        className={`${styles.listItem} body-regular ${i === items.length - 1 ? styles.lastItem : ''}`}
                                        sectionId={sectionId}
                                        suffix={`item-${i}`}
                                        id={itemIds[i]}
                                        isVisible={itemVisibility[i] !== false}
                                        onVisibilityChange={(val) => onUpdate && onUpdate({ [`item${i}Visible`]: val })}
                                        onIdChange={(val) => updateItemId(i, val)}
                                        justify="flex-start"
                                        fullWidth={true}
                                        onLabelChange={(val) => updateItem(i, 'label', val)}
                                        onHrefChange={(val) => updateItem(i, 'url', val)}
                                        iconLeft={
                                            <div className={styles.itemIcon}>
                                                <BuilderImage className="imagePlaceholder-1-1" src={item.image} />
                                            </div>
                                        }
                                        iconRight={<ArrowRightIcon className={styles.itemArrow} />}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render via portal if container exists, otherwise render inline
    return portalContainer ? createPortal(dialogContent, portalContainer) : dialogContent;
}

