import dynamic from "next/dynamic";
import { componentDefaults } from "../../template-components/content/data";

const GlobalHeaderTitle = dynamic(() => import("../../template-components/header/header-title"));
const GlobalHeaderTitleButton = dynamic(() => import("../../template-components/header/header-title-button"));
const GlobalHeaderTitleDescription = dynamic(() => import("../../template-components/header/header-title-description"));
const GlobalHeaderTitleButtonDescription = dynamic(() => import("../../template-components/header/header-title-description-button"));

const TerraBannerHero = dynamic(() => import("@/app/template-components/terra/terra-banner-hero"));
const TerraFeaturesImageLeft = dynamic(() => import("@/app/template-components/terra/terra-features-image-left"));
const TerraFeaturesImageRight = dynamic(() => import("@/app/template-components/terra/terra-features-image-right"));
const Dialog = dynamic(() => import("../../template-components/dialog/dialog-default"));
const DialogAccordion = dynamic(() => import("../../template-components/dialog/dialog-accordion"));
const BannerInformation = dynamic(() => import("../../template-components/osm/banner-information"));

// Template Component Imports (Dynamic Loading for Performance)
// These components are loaded only when needed to reduce initial bundle size

const TerraTestimony = dynamic(() => import("../../template-components/terra/terra-testimony"));
const Media16x9 = dynamic(() => import("../../template-components/media/media-16-9"));
const LactoNavigation = dynamic(() => import("../../template-components/lacto/lacto-navigation"));

/**
 * Component Library Definitions
 * Maps internal IDs to React Components and defines their editable properties.
 * 
 * Structure:
 * - Category Name: [ List of Components ]
 * - Component: {
 *     id: Unique string ID,
 *     name: Display name in UI,
 *     component: The React Component,
 *     config: [ Editable Props for the Sidebar Settings Panel ],
 *     buttons/images/links: [ Child Elements shown in the Sidebar Layer Tree ]
 * }
 */
export const componentLibrary = {

    "OSM": [
        {
            id: "banner-information",
            name: "Info Banner",
            component: BannerInformation,
            thumbnail: "/images/thumbnails/banner-info.svg",
            config: [
                {
                    name: "title",
                    label: "Title",
                    type: "text",
                    default: componentDefaults["banner-information"].title
                },
                {
                    name: "buttonText",
                    label: "Button Label",
                    type: "text",
                    default: componentDefaults["banner-information"].buttonText
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["banner-information"].buttonLinkType
                },
                {
                    name: "buttonUrl",
                    label: "Button URL",
                    type: "text",
                    default: componentDefaults["banner-information"].buttonUrl
                }
            ],
            buttons: [
                {
                    label: "Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                }
            ]
        },
        {
            id: "lacto-navigation",
            name: "Navigation",
            component: LactoNavigation,
            thumbnail: "/images/thumbnails/placeholder.svg",
            config: [
                {
                    name: "menuItems",
                    label: "Menu Items",
                    type: "list",
                    default: componentDefaults["lacto-navigation"].menuItems
                }
            ],
            images: [
                {
                    label: "Logo",
                    propId: "logo.imageId",
                    suffix: "logo",
                    visibleProp: "logo.imageVisible"
                }
            ],
            links: [
                {
                    label: "Menu 1",
                    propId: "menuItems.0.linkId",
                    suffix: "menu-0",
                    visibleProp: "menuItems.0.linkVisible"
                },
                {
                    label: "Menu 2",
                    propId: "menuItems.1.linkId",
                    suffix: "menu-1",
                    visibleProp: "menuItems.1.linkVisible"
                },
                {
                    label: "Menu 3",
                    propId: "menuItems.2.linkId",
                    suffix: "menu-2",
                    visibleProp: "menuItems.2.linkVisible"
                },
                {
                    label: "Menu 4",
                    propId: "menuItems.3.linkId",
                    suffix: "menu-3",
                    visibleProp: "menuItems.3.linkVisible"
                }
            ]
        }
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
                    default: componentDefaults["header-title-button"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["header-title-button"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["header-title-button"].secondaryButtonLinkType
                },
                {
                    name: "buttonText",
                    label: "Button Text",
                    type: "text",
                    default: componentDefaults["header-title-button"].buttonText
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: componentDefaults["header-title-button"].secondaryButtonText
                }
            ],
            buttons: [
                {
                    label: "Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                },
                {
                    label: "Secondary Button",
                    propId: "secondaryButtonId",
                    suffix: "secondary-button",
                    labelProp: "secondaryButtonText",
                    visibleProp: "secondaryButtonVisible",
                    linkTypeProp: "secondaryButtonLinkType"
                }
            ]
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
                    default: componentDefaults["header-title-description-button"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["header-title-description-button"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["header-title-description-button"].secondaryButtonLinkType
                },
                {
                    name: "buttonText",
                    label: "Button Text",
                    type: "text",
                    default: componentDefaults["header-title-description-button"].buttonText
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: componentDefaults["header-title-description-button"].secondaryButtonText
                }
            ],
            buttons: [
                {
                    label: "Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                },
                {
                    label: "Secondary Button",
                    propId: "secondaryButtonId",
                    suffix: "secondary-button",
                    labelProp: "secondaryButtonText",
                    visibleProp: "secondaryButtonVisible",
                    linkTypeProp: "secondaryButtonLinkType"
                }
            ]
        },
    ],
    "Dialog": [
        {
            id: "dialog",
            name: "Dialog / Modal",
            component: Dialog,
            thumbnail: "/images/thumbnails/dialog.svg", // Placeholder or generic
            config: [

                {
                    name: "items",
                    label: "List Items",
                    type: "list", // Special type: Renders a list editor in the sidebar
                    default: componentDefaults["dialog"].items
                }
            ],
            images: [
                {
                    label: "Main Image",
                    propId: "imageId",
                    suffix: "image",
                    visibleProp: "imageVisible"
                }
            ],
            links: [
                { label: "Item 1", propId: "item0Id", suffix: "item-0", visibleProp: "item0Visible" },
                { label: "Item 2", propId: "item1Id", suffix: "item-1", visibleProp: "item1Visible" },
                { label: "Item 3", propId: "item2Id", suffix: "item-2", visibleProp: "item2Visible" },
                { label: "Item 4", propId: "item3Id", suffix: "item-3", visibleProp: "item3Visible" },
                { label: "Item 5", propId: "item4Id", suffix: "item-4", visibleProp: "item4Visible" },
                { label: "Item 6", propId: "item5Id", suffix: "item-5", visibleProp: "item5Visible" },
                { label: "Item 7", propId: "item6Id", suffix: "item-6", visibleProp: "item6Visible" },
                { label: "Item 8", propId: "item7Id", suffix: "item-7", visibleProp: "item7Visible" }
            ]
        },
        {
            id: "dialog-accordion",
            name: "Dialog / Accordion",
            component: DialogAccordion,
            thumbnail: "/images/thumbnails/dialog.svg", // Placeholder
            config: [
                {
                    name: "image",
                    label: "Image",
                    type: "image"
                },
                {
                    name: "items",
                    label: "Accordion Items",
                    type: "list",
                    default: componentDefaults["dialog-accordion"].items
                }
            ],
            links: [
                { label: "Image", propId: "imageId", suffix: "image", visibleProp: "imageVisible" },
                { label: "Accordion 1", propId: "item0Id", suffix: "accordion-0", visibleProp: "item0Visible" },
                { label: "Accordion 2", propId: "item1Id", suffix: "accordion-1", visibleProp: "item1Visible" },
                { label: "Accordion 3", propId: "item2Id", suffix: "accordion-2", visibleProp: "item2Visible" },
                { label: "Accordion 4", propId: "item3Id", suffix: "accordion-3", visibleProp: "item3Visible" },
                { label: "Accordion 5", propId: "item4Id", suffix: "accordion-4", visibleProp: "item4Visible" },
                { label: "Accordion 6", propId: "item5Id", suffix: "accordion-5", visibleProp: "item5Visible" },
                { label: "Accordion 7", propId: "item6Id", suffix: "accordion-6", visibleProp: "item6Visible" },
                { label: "Accordion 8", propId: "item7Id", suffix: "accordion-7", visibleProp: "item7Visible" }
            ]
        }
    ],
    "Media": [
        {
            id: "media-16-9",
            name: "Media 16:9",
            component: Media16x9,
            thumbnail: "/images/thumbnails/placeholder.svg", // Placeholder
            config: [
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: componentDefaults["media-16-9"].image
                }
            ],
            images: [
                {
                    label: "Image",
                    propId: "imageId",
                    suffix: "image",
                    visibleProp: "imageVisible"
                }
            ]
        }
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
                    default: componentDefaults["terra-banner-hero"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["terra-banner-hero"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["terra-banner-hero"].secondaryButtonLinkType
                },
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: componentDefaults["terra-banner-hero"].image
                }
            ],
            buttons: [
                {
                    label: "Primary Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                },
                {
                    label: "Secondary Button",
                    propId: "secondaryButtonId",
                    suffix: "secondary-button",
                    labelProp: "secondaryButtonText",
                    visibleProp: "secondaryButtonVisible",
                    linkTypeProp: "secondaryButtonLinkType"
                }
            ],
            images: [
                {
                    label: "Hero Image",
                    propId: "imageId",
                    suffix: "image",
                    visibleProp: "imageVisible"
                }
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
                    default: componentDefaults["feature-left"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["feature-left"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["feature-left"].secondaryButtonLinkType
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: componentDefaults["feature-left"].secondaryButtonText
                }
            ],
            buttons: [
                {
                    label: "Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                },
                {
                    label: "Secondary Button",
                    propId: "secondaryButtonId",
                    suffix: "secondary-button",
                    labelProp: "secondaryButtonText",
                    visibleProp: "secondaryButtonVisible",
                    linkTypeProp: "secondaryButtonLinkType"
                }
            ],
            images: [
                {
                    label: "Image",
                    propId: "imageId",
                    suffix: "image",
                    visibleProp: "imageVisible"
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
                    default: componentDefaults["feature-right"].buttonStyle
                }
            ],
            buttons: [
                {
                    label: "Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                }
            ],
            images: [
                {
                    label: "Image",
                    propId: "imageId",
                    suffix: "image",
                    visibleProp: "imageVisible"
                }
            ]
        },

    ],

    "OSM": [
        {
            id: "banner-information",
            name: "Info Banner",
            component: BannerInformation,
            thumbnail: "/images/thumbnails/banner-info.svg",
            config: [
                {
                    name: "title",
                    label: "Title",
                    type: "text",
                    default: "Information Banner"
                },
                {
                    name: "buttonText",
                    label: "Button Label",
                    type: "text",
                    default: "Label"
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "buttonUrl",
                    label: "Button URL",
                    type: "text",
                    default: ""
                }
            ],
            buttons: [
                {
                    label: "Button",
                    propId: "buttonId",
                    suffix: "button",
                    labelProp: "buttonText",
                    visibleProp: "buttonVisible",
                    linkTypeProp: "buttonLinkType"
                }
            ]
        }
    ],

    "Lacto": [
        {
            id: "lacto-navigation",
            name: "Navigation",
            component: LactoNavigation,
            thumbnail: "/images/thumbnails/placeholder.svg",
            config: [
                {
                    name: "menuItems",
                    label: "Menu Items",
                    type: "list",
                    default: componentDefaults["lacto-navigation"].menuItems
                }
            ],
            images: [
                {
                    label: "Logo",
                    propId: "logo.imageId",
                    suffix: "logo",
                    visibleProp: "logo.imageVisible"
                }
            ],
            links: [
                {
                    label: "Menu 1",
                    propId: "menuItems.0.linkId",
                    suffix: "menu-0",
                    visibleProp: "menuItems.0.linkVisible"
                },
                {
                    label: "Menu 2",
                    propId: "menuItems.1.linkId",
                    suffix: "menu-1",
                    visibleProp: "menuItems.1.linkVisible"
                },
                {
                    label: "Menu 3",
                    propId: "menuItems.2.linkId",
                    suffix: "menu-2",
                    visibleProp: "menuItems.2.linkVisible"
                },
                {
                    label: "Menu 4",
                    propId: "menuItems.3.linkId",
                    suffix: "menu-3",
                    visibleProp: "menuItems.3.linkVisible"
                }
            ]
        }
    ],

    "Testimonials": [
        {
            id: "terra-testimony",
            name: "Terra Testimony",
            component: TerraTestimony,
            thumbnail: "/images/thumbnails/placeholder.svg",
            config: [
                {
                    name: "testimonies",
                    label: "Testimonies",
                    type: "list",
                    default: componentDefaults["terra-testimony"].testimonies
                }
            ],
            links: [
                { label: "Testimony 1", propId: "card0Id", suffix: "testimony-0", visibleProp: "card0Visible" },
                { label: "Testimony 2", propId: "card1Id", suffix: "testimony-1", visibleProp: "card1Visible" },
                { label: "Testimony 3", propId: "card2Id", suffix: "testimony-2", visibleProp: "card2Visible" },
                { label: "Testimony 4", propId: "card3Id", suffix: "testimony-3", visibleProp: "card3Visible" },
                { label: "Testimony 5", propId: "card4Id", suffix: "testimony-4", visibleProp: "card4Visible" },
                { label: "Testimony 6", propId: "card5Id", suffix: "testimony-5", visibleProp: "card5Visible" },
                { label: "Testimony 7", propId: "card6Id", suffix: "testimony-6", visibleProp: "card6Visible" },
                { label: "Testimony 8", propId: "card7Id", suffix: "testimony-7", visibleProp: "card7Visible" },
                { label: "Testimony 9", propId: "card8Id", suffix: "testimony-8", visibleProp: "card8Visible" },
                { label: "Testimony 10", propId: "card9Id", suffix: "testimony-9", visibleProp: "card9Visible" },
                { label: "Testimony 11", propId: "card10Id", suffix: "testimony-10", visibleProp: "card10Visible" },
                { label: "Testimony 12", propId: "card11Id", suffix: "testimony-11", visibleProp: "card11Visible" }
            ]
        }
    ]
};
