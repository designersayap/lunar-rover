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
    "lacto-navigation": {
        menuItems: [
            {
                label: "menu",
                url: "",
                linkId: "",
                linkVisible: true
            },
            {
                label: "menu",
                url: "",
                linkId: "",
                linkVisible: true
            },
            {
                label: "menu",
                url: "",
                linkId: "",
                linkVisible: true
            },
            {
                label: "menu",
                url: "",
                linkId: "",
                linkVisible: true
            }
        ],
        logo: {
            image: "",
            imageId: "",
            imageVisible: true
        },
        isSticky: true,
        fullWidth: true
    }


};
