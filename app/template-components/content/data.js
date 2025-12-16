/**
 * Component Default Values (Single Source of Truth)
 * 
 * These values are used when a component is first added to the canvas.
 * They also serve as fallbacks if a prop is undefined.
 * 
 * Keys match the 'id' in component-library.js.
 */
export const componentDefaults = {

    "header-title": {
        title: "Title"
    },
    "header-title-description": {
        title: "Title",
        subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    "header-title-button": {
        title: "Title",
        buttonStyle: "primary",
        buttonText: "Label",
        buttonUrl: "",
        buttonVisible: true,
        buttonLinkType: "url",
        buttonTargetDialogId: "",
        buttonId: "",
        secondaryButtonText: "Label",
        secondaryButtonUrl: "",
        secondaryButtonVisible: true,
        secondaryButtonLinkType: "url",
        secondaryButtonTargetDialogId: "",
        secondaryButtonId: ""
    },
    "header-title-description-button": {
        title: "Title",
        buttonStyle: "primary",
        subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        buttonText: "Label",
        buttonUrl: "",
        buttonVisible: true,
        buttonLinkType: "url",
        buttonId: "",
        secondaryButtonText: "Label",
        secondaryButtonUrl: "",
        secondaryButtonVisible: true,
        secondaryButtonLinkType: "url",
        secondaryButtonId: ""
    },
    "terra-banner-hero": {
        title: "Title",
        subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        buttonStyle: "primary",
        buttonText: "Label",
        buttonUrl: "",
        buttonVisible: true,
        buttonLinkType: "url",
        buttonId: "",
        secondaryButtonText: "Label",
        secondaryButtonUrl: "",
        secondaryButtonVisible: true,
        secondaryButtonLinkType: "url",
        secondaryButtonId: "",
        image: ""
    },

    "feature-left": {
        title: "Title",
        subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        buttonStyle: "primary",
        buttonText: "Label",
        buttonUrl: "",
        buttonVisible: true,
        buttonLinkType: "url",
        buttonId: "",
        secondaryButtonText: "Label",
        secondaryButtonUrl: "",
        secondaryButtonVisible: true,
        secondaryButtonLinkType: "url",
        secondaryButtonId: "",
        image: ""
    },
    "feature-right": {
        title: "Title",
        subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        buttonStyle: "primary",
        buttonText: "Label",
        buttonUrl: "",
        buttonVisible: true,
        buttonLinkType: "url",
        buttonId: "",
        image: ""
    },
    "dialog": {
        title: "Title",
        description: "Description",

        image: "",
        imageId: "",
        imageVisible: true,
        items: Array(8).fill({ label: "Label", image: "", url: "", itemId: "", visible: true })
    },
    "dialog-accordion": {
        title: "Title",
        description: "Description",
        image: "",
        imageId: "",
        imageVisible: true,
        items: Array(8).fill({ title: "Accordion Title", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." })
    },
    "banner-information": {
        title: "Information Banner",
        buttonText: "Label",
        buttonUrl: "",
        buttonVisible: true,
        buttonLinkType: "url",
        buttonTargetDialogId: "",
        buttonId: "",
        isSticky: true
    },
    "media-16-9": {
        image: "",
        fullWidth: false
    },
    "lacto-navigation": {
        logo: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
        logoVisible: true,
        logoId: "",

        menu1Label: "Menu 1",
        menu1Url: "",
        menu1OpenInNewTab: false,
        menu1LinkType: "url",
        menu1TargetDialogId: "",
        menu1Id: "",

        menu2Label: "Menu 2",
        menu2Url: "",
        menu2OpenInNewTab: false,
        menu2LinkType: "url",
        menu2TargetDialogId: "",
        menu2Id: "",

        menu3Label: "Menu 3",
        menu3Url: "",
        menu3OpenInNewTab: false,
        menu3LinkType: "url",
        menu3TargetDialogId: "",
        menu3Id: "",

        menu4Label: "Menu 4",
        menu4Url: "",
        menu4OpenInNewTab: false,
        menu4LinkType: "url",
        menu4TargetDialogId: "",
        menu4Id: "",
        isSticky: true
    },

    "terra-testimony": {
        testimonies: Array(12).fill({
            name: "People Name",
            role: "Role",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
            image: "",
            imageUrl: "",
            imageLinkType: "url",
            imageTargetDialogId: "",
            avatar: "",
            avatarUrl: "",
            avatarLinkType: "url",
            avatarTargetDialogId: "",
            imageVisible: true,
            avatarVisible: true,
            cardId: "",
            visible: true
        }),
        fullWidth: false
    },



};
