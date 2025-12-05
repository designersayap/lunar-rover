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
    secondaryButtonText = componentDefaults["header-title-description-button"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-title-description-button"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-title-description-button"].secondaryButtonVisible,
    buttonId,
    secondaryButtonId,
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
                    className="btn btn-primary btn-md"
                    iconRight={<ArrowLongRightIcon />}
                    onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                    onHrefChange={(val) => onUpdate && onUpdate({ buttonUrl: val })}
                    onVisibilityChange={(val) => onUpdate && onUpdate({ buttonVisible: val })}
                    // Primary button variant is hardcoded to primary here, could be dynamic
                    id={buttonId}
                    onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                    suffix="button"
                />
                <BuilderButton
                    label={secondaryButtonText}
                    href={secondaryButtonUrl}
                    isVisible={secondaryButtonVisible}
                    sectionId={sectionId}
                    className="btn btn-ghost btn-md"
                    onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                    onHrefChange={(val) => onUpdate && onUpdate({ secondaryButtonUrl: val })}
                    onVisibilityChange={(val) => onUpdate && onUpdate({ secondaryButtonVisible: val })}
                    id={secondaryButtonId}
                    onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                    suffix="secondary-button"
                />
            </div>
        </HeaderSection>
    );
}
