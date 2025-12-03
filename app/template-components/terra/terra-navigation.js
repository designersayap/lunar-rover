"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
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
    buttonId, // Add buttonId prop
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
                                    id={item.id}
                                    sectionId={sectionId}
                                    suffix={`menu-${index + 1}`}
                                    onIdChange={(val) => handleMenuUpdate(index, "id", val)}
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
                                id={buttonId}
                                onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            />

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
