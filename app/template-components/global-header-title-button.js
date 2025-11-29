import styles from "./global-header-title-button.module.css";
import BuilderText from "../page-builder-components/utils/BuilderText";

/**
 * Centered Header Section - Title with Button
 */
export default function GlobalHeaderTitleButton({
    title = "Title",
    buttonText = "Label",
    onUpdate
}) {
    return (
        <section className="global-header-title-button">
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className="flex-between-center">
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h2"
                                className="h2"
                            />
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
