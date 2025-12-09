import { useState, useEffect } from 'react';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import BuilderLink from "@/app/page-builder-components/utils/builder-link";
import styles from "./dialog.module.css";

export default function Dialog({
    title = "Title",
    description = "Description",
    triggerLabel = "Open Dialog",
    isOpen: controlledIsOpen,
    onUpdate,
    sectionId,
    className = "",
    image,
    // List items are now provided by parent/data.js
    items = []
}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const toggleOpen = (value) => !isControlled && setInternalIsOpen(value);

    const updateItem = (index, field, value) => {
        if (!onUpdate) return;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ items: newItems });
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => e.key === 'Escape' && toggleOpen(false);
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <div className={`${styles.wrapper} ${className}`} data-section-id={sectionId}>
            <div className={styles.triggerWrapper}>
                <button className="btn btn-primary btn-md" onClick={() => toggleOpen(true)}>
                    <BuilderText
                        tagName="span"
                        content={triggerLabel}
                        onChange={(val) => onUpdate?.({ triggerLabel: val })}
                        sectionId={sectionId}
                    />
                </button>
            </div>

            {isOpen && (
                <div className={`${styles.overlay} z-xl`} onClick={(e) => e.target === e.currentTarget && toggleOpen(false)}>
                    <div className={styles.dialog} role="dialog" aria-modal="true">
                        <button className={styles.closeButton} onClick={() => toggleOpen(false)} aria-label="Close dialog">
                            <XMarkIcon style={{ width: 20, height: 20 }} />
                        </button>

                        <div className={styles.imageContainer}>
                            <BuilderImage className="imagePlaceholder-4-3" src={image} />
                        </div>

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
            )}
        </div>
    );
}
