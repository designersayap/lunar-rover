import styles from './header-section.module.css';

function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}

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
    

    return (
        <section className={`${styles.section} ${className}`} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className="grid">
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        {title && (
                            <h2 className={`h2 ${styles.title}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h2` : undefined)} style={titleStyle}>{title}</h2>
                        )}
                        {subtitle && (
                            <p className={`subheader-h1 ${styles.subtitle}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined)} style={subtitleStyle}>{subtitle}</p>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
