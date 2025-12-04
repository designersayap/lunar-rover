import styles from "./terra-features-image-right.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "../content/data";

/**
 * TerraFeaturesImageRight Component
 */
export default function TerraFeaturesImageRight({
    title = componentDefaults["feature-right"].title,
    subtitle = componentDefaults["feature-right"].subtitle,
    buttonText = componentDefaults["feature-right"].buttonText,
    secondaryButtonText = componentDefaults["feature-right"].secondaryButtonText,
    image = componentDefaults["feature-right"].image,
    buttonId,
    secondaryButtonId,
    onUpdate,
    sectionId
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
                            style={{ marginBottom: "var(--gap-sm)" }}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />
                        <BuilderText
                            tagName="p"
                            className="subheader-h2"
                            style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-md)" }}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                            sectionId={sectionId}
                        />
                        <div className="buttonWrapperLeft">
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
                                onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                id={secondaryButtonId}
                                onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                            />
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className={`imageWrapper ${styles.imageWrapper} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <BuilderImage src={image} className="imagePlaceholder-1-1" style={{ height: "auto" }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
