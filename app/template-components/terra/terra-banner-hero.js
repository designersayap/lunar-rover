import styles from "./terra-banner-hero.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder-components/utils/section-utils";

/**
 * TerraBannerHero Component
 */
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

    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`} id={sectionId}>
            <div className={styles.backgroundImage}>
                <BuilderImage
                    src={image}
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
                        <div className={`col-mobile-2 col-tablet-8 col-desktop-12 ${styles.content}`}>
                            <BuilderText
                                tagName="h1"
                                className={`h1 ${styles.heroTitle}`}
                                content={title}
                                onChange={update('title')}
                                sectionId={sectionId}
                            />
                            <BuilderText
                                tagName="p"
                                className={`subheader-h1 ${styles.heroSubtitle}`}
                                content={subtitle}
                                onChange={update('subtitle')}
                                sectionId={sectionId}
                            />
                            <div className="buttonWrapperCenter">
                                <BuilderButton
                                    label={buttonText}
                                    href={buttonUrl}
                                    isVisible={buttonVisible}
                                    sectionId={sectionId}
                                    className={`btn btn-${buttonStyle} btn-md`}
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
                    </div>
                </div>
            </div>
        </main>
    );
}
