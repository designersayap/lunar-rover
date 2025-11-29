import styles from "./terra-banner-hero-with-button.module.css";
import { SparklesIcon } from "@heroicons/react/24/outline";

import BuilderText from "../../page-builder-components/utils/BuilderText";

export default function TerraBannerHeroWithButton({
    title = "Build faster with Terra",
    description = "Terra provides the building blocks you need to create stunning websites in minutes, not days.",
    buttonText = "Get Started",
    onUpdate
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-8">
                        <div className={styles.contentWrapper}>
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h1"
                                className={`h1 ${styles.title}`}
                            />
                            <BuilderText
                                initialText={description}
                                onUpdate={onUpdate}
                                propName="description"
                                as="p"
                                className={`subheader-h1 ${styles.description}`}
                            />
                            <button className="btn btn-primary btn-lg">
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
