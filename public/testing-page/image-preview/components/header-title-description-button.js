import Link from 'next/link';
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "./data";
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
            
            sectionId={sectionId}
        >
            <div className="buttonWrapperCenter">
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
        </HeaderSection>
    );
}
