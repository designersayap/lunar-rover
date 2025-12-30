import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import BuilderButton from "@/app/page-builder/utils/builder/builder-button";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import HeaderSection from "./header-section";

/**
 * Centered Header Section - Title with Description and Button
 */
export default function GlobalHeaderTitleButtonDescription({
    title = componentDefaults["header-title-description-button"].title,
    subtitle = componentDefaults["header-title-description-button"].subtitle,
    buttonText = componentDefaults["header-title-description-button"].buttonText,
    buttonUrl = componentDefaults["header-title-description-button"].buttonUrl,
    buttonVisible = componentDefaults["header-title-description-button"].buttonVisible,
    buttonLinkType = componentDefaults["header-title-description-button"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["header-title-description-button"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["header-title-description-button"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-title-description-button"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-title-description-button"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["header-title-description-button"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["header-title-description-button"].secondaryButtonTargetDialogId,
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
                <BuilderButton
                    label={buttonText}
                    href={buttonUrl}
                    isVisible={buttonVisible}
                    sectionId={sectionId}
                    className={`btn btn-${buttonStyle} btn-md`}
                    iconRight={<ArrowLongRightIcon />}
                    onLabelChange={update('buttonText')}
                    onHrefChange={update('buttonUrl')}
                    onVisibilityChange={update('buttonVisible')}
                    onVariantChange={update('buttonStyle')}
                    linkType={buttonLinkType}
                    onLinkTypeChange={update('buttonLinkType')}
                    targetDialogId={buttonTargetDialogId}
                    onTargetDialogIdChange={update('buttonTargetDialogId')}
                    id={buttonId}
                    onIdChange={update('buttonId')}
                    suffix="button"
                />
                <BuilderButton
                    label={secondaryButtonText}
                    href={secondaryButtonUrl}
                    isVisible={secondaryButtonVisible}
                    sectionId={sectionId}
                    className={`btn btn-${secondaryButtonStyle} btn-md`}
                    onLabelChange={update('secondaryButtonText')}
                    onHrefChange={update('secondaryButtonUrl')}
                    onVisibilityChange={update('secondaryButtonVisible')}
                    onVariantChange={update('secondaryButtonStyle')}
                    linkType={secondaryButtonLinkType}
                    onLinkTypeChange={update('secondaryButtonLinkType')}
                    targetDialogId={secondaryButtonTargetDialogId}
                    onTargetDialogIdChange={update('secondaryButtonTargetDialogId')}
                    id={secondaryButtonId}
                    onIdChange={update('secondaryButtonId')}
                    suffix="secondary-button"
                />
            </div>
        </HeaderSection>
    );
}
