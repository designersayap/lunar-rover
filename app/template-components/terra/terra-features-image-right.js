import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-features-image-right.module.css";

/**
 * TerraFeaturesImageRight Component
 */
export default function TerraFeaturesImageRight({ buttonStyle = "primary" }) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid align-center">
                    {/* Content Column */}
                    <div className={`${styles.content} col-mobile-2 col-tablet-8 col-desktop-6`}>
                        <h2 className={`h2 ${styles.title}`} style={{ marginBottom: "var(--gap-lg)" }}>
                            Feature Title
                        </h2>
                        <p className="subheader-h2" style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-sm)" }}>
                            Detailed description of the feature goes here. Explain the benefits and how it helps the user.
                        </p>
                        <button className={`btn btn-${buttonStyle} btn-md`}>
                            Label
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
