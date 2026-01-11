
import styles from "./feature-image-right.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function FeatureImageRight({
    title = componentDefaults["feature-image-right"].title,
    subtitle = componentDefaults["feature-image-right"].subtitle,
    buttonText = componentDefaults["feature-image-right"].buttonText,
    buttonUrl = componentDefaults["feature-image-right"].buttonUrl,
    buttonVisible = componentDefaults["feature-image-right"].buttonVisible,
    buttonLinkType = componentDefaults["feature-image-right"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["feature-image-right"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["feature-image-right"].buttonIconLeft,
    buttonIconRight = componentDefaults["feature-image-right"].buttonIconRight,
    secondaryButtonText = componentDefaults["feature-image-right"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["feature-image-right"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["feature-image-right"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["feature-image-right"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["feature-image-right"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["feature-image-right"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["feature-image-right"].secondaryButtonIconRight,
    image = componentDefaults["feature-image-right"].image,
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
    subtitleId
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <section className={styles.container} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className="grid align-center">
                    <div className={`${styles.content} col-mobile-4 col-tablet-8 col-desktop-6`}>
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
                                className={`subheader-h2 ${styles.description}`}
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
                                    className={`btn btn-${buttonStyle || 'primary'} btn-lg`}
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

                    <div className={`imageWrapper ${styles.imageWrapper} col-mobile-4 col-tablet-8 col-desktop-6`}>
                        <BuilderImage
                            src={image || DEFAULT_PLACEHOLDER_IMAGE}
                            onSrcChange={update('image')}
                            className={`imagePlaceholder-1-1`}
                            style={{ height: "auto" }}
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
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
