import styles from "./global-header-title.module.css";
import BuilderText from "@/app/page-builder-components/common/BuilderText";

/**
 * Centered Header Section - Title Only
 */
export default function GlobalHeaderTitle({
    title = "Title",
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
                    </div>
                </div>
            </div>
        </section>
    );
}
