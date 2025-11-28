"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// Components
import GlobalHeaderTitle from "../../template-components/global-header-title";
import GlobalHeaderTitleButton from "../../template-components/global-header-title-button";
import GlobalHeaderTitleDescription from "../../template-components/global-header-title-description";
import GlobalHeaderTitleButtonDescription from "../../template-components/global-header-title-button-description";
import TerraBannerHeroWithButton from "@/app/template-components/terra/terra-banner-hero-with-button";
import TerraBannerHeroWithSearch from "@/app/template-components/terra/terra-banner-hero-with-search";
import TerraFeaturesImageLeft from "@/app/template-components/terra/terra-features-image-left";
import TerraFeaturesImageRight from "@/app/template-components/terra/terra-features-image-right";
import TerraUsp3col from "@/app/template-components/terra/terra-usp-3col";
import TerraUsp4col from "@/app/template-components/terra/terra-usp-4col";
import TerraFooter from "@/app/template-components/terra/terra-footer";
import TerraTestimony from "@/app/template-components/terra/terra-testimony";
import TerraProductCarousel4Products from "@/app/template-components/terra/terra-product-carousel-4-products";
import TerraNavigation from "@/app/template-components/terra/terra-navigation";
import LactoNavigation from "@/app/template-components/lacto/lacto-navigation";
import LactoFeaturesStacked from "@/app/template-components/lacto/lacto-features-stacked";
import LactoMedia from "@/app/template-components/lacto/lacto-media";

// Data
import { uspData, footerData } from "../../template-components/content/data";

export default function ComponentPreviewPage() {
    const params = useParams();
    const { name } = params;

    // Component Mapping
    const components = {
        "terra-navigation": TerraNavigation,
        "global-header-title": GlobalHeaderTitle,
        "global-header-title-button": GlobalHeaderTitleButton,
        "global-header-title-description": GlobalHeaderTitleDescription,
        "global-header-title-button-description": GlobalHeaderTitleButtonDescription,
        "terra-banner-hero-with-button": TerraBannerHeroWithButton,
        "terra-banner-hero-with-search": TerraBannerHeroWithSearch,
        "terra-testimony": TerraTestimony,
        "terra-product-carousel-4-products": TerraProductCarousel4Products,
        "terra-features-image-left": TerraFeaturesImageLeft,
        "terra-features-image-right": TerraFeaturesImageRight,
        "terra-usp-3col": TerraUsp3col,
        "terra-usp-4col": TerraUsp4col,
        "terra-footer": TerraFooter,
        "lacto-navigation": LactoNavigation,
        "lacto-features-stacked": LactoFeaturesStacked,
        "lacto-media": LactoMedia,
    };

    const Component = components[name];

    if (!Component) {
        return (
            <div style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                gap: "1rem"
            }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Component Not Found</h1>
                <p>The component "{name}" does not exist.</p>
                <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
                    Go back home
                </Link>
            </div>
        );
    }

    // Render with specific props if needed
    if (name === "terra-usp-3col" || name === "terra-usp-4col") {
        return <Component title={uspData.title} features={uspData.features} />;
    }

    if (name === "terra-footer") {
        return <Component {...footerData} />;
    }

    return <Component />;
}
