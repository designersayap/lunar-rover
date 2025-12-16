import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './lacto-navigation.module.css';
import BuilderImage from '@/app/page-builder-components/utils/builder/builder-image';
import BuilderLink from '@/app/page-builder-components/utils/builder/builder-link';
import { createUpdateHandler } from '../utils/component-helpers';
import { componentDefaults } from '../content/data';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function LactoNavigation({
    sectionId,
    // Logo
    logo = componentDefaults["lacto-navigation"].logo,
    logoId,
    logoVisible,
    // Menu Items
    menu1Label = componentDefaults["lacto-navigation"].menu1Label,
    menu1Url = componentDefaults["lacto-navigation"].menu1Url,
    menu1OpenInNewTab = componentDefaults["lacto-navigation"].menu1OpenInNewTab,
    menu1Visible = true,
    menu1Id,

    menu2Label = componentDefaults["lacto-navigation"].menu2Label,
    menu2Url = componentDefaults["lacto-navigation"].menu2Url,
    menu2OpenInNewTab = componentDefaults["lacto-navigation"].menu2OpenInNewTab,
    menu2Visible = true,
    menu2Id,

    menu3Label = componentDefaults["lacto-navigation"].menu3Label,
    menu3Url = componentDefaults["lacto-navigation"].menu3Url,
    menu3OpenInNewTab = componentDefaults["lacto-navigation"].menu3OpenInNewTab,
    menu3Visible = true,
    menu3Id,

    menu4Label = componentDefaults["lacto-navigation"].menu4Label,
    menu4Url = componentDefaults["lacto-navigation"].menu4Url,
    menu4OpenInNewTab = componentDefaults["lacto-navigation"].menu4OpenInNewTab,
    menu4Visible = true,
    menu4Id,

    onUpdate
}) {
    const update = createUpdateHandler(onUpdate);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);

    useEffect(() => {
        setPortalContainer(document.body);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to structure menu items logic
    const menuItems = [
        {
            label: menu1Label,
            url: menu1Url,
            openInNewTab: menu1OpenInNewTab,
            visible: menu1Visible,
            id: menu1Id,
            handlers: {
                onLabelChange: update('menu1Label'),
                onUrlChange: update('menu1Url'),
                onOpenInNewTabChange: update('menu1OpenInNewTab'),
                onIdChange: update('menu1Id')
            },
            suffix: 'menu-1',
            mobileSuffix: 'mobile-menu-1'
        },
        {
            label: menu2Label,
            url: menu2Url,
            openInNewTab: menu2OpenInNewTab,
            visible: menu2Visible,
            id: menu2Id,
            handlers: {
                onLabelChange: update('menu2Label'),
                onUrlChange: update('menu2Url'),
                onOpenInNewTabChange: update('menu2OpenInNewTab'),
                onIdChange: update('menu2Id')
            },
            suffix: 'menu-2',
            mobileSuffix: 'mobile-menu-2'
        },
        {
            label: menu3Label,
            url: menu3Url,
            openInNewTab: menu3OpenInNewTab,
            visible: menu3Visible,
            id: menu3Id,
            handlers: {
                onLabelChange: update('menu3Label'),
                onUrlChange: update('menu3Url'),
                onOpenInNewTabChange: update('menu3OpenInNewTab'),
                onIdChange: update('menu3Id')
            },
            suffix: 'menu-3',
            mobileSuffix: 'mobile-menu-3'
        },
        {
            label: menu4Label,
            url: menu4Url,
            openInNewTab: menu4OpenInNewTab,
            visible: menu4Visible,
            id: menu4Id,
            handlers: {
                onLabelChange: update('menu4Label'),
                onUrlChange: update('menu4Url'),
                onOpenInNewTabChange: update('menu4OpenInNewTab'),
                onIdChange: update('menu4Id')
            },
            suffix: 'menu-4',
            mobileSuffix: 'mobile-menu-4'
        }
    ];

    return (
        <nav className={`container-grid ${styles.navigationWrapper} z-content-1 ${isScrolled ? styles.scrolled : ''}`} id={sectionId}>
            <div className="grid align-center">
                {/* ================= DESKTOP LAYOUT (12 COLS) ================= */}
                {/* Row: [Menu 1] [Menu 2] [Logo] [Menu 3] [Menu 4] + [User Icon] */}

                {/* First 2 Items */}
                {menuItems.slice(0, 2).map((item, index) => (
                    <div
                        key={`desktop-${item.suffix}`}
                        className={`col-desktop-2 ${index === 0 ? 'offset-desktop-1' : ''} ${styles.desktopNav} ${styles.menuItemWrapper}`}
                    >
                        <div className={styles.truncatedText}>
                            <BuilderLink
                                label={item.label}
                                url={item.url}
                                openInNewTab={item.openInNewTab}
                                onLabelChange={item.handlers.onLabelChange}
                                onUrlChange={item.handlers.onUrlChange}
                                onOpenInNewTabChange={item.handlers.onOpenInNewTabChange}
                                sectionId={sectionId}
                                id={item.id}
                                onIdChange={item.handlers.onIdChange}
                                className="body-bold link-nav"
                                suffix={item.suffix}
                                fullWidth={true}
                                isVisible={item.visible}
                            />
                        </div>
                    </div>
                ))}

                {/* Logo: Col 2 Center */}
                <div className={`col-desktop-2 ${styles.desktopNav} ${styles.logoWrapper}`}>
                    <BuilderImage
                        src={logo}
                        id={logoId}
                        sectionId={sectionId}
                        onIdChange={update('logoId')}
                        isVisible={logoVisible}
                        suffix="logo"
                        className="object-contain"
                        style={{ maxHeight: '60px', maxWidth: '100%' }}
                    />
                </div>

                {/* Last 2 Items */}
                {menuItems.slice(2, 4).map((item) => (
                    <div
                        key={`desktop-${item.suffix}`}
                        className={`col-desktop-2 ${styles.desktopNav} ${styles.menuItemWrapper}`}
                    >
                        <div className={styles.truncatedText}>
                            <BuilderLink
                                label={item.label}
                                url={item.url}
                                openInNewTab={item.openInNewTab}
                                onLabelChange={item.handlers.onLabelChange}
                                onUrlChange={item.handlers.onUrlChange}
                                onOpenInNewTabChange={item.handlers.onOpenInNewTabChange}
                                sectionId={sectionId}
                                id={item.id}
                                onIdChange={item.handlers.onIdChange}
                                className="body-bold link-nav"
                                suffix={item.suffix}
                                fullWidth={true}
                                isVisible={item.visible}
                            />
                        </div>
                    </div>
                ))}




                {/* ================= MOBILE LAYOUT (2 COLS) ================= */}

                {/* Logo: Col 1 */}
                <div className={`col-mobile-2 col-tablet-4 ${styles.mobileNav} ${styles.mobileLogoWrapper}`}>
                    <BuilderImage
                        src={logo}
                        id={logoId}
                        isVisible={logoVisible}
                        readOnly={true}
                        className="object-contain"
                        style={{ width: '74px', height: '32px' }}
                    />
                </div>

                {/* Burger: Col 1 Right */}
                <div className={`col-mobile-2 col-tablet-4 ${styles.mobileNav} ${styles.mobileBurgerWrapper}`}>
                    <button
                        className={styles.burgerButton}
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Bars3Icon style={{ width: 24, height: 24 }} />
                    </button>
                </div>

            </div>

            {/* Mobile Menu Dialog - Rendered via Portal */}
            {portalContainer && createPortal(
                <>
                    <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} style={{ display: isMobileMenuOpen ? 'flex' : 'none', pointerEvents: 'auto' }} />
                    <div className={`${styles.dialogWrapper} z-system-modal-fullscreen ${isMobileMenuOpen ? styles.open : ''}`}>
                        <div className="container-grid">
                            <div className="grid">
                                <div className={`${styles.mobileDialog} col-12 col-mobile-4 col-tablet-8 col-desktop-6 offset-desktop-3`}>
                                    <button className={`${styles.closeButton} z-content-1`} onClick={() => setIsMobileMenuOpen(false)}>
                                        <XMarkIcon style={{ width: 24, height: 24 }} />
                                    </button>

                                    {menuItems.map((item) => (
                                        <div key={`mobile-${item.mobileSuffix}`} className={styles.mobileMenuLink}>
                                            <BuilderLink
                                                label={item.label}
                                                url={item.url}
                                                openInNewTab={item.openInNewTab}
                                                onLabelChange={item.handlers.onLabelChange}
                                                onUrlChange={item.handlers.onUrlChange}
                                                onOpenInNewTabChange={item.handlers.onOpenInNewTabChange}
                                                sectionId={sectionId}
                                                id={undefined}
                                                suffix={item.mobileSuffix}
                                                className={`${styles.mobileLinkText} body-bold link-nav`}
                                                fullWidth={true}
                                                isVisible={item.visible}
                                            />
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </>,
                portalContainer
            )}
        </nav>
    );
}
