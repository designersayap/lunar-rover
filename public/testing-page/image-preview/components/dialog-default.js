import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { componentDefaults } from "./data";
import styles from './dialog-section.module.css';
import DialogSection from "./dialog-section";

export default function DialogDefault({
    title = "Title",
    description = "Description",

    isOpen,
    onUpdate,
    sectionId,
    className = "",
    image,
    imageId,
    imageVisible,
    // List Items
    items = componentDefaults.dialog.items
}) {
    const updateItem = (index, field, value) => {
        if (!onUpdate) return;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ items: newItems });
    };

    const updateItemId = (index, newId) => {
        updateItem(index, 'itemId', newId);
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

            <div className={styles.listContainer}>
                {items.map((item, i) => (
                    <Link href={(item.url || "#")} className={`${styles.listItem} body-regular ${i === items.length - 1 ? styles.lastItem : ''}`} key={i} id={(item.itemId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined))}>{item.label}</Link>
                ))}
            </div>
        </DialogSection>
    );
}


