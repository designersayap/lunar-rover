import styles from "./terra-banner-hero.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import { componentDefaults } from "../content/data";

/**
 * TerraBannerHero Component
 */
export default function TerraBannerHero({
    title = componentDefaults["terra-banner-hero"].title,
    subtitle = componentDefaults["terra-banner-hero"].subtitle,
    buttonText = componentDefaults["terra-banner-hero"].buttonText,
    buttonUrl = componentDefaults["terra-banner-hero"].buttonUrl,
    buttonVisible = componentDefaults["terra-banner-hero"].buttonVisible,
    secondaryButtonText = componentDefaults["terra-banner-hero"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["terra-banner-hero"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["terra-banner-hero"].secondaryButtonVisible,
    image = componentDefaults["terra-banner-hero"].image,
    buttonStyle = "primary",
    buttonId,
    secondaryButtonId,
    onUpdate,
    sectionId
}) {
    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`}>
            <div className={styles.backgroundImage}>
                <BuilderImage
                    src={image}
                    className={styles.image}
                />
            </div>
            <div className={styles.overlay}>
                <div className={`container-grid ${styles.fullHeight}`}>
                    <div className={`grid ${styles.fullHeight}`}>
                        <div className={`col-mobile-4 col-tablet-8 col-desktop-12 ${styles.content}`}>
                            <BuilderText
                                tagName="h1"
                                className={`h1 ${styles.heroTitle}`}
                                content={title}
                                onChange={(val) => onUpdate && onUpdate({ title: val })}
                                sectionId={sectionId}
                            />
                            <BuilderText
                                tagName="p"
                                className={`subheader-h1 ${styles.heroSubtitle}`}
                                content={subtitle}
                                onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                                sectionId={sectionId}
                            />
                            <div className="buttonWrapperCenter">
                                <BuilderButton
                                    label={buttonText}
                                    href={buttonUrl}
                                    isVisible={buttonVisible}
                                    sectionId={sectionId}
                                    className={`btn btn-${buttonStyle || 'primary'} btn-lg`}
                                    onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                    onHrefChange={(val) => onUpdate && onUpdate({ buttonUrl: val })}
                                    onVisibilityChange={(val) => onUpdate && onUpdate({ buttonVisible: val })}
                                    onVariantChange={(val) => onUpdate && onUpdate({ buttonStyle: val })}
                                    id={buttonId}
                                    onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                                    suffix="button"
                                />
                                <BuilderButton
                                    label={secondaryButtonText}
                                    href={secondaryButtonUrl}
                                    isVisible={secondaryButtonVisible}
                                    sectionId={sectionId}
                                    className="btn btn-outline btn-lg"
                                    onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                    onHrefChange={(val) => onUpdate && onUpdate({ secondaryButtonUrl: val })}
                                    onVisibilityChange={(val) => onUpdate && onUpdate({ secondaryButtonVisible: val })}
                                    id={secondaryButtonId}
                                    onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
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
