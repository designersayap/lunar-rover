import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-features-image-right.module.css";

/**
 * TerraFeaturesImageRight Component
 */
import BuilderText from "../../page-builder-components/utils/BuilderText";

export default function TerraFeaturesImageRight({
    title = "Feature Title",
    description = "Detailed description of the feature goes here. Explain the benefits and how it helps the user.",
    buttonText = "Label",
    buttonStyle = "primary",
    onUpdate
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Content Column */}
                    <div className={`${styles.content} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderText
                            initialText={title}
                            onUpdate={onUpdate}
                            propName="title"
                            as="h2"
                            className={`h2 ${styles.title}`}
                            style={{ marginBottom: "var(--gap-lg)" }}
                        />
                        <BuilderText
                            initialText={description}
                            onUpdate={onUpdate}
                            propName="description"
                            as="p"
                            className="subheader-h2"
                            style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-sm)" }}
                        />
                        <button className={`btn btn-${buttonStyle} btn-md`}>
                            <BuilderText
                                initialText={buttonText}
                                onUpdate={onUpdate}
                                propName="buttonText"
                                as="span"
                                style={{ minWidth: "10px", display: "inline-block" }}
                            />
                        </button>
                    </div>

                    {/* Image Column */}
                    <div className={`${styles.imageWrapper} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <div className="imagePlaceholder-1-1">
                            {/* Placeholder for Image */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
