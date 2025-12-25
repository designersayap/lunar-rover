import Link from 'next/link';
import styles from './terra-banner-hero.module.css';
import { componentDefaults } from "./data";

function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}

/**
 * TerraBannerHero Component
 */
export default function TerraBannerHero({
    title = componentDefaults["terra-banner-hero"].title,
    subtitle = componentDefaults["terra-banner-hero"].subtitle,
    buttonText = componentDefaults["terra-banner-hero"].buttonText,
    buttonUrl = componentDefaults["terra-banner-hero"].buttonUrl,
    buttonVisible = componentDefaults["terra-banner-hero"].buttonVisible,
    buttonLinkType = "url",
    buttonTargetDialogId = componentDefaults["terra-banner-hero"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["terra-banner-hero"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["terra-banner-hero"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["terra-banner-hero"].secondaryButtonVisible,
    secondaryButtonLinkType = "url",
    secondaryButtonTargetDialogId = componentDefaults["terra-banner-hero"].secondaryButtonTargetDialogId,
    image = componentDefaults["terra-banner-hero"].image,
    imageId,
    imageVisible,
    buttonStyle = "primary",
    secondaryButtonStyle = "ghost",
    buttonId,
    secondaryButtonId,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    

    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`} id={sectionId}>
            <div className={styles.backgroundImage}>
                {(imageVisible ?? true) && ((image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image)) ? (
                    <video src={image} controls autoPlay muted loop playsInline className={`${styles.image} object-cover`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (image && /\.(mp3|wav)(\?.*)?$/i.test(image)) ? (
                    <audio src={image} controls className={`${styles.image} object-cover`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ) : (
                    <img src={image || null} alt="" className={`${styles.image} object-cover`} id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} />
                ))}
            </div>
            <div className={styles.overlay}>
                <div className={`${getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })} ${styles.fullHeight}`}>
                    <div className={`grid ${styles.fullHeight}`}>
                        <div className={`col-mobile-4 col-tablet-8 col-desktop-12 ${styles.content}`}>
                            <h1 className={`h1 ${styles.heroTitle}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h1` : undefined)}>{title}</h1>
                            <p className={`subheader-h1 ${styles.heroSubtitle}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined)}>{subtitle}</p>
                            <div className="buttonWrapperCenter">
                                <Link href={(
                   (buttonLinkType === 'dialog' && buttonTargetDialogId)
                     ? '#' + buttonTargetDialogId
                     : (buttonUrl || "#")
                )} className={`btn btn-${buttonStyle} btn-md`} id={(buttonId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-button` : undefined))} onClick={(e) => { if (buttonLinkType === 'dialog' && buttonTargetDialogId) { window.location.hash = '#' + buttonTargetDialogId; } }}>{buttonText}</Link>
                                <Link href={(
                   (secondaryButtonLinkType === 'dialog' && secondaryButtonTargetDialogId)
                     ? '#' + secondaryButtonTargetDialogId
                     : (secondaryButtonUrl || "#")
                )} className={`btn btn-${secondaryButtonStyle} btn-md`} id={(secondaryButtonId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-secondary-button` : undefined))} onClick={(e) => { if (secondaryButtonLinkType === 'dialog' && secondaryButtonTargetDialogId) { window.location.hash = '#' + secondaryButtonTargetDialogId; } }}>{secondaryButtonText}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
