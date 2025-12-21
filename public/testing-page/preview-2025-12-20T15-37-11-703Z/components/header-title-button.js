import Link from 'next/link';
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "./data";
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
    buttonLinkType = componentDefaults["header-title-button"].buttonLinkType || "url",
    buttonTargetDialogId = componentDefaults["header-title-button"].buttonTargetDialogId,
    secondaryButtonText = componentDefaults["header-title-button"].secondaryButtonText,
    secondaryButtonUrl = componentDefaults["header-title-button"].secondaryButtonUrl,
    secondaryButtonVisible = componentDefaults["header-title-button"].secondaryButtonVisible,
    secondaryButtonLinkType = componentDefaults["header-title-button"].secondaryButtonLinkType || "url",
    secondaryButtonTargetDialogId = componentDefaults["header-title-button"].secondaryButtonTargetDialogId,
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
            titleStyle={{ marginBottom: "var(--gap-lg)" }}
            
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
