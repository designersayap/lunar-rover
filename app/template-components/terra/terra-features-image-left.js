import styles from "./terra-features-image-left.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "../content/component-defaults";

/**
 * TerraFeaturesImageLeft Component
 */
export default function TerraFeaturesImageLeft({
    buttonStyle = "primary",
    title = componentDefaults["feature-left"].title,
    subtitle = componentDefaults["feature-left"].subtitle,
    buttonText = componentDefaults["feature-left"].buttonText,
    buttonId,
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Image Column */}
                    <div className={`${styles.imageWrapper} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <div className="imagePlaceholder-1-1">
                            {/* Placeholder for Image */}
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className={`${styles.content} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            style={{ marginBottom: "var(--gap-lg)" }}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />
                        <BuilderText
                            tagName="p"
                            className="subheader-h2"
                            style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-sm)" }}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                            sectionId={sectionId}
                        />
                        <BuilderButton
                            label={buttonText}
                            href="#"
                            suffix="cta"
                            sectionId={sectionId}
                            className="btn btn-primary btn-lg"
                            onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                            id={buttonId}
                            onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
