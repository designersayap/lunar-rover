import styles from "./terra-testimony.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
import { componentDefaults } from "../content/data";

export default function TerraTestimony({
    testimonies = componentDefaults["terra-testimony"].testimonies,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const updateTestimony = (index, key, value) => {
        if (!onUpdate) return;
        const newTestimonies = [...testimonies];
        newTestimonies[index] = { ...newTestimonies[index], [key]: value };
        onUpdate({ testimonies: newTestimonies });
    };

    return (
        <section className={styles.container}>
            <BuilderSection
                sectionId={sectionId}
                fullWidth={fullWidth}
                removePaddingLeft={removePaddingLeft}
                removePaddingRight={removePaddingRight}
                onUpdate={onUpdate}
            >
                <div className="grid">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={`grid ${styles.cardsWrapper}`}>
                            {testimonies.map((item, index) => (
                                <div key={index} className={`col-mobile-2 col-tablet-4 col-desktop-3 ${styles.itemWrapper}`}>
                                    <div className={styles.card}>
                                        <BuilderImage
                                            src={item.image}
                                            className={`${styles.terraTestimoniImage} imagePlaceholder-4-5`}
                                            id={item.imageId}
                                            sectionId={sectionId}
                                            isVisible={item.imageVisible}
                                            onIdChange={(val) => updateTestimony(index, "imageId", val)}
                                            onVisibilityChange={(val) => updateTestimony(index, "imageVisible", val)}
                                            suffix={`background-${index}`}
                                        />

                                        <div className={styles.terraTestimoniDescriptionCard}>
                                            <div className={`imageWrapper ${styles.avatarImg}`}>
                                                <BuilderImage
                                                    src={item.avatar}
                                                    className={'imagePlaceholder-1-1'}
                                                    id={item.avatarId}
                                                    style={{ borderRadius: "var(--border-radius-round)" }}
                                                    sectionId={sectionId}
                                                    isVisible={item.avatarVisible}
                                                    onIdChange={(val) => updateTestimony(index, "avatarId", val)}
                                                    onVisibilityChange={(val) => updateTestimony(index, "avatarVisible", val)}
                                                    suffix={`avatar-${index}`}
                                                />
                                            </div>
                                            <BuilderText
                                                tagName="div"
                                                className={`h6`}
                                                content={item.name}
                                                onChange={(val) => updateTestimony(index, "name", val)}
                                                sectionId={sectionId}
                                            />
                                            <BuilderText
                                                tagName="div"
                                                className={`caption-regular ${styles.role}`}
                                                content={item.role}
                                                onChange={(val) => updateTestimony(index, "role", val)}
                                                sectionId={sectionId}
                                            />
                                            <BuilderText
                                                tagName="div"
                                                className={`caption-regular ${styles.description}`}
                                                content={item.description}
                                                onChange={(val) => updateTestimony(index, "description", val)}
                                                sectionId={sectionId}
                                                title={item.description}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.paginator}>
                            <div className={`${styles.dot} ${styles.activeDot}`}></div>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                        </div>
                    </div>
                </div>
            </BuilderSection>
        </section>
    );
}
