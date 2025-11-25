import { ArrowLongRightIcon, SparklesIcon } from "@heroicons/react/20/solid";
import styles from "./global-header-title-button-description.module.css";

/**
 * Centered Header Section
 * Displays a centered section with title, subtitle, and CTA button
 */
export default function GlobalHeaderTitleButtonDescription() {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        <h2 className={`h2 ${styles.title}`}>Title</h2>
                        <p className={`subheader-h1 ${styles.subtitle}`}>Subtitle</p>
                        <button className={`btn btn-brand-solid btn-lg ${styles.button}`}>
                            <SparklesIcon className={styles.icon} />
                            Label
                            <ArrowLongRightIcon className={styles.icon} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
