
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import styles from "./header-section.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function HeaderGroup({
    title = componentDefaults["header-group"].title,
    subtitle = componentDefaults["header-group"].subtitle,
    sectionId,
    // Button props...
    buttonText = componentDefaults["header-group"].buttonText,
    buttonUrl = componentDefaults["header-group"].buttonUrl,
    buttonVisible = componentDefaults["header-group"].buttonVisible,
    buttonLinkType = componentDefaults["header-group"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["header-group"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["header-group"].buttonIconLeft,
    buttonIconRight = componentDefaults["header-group"].buttonIconRight,
    secondaryButtonText = componentDefaults["header-group"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-group"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-group"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["header-group"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["header-group"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["header-group"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["header-group"].secondaryButtonIconRight,
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
                        {subtitleVisible && (
                            <BuilderText
                                tagName="div"
                                className={`subheader-h2 ${styles.category}`}
                                style={{ marginBottom: "var(--gap-lg)" }}
                                content={subtitle}
                                onChange={update('subtitle')}
                                sectionId={sectionId}
                                id={subtitleId}
                                suffix="subtitle"
                                onIdChange={update('subtitleId')}
                            />
                        )}
                        {titleVisible && (
                            <BuilderText
                                tagName="h2"
                                className={`h3 ${styles.title}`}
                                style={{ marginBottom: "var(--gap-md)" }}
                                content={title}
                                onChange={update('title')}
                                sectionId={sectionId}
                                id={titleId}
                                suffix="title"
                                onIdChange={update('titleId')}
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
