"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// Components
import GlobalHeaderTitle from "../../components/global-header-title";
import GlobalHeaderTitleButton from "../../components/global-header-title-button";
import GlobalHeaderTitleDescription from "../../components/global-header-title-description";
import GlobalHeaderTitleButtonDescription from "../../components/global-header-title-button-description";
import TerraBannerHeroWithButton from "../../components/terra-banner-hero-with-button";
import TerraBannerHeroWithSearch from "../../components/terra-banner-hero-with-search";
import TerraFeaturesImageLeft from "../../components/terra-features-image-left";
import TerraFeaturesImageRight from "../../components/terra-features-image-right";
import TerraUsp3col from "../../components/terra-usp-3col";
import TerraUsp4col from "../../components/terra-usp-4col";
import TerraFooter from "../../components/terra-footer";

// Data
import { uspData, footerData } from "../../content/data";

export default function ComponentPreviewPage() {
    const params = useParams();
    const { name } = params;

    // Component Mapping
    const components = {
        "global-header-title": GlobalHeaderTitle,
        "global-header-title-button": GlobalHeaderTitleButton,
        "global-header-title-description": GlobalHeaderTitleDescription,
        "global-header-title-button-description": GlobalHeaderTitleButtonDescription,
        "terra-banner-hero-with-button": TerraBannerHeroWithButton,
        "terra-banner-hero-with-search": TerraBannerHeroWithSearch,
        "terra-features-image-left": TerraFeaturesImageLeft,
        "terra-features-image-right": TerraFeaturesImageRight,
        "terra-usp-3col": TerraUsp3col,
        "terra-usp-4col": TerraUsp4col,
        "terra-footer": TerraFooter,
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
