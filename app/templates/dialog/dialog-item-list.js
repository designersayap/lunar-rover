import { ArrowRightIcon } from '@heroicons/react/24/outline';
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";

import BuilderLink from "@/app/page-builder/utils/builder/builder-link";
import { componentDefaults } from "../content/data";
import styles from "./dialog-section.module.css";
import DialogSection from "./dialog-section";
import { createUpdateHandler } from "../utils/component-helpers";

export default function DialogItemList({
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
    items = componentDefaults["dialog-item-list"].items
}) {
    const update = createUpdateHandler(onUpdate);
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
            <div className={styles.listContainer}>
                {items.map((item, i) => (
                    <BuilderLink
                        key={i}
                        label={item.label}
                        href={item.url}
                        className={`${styles.listItem} body-regular ${i === items.length - 1 ? styles.lastItem : ''}`}
                        sectionId={sectionId}
                        suffix={`item-${i}`}
                        id={item.itemId}
                        isVisible={item.visible !== false}
                        onVisibilityChange={(val) => updateItem(i, 'visible', val)}
                        onIdChange={(val) => updateItemId(i, val)}
                        justify="flex-start"
                        fullWidth={true}
                        onLabelChange={(val) => updateItem(i, 'label', val)}
                        onHrefChange={(val) => updateItem(i, 'url', val)}
                        tooltipIfTruncated={true}
                        showLinkType={false}
                        iconLeft={
                            <div className={styles.itemIcon}>
                                <BuilderImage
                                    className="imagePlaceholder-1-1"
                                    src={item.image}
                                    onSrcChange={(val) => updateItem(i, 'image', val)}
                                    showLinkControls={false}
                                    isVisible={item.visible !== false}
                                    sectionId={sectionId}
                                    suffix={`item-image-${i}`} />
                            </div>
                        }
                        iconRight={<ArrowRightIcon className={styles.itemArrow} />}
                    />
                ))}
            </div>
        </DialogSection>
    );
}


