import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { componentDefaults } from "./data";
import styles from './dialog-section.module.css';
import DialogSection from "./dialog-section";

export default function DialogAccordion({
    title = "Title",
    description = "Description",

    isOpen,
    onUpdate,
    sectionId,

    className = "",
    image,
    imageId,
    imageVisible,

    // Accordion Items
    items = componentDefaults["dialog-accordion"]?.items || [],
    item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id,
    item0Visible = true, item1Visible = true, item2Visible = true, item3Visible = true,
    item4Visible = true, item5Visible = true, item6Visible = true, item7Visible = true,
}) {
    const [openIndex, setOpenIndex] = useState(null); // Only one open at a time

    const itemIds = [item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id];
    const itemVisibility = [
        item0Visible, item1Visible, item2Visible, item3Visible,
        item4Visible, item5Visible, item6Visible, item7Visible
    ];

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
            <div className={styles.accordionContainer}>
                {items.slice(0, 8).map((item, i) => (
                    // Check visibility
                    itemVisibility[i] !== false && (
                        <div className={styles.accordionItem} key={i} id={(itemIds[i] || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-element` : undefined))}>
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
                                <span className={`body-bold ${styles.accordionTitle}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-span` : undefined)}>{item.title}</span>
                            </button>
                            <div className={`${styles.accordionContent} ${openIndex === i ? styles.accordionContentOpen : ''}`}>
                                <div className={`${styles.accordionInner} z-content-2`}>
                                    <p className="body-regular" id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined)}>{item.content}</p>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </DialogSection>
    );
}

