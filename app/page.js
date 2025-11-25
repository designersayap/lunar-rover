import TerraBannerHeroWithSearch from "./components/terra-banner-hero-with-search";
import TerraUsp4col from "./components/terra-usp-4col";
import TerraFeaturesImageLeft from "./components/terra-features-image-left";
import TerraFeaturesImageRight from "./components/terra-features-image-right";
import TerraUsp3col from "./components/terra-usp-3col";

export default function Home() {
  return (
    <>
      <TerraBannerHeroWithSearch />
      <TerraUsp4col />
      <TerraUsp3col />
      <TerraFeaturesImageLeft />
      <TerraFeaturesImageRight />
    </>
  );
}
