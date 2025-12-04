import styles from "./terra-features-image-left.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "../content/data";

/**
 * TerraFeaturesImageLeft Component
 */
export default function TerraFeaturesImageLeft({
    buttonStyle = "primary",
    title = componentDefaults["feature-left"].title,
    subtitle = componentDefaults["feature-left"].subtitle,
    buttonText = componentDefaults["feature-left"].buttonText,
    secondaryButtonText = componentDefaults["feature-left"].secondaryButtonText,
    image = componentDefaults["feature-left"].image,
    buttonId,
    secondaryButtonId,
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Image Column */}
                    <div className={`${styles.imageWrapper} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderImage src={image} className="imagePlaceholder-1-1" style={{ height: "auto" }} />
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
                        <div className={styles.buttonWrapper}>
                            <BuilderButton
                                label={buttonText}
                                href="#"
                                sectionId={sectionId}
                                className="btn btn-primary btn-md"
                                iconRight={<ArrowLongRightIcon />}
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                id={buttonId}
                                onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                            />
                            <BuilderButton
                                label={secondaryButtonText}
                                href="#"
                                sectionId={sectionId}
                                className="btn btn-ghost btn-md"
                                iconRight={<ArrowLongRightIcon />}
                                onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                id={secondaryButtonId}
                                onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
