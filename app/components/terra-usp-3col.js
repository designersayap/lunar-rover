import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-usp-3col.module.css";

/**
 * TerraUsp3col Component
 * 
 * A 3-column Unique Selling Point (USP) variant.
 * Displays a section title ("Why Choose Us") and 2 feature cards.
 * 
 * Layout:
 * - Desktop: 4 columns per card (3 items total including title = 12 cols)
 * - Tablet: 8 columns per card
 * - Mobile: Full width (2 columns)
 * 
 * @component
 * @returns {JSX.Element} The rendered USP section
 */
export default function TerraUsp3col() {
    const features = [
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
                    <div className="col-mobile-2 col-tablet-8 col-desktop-4">
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
                            className="col-mobile-2 col-tablet-8 col-desktop-4"
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
