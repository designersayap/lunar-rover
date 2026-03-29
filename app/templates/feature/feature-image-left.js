
import styles from "./feature-image-left.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function FeatureImageLeft({
    title = componentDefaults["feature-image-left"].title,
    subtitle = componentDefaults["feature-image-left"].subtitle,
    buttonText = componentDefaults["feature-image-left"].buttonText,
    buttonUrl = componentDefaults["feature-image-left"].buttonUrl,
    buttonVisible = componentDefaults["feature-image-left"].buttonVisible,
    buttonLinkType = componentDefaults["feature-image-left"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["feature-image-left"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["feature-image-left"].buttonIconLeft,
    buttonIconRight = componentDefaults["feature-image-left"].buttonIconRight,
    secondaryButtonText = componentDefaults["feature-image-left"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["feature-image-left"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["feature-image-left"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["feature-image-left"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["feature-image-left"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["feature-image-left"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["feature-image-left"].secondaryButtonIconRight,
    image = componentDefaults["feature-image-left"].image,
    imageId,
    imageVisible,
    imageUrl,
    imageLinkType,
    imageTargetDialogId,
    buttonStyle = "primary",
    secondaryButtonStyle = "ghost",
    buttonId,
    secondaryButtonId,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    titleVisible = true,
    subtitleVisible = true,
    titleId,
    subtitleId,
    imageRatio,
    imageEnableAudio,
    imageAutoplay = componentDefaults["feature-image-left"].imageAutoplay
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <section className={styles.container} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className="grid align-center">
                    <div className={`imageWrapper ${styles.imageWrapper} col-mobile-4 col-tablet-4 col-desktop-6`} style={{ paddingRight: "var(--gap-md)", paddingLeft: "var(--gap-md)" }}>
                        <BuilderImage
                            src={image}
                            onSrcChange={update('image')}
                            className=""
                            style={{ aspectRatio: (imageRatio || '1-1').replace('-', '/') }}
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
                            aspectRatio={imageRatio}
                            onAspectRatioChange={update('imageRatio')}
                            enableAudio={imageEnableAudio}
                            onEnableAudioChange={update('imageEnableAudio')}
                            autoplay={imageAutoplay}
                            onAutoplayChange={update('imageAutoplay')}
                        />
                    </div>

                    <div className={`${styles.content} col-mobile-4 col-tablet-4 col-desktop-6`}>
                        {titleVisible && (
                            <BuilderText
                                tagName="h2"
                                className={`h2 ${styles.title}`}
                                style={{ marginBottom: "var(--gap-sm)" }}
                                content={title}
                                onChange={update('title')}
                                sectionId={sectionId}
                                id={titleId}
                                suffix="title"
                                onIdChange={update('titleId')}
                            />
                        )}
                        {subtitleVisible && (
                            <BuilderText
                                tagName="div"
                                className="subheader-h1"
                                style={{ color: "var(--content-neutral--body)", marginBottom: "var(--gap-md)" }}
                                content={subtitle}
                                onChange={update('subtitle')}
                                sectionId={sectionId}
                                id={subtitleId}
                                suffix="subtitle"
                                onIdChange={update('subtitleId')}
                            />
                        )}
                        <div className="buttonWrapperLeft" suppressHydrationWarning>
                            {buttonVisible && (
                                <BuilderButton
                                    label={buttonText}
                                    href={buttonUrl}
                                    isVisible={buttonVisible}
                                    sectionId={sectionId}
                                    className={`btn btn-${buttonStyle} btn-lg`}
                                    iconLeft={buttonIconLeft}
                                    iconRight={buttonIconRight}
                                    onLabelChange={update('buttonText')}
                                    onHrefChange={update('buttonUrl')}
                                    onVisibilityChange={update('buttonVisible')}
                                    onVariantChange={update('buttonStyle')}
                                    linkType={buttonLinkType}
                                    onLinkTypeChange={update('buttonLinkType')}
                                    targetDialogId={buttonTargetDialogId}
                                    onTargetDialogIdChange={update('buttonTargetDialogId')}
                                    onIconLeftChange={update('buttonIconLeft')}
                                    onIconRightChange={update('buttonIconRight')}
                                    id={buttonId}
                                    onIdChange={update('buttonId')}
                                    suffix="button"
                                />
                            )}
                            {secondaryButtonVisible && (
                                <BuilderButton
                                    label={secondaryButtonText}
                                    href={secondaryButtonUrl}
                                    isVisible={secondaryButtonVisible}
                                    sectionId={sectionId}
                                    className={`btn btn-${secondaryButtonStyle} btn-lg`}
                                    onLabelChange={update('secondaryButtonText')}
                                    onHrefChange={update('secondaryButtonUrl')}
                                    onVisibilityChange={update('secondaryButtonVisible')}
                                    onVariantChange={update('secondaryButtonStyle')}
                                    linkType={secondaryButtonLinkType}
                                    onLinkTypeChange={update('secondaryButtonLinkType')}
                                    targetDialogId={secondaryButtonTargetDialogId}
                                    onTargetDialogIdChange={update('secondaryButtonTargetDialogId')}
                                    iconLeft={secondaryButtonIconLeft}
                                    iconRight={secondaryButtonIconRight}
                                    onIconLeftChange={update('secondaryButtonIconLeft')}
                                    onIconRightChange={update('secondaryButtonIconRight')}
                                    id={secondaryButtonId}
                                    onIdChange={update('secondaryButtonId')}
                                    suffix="secondary-button"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
