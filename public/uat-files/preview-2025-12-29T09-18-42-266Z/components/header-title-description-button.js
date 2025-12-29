import Link from 'next/link';
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { componentDefaults } from "./data";
import { createUpdateHandler } from "./component-helpers";
import HeaderSection from "./header-section";

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
};

// Shim for BuilderButton
const BuilderButton = ({ label, href, openInNewTab, className, style, children, linkType, targetDialogId, id, sectionId, suffix }) => {
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  if (linkType === 'dialog' && targetDialogId) {
    return (
      <button
        id={finalId}
        className={className}
        style={style}
        onClick={(e) => {
             e.preventDefault();
             openDialog(targetDialogId);
        }}
      >
        {label || children}
      </button>
    );
  }
  return (
    <Link 
      id={finalId}
      href={href || '#'} 
      className={className} 
      style={style}
      target={openInNewTab ? '_blank' : undefined}
    >
        {label || children}
    </Link>
  );
};

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
                    onLabelChange={undefined}
                    onHrefChange={undefined}
                    onVisibilityChange={undefined}
                    onVariantChange={undefined}
                    linkType={buttonLinkType}
                    onLinkTypeChange={undefined}
                    targetDialogId={buttonTargetDialogId}
                    onTargetDialogIdChange={undefined}
                    id={buttonId}
                    onIdChange={undefined}
                    suffix="button"
                />
                <BuilderButton
                    label={secondaryButtonText}
                    href={secondaryButtonUrl}
                    isVisible={secondaryButtonVisible}
                    sectionId={sectionId}
                    className={`btn btn-${secondaryButtonStyle} btn-md`}
                    onLabelChange={undefined}
                    onHrefChange={undefined}
                    onVisibilityChange={undefined}
                    onVariantChange={undefined}
                    linkType={secondaryButtonLinkType}
                    onLinkTypeChange={undefined}
                    targetDialogId={secondaryButtonTargetDialogId}
                    onTargetDialogIdChange={undefined}
                    id={secondaryButtonId}
                    onIdChange={undefined}
                    suffix="secondary-button"
                />
            </div>
        </HeaderSection>
    );
}
