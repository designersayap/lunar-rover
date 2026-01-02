import styles from "./header-section.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";
import { createUpdateHandler } from "../utils/component-helpers";

export default function HeaderSection({
    title,
    subtitle,
    children,
    sectionId,
    onUpdate,
    titleStyle = {},
    subtitleStyle = {},
    className = "",
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <section className={`${styles.section} ${className}`} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className="grid">
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        {title && (
                            <BuilderText
                                tagName="h2"
                                className={`h2 ${styles.title}`}
                                style={titleStyle}
                                content={title}
                                onChange={update('title')}
                                sectionId={sectionId}
                            />
                        )}
                        {subtitle && (
                            <BuilderText
                                tagName="div"
                                className={`subheader-h1 ${styles.subtitle}`}
                                style={subtitleStyle}
                                content={subtitle}
                                onChange={update('subtitle')}
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
