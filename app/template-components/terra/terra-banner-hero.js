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
    secondaryButtonText = componentDefaults["terra-banner-hero"].secondaryButtonText,
    buttonId,
    secondaryButtonId,
    buttonStyle = "primary",
    image = componentDefaults["terra-banner-hero"].image,
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
            {/* Grid Container */}
            <div className="container-grid">
                <div className="grid">
                    {/* Content Column */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>

                        {/* Hero Title */}
                        <BuilderText
                            tagName="h1"
                            className={`h1 ${styles.heroTitle}`}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />

                        {/* Hero Subtitle */}
                        <BuilderText
                            tagName="p"
                            className={`subheader-h1 ${styles.heroSubtitle}`}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                            sectionId={sectionId}
                        />

                        {/* Button */}
                        <div className="buttonWrapperCenter">
                            <BuilderButton
                                label={buttonText}
                                href="#"
                                sectionId={sectionId}
                                className={`btn btn-${buttonStyle || 'primary'} btn-lg`}
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                id={buttonId}
                                onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                            />
                            <BuilderButton
                                label={secondaryButtonText}
                                href="#"
                                sectionId={sectionId}
                                className="btn btn-outline btn-lg"
                                onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                id={secondaryButtonId}
                                onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
