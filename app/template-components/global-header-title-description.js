import styles from "./global-header-title-description.module.css";
import BuilderText from "@/app/page-builder-components/common/BuilderText";

/**
 * Centered Header Section - Title and Subtitle Only
 */
export default function GlobalHeaderTitleDescription({
    title = "Title",
    subtitle = "Subtitle",
    onUpdate
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
                        />
                        <BuilderText
                            tagName="p"
                            className={`subheader-h1 ${styles.subtitle}`}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
