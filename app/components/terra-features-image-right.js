import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-features-image-right.module.css";

/**
 * TerraFeaturesImageRight Component
 * 
 * A feature section displaying text on the left and an image on the right.
 * 
 * Layout:
 * - Desktop: Text (left, 6 cols) | Image (right, 6 cols)
 * - Tablet/Mobile: Text (top) | Image (bottom) - via CSS order
 * 
 * @component
 * @returns {JSX.Element} The rendered feature section
 */
export default function TerraFeaturesImageRight() {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    {/* Text Section */}
                    <div className={`col-2 col-tablet-8 col-desktop-6 ${styles.textWrapper}`}>
                        <h2 className={`h2 ${styles.title}`}>Title</h2>
                        <p className={`subheader-h2 ${styles.description}`}>Description</p>
                        <button className="btn btn-ghost btn-md">
                            More Info
                            <ArrowLongRightIcon />
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className={`col-2 col-tablet-8 col-desktop-6 ${styles.imageWrapper}`}>
                        <div className="imagePlaceholder-1-1">
                            {/* Placeholder for image */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
