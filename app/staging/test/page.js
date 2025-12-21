"use client";

import { data as stagingData } from "./data";
import LactoNavigation from "@/app/template-components/lacto/lacto-navigation";
import BannerInformation from "@/app/template-components/osm/banner-information";
import HeaderTitleDescription from "@/app/template-components/header/header-title-description";
import HeaderTitle from "@/app/template-components/header/header-title";

export default function StagingPage() {

    const handleUpdate = async (uniqueId, newData) => {
        try {
            await fetch('/api/save-staging-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folderName: "test",
                    componentId: uniqueId,
                    updates: newData
                })
            });
            console.log("Saved update for", uniqueId);
        } catch (e) {
            console.error("Failed to save update", e);
        }
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LactoNavigation thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Logo","propId":"logoId","suffix":"logo"}]} links={[{"label":"Menu 1","propId":"menu1Id","suffix":"menu-1","labelProp":"menu1Label","visibleProp":"menu1Visible","linkTypeProp":"menu1LinkType"},{"label":"Menu 2","propId":"menu2Id","suffix":"menu-2","labelProp":"menu2Label","visibleProp":"menu2Visible","linkTypeProp":"menu2LinkType"},{"label":"Menu 3","propId":"menu3Id","suffix":"menu-3","labelProp":"menu3Label","visibleProp":"menu3Visible","linkTypeProp":"menu3LinkType"},{"label":"Menu 4","propId":"menu4Id","suffix":"menu-4","labelProp":"menu4Label","visibleProp":"menu4Visible","linkTypeProp":"menu4LinkType"}]} props={{"menu1Label":"Menu 1","menu1Url":"","menu2Label":"Menu 2","menu2Url":"","menu3Label":"Menu 3","menu3Url":"","menu4Label":"Menu 4","menu4Url":""}} component={undefined} menu1Label="Menu 1" menu1Url="" menu2Label="Menu 2" menu2Url="" menu3Label="Menu 3" menu3Url="" menu4Label="Menu 4" menu4Url="" sectionId="navigation-9926" {...stagingData['navigation-9926']} onUpdate={(newData) => handleUpdate('navigation-9926', newData)} />
      <BannerInformation thumbnail="/images/thumbnails/banner-info.svg" buttons={[{"label":"Button","propId":"buttonId","suffix":"button","labelProp":"buttonText","visibleProp":"buttonVisible","linkTypeProp":"buttonLinkType"}]} props={{"title":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.","buttonText":"Label","buttonLinkType":"url","buttonUrl":""}} component={undefined} title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." buttonText="Label" buttonLinkType="url" buttonUrl="" sectionId="osm-6079" {...stagingData['osm-6079']} onUpdate={(newData) => handleUpdate('osm-6079', newData)} />
      <HeaderTitleDescription component={undefined} thumbnail="/images/thumbnails/header-title-desc.svg" props={{}} sectionId="header-3304" {...stagingData['header-3304']} onUpdate={(newData) => handleUpdate('header-3304', newData)} />
      <HeaderTitle component={undefined} thumbnail="/images/thumbnails/header-title.svg" props={{}} sectionId="header-8606" {...stagingData['header-8606']} onUpdate={(newData) => handleUpdate('header-8606', newData)} />
    </main>
  );
}
