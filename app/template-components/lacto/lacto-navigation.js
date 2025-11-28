"use client";

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './lacto-navigation.module.css';

/**
 * Lacto Navigation Component
 * Sticky navigation bar with centered logo and menu items
 */
export default function LactoNavigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={styles.navigation}>
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
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    Beranda
                                </a>
                            </div>

                            {/* Menu Item 2 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    Terbaru
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
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    Produk
                                </a>
                            </div>

                            {/* Menu Item 4 - Desktop Only */}
                            <div className={`${styles.menuWrapper} ${styles.desktopOnly}`}>
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.menuItem}`}>
                                    Kontak
                                </a>
                            </div>

                            {/* Spacer for tablet/mobile to keep logo centered */}
                            <div className={`${styles.spacer} ${styles.tabletMobileOnly}`}></div>
                        </div>

                        {/* Mobile Menu Dropdown */}
                        {isMobileMenuOpen && (
                            <div className={`${styles.mobileMenu} ${styles.tabletMobileOnly}`}>
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}>
                                    Beranda
                                </a>
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}>
                                    Terbaru
                                </a>
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}>
                                    Produk
                                </a>
                                <a href="#" className={`btn btn-ghost-neutral btn-sm ${styles.mobileMenuItem}`}>
                                    Kontak
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
