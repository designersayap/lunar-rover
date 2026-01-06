import * as HeroIcons from "@heroicons/react/24/solid";
import styles from "./terra-features-image-left.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function TerraFeaturesImageLeft({
    title = componentDefaults["feature-left"].title,
    subtitle = componentDefaults["feature-left"].subtitle,
    buttonText = componentDefaults["feature-left"].buttonText,
    buttonUrl = componentDefaults["feature-left"].buttonUrl,
    buttonVisible = componentDefaults["feature-left"].buttonVisible,
    buttonLinkType = componentDefaults["feature-left"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["feature-left"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["feature-left"].buttonIconLeft,
    buttonIconRight = componentDefaults["feature-left"].buttonIconRight,
    secondaryButtonText = componentDefaults["feature-left"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["feature-left"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["feature-left"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["feature-left"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["feature-left"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["feature-left"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["feature-left"].secondaryButtonIconRight,
    image = componentDefaults["feature-left"].image,
    imageId,
    imageVisible,
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
                    <div className={`imageWrapper ${styles.imageWrapper} col-mobile-4 col-tablet-8 col-desktop-6`}>
                        <BuilderImage
                            src={image}
                            onSrcChange={update('image')}
                            className={`imagePlaceholder-1-1`}
                            style={{ height: "auto" }}
                            id={imageId}
                            sectionId={sectionId}
                            isVisible={imageVisible}
                            onIdChange={update('imageId')}
                            suffix="image"
                        />
                    </div>

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
                                tagName="p"
                                className="subheader-h2"
                                style={{ color: "var(--content-neutral--body)", marginBottom: "var(--gap-md)" }}
                                content={subtitle}
                                onChange={update('subtitle')}
                                sectionId={sectionId}
                                id={subtitleId}
                                suffix="subtitle"
                                onIdChange={update('subtitleId')}
                            />
                        )}
                        <div className="buttonWrapperLeft">
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
