import * as HeroIcons from "@heroicons/react/24/solid";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import styles from "./section.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function Section({
    title = componentDefaults["section"].title,
    subtitle = componentDefaults["section"].subtitle,
    sectionId,
    // Button props...
    buttonText = componentDefaults["section"].buttonText,
    buttonUrl = componentDefaults["section"].buttonUrl,
    buttonVisible = componentDefaults["section"].buttonVisible,
    buttonLinkType = componentDefaults["section"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["section"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["section"].buttonIconLeft,
    buttonIconRight = componentDefaults["section"].buttonIconRight,
    secondaryButtonText = componentDefaults["section"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["section"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["section"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["section"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["section"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["section"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["section"].secondaryButtonIconRight,
    buttonId,
    secondaryButtonId,
    buttonStyle = "primary",
    secondaryButtonStyle = "ghost",
    onUpdate,
    titleVisible = true,
    subtitleVisible = true,
    titleId,
    subtitleId
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <section className={`${styles.section}`} id={sectionId}>
            <div className={getContainerClasses({})}>
                <div className="grid">
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>
                        {titleVisible && (
                            <BuilderText
                                tagName="h2"
                                className={`h2 ${styles.title}`}
                                style={{ marginBottom: "var(--gap-md)" }}
                                content={title}
                                onChange={update('title')}
                                sectionId={sectionId}
                                id={titleId}
                                suffix="title"
                                onIdChange={update('titleId')}
                            />
                        )}
                        {subtitleVisible && (
                            <BuilderText
                                tagName="div"
                                className={`subheader-h1 ${styles.subtitle}`}
                                style={{ marginBottom: "var(--gap-lg)" }}
                                content={subtitle}
                                onChange={update('subtitle')}
                                sectionId={sectionId}
                                id={subtitleId}
                                suffix="subtitle"
                                onIdChange={update('subtitleId')}
                            />
                        )}
                        <div className="buttonWrapperCenter">
                            {buttonVisible && (
                                <BuilderButton
                                    label={buttonText}
                                    href={buttonUrl}
                                    isVisible={buttonVisible}
                                    sectionId={sectionId}
                                    className={`btn btn-${buttonStyle} btn-lg`}
                                    iconLeft={buttonIconLeft}
                                    iconRight={buttonIconRight}
                                    onLabelChange={update('buttonText')}
                                    onHrefChange={update('buttonUrl')}
                                    onVisibilityChange={update('buttonVisible')}
                                    onVariantChange={update('buttonStyle')}
                                    linkType={buttonLinkType}
                                    onLinkTypeChange={update('buttonLinkType')}
                                    targetDialogId={buttonTargetDialogId}
                                    onTargetDialogIdChange={update('buttonTargetDialogId')}
                                    onIconLeftChange={update('buttonIconLeft')}
                                    onIconRightChange={update('buttonIconRight')}
                                    id={buttonId}
                                    onIdChange={update('buttonId')}
                                    suffix="button"
                                />
                            )}
                            {secondaryButtonVisible && (
                                <BuilderButton
                                    label={secondaryButtonText}
                                    href={secondaryButtonUrl}
                                    isVisible={secondaryButtonVisible}
                                    sectionId={sectionId}
                                    className={`btn btn-${secondaryButtonStyle} btn-lg`}
                                    onLabelChange={update('secondaryButtonText')}
                                    onHrefChange={update('secondaryButtonUrl')}
                                    onVisibilityChange={update('secondaryButtonVisible')}
                                    onVariantChange={update('secondaryButtonStyle')}
                                    linkType={secondaryButtonLinkType}
                                    onLinkTypeChange={update('secondaryButtonLinkType')}
                                    targetDialogId={secondaryButtonTargetDialogId}
                                    onTargetDialogIdChange={update('secondaryButtonTargetDialogId')}
                                    iconLeft={secondaryButtonIconLeft}
                                    iconRight={secondaryButtonIconRight}
                                    onIconLeftChange={update('secondaryButtonIconLeft')}
                                    onIconRightChange={update('secondaryButtonIconRight')}
                                    id={secondaryButtonId}
                                    onIdChange={update('secondaryButtonId')}
                                    suffix="secondary-button"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
