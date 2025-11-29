"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './lacto-navigation.module.css';
import BuilderText from "../../page-builder-components/utils/BuilderText";

/**
 * Lacto Navigation Component
 * Sticky navigation bar with centered logo and menu items
 */
export default function LactoNavigation({
    menuItems = [
        { label: "Products", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" }
    ],
    onUpdate
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuUpdate = (index, value) => {
        if (!onUpdate) return;
        const newMenuItems = [...menuItems];
        newMenuItems[index] = { ...newMenuItems[index], label: value };
        onUpdate({ menuItems: newMenuItems });
    };

    return (
        <nav className={`${styles.navigation} z-lg`}>
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className="flex-between-center">
                            {/* Logo */}
                            <div className={styles.logo}>
                                <div className="imagePlaceholder-1-1" style={{ width: '40px', height: '40px' }}></div>
                            </div>

                            {/* Desktop Menu */}
                            <div className={`${styles.menu} ${styles.desktopOnly}`}>
                                {menuItems.map((item, index) => (
                                    <a key={index} href={item.href} className={`body-regular ${styles.menuItem}`}>
                                        <BuilderText
                                            initialText={item.label}
                                            onUpdate={(updates) => handleMenuUpdate(index, updates.label)}
                                            propName="label"
                                            as="span"
                                        />
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                className={`${styles.mobileToggle} ${styles.tabletMobileOnly}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
                            </button>
                            {/* Menu Item 3 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a
                                    href={menuItems[2]?.href}
                                    className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}
                                    contentEditable={!!onUpdate}
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleMenuUpdate(2, e.currentTarget.textContent)}
                                >
                                    {menuItems[2]?.label}
                                </a>
                            </div>

                            {/* Menu Item 4 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a
                                    href={menuItems[3]?.href}
                                    className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}
                                    contentEditable={!!onUpdate}
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleMenuUpdate(3, e.currentTarget.textContent)}
                                >
                                    {menuItems[3]?.label}
                                </a>
                            </div>

                            {/* Spacer for tablet/mobile to keep logo centered */}
                            <div className={`${styles.spacer} ${styles.tabletMobileOnly}`}></div>
                        </div>

                        {/* Mobile Menu Dropdown */}
                        {isMobileMenuOpen && (
                            <div className={`${styles.mobileMenu} ${styles.tabletMobileOnly}`}>
                                {menuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}
                                        contentEditable={!!onUpdate}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleMenuUpdate(index, e.currentTarget.textContent)}
                                    >
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
