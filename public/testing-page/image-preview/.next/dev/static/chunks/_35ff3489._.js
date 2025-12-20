(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/public/testing-page/image-preview/components/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Component Default Values (Single Source of Truth)
 * 
 * These values are used when a component is first added to the canvas.
 * They also serve as fallbacks if a prop is undefined.
 * 
 * Keys match the 'id' in component-library.js.
 */ __turbopack_context__.s([
    "componentDefaults",
    ()=>componentDefaults
]);
const componentDefaults = {
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
        items: Array(8).fill({
            label: "Label",
            image: "",
            url: "",
            itemId: "",
            visible: true
        })
    },
    "dialog-accordion": {
        title: "Title",
        description: "Description",
        image: "",
        imageId: "",
        imageVisible: true,
        items: Array(8).fill({
            title: "Accordion Title",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        })
    },
    "banner-information": {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
        fullWidth: false,
        imageIsPortrait: false,
        imageMobileRatio: ""
    },
    "media-5-4": {
        image: "",
        fullWidth: false,
        imageIsPortrait: false,
        imageMobileRatio: ""
    },
    "media-4-3": {
        image: "",
        fullWidth: false,
        imageIsPortrait: false,
        imageMobileRatio: ""
    },
    "media-21-9": {
        image: "",
        fullWidth: false,
        imageIsPortrait: false,
        imageMobileRatio: ""
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
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/components/header-section.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "content": "header-section-module__M5OYLa__content",
  "section": "header-section-module__M5OYLa__section",
  "subtitle": "header-section-module__M5OYLa__subtitle",
  "title": "header-section-module__M5OYLa__title",
});
}),
"[project]/public/testing-page/image-preview/components/header-section.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeaderSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/header-section.module.css [app-client] (css module)");
;
;
function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = [
        "container-grid"
    ];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}
function HeaderSection({ title, subtitle, children, sectionId, onUpdate, titleStyle = {}, subtitleStyle = {}, className = "", fullWidth, removePaddingLeft, removePaddingRight }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section} ${className}`,
        id: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: getContainerClasses({
                fullWidth,
                removePaddingLeft,
                removePaddingRight
            }),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `col-mobile-4 col-tablet-8 col-desktop-8 offset-desktop-2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content}`,
                    children: [
                        title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: `h2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title}`,
                            id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h2` : undefined,
                            style: titleStyle,
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
                            lineNumber: 32,
                            columnNumber: 29
                        }, this),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `subheader-h1 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle}`,
                            id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined,
                            style: subtitleStyle,
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
                            lineNumber: 35,
                            columnNumber: 29
                        }, this),
                        children
                    ]
                }, void 0, true, {
                    fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
                    lineNumber: 30,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
                lineNumber: 29,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
            lineNumber: 28,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_c = HeaderSection;
var _c;
__turbopack_context__.k.register(_c, "HeaderSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/components/header-title-description-button.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalHeaderTitleButtonDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/header-section.js [app-client] (ecmascript)");
;
;
;
;
;
function GlobalHeaderTitleButtonDescription({ title = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].title, subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].subtitle, buttonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonText, buttonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonUrl, buttonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonVisible, buttonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonLinkType || "url", buttonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonTargetDialogId, secondaryButtonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonText, secondaryButtonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonUrl, secondaryButtonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonVisible, secondaryButtonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonLinkType || "url", secondaryButtonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonTargetDialogId, buttonId, secondaryButtonId, buttonStyle = "primary", secondaryButtonStyle = "ghost", onUpdate, sectionId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        titleStyle: {
            marginBottom: "var(--gap-md)"
        },
        subtitle: subtitle,
        subtitleStyle: {
            marginBottom: "var(--gap-lg)"
        },
        sectionId: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "buttonWrapperCenter",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: buttonLinkType === 'dialog' && buttonTargetDialogId ? '#' + buttonTargetDialogId : buttonUrl || "#",
                    className: `btn btn-${buttonStyle} btn-md`,
                    id: buttonId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-button` : undefined),
                    onClick: (e)=>{
                        if (buttonLinkType === 'dialog' && buttonTargetDialogId) {
                            window.location.hash = '#' + buttonTargetDialogId;
                        }
                    },
                    children: buttonText
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/image-preview/components/header-title-description-button.js",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: secondaryButtonLinkType === 'dialog' && secondaryButtonTargetDialogId ? '#' + secondaryButtonTargetDialogId : secondaryButtonUrl || "#",
                    className: `btn btn-${secondaryButtonStyle} btn-md`,
                    id: secondaryButtonId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-secondary-button` : undefined),
                    onClick: (e)=>{
                        if (secondaryButtonLinkType === 'dialog' && secondaryButtonTargetDialogId) {
                            window.location.hash = '#' + secondaryButtonTargetDialogId;
                        }
                    },
                    children: secondaryButtonText
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/image-preview/components/header-title-description-button.js",
                    lineNumber: 46,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/public/testing-page/image-preview/components/header-title-description-button.js",
            lineNumber: 40,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/image-preview/components/header-title-description-button.js",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
_c = GlobalHeaderTitleButtonDescription;
var _c;
__turbopack_context__.k.register(_c, "GlobalHeaderTitleButtonDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/components/media-16-9.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "media-16-9-module__MtbA8G__container",
  "image": "media-16-9-module__MtbA8G__image",
});
}),
"[project]/public/testing-page/image-preview/components/media-16-9.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media16x9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/media-16-9.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-client] (ecmascript)");
;
;
;
function getContainerClasses({ removePaddingLeft, removePaddingRight, fullWidth }) {
    const classes = [
        "container-grid"
    ];
    if (removePaddingLeft) classes.push("pl-0");
    if (removePaddingRight) classes.push("pr-0");
    if (fullWidth) classes.push("container-full");
    return classes.join(" ");
}
function Media16x9({ image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["media-16-9"].image, imageId, imageVisible, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight, imageHref, imageLinkType, imageTargetDialogId, imageIsPortrait, imageMobileRatio }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        id: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: getContainerClasses({
                fullWidth,
                removePaddingLeft,
                removePaddingRight
            }),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-mobile-4 col-tablet-8 col-desktop-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "imageWrapper",
                        children: (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            src: image,
                            controls: true,
                            autoPlay: true,
                            muted: true,
                            loop: true,
                            playsInline: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                lineNumber: 37,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
            lineNumber: 35,
            columnNumber: 1
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
_c = Media16x9;
var _c;
__turbopack_context__.k.register(_c, "Media16x9");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accordionContainer": "dialog-section-module__a9Pi3G__accordionContainer",
  "accordionContent": "dialog-section-module__a9Pi3G__accordionContent",
  "accordionContentOpen": "dialog-section-module__a9Pi3G__accordionContentOpen",
  "accordionHeader": "dialog-section-module__a9Pi3G__accordionHeader",
  "accordionIcon": "dialog-section-module__a9Pi3G__accordionIcon",
  "accordionInner": "dialog-section-module__a9Pi3G__accordionInner",
  "accordionItem": "dialog-section-module__a9Pi3G__accordionItem",
  "accordionTitle": "dialog-section-module__a9Pi3G__accordionTitle",
  "closeButton": "dialog-section-module__a9Pi3G__closeButton",
  "description": "dialog-section-module__a9Pi3G__description",
  "dialog": "dialog-section-module__a9Pi3G__dialog",
  "fadeIn": "dialog-section-module__a9Pi3G__fadeIn",
  "iconContainer": "dialog-section-module__a9Pi3G__iconContainer",
  "imageContainer": "dialog-section-module__a9Pi3G__imageContainer",
  "itemArrow": "dialog-section-module__a9Pi3G__itemArrow",
  "itemContent": "dialog-section-module__a9Pi3G__itemContent",
  "itemIcon": "dialog-section-module__a9Pi3G__itemIcon",
  "lastItem": "dialog-section-module__a9Pi3G__lastItem",
  "listContainer": "dialog-section-module__a9Pi3G__listContainer",
  "listItem": "dialog-section-module__a9Pi3G__listItem",
  "scaleIn": "dialog-section-module__a9Pi3G__scaleIn",
  "textContainer": "dialog-section-module__a9Pi3G__textContainer",
  "title": "dialog-section-module__a9Pi3G__title",
  "triggerWrapper": "dialog-section-module__a9Pi3G__triggerWrapper",
  "wrapper": "dialog-section-module__a9Pi3G__wrapper",
});
}),
"[project]/public/testing-page/image-preview/components/dialog-section.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DialogSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function DialogSection({ title, description, children, isOpen: controlledIsOpen, onUpdate, sectionId, className = "", // New Props for Image
image, imageId, imageVisible }) {
    _s();
    // === State & Control ===
    const [internalIsOpen, setInternalIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [portalContainer, setPortalContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Support both controlled (via props) and uncontrolled modes
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    // === Portal Setup ===
    // We render into document.body to ensure we escape any stacking contexts (like transforms in builder)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DialogSection.useEffect": ()=>{
            setPortalContainer(document.body);
        }
    }["DialogSection.useEffect"], []);
    const toggleOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DialogSection.useCallback[toggleOpen]": (value)=>{
            if (isControlled) {} else {
                setInternalIsOpen(value);
            }
        }
    }["DialogSection.useCallback[toggleOpen]"], [
        isControlled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DialogSection.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && sectionId) {
                const checkHash = {
                    "DialogSection.useEffect.checkHash": ()=>{
                        if (window.location.hash === `#${sectionId}`) {
                            setInternalIsOpen(true);
                        }
                    }
                }["DialogSection.useEffect.checkHash"];
                checkHash();
                window.addEventListener('hashchange', checkHash);
                return ({
                    "DialogSection.useEffect": ()=>window.removeEventListener('hashchange', checkHash)
                })["DialogSection.useEffect"];
            }
        }
    }["DialogSection.useEffect"], [
        sectionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DialogSection.useEffect": ()=>{
            if (!isOpen && ("TURBOPACK compile-time value", "object") !== 'undefined' && sectionId) {
                if (window.location.hash === `#${sectionId}`) {
                    history.replaceState(null, document.title, window.location.pathname + window.location.search);
                }
            }
        }
    }["DialogSection.useEffect"], [
        isOpen,
        sectionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DialogSection.useEffect": ()=>{
            if (!sectionId || ("TURBOPACK compile-time value", "object") === 'undefined') return;
            const handleGlobalClick = {
                "DialogSection.useEffect.handleGlobalClick": (e)=>{
                    const anchor = e.target.closest('a');
                    if (anchor) {
                        const href = anchor.getAttribute('href');
                        if (href === `#${sectionId}`) {
                            setInternalIsOpen(true);
                        }
                    }
                }
            }["DialogSection.useEffect.handleGlobalClick"];
            window.addEventListener('click', handleGlobalClick);
            return ({
                "DialogSection.useEffect": ()=>window.removeEventListener('click', handleGlobalClick)
            })["DialogSection.useEffect"];
        }
    }["DialogSection.useEffect"], [
        sectionId
    ]);
    // 1. Lock Body Scroll when Open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DialogSection.useEffect": ()=>{
            if (!isOpen) return;
            if (portalContainer) {
                // If in builder/canvas, lock canvas scroll
                const canvas = portalContainer.parentElement;
                if (canvas) {
                    // eslint-disable-next-line react-hooks/immutability
                    canvas.style.overflow = 'hidden';
                    // eslint-disable-next-line react-hooks/immutability
                    return ({
                        "DialogSection.useEffect": ()=>{
                            canvas.style.overflow = '';
                        }
                    })["DialogSection.useEffect"];
                }
            } else {
                // If standalone, lock body scroll
                document.body.style.overflow = 'hidden';
                return ({
                    "DialogSection.useEffect": ()=>{
                        document.body.style.overflow = '';
                    }
                })["DialogSection.useEffect"];
            }
        }
    }["DialogSection.useEffect"], [
        isOpen,
        portalContainer
    ]);
    // 2. Escape Key to Close
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DialogSection.useEffect": ()=>{
            if (!isOpen) return;
            const handleEsc = {
                "DialogSection.useEffect.handleEsc": (e)=>e.key === 'Escape' && toggleOpen(false)
            }["DialogSection.useEffect.handleEsc"];
            window.addEventListener('keydown', handleEsc);
            return ({
                "DialogSection.useEffect": ()=>window.removeEventListener('keydown', handleEsc)
            })["DialogSection.useEffect"];
        }
    }["DialogSection.useEffect"], [
        isOpen,
        toggleOpen
    ]);
    // === Render Logic ===
    const dialogContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `overlay z-system-modal-fullscreen ${className}`,
        style: {
            display: isOpen ? 'flex' : 'none',
            pointerEvents: 'auto'
        },
        onClick: (e)=>e.target === e.currentTarget && toggleOpen(false),
        "data-section-id": sectionId,
        "data-dialog-overlay": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-grid",
            style: {
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                style: {
                    width: '100%'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-mobile-4 col-tablet-6 col-desktop-6 offset-desktop-3 offset-tablet-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dialog,
                        role: "dialog",
                        "aria-modal": "true",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].closeButton} z-content-2`,
                                onClick: ()=>toggleOpen(false),
                                "aria-label": "Close dialog",
                                "data-dialog-close": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                                    style: {
                                        width: 20,
                                        height: 20
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                    lineNumber: 131,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 130,
                                columnNumber: 29
                            }, this),
                            (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: image,
                                controls: true,
                                autoPlay: true,
                                muted: true,
                                loop: true,
                                playsInline: true,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer} imagePlaceholder-16-9`,
                                id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 135,
                                columnNumber: 21
                            }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                src: image,
                                controls: true,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer} imagePlaceholder-16-9`,
                                id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 137,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: image || null,
                                alt: "",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer} imagePlaceholder-16-9`,
                                id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this)),
                            (title || description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textContainer,
                                children: [
                                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: `h4 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title}`,
                                        id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h4` : undefined,
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                        lineNumber: 145,
                                        columnNumber: 41
                                    }, this),
                                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `body-regular ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description}`,
                                        id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined,
                                        children: description
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                        lineNumber: 148,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 143,
                                columnNumber: 33
                            }, this),
                            children
                        ]
                    }, void 0, true, {
                        fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                        lineNumber: 124,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                    lineNumber: 123,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                lineNumber: 121,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
            lineNumber: 120,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
        lineNumber: 113,
        columnNumber: 9
    }, this);
    // Use Portal if container exists, otherwise fallback to inline (SSR/mounting)
    return portalContainer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(dialogContent, portalContainer) : dialogContent;
}
_s(DialogSection, "6cdYCIqQMadt4KDuFJz2Kmt7ZKw=");
_c = DialogSection;
var _c;
__turbopack_context__.k.register(_c, "DialogSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/components/dialog-default.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DialogDefault
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.js [app-client] (ecmascript)");
;
;
;
;
;
;
function DialogDefault({ title = "Title", description = "Description", isOpen, onUpdate, sectionId, className = "", image, imageId, imageVisible, // List Items
items = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"].dialog.items }) {
    const updateItem = (index, field, value)=>{
        if (!onUpdate) return;
        const newItems = [
            ...items
        ];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        onUpdate({
            items: newItems
        });
    };
    const updateItemId = (index, newId)=>{
        updateItem(index, 'itemId', newId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        description: description,
        isOpen: isOpen,
        sectionId: sectionId,
        className: className,
        image: image,
        imageId: imageId,
        imageVisible: imageVisible,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].listContainer,
            children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.url || "#",
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].listItem} body-regular ${i === items.length - 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].lastItem : ''}`,
                    id: item.itemId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined),
                    children: item.label
                }, i, false, {
                    fileName: "[project]/public/testing-page/image-preview/components/dialog-default.js",
                    lineNumber: 47,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/public/testing-page/image-preview/components/dialog-default.js",
            lineNumber: 45,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/image-preview/components/dialog-default.js",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_c = DialogDefault;
var _c;
__turbopack_context__.k.register(_c, "DialogDefault");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/components/dialog-accordion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DialogAccordion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript) <export default as PlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MinusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/MinusIcon.js [app-client] (ecmascript) <export default as MinusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function DialogAccordion({ title = "Title", description = "Description", isOpen, onUpdate, sectionId, className = "", image, imageId, imageVisible, // Accordion Items
items = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["dialog-accordion"]?.items || [], item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id, item0Visible = true, item1Visible = true, item2Visible = true, item3Visible = true, item4Visible = true, item5Visible = true, item6Visible = true, item7Visible = true }) {
    _s();
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Only one open at a time
    const itemIds = [
        item0Id,
        item1Id,
        item2Id,
        item3Id,
        item4Id,
        item5Id,
        item6Id,
        item7Id
    ];
    const itemVisibility = [
        item0Visible,
        item1Visible,
        item2Visible,
        item3Visible,
        item4Visible,
        item5Visible,
        item6Visible,
        item7Visible
    ];
    const toggleAccordion = (index)=>{
        setOpenIndex((prev)=>prev === index ? null : index);
    };
    const updateItem = (index, field, value)=>{
        if (!onUpdate) return;
        const newItems = [
            ...items
        ];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        onUpdate({
            items: newItems
        });
    };
    const updateItemId = (index, newId)=>{
        if (onUpdate) {
            onUpdate({
                [`item${index}Id`]: newId
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        description: description,
        isOpen: isOpen,
        sectionId: sectionId,
        className: className,
        image: image,
        imageId: imageId,
        imageVisible: imageVisible,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionContainer,
            children: items.slice(0, 8).map((item, i)=>// Check visibility
                itemVisibility[i] !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionItem,
                    id: itemIds[i] || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-element` : undefined),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionHeader,
                            onClick: (e)=>{
                                e.stopPropagation(); // Prevent BuilderElement select if clicking header
                                toggleAccordion(i);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconContainer,
                                    children: openIndex === i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MinusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__["MinusIcon"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionIcon
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                        lineNumber: 77,
                                        columnNumber: 41
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__["PlusIcon"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionIcon
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                        lineNumber: 79,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                    lineNumber: 75,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `body-bold ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionTitle}`,
                                    id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-span` : undefined,
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                    lineNumber: 82,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                            lineNumber: 68,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionContent} ${openIndex === i ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionContentOpen : ''}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accordionInner} z-content-2`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "body-regular",
                                    id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined,
                                    children: item.content
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                    lineNumber: 86,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                lineNumber: 85,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                            lineNumber: 84,
                            columnNumber: 29
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                    lineNumber: 67,
                    columnNumber: 25
                }, this))
        }, void 0, false, {
            fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
            lineNumber: 63,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
        lineNumber: 52,
        columnNumber: 9
    }, this);
}
_s(DialogAccordion, "7z1SfW1ag/kVV/D8SOtFgmPOJ8o=");
_c = DialogAccordion;
var _c;
__turbopack_context__.k.register(_c, "DialogAccordion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/image-preview/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportedPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$title$2d$description$2d$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/header-title-description-button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/media-16-9.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$default$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-default.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$accordion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-accordion.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function ExportedPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$title$2d$description$2d$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/header-title-desc-button.svg",
                buttons: [
                    {
                        "label": "Button",
                        "propId": "buttonId",
                        "suffix": "button",
                        "labelProp": "buttonText",
                        "visibleProp": "buttonVisible",
                        "linkTypeProp": "buttonLinkType"
                    },
                    {
                        "label": "Secondary Button",
                        "propId": "secondaryButtonId",
                        "suffix": "secondary-button",
                        "labelProp": "secondaryButtonText",
                        "visibleProp": "secondaryButtonVisible",
                        "linkTypeProp": "secondaryButtonLinkType"
                    }
                ],
                sectionId: "header-7713",
                props: {
                    "buttonStyle": "primary",
                    "buttonLinkType": "dialog",
                    "secondaryButtonLinkType": "dialog",
                    "buttonText": "Label",
                    "secondaryButtonText": "Label",
                    "buttonTargetDialogId": "1766222228049",
                    "secondaryButtonTargetDialogId": "1766222228566"
                },
                component: undefined,
                buttonStyle: "primary",
                buttonLinkType: "dialog",
                secondaryButtonLinkType: "dialog",
                buttonText: "Label",
                secondaryButtonText: "Label",
                buttonTargetDialogId: "dialog-9846",
                secondaryButtonTargetDialogId: "dialog-4806"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/app/page.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "media-3265",
                props: {
                    "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                    "imageMobileRatio": "4-5"
                },
                component: undefined,
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                imageMobileRatio: "4-5"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/app/page.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$default$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/dialog.svg",
                images: [
                    {
                        "label": "Main Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                links: [
                    {
                        "label": "Item 1",
                        "propId": "items.0.itemId",
                        "suffix": "item-0",
                        "visibleProp": "items.0.visible"
                    },
                    {
                        "label": "Item 2",
                        "propId": "items.1.itemId",
                        "suffix": "item-1",
                        "visibleProp": "items.1.visible"
                    },
                    {
                        "label": "Item 3",
                        "propId": "items.2.itemId",
                        "suffix": "item-2",
                        "visibleProp": "items.2.visible"
                    },
                    {
                        "label": "Item 4",
                        "propId": "items.3.itemId",
                        "suffix": "item-3",
                        "visibleProp": "items.3.visible"
                    },
                    {
                        "label": "Item 5",
                        "propId": "items.4.itemId",
                        "suffix": "item-4",
                        "visibleProp": "items.4.visible"
                    },
                    {
                        "label": "Item 6",
                        "propId": "items.5.itemId",
                        "suffix": "item-5",
                        "visibleProp": "items.5.visible"
                    },
                    {
                        "label": "Item 7",
                        "propId": "items.6.itemId",
                        "suffix": "item-6",
                        "visibleProp": "items.6.visible"
                    },
                    {
                        "label": "Item 8",
                        "propId": "items.7.itemId",
                        "suffix": "item-8",
                        "visibleProp": "items.7.visible"
                    }
                ],
                sectionId: "dialog-9846",
                props: {
                    "items": [
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        },
                        {
                            "label": "Label",
                            "image": "",
                            "url": "",
                            "itemId": "",
                            "visible": true
                        }
                    ]
                },
                component: undefined,
                items: [
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    },
                    {
                        "label": "Label",
                        "image": "",
                        "url": "",
                        "itemId": "",
                        "visible": true
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/app/page.js",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$accordion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/dialog.svg",
                links: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    },
                    {
                        "label": "Accordion 1",
                        "propId": "item0Id",
                        "suffix": "accordion-0",
                        "visibleProp": "item0Visible"
                    },
                    {
                        "label": "Accordion 2",
                        "propId": "item1Id",
                        "suffix": "accordion-1",
                        "visibleProp": "item1Visible"
                    },
                    {
                        "label": "Accordion 3",
                        "propId": "item2Id",
                        "suffix": "accordion-2",
                        "visibleProp": "item2Visible"
                    },
                    {
                        "label": "Accordion 4",
                        "propId": "item3Id",
                        "suffix": "accordion-3",
                        "visibleProp": "item3Visible"
                    },
                    {
                        "label": "Accordion 5",
                        "propId": "item4Id",
                        "suffix": "accordion-4",
                        "visibleProp": "item4Visible"
                    },
                    {
                        "label": "Accordion 6",
                        "propId": "item5Id",
                        "suffix": "accordion-5",
                        "visibleProp": "item5Visible"
                    },
                    {
                        "label": "Accordion 7",
                        "propId": "item6Id",
                        "suffix": "accordion-6",
                        "visibleProp": "item6Visible"
                    },
                    {
                        "label": "Accordion 8",
                        "propId": "item7Id",
                        "suffix": "accordion-7",
                        "visibleProp": "item7Visible"
                    }
                ],
                sectionId: "dialog-4806",
                props: {
                    "items": [
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        },
                        {
                            "title": "Accordion Title",
                            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        }
                    ]
                },
                component: undefined,
                items: [
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    },
                    {
                        "title": "Accordion Title",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/public/testing-page/image-preview/app/page.js",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/public/testing-page/image-preview/app/page.js",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = ExportedPage;
var _c;
__turbopack_context__.k.register(_c, "ExportedPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function XMarkIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](XMarkIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript) <export default as XMarkIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XMarkIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function PlusIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fillRule: "evenodd",
        d: "M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z",
        clipRule: "evenodd"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](PlusIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript) <export default as PlusIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlusIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@heroicons/react/24/solid/esm/MinusIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function MinusIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fillRule: "evenodd",
        d: "M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z",
        clipRule: "evenodd"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](MinusIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/node_modules/@heroicons/react/24/solid/esm/MinusIcon.js [app-client] (ecmascript) <export default as MinusIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MinusIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MinusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MinusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/MinusIcon.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_35ff3489._.js.map