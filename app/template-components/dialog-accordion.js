import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderElement from "@/app/page-builder-components/utils/builder/builder-element";
import { componentDefaults } from "./content/data";
import styles from "./dialog-accordion.module.css";

export default function DialogAccordion({
    title = "Title",
    description = "Description",

    isOpen: controlledIsOpen,
    onUpdate,
    sectionId,
    className = "",

    // Accordion items provided by parent/data.js
    // We expect 5 items by design
    items = componentDefaults["dialog-accordion"]?.items || [],

    // Individual IDs passed from Sidebar
    item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id,
    // Visibility props
    item0Visible = true, item1Visible = true, item2Visible = true, item3Visible = true,
    item4Visible = true, item5Visible = true, item6Visible = true, item7Visible = true,
}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);
    const [openIndex, setOpenIndex] = useState(null); // Only one open at a time

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    // Find the portal container on mount
    useEffect(() => {
        const container = document.getElementById('dialog-portal-root');
        setPortalContainer(container);
    }, []);

    const itemIds = [item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id];
    const itemVisibility = [
        item0Visible, item1Visible, item2Visible, item3Visible,
        item4Visible, item5Visible, item6Visible, item7Visible
    ];

    const toggleOpen = (value) => {
        if (isControlled) {
            onUpdate && onUpdate({ isOpen: value });
        } else {
            setInternalIsOpen(value);
        }
    };

    const toggleAccordion = (index) => {
        setOpenIndex(prev => prev === index ? null : index);
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
                    <div className="col-2 col-tablet-4 col-desktop-6 offset-desktop-3 offset-tablet-2">
                        <div
                            className={styles.dialog}
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeButton} onClick={() => toggleOpen(false)} aria-label="Close dialog" data-dialog-close>
                                <XMarkIcon style={{ width: 20, height: 20 }} />
                            </button>

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

                            <div className={styles.accordionContainer}>
                                {items.slice(0, 8).map((item, i) => (
                                    // Check visibility
                                    itemVisibility[i] !== false && (
                                        <BuilderElement
                                            key={i}
                                            tagName="div"
                                            className={styles.accordionItem}
                                            sectionId={sectionId}
                                            id={itemIds[i]}
                                            elementProps={`accordion-${i}`}
                                            onIdChange={(val) => updateItemId(i, val)}
                                        >
                                            <button
                                                className={styles.accordionHeader}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent BuilderElement select if clicking header
                                                    toggleAccordion(i);
                                                }}
                                            >
                                                <div className={styles.iconContainer}>
                                                    {openIndex === i ? (
                                                        <MinusIcon className={styles.accordionIcon} />
                                                    ) : (
                                                        <PlusIcon className={styles.accordionIcon} />
                                                    )}
                                                </div>
                                                <BuilderText
                                                    tagName="span"
                                                    className={`body-bold ${styles.accordionTitle}`}
                                                    content={item.title}
                                                    onChange={(val) => updateItem(i, 'title', val)}
                                                    sectionId={sectionId}
                                                />
                                            </button>
                                            <div className={`${styles.accordionContent} ${openIndex === i ? styles.accordionContentOpen : ''}`}>
                                                <div className={styles.accordionInner}>
                                                    <BuilderText
                                                        tagName="p"
                                                        className="body-regular"
                                                        content={item.content}
                                                        onChange={(val) => updateItem(i, 'content', val)}
                                                        sectionId={sectionId}
                                                        multiline={true}
                                                    />
                                                </div>
                                            </div>
                                        </BuilderElement>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return portalContainer ? createPortal(dialogContent, portalContainer) : dialogContent;
}
