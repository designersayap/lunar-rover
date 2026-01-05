import * as HeroIcons from "@heroicons/react/24/solid";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import HeaderSection from "./header-section";

export default function GlobalHeaderTitleButtonDescription({
    title = componentDefaults["header-title-description-button"].title,
    subtitle = componentDefaults["header-title-description-button"].subtitle,
    buttonText = componentDefaults["header-title-description-button"].buttonText,
    buttonUrl = componentDefaults["header-title-description-button"].buttonUrl,
    buttonVisible = componentDefaults["header-title-description-button"].buttonVisible,
    buttonLinkType = componentDefaults["header-title-description-button"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["header-title-description-button"].buttonTargetDialogId,
    buttonIconLeft = componentDefaults["header-title-description-button"].buttonIconLeft,
    buttonIconRight = componentDefaults["header-title-description-button"].buttonIconRight,
    secondaryButtonText = componentDefaults["header-title-description-button"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-title-description-button"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-title-description-button"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["header-title-description-button"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["header-title-description-button"].secondaryButtonTargetDialogId,
    secondaryButtonIconLeft = componentDefaults["header-title-description-button"].secondaryButtonIconLeft,
    secondaryButtonIconRight = componentDefaults["header-title-description-button"].secondaryButtonIconRight,
    buttonId,
    secondaryButtonId,
    buttonStyle = "primary",
    secondaryButtonStyle = "ghost",
    onUpdate,
    sectionId
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <HeaderSection
            title={title}
            titleStyle={{ marginBottom: "var(--gap-md)" }}
            subtitle={subtitle}
            subtitleStyle={{ marginBottom: "var(--gap-lg)" }}
            onUpdate={onUpdate}
            sectionId={sectionId}
        >
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
        </HeaderSection>
    );
}
