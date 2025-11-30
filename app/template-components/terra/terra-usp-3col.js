import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-usp-3col.module.css";

import BuilderText from "@/app/page-builder-components/utils/BuilderText";

/**
 * TerraUsp3col Component
 */
export default function TerraUsp3col({
    title = "Why Choose Us",
    features = [
        { title: "Title", description: "Description" },
        { title: "Title", description: "Description" },
        { title: "Title", description: "Description" },
    ],
    onUpdate
}) {
    const handleFeatureUpdate = (index, key, value) => {
        if (!onUpdate) return;
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [key]: value };
        onUpdate({ features: newFeatures });
    };

    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Section Title */}
                    <div className="col-mobile-2 col-tablet-8 col-desktop-4">
                        <div className={styles.sectionTitleWrapper}>
                            <BuilderText
                                tagName="h2"
                                className={`h3 ${styles.sectionTitle}`}
                                content={title}
                                onChange={(val) => onUpdate && onUpdate({ title: val })}
                            />
                        </div>
                    </div>

                    {/* Feature Cards */}
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="col-mobile-2 col-tablet-8 col-desktop-4"
                        >
                            <div className={styles.card}>
                                <BuilderText
                                    tagName="h3"
                                    className={`h3 ${styles.cardTitle}`}
                                    content={feature.title}
                                    onChange={(val) => handleFeatureUpdate(index, "title", val)}
                                />
                                <BuilderText
                                    tagName="p"
                                    className={`body-regular ${styles.cardDescription}`}
                                    content={feature.description}
                                    onChange={(val) => handleFeatureUpdate(index, "description", val)}
                                />
                                <button className="btn btn-ghost btn-md">
                                    More Info
                                    <ArrowLongRightIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
