import styles from "./header-title-description.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import { componentDefaults } from "./content/data";

/**
 * Centered Header Section - Title with Description
 */
export default function GlobalHeaderTitleTitleDescription({
    title = componentDefaults["header-title-description"].title,
    subtitle = componentDefaults["header-title-description"].subtitle,
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
                    </div>
                </div>
            </div>
        </section>
    );
}
