import dynamic from "next/dynamic";

const GlobalHeaderTitle = dynamic(() => import("../../template-components/header-title"));
const GlobalHeaderTitleButton = dynamic(() => import("../../template-components/header-title-button"));
const GlobalHeaderTitleDescription = dynamic(() => import("../../template-components/header-title-description"));
const GlobalHeaderTitleButtonDescription = dynamic(() => import("../../template-components/header-title-description-button"));

const TerraBannerHero = dynamic(() => import("@/app/template-components/terra/terra-banner-hero"));
const TerraFeaturesImageLeft = dynamic(() => import("@/app/template-components/terra/terra-features-image-left"));
const TerraFeaturesImageRight = dynamic(() => import("@/app/template-components/terra/terra-features-image-right"));


export const componentLibrary = {

    "Header": [
        {
            id: "header-title",
            name: "Title",
            component: GlobalHeaderTitle,
            thumbnail: "/images/thumbnails/header-title.svg",
        },
        {
            id: "header-title-button",
            name: "Title, Button",
            component: GlobalHeaderTitleButton,
            thumbnail: "/images/thumbnails/header-title-button.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "primary"
                },
                {
                    name: "buttonText",
                    label: "Button Text",
                    type: "text",
                    default: "Label"
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: "Label"
                }
            ],
        },
        {
            id: "header-title-description",
            name: "Title, Description",
            component: GlobalHeaderTitleDescription,
            thumbnail: "/images/thumbnails/header-title-desc.svg",
        },
        {
            id: "header-title-description-button",
            name: "Title, Description, Button",
            component: GlobalHeaderTitleButtonDescription,
            thumbnail: "/images/thumbnails/header-title-desc-button.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "primary"
                },
                {
                    name: "buttonText",
                    label: "Button Text",
                    type: "text",
                    default: "Label"
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: "Label"
                }
            ],
        },
    ],
    "Hero Banner": [
        {
            id: "terra-banner-hero",
            name: "Terra Banner Hero",
            component: TerraBannerHero,
            thumbnail: "/images/thumbnails/terra-cta.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "primary"
                },
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: "/images/hero-banner.png"
                }
            ],
        },
    ],
    "Feature - Split": [
        {
            id: "feature-left",
            name: "Terra - Image Left",
            component: TerraFeaturesImageLeft,
            thumbnail: "/images/thumbnails/terra-image-left.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "primary"
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: "Label"
                }
            ],
        },
        {
            id: "feature-right",
            name: "Terra - Image Right",
            component: TerraFeaturesImageRight,
            thumbnail: "/images/thumbnails/terra-image-right.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "primary"
                }
            ],
        },
    ],

};
