"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './lacto-navigation.module.css';
import BuilderText from "@/app/page-builder-components/common/BuilderText";

/**
 * Lacto Navigation Component
 * Sticky navigation bar with centered logo and menu items
 */
export default function LactoNavigation({
    menuItems = [
        { label: "Beranda", href: "#" },
        { label: "Terbaru", href: "#" },
        { label: "Produk", href: "#" },
        { label: "Kontak", href: "#" },
    ],
    onUpdate
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
                            >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className={styles.hamburgerIcon} />
                                ) : (
                                    <Bars3Icon className={styles.hamburgerIcon} />
                                )}
                            </button>

                            {/* Menu Item 1 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a href={menuItems[0]?.href} className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[0]?.label}
                                        onChange={(val) => handleMenuUpdate(0, "label", val)}
                                    />
                                </a>
                            </div>

                            {/* Menu Item 2 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a href={menuItems[1]?.href} className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[1]?.label}
                                        onChange={(val) => handleMenuUpdate(1, "label", val)}
                                    />
                                </a>
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
                                <a href={menuItems[2]?.href} className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[2]?.label}
                                        onChange={(val) => handleMenuUpdate(2, "label", val)}
                                    />
                                </a>
                            </div>

                            {/* Menu Item 4 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a href={menuItems[3]?.href} className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    <BuilderText
                                        tagName="span"
                                        content={menuItems[3]?.label}
                                        onChange={(val) => handleMenuUpdate(3, "label", val)}
                                    />
                                </a>
                            </div>

                            {/* Spacer for tablet/mobile to keep logo centered */}
                            <div className={`${styles.spacer} ${styles.tabletMobileOnly}`}></div>
                        </div>

                        {/* Mobile Menu Dropdown */}
                        {isMobileMenuOpen && (
                            <div className={`${styles.mobileMenu} ${styles.tabletMobileOnly}`}>
                                {menuItems.map((item, index) => (
                                    <a key={index} href={item.href} className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}>
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
