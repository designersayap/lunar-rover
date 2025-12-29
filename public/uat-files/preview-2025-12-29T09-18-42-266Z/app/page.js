"use client";

import HeaderTitleDescriptionButton from "@/components/header-title-description-button.js";
import Media169 from "@/components/media-16-9.js";
import StickyManager from "@/utils/sticky-manager";

export default function ExportedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <StickyManager stickyIndices={[]}>
      <HeaderTitleDescriptionButton thumbnail="/assets/asset-volfo-header-title-desc-button.svg" buttons={[{"label":"Button","propId":"buttonId","suffix":"button","labelProp":"buttonText","visibleProp":"buttonVisible","linkTypeProp":"buttonLinkType"},{"label":"Secondary Button","propId":"secondaryButtonId","suffix":"secondary-button","labelProp":"secondaryButtonText","visibleProp":"secondaryButtonVisible","linkTypeProp":"secondaryButtonLinkType"}]} sectionId="header-5573" props={{"buttonStyle":"primary","buttonLinkType":"url","secondaryButtonLinkType":"url","buttonText":"Label","secondaryButtonText":"Label"}} buttonStyle="primary" buttonLinkType="url" secondaryButtonLinkType="url" buttonText="Label" secondaryButtonText="Label" />
      <Media169 thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} sectionId="media-7430" props={{"image":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg","imageLinkType":"url","imageMobileRatio":"4-5"}} imageIsPortrait="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" image="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" imageLinkType="url" imageMobileRatio="4-5" />
      </StickyManager>
    </main>
  );
}
