import styles from "./terra-banner-hero-with-button.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";

/**
 * TerraBannerHeroWithButton Component
 */
export default function TerraBannerHeroWithButton({
    title = "Hero Title",
    description = "Hero description goes here.",
    buttonText = "Get Started",
    showButton = true,
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-4 col-tablet-8 col-desktop-8 col-desktop-offset-2">
                        <div className={styles.contentWrapper}>
                            <div className={styles.titleWrapper}>
                                <BuilderText
                                    tagName="h1"
                                    className={`h1 ${styles.title}`}
                                    content={title}
                                    onChange={(val) => onUpdate && onUpdate({ title: val })}
                                />
                            </div>
                            <div className={styles.descriptionWrapper}>
                                <BuilderText
                                    tagName="p"
                                    className={`body-large ${styles.description}`}
                                    content={description}
                                    onChange={(val) => onUpdate && onUpdate({ description: val })}
                                />
                            </div>
                            {showButton && (
                                <div className={styles.buttonWrapper}>
                                    <BuilderButton
                                        label={buttonText}
                                        href="#"
                                        sectionId={sectionId}
                                        className="btn btn-primary btn-lg"
                                        onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
