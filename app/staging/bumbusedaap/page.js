"use client";

import { data as stagingData } from "./data";
import TerraFeaturesImageLeft from "@/app/template-components/terra/terra-features-image-left";
import TerraFeaturesImageRight from "@/app/template-components/terra/terra-features-image-right";
import HeaderTitleDescription from "@/app/template-components/header/header-title-description";
import LactoNavigation from "@/app/template-components/lacto/lacto-navigation";
import Media169 from "@/app/template-components/media/media-16-9";
import DialogAccordion from "@/app/template-components/dialog/dialog-accordion";

export default function StagingPage() {

    const handleUpdate = async (uniqueId, newData) => {
        try {
            await fetch('/api/save-staging-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folderName: "bumbusedaap",
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
      <TerraFeaturesImageLeft thumbnail="/images/thumbnails/terra-image-left.svg" props={{"buttonStyle":"primary","title":"Ragam Kelezatan Susu Belgia Asli!","subtitle":"Hadir dengan varian Cokelat, Stroberi, Original, \ndan Marie Biskuit. Kombinasi nutrisi sehat dan rasa lezat yang bikin anak kuat dan aktif."}} component={undefined} buttonStyle="primary" title="Ragam Kelezatan Susu Belgia Asli!" subtitle="Hadir dengan varian Cokelat, Stroberi, Original, 
dan Marie Biskuit. Kombinasi nutrisi sehat dan rasa lezat yang bikin anak kuat dan aktif." sectionId="feature-split-9099" {...stagingData['feature-split-9099']} onUpdate={(newData) => handleUpdate('feature-split-9099', newData)} />
      <TerraFeaturesImageRight thumbnail="/images/thumbnails/terra-image-right.svg" props={{"buttonStyle":"primary","title":"Baru! Susu Belgia rasa Marie Biskuit","subtitle":"Nikmati kelezatan susu sapi Belgia yang dipadukan  dengan rasa biskuit Marie yang lezat."}} component={undefined} buttonStyle="primary" title="Baru! Susu Belgia rasa Marie Biskuit" subtitle="Nikmati kelezatan susu sapi Belgia yang dipadukan  dengan rasa biskuit Marie yang lezat." sectionId="feature-split-4330" {...stagingData['feature-split-4330']} onUpdate={(newData) => handleUpdate('feature-split-4330', newData)} />
      <HeaderTitleDescription thumbnail="/images/thumbnails/header-title-desc.svg" props={{"title":"Mulai Harimu dengan \nKebaikan dari Milku","subtitle":"Cobain Sekarang Varian Milku yang Lezat & Bernutrisi"}} component={undefined} title="Mulai Harimu dengan 
Kebaikan dari Milku" subtitle="Cobain Sekarang Varian Milku yang Lezat & Bernutrisi" sectionId="header-6832" {...stagingData['header-6832']} onUpdate={(newData) => handleUpdate('header-6832', newData)} />
      <LactoNavigation thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Logo","propId":"logoId","suffix":"logo"}]} links={[{"label":"Menu 1","propId":"menu1Id","suffix":"menu-1","labelProp":"menu1Label","visibleProp":"menu1Visible","linkTypeProp":"menu1LinkType"},{"label":"Menu 2","propId":"menu2Id","suffix":"menu-2","labelProp":"menu2Label","visibleProp":"menu2Visible","linkTypeProp":"menu2LinkType"},{"label":"Menu 3","propId":"menu3Id","suffix":"menu-3","labelProp":"menu3Label","visibleProp":"menu3Visible","linkTypeProp":"menu3LinkType"},{"label":"Menu 4","propId":"menu4Id","suffix":"menu-4","labelProp":"menu4Label","visibleProp":"menu4Visible","linkTypeProp":"menu4LinkType"}]} props={{"menu1Label":"Menu 1","menu1Url":"","menu2Label":"Menu 2","menu2Url":"","menu3Label":"Menu 3","menu3Url":"","menu4Label":"Menu 4","menu4Url":""}} component={undefined} menu1Label="Menu 1" menu1Url="" menu2Label="Menu 2" menu2Url="" menu3Label="Menu 3" menu3Url="" menu4Label="Menu 4" menu4Url="" sectionId="navigation-4660" {...stagingData['navigation-4660']} onUpdate={(newData) => handleUpdate('navigation-4660', newData)} />
      <Media169 thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} props={{"image":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg","imageLinkType":"dialog","imageTargetDialogId":"1766028311728"}} component={undefined} image="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" imageLinkType="dialog" imageTargetDialogId="1766028311728" sectionId="media-2007" {...stagingData['media-2007']} onUpdate={(newData) => handleUpdate('media-2007', newData)} />
      <DialogAccordion thumbnail="/images/thumbnails/dialog.svg" links={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"},{"label":"Accordion 1","propId":"item0Id","suffix":"accordion-0","visibleProp":"item0Visible"},{"label":"Accordion 2","propId":"item1Id","suffix":"accordion-1","visibleProp":"item1Visible"},{"label":"Accordion 3","propId":"item2Id","suffix":"accordion-2","visibleProp":"item2Visible"},{"label":"Accordion 4","propId":"item3Id","suffix":"accordion-3","visibleProp":"item3Visible"},{"label":"Accordion 5","propId":"item4Id","suffix":"accordion-4","visibleProp":"item4Visible"},{"label":"Accordion 6","propId":"item5Id","suffix":"accordion-5","visibleProp":"item5Visible"},{"label":"Accordion 7","propId":"item6Id","suffix":"accordion-6","visibleProp":"item6Visible"},{"label":"Accordion 8","propId":"item7Id","suffix":"accordion-7","visibleProp":"item7Visible"}]} props={{"items":[{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}],"isOpen":false,"imageVisible":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"}} component={undefined} items={[{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"title":"Accordion Title","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}]} imageVisible="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" sectionId="dialog-9458" {...stagingData['dialog-9458']} onUpdate={(newData) => handleUpdate('dialog-9458', newData)} />
    </main>
  );
}
