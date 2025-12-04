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
    secondaryButtonText = componentDefaults["header-title-button"].secondaryButtonText,
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
                    href="#"
                    sectionId={sectionId}
                    className={`btn btn-${buttonStyle} btn-md`}
                    iconRight={<ArrowLongRightIcon />}
                    onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                    id={buttonId}
                    onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                />
                <BuilderButton
                    label={secondaryButtonText}
                    href="#"
                    sectionId={sectionId}
                    className="btn btn-ghost btn-md"
                    onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                    id={secondaryButtonId}
                    onIdChange={(val) => onUpdate && onUpdate({ secondaryButtonId: val })}
                />
            </div>
        </HeaderSection>
    );
}
