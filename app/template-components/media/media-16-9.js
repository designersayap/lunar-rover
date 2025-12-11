import styles from "./media-16-9.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
import { componentDefaults } from "../content/data";

/**
 * Media16x9 Component
 * Full width image using grid system
 */
export default function Media16x9({
    image = componentDefaults["media-16-9"].image,
    imageId,
    imageVisible,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    imageHref,
    imageLinkType,
    imageTargetDialogId
}) {
    return (
        <BuilderSection
            tagName="section"
            className={styles.container}
            innerContainer={true}
            sectionId={sectionId}
            fullWidth={fullWidth}
            removePaddingLeft={removePaddingLeft}
            removePaddingRight={removePaddingRight}
            onUpdate={onUpdate}
        >
            <div className="grid">
                <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                    <div className="imageWrapper">
                        <BuilderImage
                            src={image}
                            className={`${styles.image} imagePlaceholder-16-9 object-cover`}
                            id={imageId}
                            sectionId={sectionId}
                            isVisible={imageVisible}
                            onIdChange={(val) => onUpdate && onUpdate({ imageId: val })}
                            suffix="image"
                            href={imageHref}
                            onHrefChange={(val) => onUpdate && onUpdate({ imageHref: val })}
                            linkType={imageLinkType}
                            onLinkTypeChange={(val) => onUpdate && onUpdate({ imageLinkType: val })}
                            targetDialogId={imageTargetDialogId}
                            onTargetDialogIdChange={(val) => onUpdate && onUpdate({ imageTargetDialogId: val })}
                        />
                    </div>
                </div>
            </div>
        </BuilderSection >
    );
}
