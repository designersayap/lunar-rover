"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// Components
import GlobalHeaderTitle from "../../template-components/header/header-title";
import GlobalHeaderTitleButton from "../../template-components/header/header-title-button";
import GlobalHeaderTitleDescription from "../../template-components/header/header-title-description";
import GlobalHeaderTitleButtonDescription from "../../template-components/header/header-title-description-button";
import TerraBannerHero from "@/app/template-components/terra/terra-banner-hero";
import TerraFeaturesImageLeft from "@/app/template-components/terra/terra-features-image-left";
import TerraFeaturesImageRight from "@/app/template-components/terra/terra-features-image-right";
import Dialog from "@/app/template-components/dialog/dialog-default";
import TerraTestimony from "@/app/template-components/terra/terra-testimony";


import { BuilderSelectionProvider } from "@/app/page-builder-components/utils/builder/builder-controls";

export default function ComponentPreviewPage() {
    const params = useParams();
    const { name } = params;

    // Component Mapping
    const components = {
        "header-title": GlobalHeaderTitle,
        "header-title-button": GlobalHeaderTitleButton,
        "header-title-description": GlobalHeaderTitleDescription,
        "header-title-description-button": GlobalHeaderTitleButtonDescription,
        "terra-banner-hero": TerraBannerHero,
        "feature-left": TerraFeaturesImageLeft,
        "feature-right": TerraFeaturesImageRight,
        "dialog": Dialog,
        "terra-testimony": TerraTestimony,

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
                gap: "1rem",
                color: "black"
            }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Component Not Found</h1>
                <p>The component "{name}" does not exist.</p>
                <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
                    Go back home
                </Link>
            </div>
        );
    }
    return (
        <BuilderSelectionProvider>
            <Component sectionId="preview-section" />
        </BuilderSelectionProvider>
    );
}
