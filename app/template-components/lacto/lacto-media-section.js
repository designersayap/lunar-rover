import styles from "./lacto-media-section.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";

const defaultContent = {
    image: "",
    imageVisible: true
};

export default function LactoMediaSection({
    image = defaultContent.image,
    imageId,
    imageVisible = defaultContent.imageVisible,
    sectionId,
    onUpdate
}) {
    return (
        <section className={styles.container}>
            <div className="container-grid">
                <div className="grid">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={styles.imageContainer}>
                            <BuilderImage
                                src={image}
                                className={`${styles.image} imagePlaceholder-16-9`}
                                id={imageId}
                                sectionId={sectionId}
                                isVisible={imageVisible}
                                onIdChange={(val) => onUpdate && onUpdate({ imageId: val })}
                                onVisibilityChange={(val) => onUpdate && onUpdate({ imageVisible: val })}
                                suffix="main-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
