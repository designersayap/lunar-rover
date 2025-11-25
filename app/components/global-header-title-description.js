import styles from "./global-header-title-description.module.css";

/**
 * Centered Header Section - Title and Subtitle Only
 * Displays a centered section with title and subtitle, but no button
 */
export default function GlobalHeaderTitleDescription() {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        <h2 className={`h2 ${styles.title}`}>Title</h2>
                        <p className={`subheader-h1 ${styles.subtitle}`}>Subtitle</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
