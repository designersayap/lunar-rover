import styles from "./header-section.module.css";
import { getContainerClasses } from "./section-utils";
import { createUpdateHandler } from "./component-helpers";

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
};

// Shim for BuilderText
const BuilderText = ({ tagName = 'p', content, className, style, children, id, sectionId, suffix }) => {
  const Tag = tagName;
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  const effectiveSuffix = suffix || (className ? className.split(' ')[0] : tagName);
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + effectiveSuffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  return <Tag id={finalId} className={className} style={style}>{content || children}</Tag>;
};

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
                                onChange={undefined}
                                sectionId={sectionId}
                            />
                        )}
                        {subtitle && (
                            <BuilderText
                                tagName="p"
                                className={`subheader-h1 ${styles.subtitle}`}
                                style={subtitleStyle}
                                content={subtitle}
                                onChange={undefined}
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
