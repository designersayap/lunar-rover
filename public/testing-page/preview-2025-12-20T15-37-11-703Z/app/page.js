"use client";

import LactoNavigation from "@/components/lacto-navigation.js";
import BannerInformation from "@/components/banner-information.js";
import HeaderTitle from "@/components/header-title.js";
import HeaderTitleButton from "@/components/header-title-button.js";

export default function ExportedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LactoNavigation thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Logo","propId":"logoId","suffix":"logo"}]} links={[{"label":"Menu 1","propId":"menu1Id","suffix":"menu-1","labelProp":"menu1Label","visibleProp":"menu1Visible","linkTypeProp":"menu1LinkType"},{"label":"Menu 2","propId":"menu2Id","suffix":"menu-2","labelProp":"menu2Label","visibleProp":"menu2Visible","linkTypeProp":"menu2LinkType"},{"label":"Menu 3","propId":"menu3Id","suffix":"menu-3","labelProp":"menu3Label","visibleProp":"menu3Visible","linkTypeProp":"menu3LinkType"},{"label":"Menu 4","propId":"menu4Id","suffix":"menu-4","labelProp":"menu4Label","visibleProp":"menu4Visible","linkTypeProp":"menu4LinkType"}]} sectionId="navigation-1011" props={{"menu1Label":"Menu 1","menu1Url":"","menu2Label":"Menu 2","menu2Url":"","menu3Label":"Menu 3","menu3Url":"","menu4Label":"Menu 4","menu4Url":""}} component={undefined} menu1Label="Menu 1" menu1Url="" menu2Label="Menu 2" menu2Url="" menu3Label="Menu 3" menu3Url="" menu4Label="Menu 4" menu4Url="" />
      <BannerInformation thumbnail="/images/thumbnails/banner-info.svg" buttons={[{"label":"Button","propId":"buttonId","suffix":"button","labelProp":"buttonText","visibleProp":"buttonVisible","linkTypeProp":"buttonLinkType"}]} sectionId="osm-6291" props={{"title":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.","buttonText":"Label","buttonLinkType":"url","buttonUrl":""}} component={undefined} title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." buttonText="Label" buttonLinkType="url" buttonUrl="" />
      <HeaderTitle thumbnail="/images/thumbnails/header-title.svg" sectionId="header-7645" props={{}} component={undefined} />
      <HeaderTitleButton thumbnail="/images/thumbnails/header-title-button.svg" buttons={[{"label":"Button","propId":"buttonId","suffix":"button","labelProp":"buttonText","visibleProp":"buttonVisible","linkTypeProp":"buttonLinkType"},{"label":"Secondary Button","propId":"secondaryButtonId","suffix":"secondary-button","labelProp":"secondaryButtonText","visibleProp":"secondaryButtonVisible","linkTypeProp":"secondaryButtonLinkType"}]} sectionId="header-9190" props={{"buttonStyle":"primary","buttonLinkType":"url","secondaryButtonLinkType":"url","buttonText":"Label","secondaryButtonText":"Label"}} component={undefined} buttonStyle="primary" buttonLinkType="url" secondaryButtonLinkType="url" buttonText="Label" secondaryButtonText="Label" />
    </main>
  );
}
