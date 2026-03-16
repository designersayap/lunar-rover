import { useState, memo, useRef, useCallback, useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderElement from "@/app/page-builder/utils/builder/builder-element";
import { componentDefaults } from "../content/data";
import styles from "./dialog-section.module.css";
import DialogSection from "./dialog-section";
import { createUpdateHandler } from "../utils/component-helpers";

const AccordionItem = memo(({
    index,
    item,
    isOpen,
    sectionId,
    itemId,
    onToggle,
    onUpdate,
    onIdChange
}) => {
    const itemRef = useRef(null);

    useEffect(() => {
        if (isOpen && itemRef.current) {
            // Delay slightly to allow the grid transition to start or complete
            const timer = setTimeout(() => {
                itemRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <BuilderElement
            ref={itemRef}
            tagName="div"
            className={styles.accordionItem}
            sectionId={sectionId}
            id={itemId}
            elementProps={`accordion-${index}`}
            onIdChange={onIdChange}
        >
            <button
                className={styles.accordionHeader}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent BuilderElement select if clicking header
                    onToggle();
                }}
            >
                <div className={styles.iconContainer}>
                    {isOpen ? (
                        <MinusIcon className={styles.accordionIcon} />
                    ) : (
                        <PlusIcon className={styles.accordionIcon} />
                    )}
                </div>
                <BuilderText
                    tagName="span"
                    className={`body-bold ${styles.accordionTitle}`}
                    content={item.title}
                    onChange={(val) => onUpdate('title', val)}
                    sectionId={sectionId}
                />
            </button>
            <div className={`${styles.accordionContent} ${isOpen ? styles.accordionContentOpen : ''}`}>
                <div className={`${styles.accordionInner} z-content-2`}>
                    <BuilderText
                        tagName="div"
                        className="body-regular"
                        content={item.content}
                        onChange={(val) => onUpdate('content', val)}
                        sectionId={sectionId}
                        multiline={true}
                    />
                </div>
            </div>
        </BuilderElement>
    );
});

AccordionItem.displayName = 'AccordionItem';

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
    imageUrl,
    imageLinkType,
    imageTargetDialogId,

    items = componentDefaults["dialog-accordion"]?.items || [],
    item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id,
    item0Visible = true, item1Visible = true, item2Visible = true, item3Visible = true,
    item4Visible = true, item5Visible = true, item6Visible = true, item7Visible = true,
}) {
    const update = createUpdateHandler(onUpdate);
    const [openIndex, setOpenIndex] = useState(null); // Only one open at a time

    const itemIds = [item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id];
    const itemVisibility = [
        item0Visible, item1Visible, item2Visible, item3Visible,
        item4Visible, item5Visible, item6Visible, item7Visible
    ];

    // Use refs to keep callbacks stable for memoized children
    const onUpdateRef = useRef(onUpdate);
    onUpdateRef.current = onUpdate;

    const itemsRef = useRef(items);
    itemsRef.current = items;

    const toggleAccordion = useCallback((index) => {
        setOpenIndex(prev => prev === index ? null : index);
    }, []);

    const updateItem = useCallback((index, field, value) => {
        if (!onUpdateRef.current) return;
        const currentItems = [...itemsRef.current];
        currentItems[index] = { ...currentItems[index], [field]: value };
        onUpdateRef.current({ items: currentItems });
    }, []);

    const updateItemId = useCallback((index, newId) => {
        if (onUpdateRef.current) {
            onUpdateRef.current({ [`item${index}Id`]: newId });
        }
    }, []);


    return (
        <DialogSection
            title={title}
            description={description}
            isOpen={isOpen}
            onUpdate={onUpdate}
            sectionId={sectionId}
            className={className}
            image={image}
            imageId={imageId}
            imageVisible={imageVisible !== false}
            onImageVisibleChange={update('imageVisible')}
            imageUrl={imageUrl}
            imageLinkType={imageLinkType}
            imageTargetDialogId={imageTargetDialogId}
        >
            <div className={styles.accordionContainer}>
                {items.slice(0, 8).map((item, i) => (
                    // Check visibility
                    itemVisibility[i] !== false && (
                        <AccordionItem
                            key={i}
                            index={i}
                            item={item}
                            isOpen={openIndex === i}
                            sectionId={sectionId}
                            itemId={itemIds[i]}
                            onToggle={() => toggleAccordion(i)}
                            onUpdate={(field, val) => updateItem(i, field, val)}
                            onIdChange={(val) => updateItemId(i, val)}
                        />
                    )
                ))}
            </div>
        </DialogSection>
    );
}

