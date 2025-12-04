import { SparklesIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import styles from "./header-title-button.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import { componentDefaults } from "./content/data";

/**
 * Centered Header Section - Title with Button
 */
export default function GlobalHeaderTitleButton({
    title = componentDefaults["header-title-button"].title,
    subtitle = componentDefaults["header-title-button"].subtitle,
    buttonText = componentDefaults["header-title-button"].buttonText,
    secondaryButtonText = componentDefaults["header-title-button"].secondaryButtonText,
    buttonId,
    secondaryButtonId,
    buttonStyle = "primary", // primary, neutral, ghost, outline, link
    buttonSize = "lg", // sm, md, lg
    onUpdate,
    sectionId
}) {
    return (
        <section className={`${styles.section} z-sm`}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />
                        <div className="buttonWrapperCenter">
                            <BuilderButton
                                label={buttonText}
                                href="#"
                                sectionId={sectionId}
                                className={`btn btn-${buttonStyle} btn-md`}
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
                </div>
            </div>
        </section>
    );
}
