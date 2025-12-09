import dynamic from "next/dynamic";

const GlobalHeaderTitle = dynamic(() => import("../../template-components/header-title"));
const GlobalHeaderTitleButton = dynamic(() => import("../../template-components/header-title-button"));
const GlobalHeaderTitleDescription = dynamic(() => import("../../template-components/header-title-description"));
const GlobalHeaderTitleButtonDescription = dynamic(() => import("../../template-components/header-title-description-button"));

const TerraBannerHero = dynamic(() => import("@/app/template-components/terra/terra-banner-hero"));
const TerraFeaturesImageLeft = dynamic(() => import("@/app/template-components/terra/terra-features-image-left"));
const TerraFeaturesImageRight = dynamic(() => import("@/app/template-components/terra/terra-features-image-right"));
const Dialog = dynamic(() => import("../../template-components/dialog-default"));
const DialogAccordion = dynamic(() => import("../../template-components/dialog-accordion"));


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
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
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
                    default: "primary"
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
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
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: ""
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
                    default: "primary"
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: "url"
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: "Label"
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
                    default: "primary"
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
                    type: "list", // Placeholder type, main goal is to get the default passed through
                    default: [
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" },
                        { label: "Label", image: "", url: "" }
                    ]
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
                    name: "items",
                    label: "Accordion Items",
                    type: "list",
                    default: [
                        { title: "Title 1", content: "Content 1" },
                        { title: "Title 2", content: "Content 2" },
                        { title: "Title 3", content: "Content 3" },
                        { title: "Title 4", content: "Content 4" },
                        { title: "Title 5", content: "Content 5" },
                        { title: "Title 6", content: "Content 6" },
                        { title: "Title 7", content: "Content 7" },
                        { title: "Title 8", content: "Content 8" }
                    ]
                }
            ],
            links: [
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
    ]
};
