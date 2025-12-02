"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import styles from './terra-navigation.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import BuilderLink from "@/app/page-builder-components/utils/builder-link";
import { componentDefaults } from "../content/component-defaults";

export default function TerraNavigation({
    logo = componentDefaults["terra-navigation"].logo,
    brandName = componentDefaults["terra-navigation"].brandName,
    menuItems = componentDefaults["terra-navigation"].menuItems,
    buttonText = componentDefaults["terra-navigation"].buttonLabel,
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
                                    sectionId={sectionId}
                                />
                            </span>
                        </div>

                        {/* 1.2 Menu (Desktop) */}
                        <div className={`${styles.menuContainer} ${styles.desktopOnly}`}>
                            {menuItems.map((item, index) => (
                                <BuilderLink
                                    key={index}
                                    href={item.href}
                                    sectionId={sectionId}
                                    suffix={`menu-${index + 1}`}
                                    className={`${styles.menuItem} body-regular`}
                                >
                                    <BuilderText
                                        tagName="span"
                                        content={item.label}
                                        onChange={(val) => handleMenuUpdate(index, "label", val)}
                                        sectionId={sectionId}
                                        noId={true}
                                    />
                                </BuilderLink>
                            ))}
                        </div>

                        {/* 1.3 Account Button & Mobile Toggle */}
                        <div className={styles.actionsContainer}>
                            <BuilderButton
                                label={buttonText}
                                iconLeft={<ShoppingBagIcon />}
                                href="#"
                                suffix="desktop"
                                sectionId={sectionId}
                                className={`btn btn-primary btn-sm ${styles.desktopOnly}`}
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            />

                            <button
                                className={`btn btn-ghost-neutral btn-md ${styles.mobileToggle} ${styles.mobileOnly}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu" >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className={styles.icon} />
                                ) : (
                                    <Bars3Icon className={styles.icon} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className={`${styles.mobileMenu} ${styles.mobileOnly}`}>
                            {menuItems.map((item, index) => (
                                <BuilderLink
                                    key={index}
                                    href={item.href}
                                    sectionId={sectionId}
                                    suffix={`menu-${index + 1}`}
                                    className={`${styles.mobileMenuItem} body-regular`}
                                >
                                    <BuilderText
                                        tagName="span"
                                        content={item.label}
                                        onChange={(val) => handleMenuUpdate(index, "label", val)}
                                        sectionId={sectionId}
                                        noId={true}
                                    />
                                </BuilderLink>
                            ))}
                            {/* Account Button in Mobile Menu */}
                            <BuilderButton
                                label={buttonText}
                                href="#"
                                suffix="mobile"
                                sectionId={sectionId}
                                className={`${styles.mobileMenuItem} btn btn-primary btn-sm ${styles.mobileMenuBuy}`}
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
