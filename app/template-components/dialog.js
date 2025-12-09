import { useState, useEffect } from 'react';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import BuilderLink from "@/app/page-builder-components/utils/builder-link";
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
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    // Map item IDs and visibility for easy access
    const itemIds = [item0Id, item1Id, item2Id, item3Id, item4Id];
    const itemVisibility = [item0Visible, item1Visible, item2Visible, item3Visible, item4Visible];

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

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => e.key === 'Escape' && toggleOpen(false);
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <div
            className={`${styles.overlay} z-xl ${className}`}
            style={{ display: isOpen ? 'flex' : 'none' }}
            onClick={(e) => e.target === e.currentTarget && toggleOpen(false)}
            data-section-id={sectionId}
            data-dialog-overlay
        >
            <div className={styles.dialog} role="dialog" aria-modal="true">
                <button className={styles.closeButton} onClick={() => toggleOpen(false)} aria-label="Close dialog" data-dialog-close>
                    <XMarkIcon style={{ width: 20, height: 20 }} />
                </button>

                <BuilderImage
                    className={`${styles.imageContainer} imagePlaceholder-4-3`}
                    src={image}
                    id={imageId}
                    sectionId={sectionId} // This effectively serves as the dialogId
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
    );
}
