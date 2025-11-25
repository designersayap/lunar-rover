import TerraBannerHeroWithSearch from "./components/terra-banner-hero-with-search";
import TerraUsp4col from "./components/terra-usp-4col";
import TerraFeaturesImageLeft from "./components/terra-features-image-left";
import TerraFeaturesImageRight from "./components/terra-features-image-right";
import TerraUsp3col from "./components/terra-usp-3col";
import TerraCtaCentered from "./components/terra-cta-centered";
import TerraCtaCenteredTitleOnly from "./components/terra-cta-centered-title-only";
import TerraCtaCenteredTitleWithoutButton from "./components/terra-cta-centered-title-without-button";
import TerraFooter from "./components/terra-footer";

export default function Home() {
  return (
    <>
      <TerraBannerHeroWithSearch />
      <TerraUsp4col />
      <TerraUsp3col />
      <TerraFeaturesImageLeft />
      <TerraFeaturesImageRight />
      <TerraCtaCentered />
      <TerraCtaCenteredTitleOnly />
      <TerraCtaCenteredTitleWithoutButton />
      <TerraFooter />
    </>
  );
}