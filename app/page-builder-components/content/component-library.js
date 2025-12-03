import dynamic from "next/dynamic";

const GlobalHeaderTitle = dynamic(() => import("../../template-components/header-title"));
const GlobalHeaderTitleButton = dynamic(() => import("../../template-components/header-title-button"));
const GlobalHeaderTitleDescription = dynamic(() => import("../../template-components/header-title-description"));
const GlobalHeaderTitleButtonDescription = dynamic(() => import("../../template-components/header-title-description-button"));
const TerraNavigation = dynamic(() => import("@/app/template-components/terra/terra-navigation"));
const LactoNavigation = dynamic(() => import("@/app/template-components/lacto/lacto-navigation"));
const LactoFeaturesStacked = dynamic(() => import("@/app/template-components/lacto/lacto-features-stacked"));

const LactoMessageBox = dynamic(() => import("@/app/template-components/lacto/lacto-message-box"));
const TerraBannerHeroWithButton = dynamic(() => import("@/app/template-components/terra/terra-banner-hero-with-button"));

const TerraFeaturesImageLeft = dynamic(() => import("@/app/template-components/terra/terra-features-image-left"));
const TerraFeaturesImageRight = dynamic(() => import("@/app/template-components/terra/terra-features-image-right"));



export const componentLibrary = {
    "Navigation": [
        { id: "terra-navigation", name: "Terra - Navigation", component: TerraNavigation, thumbnail: "/images/thumbnails/terra-navigation.svg" },
        { id: "lacto-navigation", name: "Lacto - Navigation", component: LactoNavigation, thumbnail: "/images/thumbnails/lacto-navigation.svg" },
    ],
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
                }
            ],
        },
    ],
    "Hero Banner": [
        {
            id: "hero-button",
            name: "Terra - CTA",
            component: TerraBannerHeroWithButton,
            thumbnail: "/images/thumbnails/terra-cta.svg",
            config: [
                { name: "showButton", label: "Button", type: "boolean", default: true },
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
    "Feature - Stacked": [
        {
            id: "lacto-features-stacked",
            name: "Lacto - Image Top",
            component: LactoFeaturesStacked,
            thumbnail: "/images/thumbnails/lacto-features-stacked.svg",
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
    "Media": [

    ],


    "Product": [


    ],
    "Content": [
        {
            id: "lacto-message-box",
            name: "Lacto - Message Box",
            component: LactoMessageBox,
            thumbnail: "/images/thumbnails/lacto-message-box.svg",
            config: [
                {
                    name: "primaryButtonStyle",
                    label: "Primary Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "primary"
                },
                {
                    name: "secondaryButtonStyle",
                    label: "Secondary Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: "outline"
                }
            ],
        },
    ],

};
