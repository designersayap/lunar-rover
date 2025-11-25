import { ArrowRightIcon } from "@heroicons/react/20/solid";
import styles from "./terra-section-usp.module.css";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

/**
 * USP Section (Unique Selling Points)
 * Displays a section with title and feature cards in a responsive grid
 */
export default function TerraSectionUsp() {
    const features = [
        {
            title: "Title",
            description: "Description",
        },
        {
            title: "Title",
            description: "Description",
        },
        {
            title: "Title",
            description: "Description",
        },
    ];

    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Section Title */}
                    <div className="col-mobile-2 col-tablet-4 col-desktop-3">
                        <div className={styles.sectionTitleWrapper}>
                            <h2 className={`h3 ${styles.sectionTitle}`}>
                                Why Choose Us
                            </h2>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="col-mobile-2 col-tablet-4 col-desktop-3"
                        >
                            <div className={styles.card}>
                                <h3 className={`h3 ${styles.cardTitle}`}>
                                    {feature.title}
                                </h3>
                                <p className={`body-regular ${styles.cardDescription}`}>
                                    {feature.description}
                                </p>
                                <button className="btn btn-ghost btn-md">
                                    More Info
                                    <ArrowLongRightIcon className={styles.icon} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
