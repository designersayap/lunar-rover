module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/public/testing-page/image-preview/components/data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/public/testing-page/image-preview/components/header-section.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "content": "header-section-module__M5OYLa__content",
  "section": "header-section-module__M5OYLa__section",
  "subtitle": "header-section-module__M5OYLa__subtitle",
  "title": "header-section-module__M5OYLa__title",
});
}),
"[project]/public/testing-page/image-preview/components/header-section.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeaderSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/header-section.module.css [app-ssr] (css module)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section} ${className}`,
        id: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: getContainerClasses({
                fullWidth,
                removePaddingLeft,
                removePaddingRight
            }),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `col-mobile-4 col-tablet-8 col-desktop-8 offset-desktop-2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content}`,
                    children: [
                        title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: `h2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title}`,
                            id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h2` : undefined,
                            style: titleStyle,
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/header-section.js",
                            lineNumber: 32,
                            columnNumber: 29
                        }, this),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `subheader-h1 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle}`,
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
}),
"[project]/public/testing-page/image-preview/components/header-title-description-button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalHeaderTitleButtonDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/header-section.js [app-ssr] (ecmascript)");
;
;
;
;
;
function GlobalHeaderTitleButtonDescription({ title = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].title, subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].subtitle, buttonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonText, buttonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonUrl, buttonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonVisible, buttonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonLinkType || "url", buttonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].buttonTargetDialogId, secondaryButtonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonText, secondaryButtonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonUrl, secondaryButtonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonVisible, secondaryButtonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonLinkType || "url", secondaryButtonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["header-title-description-button"].secondaryButtonTargetDialogId, buttonId, secondaryButtonId, buttonStyle = "primary", secondaryButtonStyle = "ghost", onUpdate, sectionId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$section$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        titleStyle: {
            marginBottom: "var(--gap-md)"
        },
        subtitle: subtitle,
        subtitleStyle: {
            marginBottom: "var(--gap-lg)"
        },
        sectionId: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "buttonWrapperCenter",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
"[project]/public/testing-page/image-preview/components/media-16-9.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "media-16-9-module__MtbA8G__container",
  "image": "media-16-9-module__MtbA8G__image",
});
}),
"[project]/public/testing-page/image-preview/components/media-16-9.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media16x9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/media-16-9.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-ssr] (ecmascript)");
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
function Media16x9({ image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["media-16-9"].image, imageId, imageVisible, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight, imageHref, imageLinkType, imageTargetDialogId, imageIsPortrait, imageMobileRatio }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        id: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: getContainerClasses({
                fullWidth,
                removePaddingLeft,
                removePaddingRight
            }),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-mobile-4 col-tablet-8 col-desktop-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "imageWrapper",
                        children: (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            src: image,
                            controls: true,
                            autoPlay: true,
                            muted: true,
                            loop: true,
                            playsInline: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/image-preview/components/media-16-9.js",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
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
}),
"[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/public/testing-page/image-preview/components/dialog-section.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DialogSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-ssr] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-ssr] (css module)");
;
;
;
;
;
function DialogSection({ title, description, children, isOpen: controlledIsOpen, onUpdate, sectionId, className = "", // New Props for Image
image, imageId, imageVisible }) {
    // === State & Control ===
    const [internalIsOpen, setInternalIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [portalContainer, setPortalContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Support both controlled (via props) and uncontrolled modes
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    // === Portal Setup ===
    // We render into document.body to ensure we escape any stacking contexts (like transforms in builder)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPortalContainer(document.body);
    }, []);
    const toggleOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((value)=>{
        if (isControlled) {} else {
            setInternalIsOpen(value);
        }
    }, [
        isControlled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        sectionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        isOpen,
        sectionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const handleGlobalClick = undefined;
    }, [
        sectionId
    ]);
    // 1. Lock Body Scroll when Open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        if (portalContainer) {
            // If in builder/canvas, lock canvas scroll
            const canvas = portalContainer.parentElement;
            if (canvas) {
                // eslint-disable-next-line react-hooks/immutability
                canvas.style.overflow = 'hidden';
                // eslint-disable-next-line react-hooks/immutability
                return ()=>{
                    canvas.style.overflow = '';
                };
            }
        } else {
            // If standalone, lock body scroll
            document.body.style.overflow = 'hidden';
            return ()=>{
                document.body.style.overflow = '';
            };
        }
    }, [
        isOpen,
        portalContainer
    ]);
    // 2. Escape Key to Close
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        const handleEsc = (e)=>e.key === 'Escape' && toggleOpen(false);
        window.addEventListener('keydown', handleEsc);
        return ()=>window.removeEventListener('keydown', handleEsc);
    }, [
        isOpen,
        toggleOpen
    ]);
    // === Render Logic ===
    const dialogContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `overlay z-system-modal-fullscreen ${className}`,
        style: {
            display: isOpen ? 'flex' : 'none',
            pointerEvents: 'auto'
        },
        onClick: (e)=>e.target === e.currentTarget && toggleOpen(false),
        "data-section-id": sectionId,
        "data-dialog-overlay": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-grid",
            style: {
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                style: {
                    width: '100%'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-mobile-4 col-tablet-6 col-desktop-6 offset-desktop-3 offset-tablet-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dialog,
                        role: "dialog",
                        "aria-modal": "true",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeButton} z-content-2`,
                                onClick: ()=>toggleOpen(false),
                                "aria-label": "Close dialog",
                                "data-dialog-close": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
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
                            (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: image,
                                controls: true,
                                autoPlay: true,
                                muted: true,
                                loop: true,
                                playsInline: true,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageContainer} imagePlaceholder-16-9`,
                                id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 135,
                                columnNumber: 21
                            }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                src: image,
                                controls: true,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageContainer} imagePlaceholder-16-9`,
                                id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 137,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: image || null,
                                alt: "",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageContainer} imagePlaceholder-16-9`,
                                id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this)),
                            (title || description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textContainer,
                                children: [
                                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: `h4 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title}`,
                                        id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h4` : undefined,
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/image-preview/components/dialog-section.js",
                                        lineNumber: 145,
                                        columnNumber: 41
                                    }, this),
                                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `body-regular ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description}`,
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
    return portalContainer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(dialogContent, portalContainer) : dialogContent;
}
}),
"[project]/public/testing-page/image-preview/components/dialog-default.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DialogDefault
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function DialogDefault({ title = "Title", description = "Description", isOpen, onUpdate, sectionId, className = "", image, imageId, imageVisible, // List Items
items = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"].dialog.items }) {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        description: description,
        isOpen: isOpen,
        sectionId: sectionId,
        className: className,
        image: image,
        imageId: imageId,
        imageVisible: imageVisible,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listContainer,
            children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: item.url || "#",
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem} body-regular ${i === items.length - 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lastItem : ''}`,
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
}),
"[project]/public/testing-page/image-preview/components/dialog-accordion.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DialogAccordion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-ssr] (ecmascript) <export default as PlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MinusIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/MinusIcon.js [app-ssr] (ecmascript) <export default as MinusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-section.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function DialogAccordion({ title = "Title", description = "Description", isOpen, onUpdate, sectionId, className = "", image, imageId, imageVisible, // Accordion Items
items = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["componentDefaults"]["dialog-accordion"]?.items || [], item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, item6Id, item7Id, item0Visible = true, item1Visible = true, item2Visible = true, item3Visible = true, item4Visible = true, item5Visible = true, item6Visible = true, item7Visible = true }) {
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // Only one open at a time
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        description: description,
        isOpen: isOpen,
        sectionId: sectionId,
        className: className,
        image: image,
        imageId: imageId,
        imageVisible: imageVisible,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionContainer,
            children: items.slice(0, 8).map((item, i)=>// Check visibility
                itemVisibility[i] !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionItem,
                    id: itemIds[i] || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-element` : undefined),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionHeader,
                            onClick: (e)=>{
                                e.stopPropagation(); // Prevent BuilderElement select if clicking header
                                toggleAccordion(i);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconContainer,
                                    children: openIndex === i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MinusIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__["MinusIcon"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionIcon
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/image-preview/components/dialog-accordion.js",
                                        lineNumber: 77,
                                        columnNumber: 41
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__["PlusIcon"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionIcon
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `body-bold ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionTitle}`,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionContent} ${openIndex === i ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionContentOpen : ''}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$section$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accordionInner} z-content-2`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
"[project]/public/testing-page/image-preview/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportedPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$title$2d$description$2d$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/header-title-description-button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/media-16-9.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$default$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-default.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$accordion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/image-preview/components/dialog-accordion.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ExportedPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$header$2d$title$2d$description$2d$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$media$2d$16$2d$9$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$default$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$image$2d$preview$2f$components$2f$dialog$2d$accordion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__35df62f2._.js.map