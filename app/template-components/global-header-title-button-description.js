import { ArrowLongRightIcon, SparklesIcon } from "@heroicons/react/20/solid";
import styles from "./global-header-title-button-description.module.css";

/**
 * Centered Header Section - Title with Button
 */
import BuilderText from "../page-builder-components/utils/BuilderText";

export default function GlobalHeaderTitleButtonDescription({ title = "Title", subtitle = "Subtitle", buttonText = "Label", onUpdate }) {
    return (
        <section className="global-header-title-button-description">
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className="flex-between-center">
                            <div>
                                <BuilderText
                                    initialText={title}
                                    onUpdate={onUpdate}
                                    propName="title"
                                    as="h2"
                                    className="h2"
                                    style={{ marginBottom: "var(--gap-sm)" }}
                                />
                                <BuilderText
                                    initialText={subtitle}
                                    onUpdate={onUpdate}
                                    propName="subtitle"
                                    as="p"
                                    className="body-regular"
                                    style={{ color: "var(--content-neutral--caption)" }}
                                />
                            </div>
                            <button className="btn btn-primary btn-md">
                                <BuilderText
                                    initialText={buttonText}
                                    onUpdate={onUpdate}
                                    propName="buttonText"
                                    as="span"
                                    style={{ minWidth: "10px", display: "inline-block" }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
