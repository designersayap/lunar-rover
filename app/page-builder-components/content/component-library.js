import dynamic from "next/dynamic";

const GlobalHeaderTitle = dynamic(() => import("../../template-components/global-header-title"));
const GlobalHeaderTitleButton = dynamic(() => import("../../template-components/global-header-title-button"));
const GlobalHeaderTitleDescription = dynamic(() => import("../../template-components/global-header-title-description"));
const GlobalHeaderTitleButtonDescription = dynamic(() => import("../../template-components/global-header-title-button-description"));
const TerraNavigation = dynamic(() => import("@/app/template-components/terra/terra-navigation"));
const LactoNavigation = dynamic(() => import("@/app/template-components/lacto/lacto-navigation"));
const LactoFeaturesStacked = dynamic(() => import("@/app/template-components/lacto/lacto-features-stacked"));
const LactoMedia = dynamic(() => import("@/app/template-components/lacto/lacto-media"));
const LactoProductCarousel = dynamic(() => import("@/app/template-components/lacto/lacto-product-carousel"));
const LactoMessageBox = dynamic(() => import("@/app/template-components/lacto/lacto-message-box"));
const TerraBannerHeroWithButton = dynamic(() => import("@/app/template-components/terra/terra-banner-hero-with-button"));
const TerraBannerHeroWithSearch = dynamic(() => import("@/app/template-components/terra/terra-banner-hero-with-search"));
const TerraFeaturesImageLeft = dynamic(() => import("@/app/template-components/terra/terra-features-image-left"));
const TerraFeaturesImageRight = dynamic(() => import("@/app/template-components/terra/terra-features-image-right"));
const TerraUsp3col = dynamic(() => import("@/app/template-components/terra/terra-usp-3col"));
const TerraUsp4col = dynamic(() => import("@/app/template-components/terra/terra-usp-4col"));
const TerraTestimony = dynamic(() => import("@/app/template-components/terra/terra-testimony"));
const TerraProductCarousel4Products = dynamic(() => import("@/app/template-components/terra/terra-product-carousel-4-products"));
const TerraFooter = dynamic(() => import("@/app/template-components/terra/terra-footer"));

export const componentLibrary = {
    "Navigation": [
        { id: "terra-navigation", name: "Terra - Navigation", component: TerraNavigation, thumbnail: "/images/thumbnails/terra-navigation.svg" },
        { id: "lacto-navigation", name: "Lacto - Navigation", component: LactoNavigation, thumbnail: "/images/thumbnails/lacto-navigation.svg" },
    ],
    "Header": [
        { id: "header-title", name: "Title", component: GlobalHeaderTitle, thumbnail: "/images/thumbnails/header-title.svg", props: { title: "Page Title" } },
        { id: "header-title-desc", name: "Title, Desc", component: GlobalHeaderTitleDescription, thumbnail: "/images/thumbnails/header-title-desc.svg", props: { title: "Page Title", description: "Page description goes here." } },
        { id: "header-title-button", name: "Title, Button", component: GlobalHeaderTitleButton, thumbnail: "/images/thumbnails/header-title-button.svg", props: { title: "Page Title", buttonText: "Button" } },
        { id: "header-title-desc-button", name: "Title, Desc, Button", component: GlobalHeaderTitleButtonDescription, thumbnail: "/images/thumbnails/header-title-desc-button.svg", props: { title: "Page Title", description: "Page description goes here.", buttonText: "Button" } },
    ],
    "Hero Banner": [
        {
            id: "hero-button",
            name: "Terra - CTA",
            component: TerraBannerHeroWithButton,
            thumbnail: "/images/thumbnails/terra-cta.svg",
            config: [
                { name: "showButton", label: "Button", type: "boolean", default: true }
            ],
            props: {
                title: "Hero Title",
                description: "Hero description goes here.",
                buttonText: "Get Started"
            }
        },
        {
            id: "hero-search",
            name: "Terra - Search",
            component: TerraBannerHeroWithSearch,
            thumbnail: "/images/thumbnails/terra-search.svg",
            config: [
                { name: "showSearchBar", label: "Search", type: "boolean", default: true }
            ],
            props: {
                title: "Find Your Perfect Space",
                description: "Search for the best workspaces in your area.",
                placeholder: "Search location..."
            }
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
            props: {
                title: "Feature Title",
                description: "Detailed description of the feature goes here. Explain the benefits and how it helps the user.",
                buttonText: "Label"
            }
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
            props: {
                title: "Feature Title",
                description: "Detailed description of the feature goes here. Explain the benefits and how it helps the user.",
                buttonText: "Label"
            }
        },
    ],
    "Feature - Stacked": [
        {
            id: "lacto-features-stacked",
            name: "Lacto - Image Top",
            component: LactoFeaturesStacked,
            thumbnail: "/images/thumbnails/lacto-features-stacked.svg",
            props: {
                title: "Feature Title",
                description: "Feature description goes here."
            }
        },
    ],
    "Media": [
        { id: "lacto-media", name: "Lacto - Media 21:9", component: LactoMedia, thumbnail: "/images/thumbnails/lacto-media.svg" },
    ],
    "USP": [
        {
            id: "usp-3col",
            name: "Terra - USP 3 Column",
            component: TerraUsp3col,
            thumbnail: "/images/thumbnails/terra-USP-3col.svg",
            props: {
                title: "Why Choose Us",
                features: [
                    { title: "Title", description: "Description" },
                    { title: "Title", description: "Description" },
                    { title: "Title", description: "Description" }
                ]
            }
        },
        {
            id: "usp-4col",
            name: "Terra - USP 4 Column",
            component: TerraUsp4col,
            thumbnail: "/images/thumbnails/terra-USP-4col.svg",
            props: {
                title: "Why Choose Us",
                features: [
                    { title: "Title", description: "Description" },
                    { title: "Title", description: "Description" },
                    { title: "Title", description: "Description" },
                    { title: "Title", description: "Description" }
                ]
            }
        },
    ],
    "Testimonial": [
        {
            id: "testimony",
            name: "Terra - Testimony",
            component: TerraTestimony,
            thumbnail: "/images/thumbnails/terra-testimony.svg",
            props: {
                quote: "This is a testimonial quote.",
                author: "Author Name",
                role: "Author Role"
            }
        },
    ],
    "Product": [
        { id: "product-carousel-4", name: "Terra - Product Carousel 4", component: TerraProductCarousel4Products, thumbnail: "/images/thumbnails/terra-product-carouse.svg" },
        { id: "lacto-product-carousel", name: "Lacto - Product Carousel", component: LactoProductCarousel, thumbnail: "/images/thumbnails/lacto-product-carousel.svg" },
    ],
    "Content": [
        {
            id: "lacto-message-box",
            name: "Lacto - Message Box",
            component: LactoMessageBox,
            thumbnail: "/images/thumbnails/lacto-message-box.svg",
            props: {
                title: "Message Title",
                description: "Message description goes here.",
                buttonText: "Action"
            }
        },
    ],
    "Footer": [
        {
            id: "footer",
            name: "Terra - Footer",
            component: TerraFooter,
            thumbnail: "/images/thumbnails/terra-footer.svg",
            props: {
                brandTitle: "Brand",
                brandDescription: "The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.",
                copyright: "Copyright © 2025"
            }
        },
    ],
};
