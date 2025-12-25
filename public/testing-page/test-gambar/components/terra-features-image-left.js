import Link from 'next/link';
import styles from './terra-features-image-left.module.css';
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "./data";

function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = ["container-grid"];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}

/**
 * TerraFeaturesImageLeft Component
 */
export default function TerraFeaturesImageLeft({
    title = componentDefaults["feature-left"].title,
    subtitle = componentDefaults["feature-left"].subtitle,
    buttonText = componentDefaults["feature-left"].buttonText,
    buttonUrl = componentDefaults["feature-left"].buttonUrl,
    buttonVisible = componentDefaults["feature-left"].buttonVisible,
    buttonLinkType = componentDefaults["feature-left"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["feature-left"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["feature-left"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["feature-left"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["feature-left"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["feature-left"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["feature-left"].secondaryButtonTargetDialogId,
    image = componentDefaults["feature-left"].image,
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
        <section className={styles.container} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className="grid align-center">
                    <div className={`imageWrapper ${styles.imageWrapper} col-mobile-4 col-tablet-8 col-desktop-6`}>
                        {(imageVisible ?? true) && ((image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image)) ? (
                    <video src={image} controls autoPlay muted loop playsInline className="imagePlaceholder-1-1 shadow-md" id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ height: "auto" }} />
                ) : (image && /\.(mp3|wav)(\?.*)?$/i.test(image)) ? (
                    <audio src={image} controls className="imagePlaceholder-1-1 shadow-md" id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ height: "auto" }} />
                ) : (
                    <img src={image || null} alt="" className="imagePlaceholder-1-1 shadow-md" id={(imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ height: "auto" }} />
                ))}
                    </div>

                    <div className={`${styles.content} col-mobile-4 col-tablet-8 col-desktop-6`}>
                        <h2 className={`h2 ${styles.title}`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h2` : undefined)} style={{ marginBottom: "var(--gap-sm)" }}>{title}</h2>
                        <p className="subheader-h2" id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined)} style={{ color: "var(--content-neutral--caption)", marginBottom: "var(--gap-md)" }}>{subtitle}</p>
                        <div className="buttonWrapperLeft">
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
        </section>
    );
}
