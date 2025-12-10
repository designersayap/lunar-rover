import { ArrowRightIcon } from '@heroicons/react/24/outline';
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderLink from "@/app/page-builder-components/utils/builder/builder-link";
import { componentDefaults } from "./content/data";
import styles from "./dialog-section.module.css";
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
    items = componentDefaults.dialog.items,
    item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id,
    item0Visible, item1Visible, item2Visible, item3Visible, item4Visible, item5Visible, item6Visible, item7Visible,
}) {
    // Map item IDs and visibility for easy access
    const itemIds = [item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id];
    const itemVisibility = [item0Visible, item1Visible, item2Visible, item3Visible, item4Visible, item5Visible, item6Visible, item7Visible];

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
            onUpdate={onUpdate}
            sectionId={sectionId}
            className={className}
            image={image}
            imageId={imageId}
            imageVisible={imageVisible}
        >

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
        </DialogSection>
    );
}


