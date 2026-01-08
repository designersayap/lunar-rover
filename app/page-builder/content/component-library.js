import dynamic from "next/dynamic";
import { componentDefaults } from "../../templates/content/data";

const HeaderSection = dynamic(() => import("@/app/templates/header/header-section"));
const HeroTerraBanner = dynamic(() => import("@/app/templates/terra/terra-banner-hero"));
const FeatureImageLeft = dynamic(() => import("@/app/templates/feature/feature-image-left"));
const FeatureImageRight = dynamic(() => import("@/app/templates/feature/feature-image-right"));
const DialogItemList = dynamic(() => import("../../templates/dialog/dialog-item-list"));
const DialogAccordion = dynamic(() => import("../../templates/dialog/dialog-accordion"));
const OsmBanner = dynamic(() => import("../../templates/osm/osm-banner"));
const TestimonialTerra = dynamic(() => import("../../templates/terra/terra-testimony"));
const Media16x9 = dynamic(() => import("../../templates/media/media-16-9"));
const Media5x4 = dynamic(() => import('@/app/templates/media/media-5-4'));
const Media4x3 = dynamic(() => import('@/app/templates/media/media-4-3'));
const Media21x9 = dynamic(() => import('@/app/templates/media/media-21-9'));
const NavigationCenter = dynamic(() => import("../../templates/navigation/navigation-center"));
const BackgroundFullBody = dynamic(() => import("@/app/templates/background/full-body"));
const FooterTerra = dynamic(() => import("@/app/templates/terra/terra-footer"));
const ScrollGroup = dynamic(() => import("../utils/builder/scroll-group"));
const SpacingSmall = dynamic(() => import("../../templates/spacing/spacing-small"));
const SpacingMedium = dynamic(() => import("../../templates/spacing/spacing-medium"));
const SpacingLarge = dynamic(() => import("../../templates/spacing/spacing-large"));

export const componentLibrary = {
    "Background": [
        {
            id: "background-full-body",
            name: "Background - Full Body",
            component: BackgroundFullBody,
            thumbnail: "/images/thumbnails/background-full-body.svg",
            config: [
                {
                    name: "image",
                    label: "Background Image",
                    type: "image",
                    default: componentDefaults["background-full-body"]?.image
                }
            ],
            images: [
                {
                    label: "Background",
                    propId: "imageId",
                    suffix: "bg",
                    visibleProp: "imageVisible"
                }
            ]
        }
    ],
    "Navigation": [
        {
            id: "navigation-center",
            name: "Navigation - Center",
            component: NavigationCenter,
            thumbnail: "/images/thumbnails/navigation-center.svg",
            config: [
                { name: "menu1Label", label: "Menu 1 Label", type: "text", default: componentDefaults["navigation-center"].menu1Label },
                { name: "menu1Url", label: "Menu 1 URL", type: "text", default: componentDefaults["navigation-center"].menu1Url },
                { name: "menu2Label", label: "Menu 2 Label", type: "text", default: componentDefaults["navigation-center"].menu2Label },
                { name: "menu2Url", label: "Menu 2 URL", type: "text", default: componentDefaults["navigation-center"].menu2Url },
                { name: "menu3Label", label: "Menu 3 Label", type: "text", default: componentDefaults["navigation-center"].menu3Label },
                { name: "menu3Url", label: "Menu 3 URL", type: "text", default: componentDefaults["navigation-center"].menu3Url },
                { name: "menu4Label", label: "Menu 4 Label", type: "text", default: componentDefaults["navigation-center"].menu4Label },
                { name: "menu4Url", label: "Menu 4 URL", type: "text", default: componentDefaults["navigation-center"].menu4Url },
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
            id: "osm-banner",
            name: "OSM - Banner",
            component: OsmBanner,
            thumbnail: "/images/thumbnails/osm-banner.svg",
            config: [
                {
                    name: "title",
                    label: "Title",
                    type: "text",
                    default: componentDefaults["osm-banner"].title
                },
                {
                    name: "buttonText",
                    label: "Button Label",
                    type: "text",
                    default: componentDefaults["osm-banner"].buttonText
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["osm-banner"].buttonLinkType
                },
                {
                    name: "buttonUrl",
                    label: "Button URL",
                    type: "text",
                    default: componentDefaults["osm-banner"].buttonUrl
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
    "Hero": [
        {
            id: "hero-terra-banner",
            name: "Hero - Terra Banner",
            component: HeroTerraBanner,
            thumbnail: "/images/thumbnails/hero-terra-banner.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: componentDefaults["hero-terra-banner"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["hero-terra-banner"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["hero-terra-banner"].secondaryButtonLinkType
                },
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                    default: componentDefaults["hero-terra-banner"].image
                }
            ],
            texts: [
                {
                    label: "Title",
                    propId: "titleId",
                    suffix: "title",
                    visibleProp: "titleVisible",
                },
                {
                    label: "Description",
                    propId: "subtitleId",
                    suffix: "subtitle",
                    visibleProp: "subtitleVisible",
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
    "Header": [

        {
            id: "header-section",
            name: "Header - Section",
            component: HeaderSection,
            thumbnail: "/images/thumbnails/header-section.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: componentDefaults["header-section"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["header-section"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["header-section"].secondaryButtonLinkType
                },
                {
                    name: "buttonText",
                    label: "Button Text",
                    type: "text",
                    default: componentDefaults["header-section"].buttonText
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: componentDefaults["header-section"].secondaryButtonText
                }
            ],
            texts: [
                {
                    label: "Title",
                    propId: "titleId",
                    suffix: "title",
                    visibleProp: "titleVisible",
                },
                {
                    label: "Description",
                    propId: "subtitleId",
                    suffix: "subtitle",
                    visibleProp: "subtitleVisible",
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
    "Media": [
        {
            id: "media-21-9",
            name: "Media - 21:9",
            component: Media21x9,
            thumbnail: "/images/thumbnails/media-219.svg",
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
            name: "Media - 16:9",
            component: Media16x9,
            thumbnail: "/images/thumbnails/media-169.svg",
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
            name: "Media - 5:4",
            component: Media5x4,
            thumbnail: "/images/thumbnails/media-54.svg",
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
            name: "Media - 4:3",
            component: Media4x3,
            thumbnail: "/images/thumbnails/media-43.svg",
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
    "Feature": [
        {
            id: "feature-image-left",
            name: "Feature - Image Left",
            component: FeatureImageLeft,
            thumbnail: "/images/thumbnails/feature-image-left.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: componentDefaults["feature-image-left"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["feature-image-left"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["feature-image-left"].secondaryButtonLinkType
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: componentDefaults["feature-image-left"].secondaryButtonText
                }
            ],
            texts: [
                {
                    label: "Title",
                    propId: "titleId",
                    suffix: "title",
                    visibleProp: "titleVisible",
                },
                {
                    label: "Description",
                    propId: "subtitleId",
                    suffix: "subtitle",
                    visibleProp: "subtitleVisible",
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
            id: "feature-image-right",
            name: "Feature - Image Right",
            component: FeatureImageRight,
            thumbnail: "/images/thumbnails/feature-image-right.svg",
            config: [
                {
                    name: "buttonStyle",
                    label: "Button Style",
                    type: "select",
                    options: ["primary", "neutral", "outline", "ghost", "ghost-neutral"],
                    default: componentDefaults["feature-image-right"].buttonStyle
                },
                {
                    name: "buttonLinkType",
                    label: "Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["feature-image-right"].buttonLinkType
                },
                {
                    name: "secondaryButtonLinkType",
                    label: "Secondary Button Link Type",
                    type: "select",
                    options: ["url", "dialog"],
                    default: componentDefaults["feature-image-right"].secondaryButtonLinkType
                },
                {
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                    type: "text",
                    default: componentDefaults["feature-image-right"].secondaryButtonText
                }
            ],
            texts: [
                {
                    label: "Title",
                    propId: "titleId",
                    suffix: "title",
                    visibleProp: "titleVisible",
                },
                {
                    label: "Description",
                    propId: "subtitleId",
                    suffix: "subtitle",
                    visibleProp: "subtitleVisible",
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
    ],
    "Testimonial": [
        {
            id: "testimonial-terra",
            name: "Testimonial - Terra",
            component: TestimonialTerra,
            thumbnail: "/images/thumbnails/testimonial-terra.svg",
            config: [
                {
                    name: "testimonies",
                    label: "Testimonies",
                    type: "list",
                    default: componentDefaults["testimonial-terra"].testimonies
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
    ],
    "Footer": [
        {
            id: "footer-terra",
            name: "Footer - Terra",
            component: FooterTerra,
            thumbnail: "/images/thumbnails/footer-terra.svg",
            config: [
                {
                    name: "image",
                    label: "Logo",
                    type: "image",
                    default: componentDefaults["footer-terra"]?.image
                },
                {
                    name: "socialLinks",
                    label: "Social Links",
                    type: "list",
                    default: componentDefaults["footer-terra"]?.socialLinks
                },
                {
                    name: "findUsOnLinks",
                    label: "Find Us On Links",
                    type: "list",
                    default: componentDefaults["footer-terra"]?.findUsOnLinks
                },
                {
                    name: "resourceLinks",
                    label: "Resource Links",
                    type: "list",
                    default: componentDefaults["footer-terra"]?.resourceLinks
                }
            ],
            images: [
                {
                    label: "Logo",
                    propId: "imageId",
                    suffix: "logo",
                    visibleProp: "imageVisible"
                }
            ],
            links: [
                { label: "Facebook", propId: "socialLinks.0.id", suffix: "social-fb", visibleProp: "socialLinks.0.visible" },
                { label: "Twitter", propId: "socialLinks.1.id", suffix: "social-x", visibleProp: "socialLinks.1.visible" },
                { label: "Instagram", propId: "socialLinks.2.id", suffix: "social-ig", visibleProp: "socialLinks.2.visible" },
                { label: "TikTok", propId: "socialLinks.3.id", suffix: "social-tiktok", visibleProp: "socialLinks.3.visible" },
                { label: "YouTube", propId: "socialLinks.4.id", suffix: "social-yt", visibleProp: "socialLinks.4.visible" },
                { label: "Find Us 1", propId: "findUsOnLinks.0.id", suffix: "link-1", visibleProp: "findUsOnLinks.0.visible" },
                { label: "Find Us 2", propId: "findUsOnLinks.1.id", suffix: "link-2", visibleProp: "findUsOnLinks.1.visible" },
                { label: "Find Us 3", propId: "findUsOnLinks.2.id", suffix: "link-3", visibleProp: "findUsOnLinks.2.visible" },
                { label: "Resource 1", propId: "resourceLinks.0.id", suffix: "link-4", visibleProp: "resourceLinks.0.visible" },
                { label: "Resource 2", propId: "resourceLinks.1.id", suffix: "link-5", visibleProp: "resourceLinks.1.visible" },
                { label: "Resource 3", propId: "resourceLinks.2.id", suffix: "link-6", visibleProp: "resourceLinks.2.visible" }
            ]
        }
    ],
    "Dialog": [
        {
            id: "dialog-item-list",
            name: "Dialog - Item List",
            component: DialogItemList,
            thumbnail: "/images/thumbnails/dialog-item-list.svg",
            config: [
                {
                    name: "items",
                    label: "List Items",
                    type: "list", // Special type: Renders a list editor in the sidebar
                    default: componentDefaults["dialog-item-list"].items
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
            name: "Dialog - Accordion",
            component: DialogAccordion,
            thumbnail: "/images/thumbnails/dialog-item-list.svg",
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
    "Spacing": [
        {
            id: "spacing-small",
            name: "Spacing - Small",
            component: SpacingSmall,
            thumbnail: "/images/thumbnails/feature-image-right.svg",
            config: []
        },
        {
            id: "spacing-medium",
            name: "Spacing - Medium",
            component: SpacingMedium,
            thumbnail: "/images/thumbnails/feature-image-right.svg",
            config: []
        },
        {
            id: "spacing-large",
            name: "Spacing - Large",
            component: SpacingLarge,
            thumbnail: "/images/thumbnails/feature-image-right.svg",
            config: []
        }
    ],
    "Structure": [
        {
            id: 'scroll-group',
            name: 'Scroll Group',
            component: ScrollGroup,
            thumbnail: "/images/thumbnails/feature-image-right.svg", // Placeholder
            hidden: true,
            config: [
                {
                    name: "image",
                    label: "Desktop Background",
                    type: "image",
                    default: componentDefaults["scroll-group"].image
                },
                {
                    name: "mobileImage",
                    label: "Mobile Background",
                    type: "image",
                    default: componentDefaults["scroll-group"].mobileImage
                }
            ]
        }
    ]
};
