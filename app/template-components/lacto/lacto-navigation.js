"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./lacto-navigation.module.css";
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
import BuilderLink from "@/app/page-builder-components/utils/builder/builder-link";
import BuilderSection from "@/app/page-builder-components/utils/builder/builder-section";
import { componentDefaults } from "../content/data";

export default function LactoNavigation({
    menuItems = componentDefaults["lacto-navigation"].menuItems,
    logo = componentDefaults["lacto-navigation"].logo,
    sectionId,
    onUpdate,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const updateMenuItem = (index, key, value) => {
        if (!onUpdate) return;
        const newMenuItems = [...menuItems];
        newMenuItems[index] = { ...newMenuItems[index], [key]: value };
        onUpdate({ menuItems: newMenuItems });
    };

    const updateLogo = (key, value) => {
        if (!onUpdate) return;
        onUpdate({ logo: { ...logo, [key]: value } });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <section className={styles.container}>
            <BuilderSection
                sectionId={sectionId}
                fullWidth={fullWidth}
                removePaddingLeft={removePaddingLeft}
                removePaddingRight={removePaddingRight}
                onUpdate={onUpdate}
            >
                <div className="grid">
                    {/* Hamburger Menu Icon (Mobile/Tablet Only) */}
                    <button
                        className={styles.hamburger}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>

                    {/* Menu Items */}
                    {menuItems.slice(0, 2).map((item, index) => (
                        <div key={index} className={`col-desktop-2 ${styles.menuItem}`}>
                            <BuilderLink
                                label={item?.label}
                                href={item?.url}
                                id={item?.linkId}
                                isVisible={item?.linkVisible}
                                className="body-bold truncate-1-line"
                                sectionId={sectionId}
                                suffix={`menu-${index}`}
                                onLabelChange={(val) => updateMenuItem(index, "label", val)}
                                onHrefChange={(val) => updateMenuItem(index, "url", val)}
                                onIdChange={(val) => updateMenuItem(index, "linkId", val)}
                                onVisibilityChange={(val) => updateMenuItem(index, "linkVisible", val)}
                            />
                        </div>
                    ))}

                    {/* Center Logo */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-2 ${styles.logoWrapper}`}>
                        <BuilderImage
                            src={logo.image}
                            className={`${styles.logo} imagePlaceholder-16-9`}
                            id={logo.imageId}
                            sectionId={sectionId}
                            isVisible={logo.imageVisible}
                            onIdChange={(val) => updateLogo("imageId", val)}
                            onVisibilityChange={(val) => updateLogo("imageVisible", val)}
                            suffix="logo"
                        />
                    </div>

                    {/* Menu Items 3-4 */}
                    {menuItems.slice(2, 4).map((item, index) => (
                        <div key={index + 2} className={`col-desktop-2 ${styles.menuItem}`}>
                            <BuilderLink
                                label={item?.label}
                                href={item?.url}
                                id={item?.linkId}
                                isVisible={item?.linkVisible}
                                className="body-bold truncate-1-line"
                                sectionId={sectionId}
                                suffix={`menu-${index + 2}`}
                                onLabelChange={(val) => updateMenuItem(index + 2, "label", val)}
                                onHrefChange={(val) => updateMenuItem(index + 2, "url", val)}
                                onIdChange={(val) => updateMenuItem(index + 2, "linkId", val)}
                                onVisibilityChange={(val) => updateMenuItem(index + 2, "linkVisible", val)}
                            />
                        </div>
                    ))}

                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div className="col-mobile-2 col-tablet-8">
                            <div className={`${styles.mobileMenu} shadow-md`}>
                                {menuItems.map((item, index) => (
                                    <BuilderLink
                                        key={index}
                                        label={item?.label}
                                        href={item?.url}
                                        id={item?.linkId}
                                        isVisible={item?.linkVisible}
                                        className={`body-bold truncate-1-line ${styles.mobileMenuItem}`}
                                        sectionId={sectionId}
                                        suffix={`mobile-menu-${index}`}
                                        onLabelChange={(val) => updateMenuItem(index, "label", val)}
                                        onHrefChange={(val) => updateMenuItem(index, "url", val)}
                                        onIdChange={(val) => updateMenuItem(index, "linkId", val)}
                                        onVisibilityChange={(val) => updateMenuItem(index, "linkVisible", val)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </BuilderSection>
        </section>
    );
}
