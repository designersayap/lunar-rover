import dynamic from "next/dynamic";

const GlobalHeaderTitle = dynamic(() => import("../../components/global-header-title"));
const GlobalHeaderTitleButton = dynamic(() => import("../../components/global-header-title-button"));
const GlobalHeaderTitleDescription = dynamic(() => import("../../components/global-header-title-description"));
const GlobalHeaderTitleButtonDescription = dynamic(() => import("../../components/global-header-title-button-description"));
const TerraBannerHeroWithButton = dynamic(() => import("@/app/components/terra/terra-banner-hero-with-button"));
const TerraBannerHeroWithSearch = dynamic(() => import("@/app/components/terra/terra-banner-hero-with-search"));
const TerraFeaturesImageLeft = dynamic(() => import("@/app/components/terra/terra-features-image-left"));
const TerraFeaturesImageRight = dynamic(() => import("@/app/components/terra/terra-features-image-right"));
const TerraUsp3col = dynamic(() => import("@/app/components/terra/terra-usp-3col"));
const TerraUsp4col = dynamic(() => import("@/app/components/terra/terra-usp-4col"));
const TerraTestimony = dynamic(() => import("@/app/components/terra/terra-testimony"));
const TerraProductCarousel4Products = dynamic(() => import("@/app/components/terra/terra-product-carousel-4-products"));
const TerraFooter = dynamic(() => import("@/app/components/terra/terra-footer"));

export const componentLibrary = {
    "Header": [
        { id: "header-title", name: "Title", component: GlobalHeaderTitle, thumbnail: "/images/thumbnails/header-title.svg" },
        { id: "header-title-desc", name: "Title, Desc", component: GlobalHeaderTitleDescription, thumbnail: "/images/thumbnails/header-title-desc.svg" },
        { id: "header-title-button", name: "Title, Button", component: GlobalHeaderTitleButton, thumbnail: "/images/thumbnails/header-title-button.svg" },
        { id: "header-title-desc-button", name: "Title, Desc, Button", component: GlobalHeaderTitleButtonDescription, thumbnail: "/images/thumbnails/header-title-desc-button.svg" },
    ],
    "Hero Banner": [
        {
            id: "hero-button",
            name: "Terra - CTA",
            component: TerraBannerHeroWithButton,
            thumbnail: "/images/thumbnails/terra-cta.svg",
            config: [
                { name: "showButton", label: "Button", type: "boolean", default: true }
            ]
        },
        {
            id: "hero-search",
            name: "Terra - Search",
            component: TerraBannerHeroWithSearch,
            thumbnail: "/images/thumbnails/terra-search.svg",
            config: [
                { name: "showSearchBar", label: "Search", type: "boolean", default: true }
            ]
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
            ]
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
            ]
        },
    ],
    "USP": [
        { id: "usp-3col", name: "Terra - USP 3 Column", component: TerraUsp3col, thumbnail: "/images/thumbnails/terra-USP-3col.svg" },
        { id: "usp-4col", name: "Terra - USP 4 Column", component: TerraUsp4col, thumbnail: "/images/thumbnails/terra-USP-4col.svg" },
    ],
    "Testimonial": [
        { id: "testimony", name: "Terra - Testimony", component: TerraTestimony, thumbnail: "/images/thumbnails/terra-testimony.svg" },
    ],
    "Product": [
        { id: "product-carousel-4", name: "Terra - Product Carousel 4", component: TerraProductCarousel4Products, thumbnail: "/images/thumbnails/terra-product-carouse.svg" },
    ],
    "Footer": [
        { id: "footer", name: "Terra - Footer", component: TerraFooter, thumbnail: "/images/thumbnails/terra-footer.svg" },
    ],
};
