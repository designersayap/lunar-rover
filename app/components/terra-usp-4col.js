import styles from "./terra-usp-4col.module.css";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

/**
 * TerraUsp4col Component
 * 
 * A 4-column Unique Selling Point (USP) section.
 * Displays a section title and 3 feature cards.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.title - The section title
 * @param {Array} props.features - Array of feature objects {title, description}
 * @returns {JSX.Element} The rendered USP section
 */
export default function TerraUsp4col({ title, features }) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Section Title */}
                    <div className="col-mobile-2 col-tablet-4 col-desktop-3">
                        <div className={styles.sectionTitleWrapper}>
                            <h2 className={`h3 ${styles.sectionTitle}`}>
                                {title}
                            </h2>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    {features && features.map((feature, index) => (
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
