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
    // We could make this dynamic later, for now we mock the list structure
    items = Array(7).fill({ label: "Label", image: "", url: "#" })
}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const toggleOpen = (value) => {
        if (!isControlled) {
            setInternalIsOpen(value);
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') toggleOpen(false);
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <div className={`${styles.wrapper} ${className}`} data-section-id={sectionId}>
            <div className={styles.triggerWrapper}>
                <button
                    className="btn btn-primary btn-md"
                    onClick={() => toggleOpen(true)}
                >
                    <BuilderText
                        tagName="span"
                        content={triggerLabel}
                        onChange={(val) => onUpdate && onUpdate({ triggerLabel: val })}
                        sectionId={sectionId}
                    />
                </button>
            </div>

            {isOpen && (
                <div className={`${styles.overlay} z-xl`} onClick={(e) => {
                    if (e.target === e.currentTarget) toggleOpen(false);
                }}>
                    <div className={styles.dialog} role="dialog" aria-modal="true">
                        <button
                            className={styles.closeButton}
                            onClick={() => toggleOpen(false)}
                            aria-label="Close dialog"
                        >
                            <XMarkIcon style={{ width: 20, height: 20 }} />
                        </button>

                        <div className={styles.imageContainer}>
                            <BuilderImage
                                className="imagePlaceholder-4-3"
                                src={image}
                            />
                        </div>

                        <div className={styles.textContainer}>
                            <BuilderText
                                tagName="h4"
                                className={`h4 ${styles.title}`}
                                content={title}
                                onChange={(val) => onUpdate && onUpdate({ title: val })}
                                sectionId={sectionId}
                            />
                            <BuilderText
                                tagName="p"
                                className={`body-regular ${styles.description}`}
                                content={description}
                                onChange={(val) => onUpdate && onUpdate({ description: val })}
                                sectionId={sectionId}
                            />
                        </div>

                        <div className={styles.listContainer}>
                            {items.map((item, i) => (
                                <BuilderLink
                                    key={i}
                                    label={item.label}
                                    href={item.url}
                                    className={styles.listItem}
                                    sectionId={sectionId}
                                    suffix={`item-${i}`}
                                    onLabelChange={(val) => {
                                        const newItems = [...items];
                                        newItems[i] = { ...newItems[i], label: val };
                                        onUpdate && onUpdate({ items: newItems });
                                    }}
                                    onHrefChange={(val) => {
                                        const newItems = [...items];
                                        newItems[i] = { ...newItems[i], url: val };
                                        onUpdate && onUpdate({ items: newItems });
                                    }}
                                    iconLeft={
                                        <div className={styles.itemIcon}>
                                            <BuilderImage
                                                className="imagePlaceholder-1-1"
                                                src={item.image}
                                            />
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
