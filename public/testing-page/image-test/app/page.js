"use client";

import Media219 from "@/components/media-21-9.js";
import Media169 from "@/components/media-16-9.js";
import Media54 from "@/components/media-5-4.js";
import Media43 from "@/components/media-4-3.js";

export default function ExportedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Media219 component={undefined} thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} sectionId="media-2408" props={{"image":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg","imageMobileRatio":"4-5"}} image="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" imageMobileRatio="4-5" />
      <Media169 component={undefined} thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} sectionId="media-6796" props={{"image":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"}} image="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" />
      <Media54 component={undefined} thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} sectionId="media-8415" props={{"image":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"}} image="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" />
      <Media43 component={undefined} thumbnail="/images/thumbnails/placeholder.svg" images={[{"label":"Image","propId":"imageId","suffix":"image","visibleProp":"imageVisible"}]} sectionId="media-7235" props={{"fullWidth":false,"image":"https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"}} fullWidth={false} image="https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg" />
    </main>
  );
}
