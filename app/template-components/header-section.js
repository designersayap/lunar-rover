import styles from "./header-section.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";

export default function HeaderSection({
    title,
    subtitle,
    children,
    sectionId,
    onUpdate,
    titleStyle = {},
    subtitleStyle = {},
    className = ""
}) {
    return (
        <section className={`${styles.section} ${className} z-sm`}>
            <div className="container-grid">
                <div className="grid">
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        {title && (
                            <BuilderText
                                tagName="h2"
                                className={`h2 ${styles.title}`}
                                style={titleStyle}
                                content={title}
                                onChange={(val) => onUpdate && onUpdate({ title: val })}
                                sectionId={sectionId}
                            />
                        )}
                        {subtitle && (
                            <BuilderText
                                tagName="p"
                                className={`subheader-h1 ${styles.subtitle}`}
                                style={subtitleStyle}
                                content={subtitle}
                                onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                                sectionId={sectionId}
                            />
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
