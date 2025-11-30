import { ArrowLongRightIcon, SparklesIcon } from "@heroicons/react/20/solid";
import styles from "./global-header-title-button.module.css";
import BuilderText from "@/app/page-builder-components/common/BuilderText";

/**
 * Centered Header Section - Title with Button
 */
export default function GlobalHeaderTitleButton({
    title = "Title",
    buttonText = "Label",
    onUpdate
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
                        <button className={`btn btn-primary btn-lg ${styles.button}`}>
                            <SparklesIcon />
                            <BuilderText
                                tagName="span"
                                content={buttonText}
                                onChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                            />
                            <ArrowLongRightIcon />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
