import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-features-image-right.module.css";

import BuilderText from "@/app/page-builder-components/common/BuilderText";

/**
 * TerraFeaturesImageRight Component
 */
export default function TerraFeaturesImageRight({
    buttonStyle = "primary",
    title = "Feature Title",
    description = "Detailed description of the feature goes here. Explain the benefits and how it helps the user.",
    buttonText = "Label",
    onUpdate
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Content Column */}
                    <div className={`${styles.content} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            style={{ marginBottom: "var(--gap-lg)" }}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                        />
                        <BuilderText
                            tagName="p"
                            className="subheader-h2"
                            style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-sm)" }}
                            content={description}
                            onChange={(val) => onUpdate && onUpdate({ description: val })}
                        />
                        <button className={`btn btn-${buttonStyle} btn-md`}>
                            <BuilderText
                                tagName="span"
                                content={buttonText}
                                onChange={(val) => onUpdate && onUpdate({ buttonText: val })}
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
