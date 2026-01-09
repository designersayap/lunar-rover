
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import styles from "./header-section.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

export default function HeaderSection({
    title = componentDefaults["header-section"].title,
    subtitle = componentDefaults["header-section"].subtitle,
    sectionId,
    // Button props...
    buttonText = componentDefaults["header-section"].buttonText,
    buttonUrl = componentDefaults["header-section"].buttonUrl,
    buttonVisible = componentDefaults["header-section"].buttonVisible,
    buttonLinkType = componentDefaults["header-section"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["header-section"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["header-section"].buttonIconLeft,
    buttonIconRight = componentDefaults["header-section"].buttonIconRight,
    secondaryButtonText = componentDefaults["header-section"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-section"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-section"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["header-section"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["header-section"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["header-section"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["header-section"].secondaryButtonIconRight,
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
