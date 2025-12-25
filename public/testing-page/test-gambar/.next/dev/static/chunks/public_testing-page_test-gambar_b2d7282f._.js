(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/public/testing-page/test-gambar/components/lacto-navigation.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "burgerButton": "lacto-navigation-module__bn30PG__burgerButton",
  "desktopNav": "lacto-navigation-module__bn30PG__desktopNav",
  "dialogWrapper": "lacto-navigation-module__bn30PG__dialogWrapper",
  "grid": "lacto-navigation-module__bn30PG__grid",
  "logoContainer": "lacto-navigation-module__bn30PG__logoContainer",
  "logoImage": "lacto-navigation-module__bn30PG__logoImage",
  "logoWrapper": "lacto-navigation-module__bn30PG__logoWrapper",
  "menuItemWrapper": "lacto-navigation-module__bn30PG__menuItemWrapper",
  "mobileBurgerWrapper": "lacto-navigation-module__bn30PG__mobileBurgerWrapper",
  "mobileDialog": "lacto-navigation-module__bn30PG__mobileDialog",
  "mobileHeader": "lacto-navigation-module__bn30PG__mobileHeader",
  "mobileLinkText": "lacto-navigation-module__bn30PG__mobileLinkText",
  "mobileLogoWrapper": "lacto-navigation-module__bn30PG__mobileLogoWrapper",
  "mobileMenuLink": "lacto-navigation-module__bn30PG__mobileMenuLink",
  "mobileNav": "lacto-navigation-module__bn30PG__mobileNav",
  "navigationWrapper": "lacto-navigation-module__bn30PG__navigationWrapper",
  "open": "lacto-navigation-module__bn30PG__open",
  "scrolled": "lacto-navigation-module__bn30PG__scrolled",
  "truncatedText": "lacto-navigation-module__bn30PG__truncatedText",
});
}),
"[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Component Default Values (Single Source of Truth)
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
        logo: "",
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
"[project]/public/testing-page/test-gambar/components/lacto-navigation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LactoNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/lacto-navigation.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$Bars3Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bars3Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/Bars3Icon.js [app-client] (ecmascript) <export default as Bars3Icon>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function LactoNavigation({ sectionId, logo = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].logo, logoId, logoVisible, menu1Label = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu1Label, menu1Url = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu1Url, menu1OpenInNewTab = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu1OpenInNewTab, menu1Visible = true, menu1LinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu1LinkType, menu1TargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu1TargetDialogId, menu1Id, menu2Label = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu2Label, menu2Url = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu2Url, menu2OpenInNewTab = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu2OpenInNewTab, menu2Visible = true, menu2LinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu2LinkType, menu2TargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu2TargetDialogId, menu2Id, menu3Label = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu3Label, menu3Url = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu3Url, menu3OpenInNewTab = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu3OpenInNewTab, menu3Visible = true, menu3LinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu3LinkType, menu3TargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu3TargetDialogId, menu3Id, menu4Label = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu4Label, menu4Url = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu4Url, menu4OpenInNewTab = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu4OpenInNewTab, menu4Visible = true, menu4LinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu4LinkType, menu4TargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["lacto-navigation"].menu4TargetDialogId, menu4Id, onUpdate }) {
    _s();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [portalContainer, setPortalContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Check for empty, null, or matching the specific placeholder ID structure
    const isPlaceholder = !logo || typeof logo === 'string' && logo.includes('placeholder_falj5i');
    const logoStyle = {
        objectFit: isPlaceholder ? 'cover' : 'contain',
        borderRadius: isPlaceholder ? '0px' : undefined
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LactoNavigation.useEffect": ()=>{
            setPortalContainer(document.body);
        }
    }["LactoNavigation.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LactoNavigation.useEffect": ()=>{
            const handleScroll = {
                "LactoNavigation.useEffect.handleScroll": ()=>{
                    if (window.scrollY > 10) {
                        setIsScrolled(true);
                    } else {
                        setIsScrolled(false);
                    }
                }
            }["LactoNavigation.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "LactoNavigation.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["LactoNavigation.useEffect"];
        }
    }["LactoNavigation.useEffect"]);
    const menuItems = [
        {
            label: menu1Label,
            url: menu1Url,
            openInNewTab: menu1OpenInNewTab,
            visible: menu1Visible,
            linkType: menu1LinkType,
            targetDialogId: menu1TargetDialogId,
            id: menu1Id,
            handlers: {},
            suffix: 'menu-1',
            mobileSuffix: 'mobile-menu-1'
        },
        {
            label: menu2Label,
            url: menu2Url,
            openInNewTab: menu2OpenInNewTab,
            visible: menu2Visible,
            linkType: menu2LinkType,
            targetDialogId: menu2TargetDialogId,
            id: menu2Id,
            handlers: {},
            suffix: 'menu-2',
            mobileSuffix: 'mobile-menu-2'
        },
        {
            label: menu3Label,
            url: menu3Url,
            openInNewTab: menu3OpenInNewTab,
            visible: menu3Visible,
            linkType: menu3LinkType,
            targetDialogId: menu3TargetDialogId,
            id: menu3Id,
            handlers: {},
            suffix: 'menu-3',
            mobileSuffix: 'mobile-menu-3'
        },
        {
            label: menu4Label,
            url: menu4Url,
            openInNewTab: menu4OpenInNewTab,
            visible: menu4Visible,
            linkType: menu4LinkType,
            targetDialogId: menu4TargetDialogId,
            id: menu4Id,
            handlers: {},
            suffix: 'menu-4',
            mobileSuffix: 'mobile-menu-4'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `container-grid ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigationWrapper} z-content-1 ${isScrolled ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrolled : ''}`,
        id: sectionId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid align-center",
                children: [
                    menuItems.slice(0, 2).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `col-desktop-2 ${index === 0 ? 'offset-desktop-1 offset-tablet-1' : ''} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].desktopNav} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemWrapper}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].truncatedText,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.linkType === 'dialog' && item.targetDialogId ? '#' + item.targetDialogId : item.url || "#",
                                    className: "body-bold link-nav",
                                    id: item.id || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined),
                                    onClick: (e)=>{
                                        if (item.linkType === 'dialog' && item.targetDialogId) {
                                            window.location.hash = '#' + item.targetDialogId;
                                        }
                                    },
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                    lineNumber: 163,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 162,
                                columnNumber: 25
                            }, this)
                        }, `desktop-${item.suffix}`, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                            lineNumber: 158,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `col-desktop-2 col-tablet-2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].desktopNav} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoWrapper}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoContainer,
                            children: (logoVisible ?? true) && (logo && /\.(mp4|webm|ogv)(\?.*)?$/i.test(logo) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: logo,
                                controls: true,
                                autoPlay: true,
                                muted: true,
                                loop: true,
                                playsInline: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                                id: logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-logo` : undefined),
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 175,
                                columnNumber: 21
                            }, this) : logo && /\.(mp3|wav)(\?.*)?$/i.test(logo) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                src: logo,
                                controls: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                                id: logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-logo` : undefined),
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 177,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: logo || null,
                                alt: "",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                                id: logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-logo` : undefined),
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 179,
                                columnNumber: 21
                            }, this))
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                            lineNumber: 173,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                        lineNumber: 172,
                        columnNumber: 17
                    }, this),
                    menuItems.slice(2, 4).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `col-desktop-2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].desktopNav} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemWrapper}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].truncatedText,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.linkType === 'dialog' && item.targetDialogId ? '#' + item.targetDialogId : item.url || "#",
                                    className: "body-bold link-nav",
                                    id: item.id || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined),
                                    onClick: (e)=>{
                                        if (item.linkType === 'dialog' && item.targetDialogId) {
                                            window.location.hash = '#' + item.targetDialogId;
                                        }
                                    },
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                    lineNumber: 190,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 189,
                                columnNumber: 25
                            }, this)
                        }, `desktop-${item.suffix}`, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                            lineNumber: 185,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `col-mobile-2 col-tablet-4 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNav} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileLogoWrapper}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoContainer,
                            children: (logoVisible ?? true) && (logo && /\.(mp4|webm|ogv)(\?.*)?$/i.test(logo) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: logo,
                                controls: true,
                                autoPlay: true,
                                muted: true,
                                loop: true,
                                playsInline: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                                id: logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 203,
                                columnNumber: 21
                            }, this) : logo && /\.(mp3|wav)(\?.*)?$/i.test(logo) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                src: logo,
                                controls: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                                id: logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 205,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: logo || null,
                                alt: "",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                                id: logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 207,
                                columnNumber: 21
                            }, this))
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                            lineNumber: 201,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                        lineNumber: 200,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `col-mobile-2 col-tablet-4 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNav} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileBurgerWrapper}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].burgerButton,
                            onClick: ()=>setIsMobileMenuOpen(true),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$Bars3Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bars3Icon$3e$__["Bars3Icon"], {
                                style: {
                                    width: 24,
                                    height: 24
                                }
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 217,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                            lineNumber: 213,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                        lineNumber: 212,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                lineNumber: 156,
                columnNumber: 13
            }, this),
            portalContainer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overlay z-system-modal-fullscreen",
                        onClick: ()=>setIsMobileMenuOpen(false),
                        style: {
                            display: isMobileMenuOpen ? 'flex' : 'none',
                            pointerEvents: 'auto'
                        }
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                        lineNumber: 227,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dialogWrapper} z-system-modal-fullscreen ${isMobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].open : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container-grid",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileDialog} col-12 col-mobile-4 col-tablet-4 col-desktop-6 offset-desktop-3 offset-tablet-2`,
                                    children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileMenuLink,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.linkType === 'dialog' && item.targetDialogId ? '#' + item.targetDialogId : item.url || "#",
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileLinkText} body-bold link-nav`,
                                                id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined,
                                                onClick: (e)=>{
                                                    if (item.linkType === 'dialog' && item.targetDialogId) {
                                                        window.location.hash = '#' + item.targetDialogId;
                                                    }
                                                },
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                                lineNumber: 234,
                                                columnNumber: 49
                                            }, this)
                                        }, `mobile-${item.mobileSuffix}`, false, {
                                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                            lineNumber: 233,
                                            columnNumber: 45
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                    lineNumber: 231,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                                lineNumber: 230,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                            lineNumber: 229,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
                        lineNumber: 228,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true), portalContainer)
        ]
    }, void 0, true, {
        fileName: "[project]/public/testing-page/test-gambar/components/lacto-navigation.js",
        lineNumber: 155,
        columnNumber: 9
    }, this);
}
_s(LactoNavigation, "uCl+vz11ty6LjYgjKvb18gzzLTk=");
_c = LactoNavigation;
var _c;
__turbopack_context__.k.register(_c, "LactoNavigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/media-16-9.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "media-16-9-module__wKoMrW__container",
  "image": "media-16-9-module__wKoMrW__image",
});
}),
"[project]/public/testing-page/test-gambar/components/media-21-9.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media21x9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-16-9.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
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
function Media21x9({ image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["media-21-9"].image, imageId, imageVisible, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight, imageHref, imageLinkType, imageTargetDialogId, imageIsPortrait, imageMobileRatio }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
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
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-21-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-21-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-21-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
                        lineNumber: 38,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
                    lineNumber: 37,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
            lineNumber: 34,
            columnNumber: 1
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/media-21-9.js",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_c = Media21x9;
var _c;
__turbopack_context__.k.register(_c, "Media21x9");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/media-16-9.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media16x9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-16-9.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
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
function Media16x9({ image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["media-16-9"].image, imageId, imageVisible, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight, imageHref, imageLinkType, imageTargetDialogId, imageIsPortrait, imageMobileRatio }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
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
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-16-9 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
                        lineNumber: 38,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
                    lineNumber: 37,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
            lineNumber: 34,
            columnNumber: 1
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/media-16-9.js",
        lineNumber: 33,
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
"[project]/public/testing-page/test-gambar/components/media-5-4.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media5x4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-16-9.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
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
function Media5x4({ image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["media-5-4"].image, imageId, imageVisible, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight, imageHref, imageLinkType, imageTargetDialogId, imageIsPortrait, imageMobileRatio }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
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
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-5-4 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-5-4 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-5-4 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
                        lineNumber: 38,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
                    lineNumber: 37,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
            lineNumber: 34,
            columnNumber: 1
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/media-5-4.js",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_c = Media5x4;
var _c;
__turbopack_context__.k.register(_c, "Media5x4");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/media-4-3.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media4x3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-16-9.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
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
function Media4x3({ image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["media-4-3"].image, imageId, imageVisible, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight, imageHref, imageLinkType, imageTargetDialogId, imageIsPortrait, imageMobileRatio }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
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
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-4-3 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-4-3 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} imagePlaceholder-4-3 object-cover`,
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
                lineNumber: 37,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
            lineNumber: 35,
            columnNumber: 1
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/media-4-3.js",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
_c = Media4x3;
var _c;
__turbopack_context__.k.register(_c, "Media4x3");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/terra-banner-hero.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backgroundImage": "terra-banner-hero-module__H4lmKW__backgroundImage",
  "content": "terra-banner-hero-module__H4lmKW__content",
  "fullHeight": "terra-banner-hero-module__H4lmKW__fullHeight",
  "hero": "terra-banner-hero-module__H4lmKW__hero",
  "heroSubtitle": "terra-banner-hero-module__H4lmKW__heroSubtitle",
  "heroTitle": "terra-banner-hero-module__H4lmKW__heroTitle",
  "iconLeft": "terra-banner-hero-module__H4lmKW__iconLeft",
  "iconRight": "terra-banner-hero-module__H4lmKW__iconRight",
  "image": "terra-banner-hero-module__H4lmKW__image",
  "overlay": "terra-banner-hero-module__H4lmKW__overlay",
});
}),
"[project]/public/testing-page/test-gambar/components/terra-banner-hero.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerraBannerHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-banner-hero.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
;
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
function TerraBannerHero({ title = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].title, subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].subtitle, buttonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].buttonText, buttonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].buttonUrl, buttonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].buttonVisible, buttonLinkType = "url", buttonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].buttonTargetDialogId, secondaryButtonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].secondaryButtonText, secondaryButtonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].secondaryButtonUrl, secondaryButtonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].secondaryButtonVisible, secondaryButtonLinkType = "url", secondaryButtonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].secondaryButtonTargetDialogId, image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-banner-hero"].image, imageId, imageVisible, buttonStyle = "primary", secondaryButtonStyle = "ghost", buttonId, secondaryButtonId, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hero} imagePlaceholder-5-4`,
        id: sectionId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backgroundImage,
                children: (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    src: image,
                    controls: true,
                    autoPlay: true,
                    muted: true,
                    loop: true,
                    playsInline: true,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} object-cover`,
                    id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                    lineNumber: 48,
                    columnNumber: 21
                }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                    src: image,
                    controls: true,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} object-cover`,
                    id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                    lineNumber: 50,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: image || null,
                    alt: "",
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image} object-cover`,
                    id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                    lineNumber: 52,
                    columnNumber: 21
                }, this))
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${getContainerClasses({
                        fullWidth,
                        removePaddingLeft,
                        removePaddingRight
                    })} ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullHeight}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `grid ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullHeight}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `col-mobile-4 col-tablet-8 col-desktop-12 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: `h1 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroTitle}`,
                                    id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h1` : undefined,
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                                    lineNumber: 59,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `subheader-h1 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroSubtitle}`,
                                    id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined,
                                    children: subtitle
                                }, void 0, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                                    lineNumber: 60,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                                            lineNumber: 62,
                                            columnNumber: 33
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
                                            fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                                            lineNumber: 67,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                                    lineNumber: 61,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                            lineNumber: 58,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                        lineNumber: 57,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
                lineNumber: 55,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/public/testing-page/test-gambar/components/terra-banner-hero.js",
        lineNumber: 45,
        columnNumber: 9
    }, this);
}
_c = TerraBannerHero;
var _c;
__turbopack_context__.k.register(_c, "TerraBannerHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/terra-features-image-left.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "terra-features-image-left-module__ehZOLW__container",
  "content": "terra-features-image-left-module__ehZOLW__content",
  "description": "terra-features-image-left-module__ehZOLW__description",
  "imageWrapper": "terra-features-image-left-module__ehZOLW__imageWrapper",
  "title": "terra-features-image-left-module__ehZOLW__title",
});
}),
"[project]/public/testing-page/test-gambar/components/terra-features-image-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerraFeaturesImageLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-features-image-left.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
;
;
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
function TerraFeaturesImageLeft({ title = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].title, subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].subtitle, buttonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].buttonText, buttonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].buttonUrl, buttonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].buttonVisible, buttonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].buttonLinkType || "url", buttonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].buttonTargetDialogId, secondaryButtonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].secondaryButtonText, secondaryButtonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].secondaryButtonUrl, secondaryButtonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].secondaryButtonVisible, secondaryButtonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].secondaryButtonLinkType || "url", secondaryButtonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].secondaryButtonTargetDialogId, image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-left"].image, imageId, imageVisible, buttonStyle = "primary", secondaryButtonStyle = "ghost", buttonId, secondaryButtonId, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        id: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: getContainerClasses({
                fullWidth,
                removePaddingLeft,
                removePaddingRight
            }),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid align-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `imageWrapper ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageWrapper} col-mobile-4 col-tablet-8 col-desktop-6`,
                        children: (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            src: image,
                            controls: true,
                            autoPlay: true,
                            muted: true,
                            loop: true,
                            playsInline: true,
                            className: "imagePlaceholder-1-1 shadow-md",
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                            style: {
                                height: "auto"
                            }
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                            lineNumber: 51,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: "imagePlaceholder-1-1 shadow-md",
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                            style: {
                                height: "auto"
                            }
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                            lineNumber: 53,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: "imagePlaceholder-1-1 shadow-md",
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                            style: {
                                height: "auto"
                            }
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                            lineNumber: 55,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content} col-mobile-4 col-tablet-8 col-desktop-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: `h2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title}`,
                                id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h2` : undefined,
                                style: {
                                    marginBottom: "var(--gap-sm)"
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                                lineNumber: 60,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "subheader-h2",
                                id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined,
                                style: {
                                    color: "var(--content-neutral--caption)",
                                    marginBottom: "var(--gap-md)"
                                },
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "buttonWrapperLeft",
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
                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                                        lineNumber: 63,
                                        columnNumber: 29
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
                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                                        lineNumber: 68,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                                lineNumber: 62,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                        lineNumber: 59,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
                lineNumber: 48,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
            lineNumber: 47,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-left.js",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
_c = TerraFeaturesImageLeft;
var _c;
__turbopack_context__.k.register(_c, "TerraFeaturesImageLeft");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/terra-features-image-right.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "terra-features-image-right-module__pcaYnq__container",
  "content": "terra-features-image-right-module__pcaYnq__content",
  "description": "terra-features-image-right-module__pcaYnq__description",
  "imageWrapper": "terra-features-image-right-module__pcaYnq__imageWrapper",
  "title": "terra-features-image-right-module__pcaYnq__title",
});
}),
"[project]/public/testing-page/test-gambar/components/terra-features-image-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerraFeaturesImageRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-features-image-right.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
;
;
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
function TerraFeaturesImageRight({ title = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].title, subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].subtitle, buttonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].buttonText, buttonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].buttonUrl, buttonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].buttonVisible, buttonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].buttonLinkType || "url", buttonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].buttonTargetDialogId, secondaryButtonText = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].secondaryButtonText, secondaryButtonUrl = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].secondaryButtonUrl, secondaryButtonVisible = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].secondaryButtonVisible, secondaryButtonLinkType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].secondaryButtonLinkType || "url", secondaryButtonTargetDialogId = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].secondaryButtonTargetDialogId, image = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["feature-right"].image, imageId, imageVisible, buttonStyle = "primary", secondaryButtonStyle = "ghost", buttonId, secondaryButtonId, onUpdate, sectionId, fullWidth, removePaddingLeft, removePaddingRight }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        id: sectionId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: getContainerClasses({
                fullWidth,
                removePaddingLeft,
                removePaddingRight
            }),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid align-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content} col-mobile-4 col-tablet-8 col-desktop-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: `h2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title}`,
                                id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-h2` : undefined,
                                style: {
                                    marginBottom: "var(--gap-sm)"
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                                lineNumber: 50,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `subheader-h2 ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description}`,
                                id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-p` : undefined,
                                style: {
                                    color: "var(--content-neutral--caption)",
                                    marginBottom: "var(--gap-md)"
                                },
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                                lineNumber: 51,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "buttonWrapperLeft",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: buttonLinkType === 'dialog' && buttonTargetDialogId ? '#' + buttonTargetDialogId : buttonUrl || "#",
                                        className: `btn btn-${buttonStyle || 'primary'} btn-md`,
                                        id: buttonId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-button` : undefined),
                                        onClick: (e)=>{
                                            if (buttonLinkType === 'dialog' && buttonTargetDialogId) {
                                                window.location.hash = '#' + buttonTargetDialogId;
                                            }
                                        },
                                        children: buttonText
                                    }, void 0, false, {
                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                                        lineNumber: 53,
                                        columnNumber: 29
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
                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                                        lineNumber: 58,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                                lineNumber: 52,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `imageWrapper ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageWrapper} col-mobile-4 col-tablet-8 col-desktop-6`,
                        children: (imageVisible ?? true) && (image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            src: image,
                            controls: true,
                            autoPlay: true,
                            muted: true,
                            loop: true,
                            playsInline: true,
                            className: "imagePlaceholder-1-1 shadow-md",
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                            style: {
                                height: "auto"
                            }
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this) : image && /\.(mp3|wav)(\?.*)?$/i.test(image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            src: image,
                            controls: true,
                            className: "imagePlaceholder-1-1 shadow-md",
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                            style: {
                                height: "auto"
                            }
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                            lineNumber: 70,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image || null,
                            alt: "",
                            className: "imagePlaceholder-1-1 shadow-md",
                            id: imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                            style: {
                                height: "auto"
                            }
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                        lineNumber: 66,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
                lineNumber: 48,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
            lineNumber: 47,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/terra-features-image-right.js",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
_c = TerraFeaturesImageRight;
var _c;
__turbopack_context__.k.register(_c, "TerraFeaturesImageRight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/components/terra-testimony.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activeDot": "terra-testimony-module__B3tC1G__activeDot",
  "avatarImg": "terra-testimony-module__B3tC1G__avatarImg",
  "card": "terra-testimony-module__B3tC1G__card",
  "cardsWrapper": "terra-testimony-module__B3tC1G__cardsWrapper",
  "container": "terra-testimony-module__B3tC1G__container",
  "description": "terra-testimony-module__B3tC1G__description",
  "dot": "terra-testimony-module__B3tC1G__dot",
  "itemWrapper": "terra-testimony-module__B3tC1G__itemWrapper",
  "name": "terra-testimony-module__B3tC1G__name",
  "paginator": "terra-testimony-module__B3tC1G__paginator",
  "role": "terra-testimony-module__B3tC1G__role",
  "terraTestimoniDescriptionCard": "terra-testimony-module__B3tC1G__terraTestimoniDescriptionCard",
  "terraTestimoniImage": "terra-testimony-module__B3tC1G__terraTestimoniImage",
});
}),
"[project]/public/testing-page/test-gambar/components/terra-testimony.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerraTestimony
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-testimony.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/data.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function TerraTestimony({ testimonies = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["componentDefaults"]["terra-testimony"].testimonies, sectionId, onUpdate, fullWidth, removePaddingLeft, removePaddingRight }) {
    _s();
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const updateTestimony = (index, key, value)=>{
        if (!onUpdate) return;
        const newTestimonies = [
            ...testimonies
        ];
        newTestimonies[index] = {
            ...newTestimonies[index],
            [key]: value
        };
        onUpdate({
            testimonies: newTestimonies
        });
    };
    const updateCardId = (index, newId)=>{
        updateTestimony(index, 'cardId', newId);
    };
    const visibleCardsString = testimonies.map((t)=>t.visible).join(',');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerraTestimony.useEffect": ()=>{
            const calculatePages = {
                "TerraTestimony.useEffect.calculatePages": ()=>{
                    if (!scrollContainerRef.current) return;
                    const container = scrollContainerRef.current;
                    const containerWidth = container.scrollWidth;
                    const viewportWidth = container.clientWidth;
                    const pages = Math.ceil(containerWidth / viewportWidth);
                    setTotalPages(pages);
                }
            }["TerraTestimony.useEffect.calculatePages"];
            // Delay calculation slightly to ensure DOM has updated
            const timer = setTimeout(calculatePages, 100);
            window.addEventListener('resize', calculatePages);
            return ({
                "TerraTestimony.useEffect": ()=>{
                    window.removeEventListener('resize', calculatePages);
                    clearTimeout(timer);
                }
            })["TerraTestimony.useEffect"];
        }
    }["TerraTestimony.useEffect"], [
        testimonies.length,
        visibleCardsString
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerraTestimony.useEffect": ()=>{
            const container = scrollContainerRef.current;
            if (!container) return;
            const handleScroll = {
                "TerraTestimony.useEffect.handleScroll": ()=>{
                    const scrollLeft = container.scrollLeft;
                    const viewportWidth = container.clientWidth;
                    const page = Math.round(scrollLeft / viewportWidth);
                    setCurrentPage(page);
                }
            }["TerraTestimony.useEffect.handleScroll"];
            container.addEventListener('scroll', handleScroll);
            return ({
                "TerraTestimony.useEffect": ()=>container.removeEventListener('scroll', handleScroll)
            })["TerraTestimony.useEffect"];
        }
    }["TerraTestimony.useEffect"], []);
    const scrollToPage = (pageIndex)=>{
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const viewportWidth = container.clientWidth;
        const scrollPosition = pageIndex * viewportWidth;
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerraTestimony.useEffect": ()=>{
            const autoScrollInterval = setInterval({
                "TerraTestimony.useEffect.autoScrollInterval": ()=>{
                    if (!scrollContainerRef.current) return;
                    const nextPage = (currentPage + 1) % totalPages;
                    scrollToPage(nextPage);
                }
            }["TerraTestimony.useEffect.autoScrollInterval"], 5000); // 5 seconds
            return ({
                "TerraTestimony.useEffect": ()=>clearInterval(autoScrollInterval)
            })["TerraTestimony.useEffect"];
        }
    }["TerraTestimony.useEffect"], [
        currentPage,
        totalPages
    ]);
    const visibleCount = testimonies.filter((t)=>t.visible !== false).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
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
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: scrollContainerRef,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsWrapper,
                            style: {
                                justifyContent: visibleCount === 3 ? 'center' : 'initial'
                            },
                            children: testimonies.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemWrapper,
                                    id: item.cardId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-element` : undefined),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                        children: [
                                            (item.imageVisible ?? true) && (item.image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(item.image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                src: item.image,
                                                controls: true,
                                                autoPlay: true,
                                                muted: true,
                                                loop: true,
                                                playsInline: true,
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].terraTestimoniImage} imagePlaceholder-4-5 object-cover`,
                                                id: item.imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                                            }, void 0, false, {
                                                fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                lineNumber: 118,
                                                columnNumber: 21
                                            }, this) : item.image && /\.(mp3|wav)(\?.*)?$/i.test(item.image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                                src: item.image,
                                                controls: true,
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].terraTestimoniImage} imagePlaceholder-4-5 object-cover`,
                                                id: item.imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                                            }, void 0, false, {
                                                fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.image || null,
                                                alt: "",
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].terraTestimoniImage} imagePlaceholder-4-5 object-cover`,
                                                id: item.imageId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined)
                                            }, void 0, false, {
                                                fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].terraTestimoniDescriptionCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `imageWrapper ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarImg}`,
                                                        children: (item.avatarVisible ?? true) && (item.avatar && /\.(mp4|webm|ogv)(\?.*)?$/i.test(item.avatar) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                            src: item.avatar,
                                                            controls: true,
                                                            autoPlay: true,
                                                            muted: true,
                                                            loop: true,
                                                            playsInline: true,
                                                            className: 'imagePlaceholder-1-1 object-cover',
                                                            id: item.avatarId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                                                            style: {
                                                                borderRadius: "var(--border-radius-round)"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                            lineNumber: 128,
                                                            columnNumber: 21
                                                        }, this) : item.avatar && /\.(mp3|wav)(\?.*)?$/i.test(item.avatar) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                                            src: item.avatar,
                                                            controls: true,
                                                            className: 'imagePlaceholder-1-1 object-cover',
                                                            id: item.avatarId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                                                            style: {
                                                                borderRadius: "var(--border-radius-round)"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                            lineNumber: 130,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.avatar || null,
                                                            alt: "",
                                                            className: 'imagePlaceholder-1-1 object-cover',
                                                            id: item.avatarId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined),
                                                            style: {
                                                                borderRadius: "var(--border-radius-round)"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                            lineNumber: 132,
                                                            columnNumber: 21
                                                        }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                        lineNumber: 126,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h6 truncate-1-line ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].name}`,
                                                        id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-div` : undefined,
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                        lineNumber: 135,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `caption-regular truncate-1-line ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].role}`,
                                                        id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-div` : undefined,
                                                        children: item.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                        lineNumber: 136,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `body-regular truncate-2-lines ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description}`,
                                                        id: typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-div` : undefined,
                                                        children: item.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                        lineNumber: 137,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                                lineNumber: 125,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                        lineNumber: 116,
                                        columnNumber: 33
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                    lineNumber: 115,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                            lineNumber: 109,
                            columnNumber: 21
                        }, this),
                        totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paginator,
                            children: Array.from({
                                length: totalPages
                            }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dot} ${currentPage === index ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].activeDot : ''}`,
                                    onClick: ()=>scrollToPage(index),
                                    role: "button",
                                    tabIndex: 0,
                                    "aria-label": `Go to page ${index + 1}`
                                }, index, false, {
                                    fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                                    lineNumber: 147,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                            lineNumber: 145,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                    lineNumber: 108,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
                lineNumber: 107,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
            lineNumber: 105,
            columnNumber: 1
        }, this)
    }, void 0, false, {
        fileName: "[project]/public/testing-page/test-gambar/components/terra-testimony.js",
        lineNumber: 104,
        columnNumber: 9
    }, this);
}
_s(TerraTestimony, "k44Rpj4w29owR1+Bdjk2W+AULuk=");
_c = TerraTestimony;
var _c;
__turbopack_context__.k.register(_c, "TerraTestimony");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/testing-page/test-gambar/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportedPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/lacto-navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$21$2d$9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-21-9.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-16-9.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$5$2d$4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-5-4.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$4$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/media-4-3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-banner-hero.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-features-image-left.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-features-image-right.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/testing-page/test-gambar/components/terra-testimony.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function ExportedPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$lacto$2d$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                images: [
                    {
                        "label": "Logo",
                        "propId": "logoId",
                        "suffix": "logo"
                    }
                ],
                links: [
                    {
                        "label": "Menu 1",
                        "propId": "menu1Id",
                        "suffix": "menu-1",
                        "labelProp": "menu1Label",
                        "visibleProp": "menu1Visible",
                        "linkTypeProp": "menu1LinkType"
                    },
                    {
                        "label": "Menu 2",
                        "propId": "menu2Id",
                        "suffix": "menu-2",
                        "labelProp": "menu2Label",
                        "visibleProp": "menu2Visible",
                        "linkTypeProp": "menu2LinkType"
                    },
                    {
                        "label": "Menu 3",
                        "propId": "menu3Id",
                        "suffix": "menu-3",
                        "labelProp": "menu3Label",
                        "visibleProp": "menu3Visible",
                        "linkTypeProp": "menu3LinkType"
                    },
                    {
                        "label": "Menu 4",
                        "propId": "menu4Id",
                        "suffix": "menu-4",
                        "labelProp": "menu4Label",
                        "visibleProp": "menu4Visible",
                        "linkTypeProp": "menu4LinkType"
                    }
                ],
                sectionId: "navigation-6553",
                props: {
                    "menu1Label": "Menu 1",
                    "menu1Url": "",
                    "menu2Label": "Menu 2",
                    "menu2Url": "",
                    "menu3Label": "Menu 3",
                    "menu3Url": "",
                    "menu4Label": "Menu 4",
                    "menu4Url": ""
                },
                logo: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                logoVisible: true,
                menu1Label: "Menu 1",
                menu1Url: "",
                menu2Label: "Menu 2",
                menu2Url: "",
                menu3Label: "Menu 3",
                menu3Url: "",
                menu4Label: "Menu 4",
                menu4Url: ""
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$21$2d$9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "media-4164",
                props: {
                    "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
                },
                imageIsPortrait: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                imageMobileRatio: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$16$2d$9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "media-9645",
                props: {
                    "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
                },
                imageIsPortrait: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                imageMobileRatio: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$5$2d$4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "media-6298",
                props: {
                    "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
                },
                imageIsPortrait: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                imageMobileRatio: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$media$2d$4$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "media-1591",
                props: {
                    "fullWidth": false,
                    "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
                },
                imageIsPortrait: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                imageMobileRatio: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                fullWidth: false,
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$banner$2d$hero$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/terra-cta.svg",
                buttons: [
                    {
                        "label": "Primary Button",
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
                images: [
                    {
                        "label": "Hero Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "hero-banner-6219",
                props: {
                    "buttonStyle": "primary",
                    "buttonLinkType": "url",
                    "secondaryButtonLinkType": "url",
                    "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
                },
                buttonStyle: "primary",
                buttonLinkType: "url",
                secondaryButtonLinkType: "url",
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/terra-image-left.svg",
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
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "feature-split-3023",
                props: {
                    "buttonStyle": "primary",
                    "buttonLinkType": "url",
                    "secondaryButtonLinkType": "url",
                    "secondaryButtonText": "Label"
                },
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                buttonStyle: "primary",
                buttonLinkType: "url",
                secondaryButtonLinkType: "url",
                secondaryButtonText: "Label"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$features$2d$image$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/terra-image-right.svg",
                buttons: [
                    {
                        "label": "Button",
                        "propId": "buttonId",
                        "suffix": "button",
                        "labelProp": "buttonText",
                        "visibleProp": "buttonVisible",
                        "linkTypeProp": "buttonLinkType"
                    }
                ],
                images: [
                    {
                        "label": "Image",
                        "propId": "imageId",
                        "suffix": "image",
                        "visibleProp": "imageVisible"
                    }
                ],
                sectionId: "feature-split-8887",
                props: {
                    "buttonStyle": "primary"
                },
                image: "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                buttonStyle: "primary"
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$testing$2d$page$2f$test$2d$gambar$2f$components$2f$terra$2d$testimony$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                thumbnail: "/images/thumbnails/placeholder.svg",
                links: [
                    {
                        "label": "Testimony 1",
                        "propId": "testimonies.0.cardId",
                        "suffix": "testimony-0",
                        "visibleProp": "testimonies.0.visible"
                    },
                    {
                        "label": "Testimony 2",
                        "propId": "testimonies.1.cardId",
                        "suffix": "testimony-1",
                        "visibleProp": "testimonies.1.visible"
                    },
                    {
                        "label": "Testimony 3",
                        "propId": "testimonies.2.cardId",
                        "suffix": "testimony-2",
                        "visibleProp": "testimonies.2.visible"
                    },
                    {
                        "label": "Testimony 4",
                        "propId": "testimonies.3.cardId",
                        "suffix": "testimony-3",
                        "visibleProp": "testimonies.3.visible"
                    },
                    {
                        "label": "Testimony 5",
                        "propId": "testimonies.4.cardId",
                        "suffix": "testimony-4",
                        "visibleProp": "testimonies.4.visible"
                    },
                    {
                        "label": "Testimony 6",
                        "propId": "testimonies.5.cardId",
                        "suffix": "testimony-5",
                        "visibleProp": "testimonies.5.visible"
                    },
                    {
                        "label": "Testimony 7",
                        "propId": "testimonies.6.cardId",
                        "suffix": "testimony-6",
                        "visibleProp": "testimonies.6.visible"
                    },
                    {
                        "label": "Testimony 8",
                        "propId": "testimonies.7.cardId",
                        "suffix": "testimony-7",
                        "visibleProp": "testimonies.7.visible"
                    },
                    {
                        "label": "Testimony 9",
                        "propId": "testimonies.8.cardId",
                        "suffix": "testimony-8",
                        "visibleProp": "testimonies.8.visible"
                    },
                    {
                        "label": "Testimony 10",
                        "propId": "testimonies.9.cardId",
                        "suffix": "testimony-9",
                        "visibleProp": "testimonies.9.visible"
                    },
                    {
                        "label": "Testimony 11",
                        "propId": "testimonies.10.cardId",
                        "suffix": "testimony-10",
                        "visibleProp": "testimonies.10.visible"
                    },
                    {
                        "label": "Testimony 12",
                        "propId": "testimonies.11.cardId",
                        "suffix": "testimony-11",
                        "visibleProp": "testimonies.11.visible"
                    }
                ],
                sectionId: "testimonials-6488",
                props: {
                    "testimonies": [
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        },
                        {
                            "name": "People Name",
                            "role": "Role",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                            "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "imageLinkType": "url",
                            "imageTargetDialogId": "",
                            "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                            "avatarLinkType": "url",
                            "avatarTargetDialogId": "",
                            "imageVisible": true,
                            "avatarVisible": true,
                            "cardId": "",
                            "visible": true
                        }
                    ]
                },
                testimonies: [
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    },
                    {
                        "name": "People Name",
                        "role": "Role",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        "image": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "imageLinkType": "url",
                        "imageTargetDialogId": "",
                        "avatar": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarUrl": "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg",
                        "avatarLinkType": "url",
                        "avatarTargetDialogId": "",
                        "imageVisible": true,
                        "avatarVisible": true,
                        "cardId": "",
                        "visible": true
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/public/testing-page/test-gambar/app/page.js",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/public/testing-page/test-gambar/app/page.js",
        lineNumber: 15,
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
]);

//# sourceMappingURL=public_testing-page_test-gambar_b2d7282f._.js.map