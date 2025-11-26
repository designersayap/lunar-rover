import styles from "./global-header-title.module.css";

/**
 * Centered Header Section - Title Only
 */
export default function GlobalHeaderTitle() {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        <h2 className={`h2 ${styles.title}`}>Title</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
