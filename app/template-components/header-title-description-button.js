import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import { componentDefaults } from "./content/data";
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
                    onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                    onHrefChange={(val) => onUpdate && onUpdate({ buttonUrl: val })}
                    onVisibilityChange={(val) => onUpdate && onUpdate({ buttonVisible: val })}
                    onVariantChange={(val) => onUpdate && onUpdate({ buttonStyle: val })}
                    linkType={buttonLinkType}
                    onLinkTypeChange={(val) => onUpdate && onUpdate({ buttonLinkType: val })}
                    targetDialogId={buttonTargetDialogId}
                    onTargetDialogIdChange={(val) => onUpdate && onUpdate({ buttonTargetDialogId: val })}
                    id={buttonId}
                    onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                    suffix="button"
                />
                <BuilderButton
                    label={secondaryButtonText}
                    href={secondaryButtonUrl}
                    isVisible={secondaryButtonVisible}
                    sectionId={sectionId}
                    className={`btn btn-${secondaryButtonStyle} btn-md`}
                    onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                    onHrefChange={(val) => onUpdate && onUpdate({ secondaryButtonUrl: val })}
                    onVisibilityChange={(val) => onUpdate && onUpdate({ secondaryButtonVisible: val })}
                    onVariantChange={(val) => onUpdate && onUpdate({ secondaryButtonStyle: val })}
                    linkType={secondaryButtonLinkType}
                    onLinkTypeChange={(val) => onUpdate && onUpdate({ secondaryButtonLinkType: val })}
                    targetDialogId={secondaryButtonTargetDialogId}
                    onTargetDialogIdChange={(val) => onUpdate && onUpdate({ secondaryButtonTargetDialogId: val })}
                    id={secondaryButtonId}
                    onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                    suffix="secondary-button"
                />
            </div>
        </HeaderSection>
    );
}
