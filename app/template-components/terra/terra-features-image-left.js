import styles from "./terra-features-image-left.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "../content/data";

/**
 * TerraFeaturesImageLeft Component
 */
export default function TerraFeaturesImageLeft({
    title = componentDefaults["feature-left"].title,
    subtitle = componentDefaults["feature-left"].subtitle,
    buttonText = componentDefaults["feature-left"].buttonText,
    buttonUrl = componentDefaults["feature-left"].buttonUrl,
    buttonVisible = componentDefaults["feature-left"].buttonVisible,
    buttonLinkType = componentDefaults["feature-left"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["feature-left"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["feature-left"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["feature-left"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["feature-left"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["feature-left"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["feature-left"].secondaryButtonTargetDialogId,
    image = componentDefaults["feature-left"].image,
    imageId,
    imageVisible,
    buttonStyle = "primary",
    secondaryButtonStyle = "ghost",
    buttonId,
    secondaryButtonId,
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Image Column */}
                    <div className={`imageWrapper ${styles.imageWrapper} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderImage
                            src={image}
                            className="imagePlaceholder-1-1 shadow-md"
                            style={{ height: "auto" }}
                            id={imageId}
                            sectionId={sectionId}
                            isVisible={imageVisible}
                            onIdChange={(val) => onUpdate && onUpdate({ imageId: val })}
                            suffix="image"
                        />
                    </div>

                    {/* Content Column */}
                    <div className={`${styles.content} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            style={{ marginBottom: "var(--gap-sm)" }}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />
                        <BuilderText
                            tagName="p"
                            className="subheader-h2"
                            style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-md)" }}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
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
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                onHrefChange={(val) => onUpdate && onUpdate({ buttonUrl: val })}
                                onVisibilityChange={(val) => onUpdate && onUpdate({ buttonVisible: val })}
                                onVariantChange={(val) => onUpdate && onUpdate({ buttonStyle: val })}
                                linkType={buttonLinkType}
                                onLinkTypeChange={(val) => onUpdate && onUpdate({ buttonLinkType: val })}
                                targetDialogId={buttonTargetDialogId}
                                onTargetDialogIdChange={(val) => onUpdate && onUpdate({ buttonTargetDialogId: val })}
                                id={buttonId}
                                onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                                suffix="button"
                            />
                            <BuilderButton
                                label={secondaryButtonText}
                                href={secondaryButtonUrl}
                                isVisible={secondaryButtonVisible}
                                sectionId={sectionId}
                                className={`btn btn-${secondaryButtonStyle} btn-md`}
                                onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                onHrefChange={(val) => onUpdate && onUpdate({ secondaryButtonUrl: val })}
                                onVisibilityChange={(val) => onUpdate && onUpdate({ secondaryButtonVisible: val })}
                                onVariantChange={(val) => onUpdate && onUpdate({ secondaryButtonStyle: val })}
                                linkType={secondaryButtonLinkType}
                                onLinkTypeChange={(val) => onUpdate && onUpdate({ secondaryButtonLinkType: val })}
                                targetDialogId={secondaryButtonTargetDialogId}
                                onTargetDialogIdChange={(val) => onUpdate && onUpdate({ secondaryButtonTargetDialogId: val })}
                                id={secondaryButtonId}
                                onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                                suffix="secondary-button"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
