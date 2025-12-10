import styles from "./lacto-media.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import { componentDefaults } from "../content/data";

/**
 * LactoMedia Component
 * Full width image using grid system
 */
export default function LactoMedia({
    image = componentDefaults["lacto-media"].image,
    imageId,
    imageVisible,
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className="imageWrapper">
                            <BuilderImage
                                src={image}
                                className={`${styles.image} imagePlaceholder-16-9 object-cover`}
                                id={imageId}
                                sectionId={sectionId}
                                isVisible={imageVisible}
                                onIdChange={(val) => onUpdate && onUpdate({ imageId: val })}
                                suffix="image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
