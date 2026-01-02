import styles from "./terra-banner-hero.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function TerraBannerHero({
    title = componentDefaults["terra-banner-hero"].title,
    subtitle = componentDefaults["terra-banner-hero"].subtitle,
    buttonText = componentDefaults["terra-banner-hero"].buttonText,
    buttonUrl = componentDefaults["terra-banner-hero"].buttonUrl,
    buttonVisible = componentDefaults["terra-banner-hero"].buttonVisible,
    buttonLinkType = "url",
    buttonTargetDialogId = componentDefaults["terra-banner-hero"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["terra-banner-hero"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["terra-banner-hero"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["terra-banner-hero"].secondaryButtonVisible,
    secondaryButtonLinkType = "url",
    secondaryButtonTargetDialogId = componentDefaults["terra-banner-hero"].secondaryButtonTargetDialogId,
    image = componentDefaults["terra-banner-hero"].image,
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

    const defaults = componentDefaults["terra-banner-hero"];

    const primaryButton = {
        text: buttonText || defaults.buttonText,
        url: buttonUrl || defaults.buttonUrl,
        visible: buttonVisible !== undefined ? buttonVisible : defaults.buttonVisible,
        style: buttonStyle,
        linkType: buttonLinkType,
        targetDialogId: buttonTargetDialogId,
        id: buttonId
    };

    const secondaryButton = {
        text: secondaryButtonText || defaults.secondaryButtonText,
        url: secondaryButtonUrl || defaults.secondaryButtonUrl,
        visible: secondaryButtonVisible !== undefined ? secondaryButtonVisible : defaults.secondaryButtonVisible,
        style: secondaryButtonStyle,
        linkType: secondaryButtonLinkType,
        targetDialogId: secondaryButtonTargetDialogId,
        id: secondaryButtonId
    };

    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`} id={sectionId}>
            <div className={styles.backgroundImage}>
                <BuilderImage
                    src={image || defaults.image}
                    onSrcChange={update('image')}
                    className={`${styles.image} object-cover`}
                    id={imageId}
                    sectionId={sectionId}
                    isVisible={imageVisible}
                    onIdChange={update('imageId')}
                    suffix="image"
                />
            </div>
            <div className={styles.overlay}>
                <div className={`${getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })} ${styles.fullHeight}`}>
                    <div className={`grid ${styles.fullHeight}`}>
                        <div className={`col-mobile-4 col-tablet-8 col-desktop-12 ${styles.content}`}>
                            <BuilderText
                                tagName="h1"
                                className={`h1 ${styles.heroTitle}`}
                                content={title || defaults.title}
                                onChange={update('title')}
                                sectionId={sectionId}
                            />
                            <BuilderText
                                tagName="p"
                                className={`subheader-h1 ${styles.heroSubtitle}`}
                                content={subtitle || defaults.subtitle}
                                onChange={update('subtitle')}
                                sectionId={sectionId}
                            />
                            <div className="buttonWrapperCenter">
                                {primaryButton.visible && (
                                    <BuilderButton
                                        label={primaryButton.text}
                                        href={primaryButton.url}
                                        isVisible={primaryButton.visible}
                                        sectionId={sectionId}
                                        className={`btn btn-${primaryButton.style} btn-lg`}
                                        onLabelChange={update('buttonText')}
                                        onHrefChange={update('buttonUrl')}
                                        onVisibilityChange={update('buttonVisible')}
                                        onVariantChange={update('buttonStyle')}
                                        linkType={primaryButton.linkType}
                                        onLinkTypeChange={update('buttonLinkType')}
                                        targetDialogId={primaryButton.targetDialogId}
                                        onTargetDialogIdChange={update('buttonTargetDialogId')}
                                        id={primaryButton.id}
                                        onIdChange={update('buttonId')}
                                        suffix="button"
                                    />
                                )}
                                {secondaryButton.visible && (
                                    <BuilderButton
                                        label={secondaryButton.text}
                                        href={secondaryButton.url}
                                        isVisible={secondaryButton.visible}
                                        sectionId={sectionId}
                                        className={`btn btn-${secondaryButton.style} btn-lg`}
                                        onLabelChange={update('secondaryButtonText')}
                                        onHrefChange={update('secondaryButtonUrl')}
                                        onVisibilityChange={update('secondaryButtonVisible')}
                                        onVariantChange={update('secondaryButtonStyle')}
                                        linkType={secondaryButton.linkType}
                                        onLinkTypeChange={update('secondaryButtonLinkType')}
                                        targetDialogId={secondaryButton.targetDialogId}
                                        onTargetDialogIdChange={update('secondaryButtonTargetDialogId')}
                                        id={secondaryButton.id}
                                        onIdChange={update('secondaryButtonId')}
                                        suffix="secondary-button"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
