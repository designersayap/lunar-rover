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
const TerraTestimony = dynamic(() => import("../../template-components/terra/terra-testimony"));
const Media16x9 = dynamic(() => import("../../template-components/media/media-16-9"));
const Media5x4 = dynamic(() => import('@/app/template-components/media/media-5-4'));
const Media4x3 = dynamic(() => import('@/app/template-components/media/media-4-3'));
const Media21x9 = dynamic(() => import('@/app/template-components/media/media-21-9'));
const LactoNavigation = dynamic(() => import("../../template-components/lacto/lacto-navigation"));

export const componentLibrary = {

    "Navigation": [
        {
            id: "lacto-navigation",
            name: "Lacto",
            component: LactoNavigation,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
            config: [
                { name: "menu1Label", label: "Menu 1 Label", type: "text", default: componentDefaults["lacto-navigation"].menu1Label },
                { name: "menu1Url", label: "Menu 1 URL", type: "text", default: componentDefaults["lacto-navigation"].menu1Url },
                { name: "menu2Label", label: "Menu 2 Label", type: "text", default: componentDefaults["lacto-navigation"].menu2Label },
                { name: "menu2Url", label: "Menu 2 URL", type: "text", default: componentDefaults["lacto-navigation"].menu2Url },
                { name: "menu3Label", label: "Menu 3 Label", type: "text", default: componentDefaults["lacto-navigation"].menu3Label },
                { name: "menu3Url", label: "Menu 3 URL", type: "text", default: componentDefaults["lacto-navigation"].menu3Url },
                { name: "menu4Label", label: "Menu 4 Label", type: "text", default: componentDefaults["lacto-navigation"].menu4Label },
                { name: "menu4Url", label: "Menu 4 URL", type: "text", default: componentDefaults["lacto-navigation"].menu4Url },
            ],
            images: [
                { label: "Logo", propId: "logoId", suffix: "logo" }
            ],
            links: [
                { label: "Menu 1", propId: "menu1Id", suffix: "menu-1", labelProp: "menu1Label", visibleProp: "menu1Visible", linkTypeProp: "menu1LinkType" },
                { label: "Menu 2", propId: "menu2Id", suffix: "menu-2", labelProp: "menu2Label", visibleProp: "menu2Visible", linkTypeProp: "menu2LinkType" },
                { label: "Menu 3", propId: "menu3Id", suffix: "menu-3", labelProp: "menu3Label", visibleProp: "menu3Visible", linkTypeProp: "menu3LinkType" },
                { label: "Menu 4", propId: "menu4Id", suffix: "menu-4", labelProp: "menu4Label", visibleProp: "menu4Visible", linkTypeProp: "menu4LinkType" }
            ]
        }
    ],

    "OSM": [
        {
            id: "banner-information",
            name: "Info Banner",
            component: BannerInformation,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
    ],
    "Header": [
        {
            id: "header-title",
            name: "Title",
            component: GlobalHeaderTitle,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
        },
        {
            id: "header-title-button",
            name: "Title, Button",
            component: GlobalHeaderTitleButton,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
        },
        {
            id: "header-title-description-button",
            name: "Title, Description, Button",
            component: GlobalHeaderTitleButtonDescription,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
            name: "Item List",
            component: Dialog,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
                { label: "Item 1", propId: "items.0.itemId", suffix: "item-0", visibleProp: "items.0.visible" },
                { label: "Item 2", propId: "items.1.itemId", suffix: "item-1", visibleProp: "items.1.visible" },
                { label: "Item 3", propId: "items.2.itemId", suffix: "item-2", visibleProp: "items.2.visible" },
                { label: "Item 4", propId: "items.3.itemId", suffix: "item-3", visibleProp: "items.3.visible" },
                { label: "Item 5", propId: "items.4.itemId", suffix: "item-4", visibleProp: "items.4.visible" },
                { label: "Item 6", propId: "items.5.itemId", suffix: "item-5", visibleProp: "items.5.visible" },
                { label: "Item 7", propId: "items.6.itemId", suffix: "item-6", visibleProp: "items.6.visible" },
                { label: "Item 8", propId: "items.7.itemId", suffix: "item-8", visibleProp: "items.7.visible" }
            ]
        },
        {
            id: "dialog-accordion",
            name: "Accordion",
            component: DialogAccordion,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
            id: "media-21-9",
            name: "21:9",
            component: Media21x9,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
            config: [
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: componentDefaults["media-21-9"].image
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
            id: "media-16-9",
            name: "16:9",
            component: Media16x9,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
        },
        {
            id: "media-5-4",
            name: "5:4",
            component: Media5x4,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
            config: [
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: componentDefaults["media-5-4"].image
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
            id: "media-4-3",
            name: "4:3",
            component: Media4x3,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
            config: [
                {
                    name: "fullWidth",
                    label: "Full Width",
                    type: "boolean",
                    default: componentDefaults["media-4-3"].fullWidth
                },
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: componentDefaults["media-4-3"].image
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
            name: "Terra",
            component: TerraBannerHero,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
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
    "Testimonials": [
        {
            id: "terra-testimony",
            name: "Terra",
            component: TerraTestimony,
            thumbnail: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
            config: [
                {
                    name: "testimonies",
                    label: "Testimonies",
                    type: "list",
                    default: componentDefaults["terra-testimony"].testimonies
                }
            ],
            links: [
                { label: "Testimony 1", propId: "testimonies.0.cardId", suffix: "testimony-0", visibleProp: "testimonies.0.visible" },
                { label: "Testimony 2", propId: "testimonies.1.cardId", suffix: "testimony-1", visibleProp: "testimonies.1.visible" },
                { label: "Testimony 3", propId: "testimonies.2.cardId", suffix: "testimony-2", visibleProp: "testimonies.2.visible" },
                { label: "Testimony 4", propId: "testimonies.3.cardId", suffix: "testimony-3", visibleProp: "testimonies.3.visible" },
                { label: "Testimony 5", propId: "testimonies.4.cardId", suffix: "testimony-4", visibleProp: "testimonies.4.visible" },
                { label: "Testimony 6", propId: "testimonies.5.cardId", suffix: "testimony-5", visibleProp: "testimonies.5.visible" },
                { label: "Testimony 7", propId: "testimonies.6.cardId", suffix: "testimony-6", visibleProp: "testimonies.6.visible" },
                { label: "Testimony 8", propId: "testimonies.7.cardId", suffix: "testimony-7", visibleProp: "testimonies.7.visible" },
                { label: "Testimony 9", propId: "testimonies.8.cardId", suffix: "testimony-8", visibleProp: "testimonies.8.visible" },
                { label: "Testimony 10", propId: "testimonies.9.cardId", suffix: "testimony-9", visibleProp: "testimonies.9.visible" },
                { label: "Testimony 11", propId: "testimonies.10.cardId", suffix: "testimony-10", visibleProp: "testimonies.10.visible" },
                { label: "Testimony 12", propId: "testimonies.11.cardId", suffix: "testimony-11", visibleProp: "testimonies.11.visible" }
            ]
        }
    ]
};
