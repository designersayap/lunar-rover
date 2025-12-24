import styles from './media-16-9.module.css';
import { componentDefaults } from "./data";

function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}

/**
 * Media16x9 Component
 * Full width image using grid system
 */
export default function Media16x9({
    image = componentDefaults["media-16-9"].image,
    imageId,
    imageVisible,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight,
    imageHref,
    imageLinkType,
    imageTargetDialogId,
    imageIsPortrait,
    imageMobileRatio
}) {
    

    return (
        <section className={styles.container} id={sectionId}>
<div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>

            <div className="grid">
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div className="imageWrapper">
                        {(imageVisible ?? true) && ((image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image)) ? (
                    <video src={image} controls autoPlay muted loop playsInline className={`${styles.image} imagePlaceholder-16-9 object-cover`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (image && /\.(mp3|wav)(\?.*)?$/i.test(image)) ? (
                    <audio src={image} controls className={`${styles.image} imagePlaceholder-16-9 object-cover`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (
                    <img src={image || null} alt="" className={`${styles.image} imagePlaceholder-16-9 object-cover`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ))}
                    </div>
                </div>
            </div>
        
</div>
</section>
    );
}
