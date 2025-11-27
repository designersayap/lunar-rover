"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, GlobeAltIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import styles from './terra-navigation.module.css';


export default function TerraNavigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="container-grid">
            <div className="grid">
                <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                    <div className={styles.navContainer}>
                        {/* 1.1 Logo */}
                        <div className={styles.logoContainer}>
                            <div className={styles.logoIconWrapper}>
                                <GlobeAltIcon className={styles.logoIcon} />
                            </div>
                            <span className={styles.brandName}>Terra</span>
                        </div>

                        {/* 1.2 Menu (Desktop) */}
                        <div className={`${styles.menuContainer} ${styles.desktopOnly}`}>
                            <a href="#" className={`${styles.menuItem} btn btn-sm btn-ghost-neutral`}>Menu 1</a>
                            <div className={`${styles.menuItemWithArrow} btn btn-sm btn-ghost-neutral`}>
                                Menu 2
                                <ChevronDownIcon className={styles.arrowIcon} />
                            </div>
                            <a href="#" className={`${styles.menuItem} btn btn-sm btn-ghost-neutral`}>Menu 3</a>
                            <a href="#" className={`${styles.menuItem} btn btn-sm btn-ghost-neutral`}>Menu 4</a>
                        </div>

                        {/* 1.3 Account Button & Mobile Toggle */}
                        <div className={styles.actionsContainer}>
                            <button className={`btn btn-primary btn-sm ${styles.desktopOnly}`} aria-label="Buy Menu">
                                Beli Sekarang  <ShoppingCartIcon className={styles.icon} />
                            </button>

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
                            <a href="#" className={`${styles.mobileMenuItem} btn btn-sm btn-ghost-neutral`}>Menu 1</a>
                            <div className={`${styles.mobileMenuItem} btn btn-sm btn-ghost-neutral`}>
                                Menu 2
                                <ChevronDownIcon className={styles.arrowIcon} />
                            </div>
                            <a href="#" className={`${styles.mobileMenuItem} btn btn-sm btn-ghost-neutral`}>Menu 3</a>
                            <a href="#" className={`${styles.mobileMenuItem} btn btn-sm btn-ghost-neutral`}>Menu 4</a>
                            {/* Account Button in Mobile Menu */}
                            <button className={`${styles.mobileMenuItem} btn btn-primary btn-sm ${styles.mobileMenuBuy}`} aria-label="Buy Menu">
                                Beli Sekarang
                                <ShoppingCartIcon className={styles.icon} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
