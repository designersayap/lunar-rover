import * as HeroIcons from "@heroicons/react/24/solid";
import styles from "./terra-banner-hero.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function HeroTerraBanner({
    title = componentDefaults["hero-terra-banner"].title,
    subtitle = componentDefaults["hero-terra-banner"].subtitle,
    buttonText = componentDefaults["hero-terra-banner"].buttonText,
    buttonUrl = componentDefaults["hero-terra-banner"].buttonUrl,
    buttonVisible = componentDefaults["hero-terra-banner"].buttonVisible,
    buttonLinkType = "url",
    buttonTargetDialogId = componentDefaults["hero-terra-banner"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["hero-terra-banner"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["hero-terra-banner"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["hero-terra-banner"].secondaryButtonVisible,
    secondaryButtonLinkType = "url",
    secondaryButtonTargetDialogId = componentDefaults["hero-terra-banner"].secondaryButtonTargetDialogId,
    buttonIconLeft = componentDefaults["hero-terra-banner"].buttonIconLeft,
    buttonIconRight = componentDefaults["hero-terra-banner"].buttonIconRight,
    secondaryButtonIconLeft = componentDefaults["hero-terra-banner"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["hero-terra-banner"].secondaryButtonIconRight,
    image = componentDefaults["hero-terra-banner"].image,
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

    // Helper to resolve icon string to component
    // Helper to resolve icon string to component
    // Removed: BuilderButton now handles icon resolution

    const defaults = componentDefaults["hero-terra-banner"];

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
                            {titleVisible && (
                                <BuilderText
                                    tagName="h1"
                                    className={`h1 ${styles.heroTitle}`}
                                    content={title || defaults.title}
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
                                    className={`subheader-h1 ${styles.heroSubtitle}`}
                                    content={subtitle || defaults.subtitle}
                                    onChange={update('subtitle')}
                                    sectionId={sectionId}
                                    id={subtitleId}
                                    suffix="subtitle"
                                    onIdChange={update('subtitleId')}
                                />
                            )}
                            <div className="buttonWrapperCenter">
                                {primaryButton.visible && (
                                    <BuilderButton
                                        label={primaryButton.text}
                                        href={primaryButton.url}
                                        isVisible={primaryButton.visible}
                                        sectionId={sectionId}
                                        className={`btn btn-${primaryButton.style} btn-lg`}
                                        iconLeft={buttonIconLeft}
                                        iconRight={buttonIconRight}
                                        onLabelChange={update('buttonText')}
                                        onHrefChange={update('buttonUrl')}
                                        onVisibilityChange={update('buttonVisible')}
                                        onVariantChange={update('buttonStyle')}
                                        linkType={primaryButton.linkType}
                                        onLinkTypeChange={update('buttonLinkType')}
                                        targetDialogId={primaryButton.targetDialogId}
                                        onTargetDialogIdChange={update('buttonTargetDialogId')}
                                        onIconLeftChange={update('buttonIconLeft')}
                                        onIconRightChange={update('buttonIconRight')}
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
                                        iconLeft={secondaryButtonIconLeft}
                                        iconRight={secondaryButtonIconRight}
                                        onIconLeftChange={update('secondaryButtonIconLeft')}
                                        onIconRightChange={update('secondaryButtonIconRight')}
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
