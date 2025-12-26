import styles from "./media.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";

/**
 * Media21x9 Component
 */
export default function Media21x9({
    image = componentDefaults["media-21-9"].image,
    imageId,
    imageVisible,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    imageHref,
    imageLinkType,
    imageTargetDialogId,
    imageIsPortrait,
    imageMobileRatio
}) {
    const update = createUpdateHandler(onUpdate);

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
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div className="imageWrapper">
                        <BuilderImage
                            src={image}
                            className={`${styles.image} imagePlaceholder-21-9 object-cover`}
                            id={imageId}
                            sectionId={sectionId}
                            isVisible={imageVisible}
                            onIdChange={update('imageId')}
                            suffix="image"
                            href={imageHref}
                            onHrefChange={update('imageHref')}
                            linkType={imageLinkType}
                            onLinkTypeChange={update('imageLinkType')}
                            targetDialogId={imageTargetDialogId}
                            onTargetDialogIdChange={update('imageTargetDialogId')}
                            isPortrait={imageIsPortrait}
                            onIsPortraitChange={update('imageIsPortrait')}
                            mobileRatio={imageMobileRatio}
                            onMobileRatioChange={update('imageMobileRatio')}
                        />
                    </div>
                </div>
            </div>
        </BuilderSection >
    );
}
