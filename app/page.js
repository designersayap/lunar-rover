
import GlobalHeaderTitleDescription from "./components/global-header-title-description";
import GlobalHeaderTitleButtonDescription from "./components/global-header-title-button-description";
import GlobalHeaderTitle from "./components/global-header-title";
import GlobalHeaderTitleButton from "./components/global-header-title-button";
import TerraBannerHeroWithSearch from "./components/terra-banner-hero-with-search";
import TerraUsp4col from "./components/terra-usp-4col";
import TerraFeaturesImageLeft from "./components/terra-features-image-left";
import TerraFeaturesImageRight from "./components/terra-features-image-right";
import TerraUsp3col from "./components/terra-usp-3col";
import TerraFooter from "./components/terra-footer";
import TerraBannerHeroWithButton from "./components/terra-banner-hero-with-button";
import { uspData, footerData } from "./content/data";


export default function Home() {
  return (
    <>
      <TerraBannerHeroWithSearch />
      <TerraBannerHeroWithButton />
      <TerraUsp4col title={uspData.title} features={uspData.features} />
      <TerraUsp3col />
      <TerraFeaturesImageLeft />
      <TerraFeaturesImageRight />
      <GlobalHeaderTitle />
      <GlobalHeaderTitleButton />
      <GlobalHeaderTitleDescription />
      <GlobalHeaderTitleButtonDescription />
      <TerraFooter {...footerData} />
    </>
  );
}