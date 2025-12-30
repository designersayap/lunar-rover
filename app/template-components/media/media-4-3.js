import styles from "./media.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";

/**
 * Media4x3 Component
 * Full width image using grid system
 */
export default function Media4x3({
    image = componentDefaults["media-4-3"].image,
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
    imageMobileRatio,
    imageMobileSrc
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
                            onSrcChange={update('image')}
                            className={`${styles.image} imagePlaceholder-4-3 object-cover`}
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
                            mobileSrc={imageMobileSrc}
                            onMobileSrcChange={update('imageMobileSrc')}
                        />
                    </div>
                </div>
            </div>
        </BuilderSection >
    );
}
