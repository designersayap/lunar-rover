import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import styles from "./terra-features-image-right.module.css";

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
                            <ArrowLongRightIcon className={styles.icon} />
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className={`col-2 col-tablet-8 col-desktop-6 ${styles.imageWrapper}`}>
                        <div className="imagePlaceholder">
                            {/* Placeholder for image */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
