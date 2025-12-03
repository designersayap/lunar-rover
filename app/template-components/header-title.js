import styles from "./header-title.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import { componentDefaults } from "./content/data";

/**
 * Centered Header Section - Title Only
 */
export default function GlobalHeaderTitle({
    title = componentDefaults["header-title"].title,
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
                    </div>
                </div>
            </div>
        </section>
    );
}
