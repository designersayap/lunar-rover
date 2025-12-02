import { SparklesIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import styles from "./header-title-description-button.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import { componentDefaults } from "./content/component-defaults";

/**
 * Centered Header Section - Title with Description and Button
 */
export default function GlobalHeaderTitleButtonDescription({
    title = componentDefaults["header-title-desc-button"].title,
    subtitle = componentDefaults["header-title-desc-button"].subtitle,
    buttonText = componentDefaults["header-title-desc-button"].buttonText,
    buttonStyle = "primary", // primary, neutral, ghost, outline, link
    buttonSize = "lg", // sm, md, lg
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />
                        <BuilderText
                            tagName="p"
                            className={`subheader-h1 ${styles.subtitle}`}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                            sectionId={sectionId}
                        />
                        <BuilderButton
                            label={buttonText}
                            iconLeft={<SparklesIcon />}
                            iconRight={<ArrowLongRightIcon />}
                            href="#"
                            sectionId={sectionId}
                            className={`btn btn-${buttonStyle} btn-${buttonSize} ${styles.button}`}
                            onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
