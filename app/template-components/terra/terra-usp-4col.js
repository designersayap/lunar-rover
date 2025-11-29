import styles from "./terra-usp-4col.module.css";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import BuilderText from "../../page-builder-components/utils/BuilderText";

/**
 * TerraUsp4col Component
 */
export default function TerraUSP4Col({
    title = "Why Choose Terra?",
    features = [
        { title: "Lightning Fast", description: "Optimized for speed and performance." },
        { title: "Secure by Default", description: "Enterprise-grade security built-in." },
        { title: "Easy to Use", description: "Intuitive interface for everyone." },
        { title: "24/7 Support", description: "We are here to help you anytime." }
    ],
    onUpdate
}) {
    const handleFeatureUpdate = (index, field, value) => {
        if (!onUpdate) return;
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        onUpdate({ features: newFeatures });
    };

    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={styles.headerWrapper}>
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h2"
                                className={`h2 ${styles.title}`}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    {features.map((feature, index) => (
                        <div key={index} className="col-mobile-2 col-tablet-4 col-desktop-3">
                            <div className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <CheckCircleIcon className={styles.icon} />
                                </div>
                                <BuilderText
                                    initialText={feature.title}
                                    onUpdate={(updates) => handleFeatureUpdate(index, 'title', updates.title)}
                                    propName="title"
                                    as="h3"
                                    className={`h3 ${styles.cardTitle}`}
                                />
                                <BuilderText
                                    initialText={feature.description}
                                    onUpdate={(updates) => handleFeatureUpdate(index, 'description', updates.description)}
                                    propName="description"
                                    as="p"
                                    className={`body-regular ${styles.cardDescription}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
