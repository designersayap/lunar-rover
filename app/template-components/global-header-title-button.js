import { ArrowLongRightIcon, SparklesIcon } from "@heroicons/react/20/solid";
import styles from "./global-header-title-button.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";

/**
 * Centered Header Section - Title with Button
 */
export default function GlobalHeaderTitleButton({
    title = "Title",
    buttonText = "Label",
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        <BuilderText
                            tagName="h2"
                            className={`h2 ${styles.title}`}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                        />
                        <BuilderButton
                            label={
                                <>
                                    <SparklesIcon />
                                    {buttonText}
                                    <ArrowLongRightIcon />
                                </>
                            }
                            href="#"
                            sectionId={sectionId}
                            className={`btn btn-primary btn-lg ${styles.button}`}
                            onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
