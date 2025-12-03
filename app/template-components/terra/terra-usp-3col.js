import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-usp-3col.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import { componentDefaults } from "../content/component-defaults";

/**
 * TerraUsp3col Component
 */
export default function TerraUsp3col({
    title = componentDefaults["usp-3col"].title,
    features = componentDefaults["usp-3col"].features,
    buttonText = componentDefaults["usp-3col"].buttonText,
    buttonId,
    buttonStyle = "ghost", // primary, neutral, ghost, outline, link
    buttonSize = "md", // sm, md, lg
    onUpdate,
    sectionId
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
                <div className="grid">
                    <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                        <div className={styles.header}>
                            <BuilderText
                                tagName="h2"
                                className={`h2 ${styles.sectionTitle}`}
                                content={title}
                                onChange={(val) => onUpdate && onUpdate({ title: val })}
                                sectionId={sectionId}
                            />
                            <BuilderText
                                tagName="p"
                                className={`body-regular ${styles.sectionSubtitle}`}
                                content={subtitle}
                                onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                                sectionId={sectionId}
                            />
                        </div>
                    </div>

                    {/* Features Columns - Each spans 3 on Desktop (Total 9), 4 on Mobile/Tablet */}
                    {features.map((feature, index) => (
                        <div key={index} className="col-mobile-4 col-tablet-4 col-desktop-3">
                            <div className={styles.card}>
                                <BuilderText
                                    tagName="h3"
                                    className={`h4 ${styles.cardTitle}`}
                                    content={feature.title}
                                    onChange={(val) => handleFeatureUpdate(index, "title", val)}
                                    sectionId={sectionId}
                                />
                                <BuilderText
                                    tagName="p"
                                    className={`body-regular ${styles.description}`}
                                    content={feature.subtitle}
                                    onChange={(val) => handleFeatureUpdate(index, "subtitle", val)}
                                    sectionId={sectionId}
                                />
                                <BuilderButton
                                    label={buttonText}
                                    iconRight={<ArrowLongRightIcon className={styles.icon} />}
                                    href="#"
                                    suffix={index}
                                    sectionId={sectionId}
                                    className={`btn btn-${buttonStyle} btn-${buttonSize} ${styles.linkButton}`}
                                    onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                    id={buttonId}
                                    onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
