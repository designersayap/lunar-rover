"use client";

import { data as stagingData } from "./data";
import LactoNavigation from "@/app/template-components/lacto/lacto-navigation";
import HeaderTitle from "@/app/template-components/header/header-title";
import Media219 from "@/app/template-components/media/media-21-9";

export default function StagingPage() {

    const handleUpdate = async (uniqueId, newData) => {
        try {
            await fetch('/api/save-staging-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folderName: "berkah-3-meta",
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
      <LactoNavigation thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Logo","propId":"logoId","suffix":"logo"}]} links={[{"label":"Menu 1","propId":"menu1Id","suffix":"menu-1","labelProp":"menu1Label","visibleProp":"menu1Visible","linkTypeProp":"menu1LinkType"},{"label":"Menu 2","propId":"menu2Id","suffix":"menu-2","labelProp":"menu2Label","visibleProp":"menu2Visible","linkTypeProp":"menu2LinkType"},{"label":"Menu 3","propId":"menu3Id","suffix":"menu-3","labelProp":"menu3Label","visibleProp":"menu3Visible","linkTypeProp":"menu3LinkType"},{"label":"Menu 4","propId":"menu4Id","suffix":"menu-4","labelProp":"menu4Label","visibleProp":"menu4Visible","linkTypeProp":"menu4LinkType"}]} props={{"menu1Label":"Menu 1","menu1Url":"","menu2Label":"Menu 2","menu2Url":"","menu3Label":"Menu 3","menu3Url":"","menu4Label":"Menu 4","menu4Url":""}} component={undefined} menu1Label="Menu 1" menu1Url="" menu2Label="Menu 2" menu2Url="" menu3Label="Menu 3" menu3Url="" menu4Label="Menu 4" menu4Url="" sectionId="navigation-9840" {...stagingData['navigation-9840']} onUpdate={(newData) => handleUpdate('navigation-9840', newData)} />
      <HeaderTitle thumbnail="/images/thumbnails/header-title.svg" props={{}} component={undefined} sectionId="header-5731" {...stagingData['header-5731']} onUpdate={(newData) => handleUpdate('header-5731', newData)} />
      <Media219 thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} props={{"image":""}} component={undefined} image="" sectionId="media-4091" {...stagingData['media-4091']} onUpdate={(newData) => handleUpdate('media-4091', newData)} />
    </main>
  );
}
