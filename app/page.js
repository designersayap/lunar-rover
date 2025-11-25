import TerraBannerHeroWithSearch from "./components/terra-banner-hero-with-search";
import TerraSectionUsp from "./components/terra-section-usp";
import TerraFeaturesImageLeft from "./components/terra-features-image-left";
import TerraFeaturesImageRight from "./components/terra-features-image-right";


export default function Home() {
  return (
    <>
      <TerraBannerHeroWithSearch />
      <TerraSectionUsp />
      <TerraFeaturesImageLeft />
      <TerraFeaturesImageRight />
    </>
  );
}
