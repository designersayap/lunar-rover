import styles from "./terra-features-image-right.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

/**
 * TerraFeaturesImageRight Component
 */
export default function TerraFeaturesImageRight({
    title = componentDefaults["feature-right"].title,
    subtitle = componentDefaults["feature-right"].subtitle,
    buttonText = componentDefaults["feature-right"].buttonText,
    buttonUrl = componentDefaults["feature-right"].buttonUrl,
    buttonVisible = componentDefaults["feature-right"].buttonVisible,
    buttonLinkType = componentDefaults["feature-right"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["feature-right"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["feature-right"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["feature-right"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["feature-right"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["feature-right"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["feature-right"].secondaryButtonTargetDialogId,
    image = componentDefaults["feature-right"].image,
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
    removePaddingRight
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <section className={styles.container} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className="grid align-center">
                    <div className={`${styles.content} col-mobile-4 col-tablet-8 col-desktop-6`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            style={{ marginBottom: "var(--gap-sm)" }}
                            content={title}
                            onChange={update('title')}
                            sectionId={sectionId}
                        />
                        <BuilderText
                            tagName="p"
                            className={`subheader-h2 ${styles.description}`}
                            style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-md)" }}
                            content={subtitle}
                            onChange={update('subtitle')}
                            sectionId={sectionId}
                        />
                        <div className="buttonWrapperLeft">
                            <BuilderButton
                                label={buttonText}
                                href={buttonUrl}
                                isVisible={buttonVisible}
                                sectionId={sectionId}
                                className={`btn btn-${buttonStyle || 'primary'} btn-md`}
                                iconRight={<ArrowLongRightIcon />}
                                onLabelChange={update('buttonText')}
                                onHrefChange={update('buttonUrl')}
                                onVisibilityChange={update('buttonVisible')}
                                onVariantChange={update('buttonStyle')}
                                linkType={buttonLinkType}
                                onLinkTypeChange={update('buttonLinkType')}
                                targetDialogId={buttonTargetDialogId}
                                onTargetDialogIdChange={update('buttonTargetDialogId')}
                                id={buttonId}
                                onIdChange={update('buttonId')}
                                suffix="button"
                            />
                            <BuilderButton
                                label={secondaryButtonText}
                                href={secondaryButtonUrl}
                                isVisible={secondaryButtonVisible}
                                sectionId={sectionId}
                                className={`btn btn-${secondaryButtonStyle} btn-md`}
                                onLabelChange={update('secondaryButtonText')}
                                onHrefChange={update('secondaryButtonUrl')}
                                onVisibilityChange={update('secondaryButtonVisible')}
                                onVariantChange={update('secondaryButtonStyle')}
                                linkType={secondaryButtonLinkType}
                                onLinkTypeChange={update('secondaryButtonLinkType')}
                                targetDialogId={secondaryButtonTargetDialogId}
                                onTargetDialogIdChange={update('secondaryButtonTargetDialogId')}
                                id={secondaryButtonId}
                                onIdChange={update('secondaryButtonId')}
                                suffix="secondary-button"
                            />
                        </div>
                    </div>

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
                </div>
            </div>
        </section>
    );
}
