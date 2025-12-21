import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './lacto-navigation.module.css';
import { componentDefaults } from './data';
import { Bars3Icon } from '@heroicons/react/24/solid';

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
    menu1LinkType = componentDefaults["lacto-navigation"].menu1LinkType,
    menu1TargetDialogId = componentDefaults["lacto-navigation"].menu1TargetDialogId,
    menu1Id,

    menu2Label = componentDefaults["lacto-navigation"].menu2Label,
    menu2Url = componentDefaults["lacto-navigation"].menu2Url,
    menu2OpenInNewTab = componentDefaults["lacto-navigation"].menu2OpenInNewTab,
    menu2Visible = true,
    menu2LinkType = componentDefaults["lacto-navigation"].menu2LinkType,
    menu2TargetDialogId = componentDefaults["lacto-navigation"].menu2TargetDialogId,
    menu2Id,

    menu3Label = componentDefaults["lacto-navigation"].menu3Label,
    menu3Url = componentDefaults["lacto-navigation"].menu3Url,
    menu3OpenInNewTab = componentDefaults["lacto-navigation"].menu3OpenInNewTab,
    menu3Visible = true,
    menu3LinkType = componentDefaults["lacto-navigation"].menu3LinkType,
    menu3TargetDialogId = componentDefaults["lacto-navigation"].menu3TargetDialogId,
    menu3Id,

    menu4Label = componentDefaults["lacto-navigation"].menu4Label,
    menu4Url = componentDefaults["lacto-navigation"].menu4Url,
    menu4OpenInNewTab = componentDefaults["lacto-navigation"].menu4OpenInNewTab,
    menu4Visible = true,
    menu4LinkType = componentDefaults["lacto-navigation"].menu4LinkType,
    menu4TargetDialogId = componentDefaults["lacto-navigation"].menu4TargetDialogId,
    menu4Id,

    onUpdate
}) {
    
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
            linkType: menu1LinkType,
            targetDialogId: menu1TargetDialogId,
            id: menu1Id,
            handlers: {
                
                
                
                
                
                },
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
            handlers: {
                
                
                
                
                
                },
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
            handlers: {
                
                
                
                
                
                },
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
            handlers: {
                
                
                
                
                
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
                        className={`col-desktop-2 ${index === 0 ? 'offset-desktop-1 offset-tablet-1' : ''} ${styles.desktopNav} ${styles.menuItemWrapper}`}
                    >
                        <div className={styles.truncatedText}>
                            <Link href={(
                   (item.linkType === 'dialog' && item.targetDialogId)
                     ? '#' + item.targetDialogId
                     : (item.url || "#")
                )} className="body-bold link-nav" id={(item.id || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined))} onClick={(e) => { if (item.linkType === 'dialog' && item.targetDialogId) { window.location.hash = '#' + item.targetDialogId; } }}>{item.label}</Link>
                        </div>
                    </div>
                ))}

                {/* Logo: Col 2 Center */}
                <div className={`col-desktop-2 col-tablet-2 ${styles.desktopNav} ${styles.logoWrapper}`}>
                    {(logoVisible ?? true) && ((logo && /\.(mp4|webm|ogv)(\?.*)?$/i.test(logo)) ? (
                    <video src={logo} controls autoPlay muted loop playsInline className="object-contain" id={(logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-logo` : undefined))} style={{ maxHeight: '60px', maxWidth: '100%' }} />
                ) : (logo && /\.(mp3|wav)(\?.*)?$/i.test(logo)) ? (
                    <audio src={logo} controls className="object-contain" id={(logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-logo` : undefined))} style={{ maxHeight: '60px', maxWidth: '100%' }} />
                ) : (
                    <img src={logo || null} alt="" className="object-contain" id={(logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-logo` : undefined))} style={{ maxHeight: '60px', maxWidth: '100%' }} />
                ))}
                </div>

                {/* Last 2 Items */}
                {menuItems.slice(2, 4).map((item) => (
                    <div
                        key={`desktop-${item.suffix}`}
                        className={`col-desktop-2 ${styles.desktopNav} ${styles.menuItemWrapper}`}
                    >
                        <div className={styles.truncatedText}>
                            <Link href={(
                   (item.linkType === 'dialog' && item.targetDialogId)
                     ? '#' + item.targetDialogId
                     : (item.url || "#")
                )} className="body-bold link-nav" id={(item.id || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined))} onClick={(e) => { if (item.linkType === 'dialog' && item.targetDialogId) { window.location.hash = '#' + item.targetDialogId; } }}>{item.label}</Link>
                        </div>
                    </div>
                ))}




                {/* ================= MOBILE LAYOUT (2 COLS) ================= */}

                {/* Logo: Col 1 */}
                <div className={`col-mobile-2 col-tablet-4 ${styles.mobileNav} ${styles.mobileLogoWrapper}`}>
                    {(logoVisible ?? true) && ((logo && /\.(mp4|webm|ogv)(\?.*)?$/i.test(logo)) ? (
                    <video src={logo} controls autoPlay muted loop playsInline className="object-contain" id={(logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ width: '74px', height: '32px' }} />
                ) : (logo && /\.(mp3|wav)(\?.*)?$/i.test(logo)) ? (
                    <audio src={logo} controls className="object-contain" id={(logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ width: '74px', height: '32px' }} />
                ) : (
                    <img src={logo || null} alt="" className="object-contain" id={(logoId || (typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-image` : undefined))} style={{ width: '74px', height: '32px' }} />
                ))}
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
                    <div className="overlay z-system-modal-fullscreen" onClick={() => setIsMobileMenuOpen(false)} style={{ display: isMobileMenuOpen ? 'flex' : 'none', pointerEvents: 'auto' }} />
                    <div className={`${styles.dialogWrapper} z-system-modal-fullscreen ${isMobileMenuOpen ? styles.open : ''}`}>
                        <div className="container-grid">
                            <div className="grid">
                                <div className={`${styles.mobileDialog} col-12 col-mobile-4 col-tablet-4 col-desktop-6 offset-desktop-3 offset-tablet-2`}>
                                    {menuItems.map((item) => (
                                        <div key={`mobile-${item.mobileSuffix}`} className={styles.mobileMenuLink}>
                                            <Link href={(
                   (item.linkType === 'dialog' && item.targetDialogId)
                     ? '#' + item.targetDialogId
                     : (item.url || "#")
                )} className={`${styles.mobileLinkText} body-bold link-nav`} id={(typeof sectionId !== 'undefined' && sectionId ? `${sectionId}-link` : undefined)} onClick={(e) => { if (item.linkType === 'dialog' && item.targetDialogId) { window.location.hash = '#' + item.targetDialogId; } }}>{item.label}</Link>
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
