import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-features-image-left.module.css";

/**
 * TerraFeaturesImageLeft Component
 * 
 * A feature section displaying an image on the left and text on the right.
 * 
 * Layout:
 * - Desktop: Image (left, 6 cols) | Text (right, 6 cols)
 * - Tablet/Mobile: Text (top) | Image (bottom) - via CSS order
 * 
 * @component
 * @returns {JSX.Element} The rendered feature section
 */
export default function TerraFeaturesImageLeft() {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    {/* Image Section */}
                    <div className={`col-2 col-tablet-8 col-desktop-6 ${styles.imageWrapper}`}>
                        <div className="imagePlaceholder-1-1">
                            {/* Placeholder for image */}
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className={`col-2 col-tablet-8 col-desktop-6 ${styles.textWrapper}`}>
                        <h2 className={`h2 ${styles.title}`}>Title</h2>
                        <p className={`subheader-h2 ${styles.description}`}>Description</p>
                        <button className="btn btn-ghost btn-md">
                            More Info
                            <ArrowLongRightIcon />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
