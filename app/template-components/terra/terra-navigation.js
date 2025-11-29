"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, GlobeAltIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import styles from './terra-navigation.module.css';
import BuilderText from "../../page-builder-components/utils/BuilderText";

export default function TerraNavigation({
    brandName = "Terra",
    menuItems = [
        { label: "Products", href: "#" },
        { label: "Solutions", href: "#" },
        { label: "Resources", href: "#" },
        { label: "Pricing", href: "#" },
    ],
    ctaText = "Get Started",
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
                <div className="grid">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={styles.navWrapper}>
                            {/* Brand Logo/Name */}
                            <div className={styles.brandWrapper}>
                                <a href="#" className={styles.brandLink}>
                                    <BuilderText
                                        initialText={brandName}
                                        onUpdate={onUpdate}
                                        propName="brandName"
                                        as="span"
                                        className={styles.brandName}
                                    />
                                </a>
                            </div>

                            {/* Desktop Menu */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                {menuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className={`body-regular ${styles.menuItem}`}
                                    >
                                        <BuilderText
                                            initialText={item.label}
                                            onUpdate={(updates) => handleMenuUpdate(index, updates.label)}
                                            propName="label"
                                            as="span"
                                        />
                                    </a>
                                ))}
                            </div>

                            {/* CTA Button & Hamburger */}
                            <div className={styles.actionsWrapper}>
                                <a href="#" className={`btn btn-primary btn-sm ${styles.ctaButton} ${styles.desktopOnly}`}>
                                    <BuilderText
                                        initialText={ctaText}
                                        onUpdate={onUpdate}
                                        propName="ctaText"
                                        as="span"
                                        style={{ minWidth: "10px", display: "inline-block" }}
                                    />
                                </a>

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
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isMobileMenuOpen && (
                            <div className={`${styles.mobileMenu} ${styles.tabletMobileOnly}`}>
                                {menuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className={`body-regular ${styles.mobileMenuItem}`}
                                    >
                                        <BuilderText
                                            initialText={item.label}
                                            onUpdate={(updates) => handleMenuUpdate(index, updates.label)}
                                            propName="label"
                                            as="span"
                                        />
                                    </a>
                                ))}
                                <div className={styles.mobileCtaWrapper}>
                                    <a href="#" className={`btn btn-primary btn-sm ${styles.mobileCtaButton}`}>
                                        <BuilderText
                                            initialText={ctaText}
                                            onUpdate={onUpdate}
                                            propName="ctaText"
                                            as="span"
                                            style={{ minWidth: "10px", display: "inline-block" }}
                                        />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
