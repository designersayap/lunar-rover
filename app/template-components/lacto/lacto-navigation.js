"use client";

import React, { useState } from 'react';
import { componentDefaults } from "../content/data";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './lacto-navigation.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderLink from "@/app/page-builder-components/utils/builder-link";

/**
 * Lacto Navigation Component
 * Sticky navigation bar with centered logo and menu items
 */
export default function LactoNavigation({
    logo = componentDefaults["lacto-navigation"].logo,
    menuItems = componentDefaults["lacto-navigation"].menuItems,
    buttonText = componentDefaults["lacto-navigation"].buttonLabel,
    buttonId,
    onUpdate,
    sectionId
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuUpdate = (index, key, value) => {
        if (!onUpdate) return;
        const newMenuItems = [...menuItems];
        newMenuItems[index] = { ...newMenuItems[index], [key]: value };
        onUpdate({ menuItems: newMenuItems });
    };

    return (
        <nav className={`${styles.navigation} z-lg`}>
            <div className="container-grid">
                <div className="grid">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={styles.navWrapper}>
                            {/* Hamburger Menu - Tablet/Mobile Only */}
                            <button
                                className={`${styles.hamburgerButton} ${styles.tabletMobileOnly}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                                data-mobile-menu-toggle
                            >
                                <div data-menu-icon="open" style={{ display: isMobileMenuOpen ? 'none' : 'block' }}>
                                    <Bars3Icon className={styles.hamburgerIcon} />
                                </div>
                                <div data-menu-icon="close" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
                                    <XMarkIcon className={styles.hamburgerIcon} />
                                </div>
                            </button>

                            {/* Menu Item 1 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <BuilderLink
                                    href={menuItems[0]?.href}
                                    sectionId={sectionId}
                                    suffix="menu-1"
                                    className={`${styles.menuItem} body-regular`}
                                >
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[0]?.label}
                                        onChange={(val) => handleMenuUpdate(0, "label", val)}
                                        sectionId={sectionId}
                                        noId={true}
                                    />
                                </BuilderLink>
                            </div>

                            {/* Menu Item 2 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <BuilderLink
                                    href={menuItems[1]?.href}
                                    sectionId={sectionId}
                                    suffix="menu-2"
                                    className={`${styles.menuItem} body-regular`}
                                >
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[1]?.label}
                                        onChange={(val) => handleMenuUpdate(1, "label", val)}
                                        sectionId={sectionId}
                                        noId={true}
                                    />
                                </BuilderLink>
                            </div>

                            {/* Logo */}
                            <div className={styles.logoWrapper}>
                                <img
                                    src="/milku-logo.svg"
                                    alt="MILKU"
                                    className={styles.logo}
                                />
                            </div>

                            {/* Menu Item 3 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <BuilderLink
                                    href={menuItems[2]?.href}
                                    sectionId={sectionId}
                                    suffix="menu-3"
                                    className={`${styles.menuItem} body-regular`}
                                >
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[2]?.label}
                                        onChange={(val) => handleMenuUpdate(2, "label", val)}
                                        sectionId={sectionId}
                                        noId={true}
                                    />
                                </BuilderLink>
                            </div>

                            {/* Menu Item 4 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <BuilderLink
                                    href={menuItems[3]?.href}
                                    sectionId={sectionId}
                                    suffix="menu-4"
                                    className={`${styles.menuItem} body-regular`}
                                >
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[3]?.label}
                                        onChange={(val) => handleMenuUpdate(3, "label", val)}
                                        sectionId={sectionId}
                                        noId={true}
                                    />
                                </BuilderLink>
                            </div>

                            {/* Spacer for tablet/mobile to keep logo centered */}
                            <div className={`${styles.spacer} ${styles.tabletMobileOnly}`}></div>
                        </div>

                        {/* Mobile Menu Dropdown */}
                        <div
                            className={`${styles.mobileMenu} ${styles.tabletMobileOnly}`}
                            style={{ display: isMobileMenuOpen ? 'flex' : 'none' }}
                            data-mobile-menu
                        >
                            {menuItems.map((item, index) => (
                                <a key={index} href={item.href} className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
