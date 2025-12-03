import styles from "./terra-banner-hero-with-button.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import { componentDefaults } from "../content/data";

/**
 * TerraBannerHeroWithButton Component
 */
export default function TerraBannerHeroWithButton({
    title = componentDefaults["hero-button"].title,
    subtitle = componentDefaults["hero-button"].subtitle,
    buttonText = componentDefaults["hero-button"].buttonText,
    buttonId,
    buttonStyle = "primary", // primary, neutral, ghost, outline, link
    buttonSize = "lg", // sm, md, lg
    showButton = true,
    onUpdate,
    sectionId
}) {
    return (
        <main className={styles.hero}>
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
                        {showButton && (
                            <div className={styles.buttonWrapper}>
                                <BuilderButton
                                    label={buttonText}
                                    href="#"
                                    suffix="cta"
                                    sectionId={sectionId}
                                    className="btn btn-primary btn-lg"
                                    onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                    id={buttonId}
                                    onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
