import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import { componentDefaults } from "./content/data";
import HeaderSection from "./header-section";

/**
 * Centered Header Section - Title with Button
 */
export default function GlobalHeaderTitleButton({
    title = componentDefaults["header-title-button"].title,
    subtitle = componentDefaults["header-title-button"].subtitle,
    buttonText = componentDefaults["header-title-button"].buttonText,
    buttonUrl = componentDefaults["header-title-button"].buttonUrl,
    buttonVisible = componentDefaults["header-title-button"].buttonVisible,
    secondaryButtonText = componentDefaults["header-title-button"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-title-button"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-title-button"].secondaryButtonVisible,
    buttonId,
    secondaryButtonId,
    buttonStyle = "primary", // primary, neutral, ghost, outline, link
    buttonSize = "md", // sm, md, lg
    onUpdate,
    sectionId
}) {
    return (
        <HeaderSection
            title={title}
            titleStyle={{ marginBottom: "var(--gap-lg)" }}
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
                    // Secondary button variant is hardcoded to ghost for now, or we could add a prop for it
                    id={secondaryButtonId}
                    onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                    suffix="secondary-button"
                />
            </div>
        </HeaderSection>
    );
}
