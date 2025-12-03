"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, GlobeAltIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import styles from './terra-navigation.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";

export default function TerraNavigation({
    brandName = "Terra",
    menuItems = [
        { label: "Menu 1", href: "#" },
        { label: "Menu 2", href: "#", hasDropdown: true },
        { label: "Menu 3", href: "#" },
        { label: "Menu 4", href: "#" },
    ],
    buttonText = "Beli Sekarang",
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
        <nav className="container-grid z-lg">
            <div className="grid">
                <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                    <div className={styles.navContainer}>
                        {/* 1.1 Logo */}
                        <div className={styles.logoContainer}>
                            <div className={styles.logoIconWrapper}>
                                <GlobeAltIcon className={styles.logoIcon} />
                            </div>
                            <span className={styles.brandName}>
                                <BuilderText
                                    tagName="span"
                                    content={brandName}
                                    onChange={(val) => onUpdate && onUpdate({ brandName: val })}
                                />
                            </span>
                        </div>

                        {/* 1.2 Menu (Desktop) */}
                        <div className={`${styles.menuContainer} ${styles.desktopOnly}`}>
                            {menuItems.map((item, index) => (
                                item.hasDropdown ? (
                                    <div key={index} className={`${styles.menuItemWithArrow} btn btn-sm btn-ghost-neutral`}>
                                        <BuilderText
                                            tagName="span"
                                            content={item.label}
                                            onChange={(val) => handleMenuUpdate(index, "label", val)}
                                        />
                                        <ChevronDownIcon className={styles.arrowIcon} />
                                    </div>
                                ) : (
                                    <a key={index} href={item.href} className={`${styles.menuItem} btn btn-sm btn-ghost-neutral`}>
                                        <BuilderText
                                            tagName="span"
                                            content={item.label}
                                            onChange={(val) => handleMenuUpdate(index, "label", val)}
                                        />
                                    </a>
                                )
                            ))}
                        </div>

                        {/* 1.3 Account Button & Mobile Toggle */}
                        <div className={styles.actionsContainer}>
                            <button className={`btn btn-primary btn-sm ${styles.desktopOnly}`} aria-label="Buy Menu">
                                <BuilderText
                                    tagName="span"
                                    content={buttonText}
                                    onChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                />
                                <ShoppingCartIcon className={styles.icon} />
                            </button>

                            <button
                                className={`btn btn-ghost-neutral btn-md ${styles.mobileToggle} ${styles.mobileOnly}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                                data-mobile-menu-toggle
                            >
                                <div data-menu-icon="open" style={{ display: isMobileMenuOpen ? 'none' : 'block' }}>
                                    <Bars3Icon className={styles.icon} />
                                </div>
                                <div data-menu-icon="close" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
                                    <XMarkIcon className={styles.icon} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <div
                        className={`${styles.mobileMenu} ${styles.mobileOnly}`}
                        style={{ display: isMobileMenuOpen ? 'flex' : 'none' }}
                        data-mobile-menu
                    >
                        {menuItems.map((item, index) => (
                            item.hasDropdown ? (
                                <div key={index} className={`${styles.mobileMenuItem} btn btn-sm btn-ghost-neutral`}>
                                    {item.label}
                                    <ChevronDownIcon className={styles.arrowIcon} />
                                </div>
                            ) : (
                                <a key={index} href={item.href} className={`${styles.mobileMenuItem} btn btn-sm btn-ghost-neutral`}>
                                    {item.label}
                                </a>
                            )
                        ))}
                        {/* Account Button in Mobile Menu */}
                        <button className={`${styles.mobileMenuItem} btn btn-primary btn-sm ${styles.mobileMenuBuy}`} aria-label="Buy Menu">
                            {buttonText}
                            <ShoppingCartIcon className={styles.icon} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
