import styles from "./media.module.css";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import BuilderSection from "@/app/page-builder/utils/builder/builder-section";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";

export default function Media5x4({
    image = componentDefaults["media-5-4"].image,
    imageId,
    imageVisible,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    imageUrl,
    imageLinkType,
    imageTargetDialogId,
    imageIsPortrait,
    imageMobileRatio,
    imageMobileSrc,
    imageEnableAudio,
    imageAutoplay = componentDefaults["media-5-4"].imageAutoplay
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
                            className={`${styles.image} imagePlaceholder-5-4 object-cover`}
                            id={imageId}
                            sectionId={sectionId}
                            isVisible={imageVisible}
                            onIdChange={update('imageId')}
                            suffix="image"
                            href={imageUrl}
                            onHrefChange={update('imageUrl')}
                            linkType={imageLinkType}
                            onLinkTypeChange={update('imageLinkType')}
                            targetDialogId={imageTargetDialogId}
                            onTargetDialogIdChange={update('imageTargetDialogId')}
                            isPortrait={imageIsPortrait}
                            onIsPortraitChange={imageMobileRatio ? undefined : update('imageIsPortrait')} // Only allow portrait toggle if mobile ratio is not set
                            mobileRatio={imageMobileRatio}
                            onMobileRatioChange={update('imageMobileRatio')}
                            mobileSrc={imageMobileSrc}
                            onMobileSrcChange={update('imageMobileSrc')}
                            enableAudio={imageEnableAudio}
                            onEnableAudioChange={update('imageEnableAudio')}
                            autoplay={imageAutoplay}
                            onAutoplayChange={update('imageAutoplay')}
                        />
                    </div>
                </div>
            </div>
        </BuilderSection >
    );
}
