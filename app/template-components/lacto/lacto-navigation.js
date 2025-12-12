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

                    {/* Menu Item 1 */}
                    <div className="col-desktop-3">
                        <div className={styles.menuItem}>
                            <BuilderLink
                                label={menuItems[0]?.label}
                                href={menuItems[0]?.url}
                                id={menuItems[0]?.linkId}
                                isVisible={menuItems[0]?.linkVisible}
                                className="h6"
                                sectionId={sectionId}
                                suffix="menu-0"
                                onLabelChange={(val) => updateMenuItem(0, "label", val)}
                                onHrefChange={(val) => updateMenuItem(0, "url", val)}
                                onIdChange={(val) => updateMenuItem(0, "linkId", val)}
                                onVisibilityChange={(val) => updateMenuItem(0, "linkVisible", val)}
                            />
                        </div>
                    </div>

                    {/* Menu Item 2 */}
                    <div className="col-desktop-2">
                        <div className={styles.menuItem}>
                            <BuilderLink
                                label={menuItems[1]?.label}
                                href={menuItems[1]?.url}
                                id={menuItems[1]?.linkId}
                                isVisible={menuItems[1]?.linkVisible}
                                className="h6"
                                sectionId={sectionId}
                                suffix="menu-1"
                                onLabelChange={(val) => updateMenuItem(1, "label", val)}
                                onHrefChange={(val) => updateMenuItem(1, "url", val)}
                                onIdChange={(val) => updateMenuItem(1, "linkId", val)}
                                onVisibilityChange={(val) => updateMenuItem(1, "linkVisible", val)}
                            />
                        </div>
                    </div>

                    {/* Center Logo */}
                    <div className="col-mobile-2 col-tablet-8 col-desktop-2">
                        <div className={styles.logoWrapper}>
                            <div className="imageWrapper">
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
                        </div>
                    </div>

                    {/* Menu Item 3 */}
                    <div className="col-desktop-2">
                        <div className={styles.menuItem}>
                            <BuilderLink
                                label={menuItems[2]?.label}
                                href={menuItems[2]?.url}
                                id={menuItems[2]?.linkId}
                                isVisible={menuItems[2]?.linkVisible}
                                className="h6"
                                sectionId={sectionId}
                                suffix="menu-2"
                                onLabelChange={(val) => updateMenuItem(2, "label", val)}
                                onHrefChange={(val) => updateMenuItem(2, "url", val)}
                                onIdChange={(val) => updateMenuItem(2, "linkId", val)}
                                onVisibilityChange={(val) => updateMenuItem(2, "linkVisible", val)}
                            />
                        </div>
                    </div>

                    {/* Menu Item 4 */}
                    <div className="col-desktop-3">
                        <div className={styles.menuItem}>
                            <BuilderLink
                                label={menuItems[3]?.label}
                                href={menuItems[3]?.url}
                                id={menuItems[3]?.linkId}
                                isVisible={menuItems[3]?.linkVisible}
                                className="h6"
                                sectionId={sectionId}
                                suffix="menu-3"
                                onLabelChange={(val) => updateMenuItem(3, "label", val)}
                                onHrefChange={(val) => updateMenuItem(3, "url", val)}
                                onIdChange={(val) => updateMenuItem(3, "linkId", val)}
                                onVisibilityChange={(val) => updateMenuItem(3, "linkVisible", val)}
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div className="col-mobile-2 col-tablet-8">
                            <div className={styles.mobileMenu}>
                                {menuItems.map((item, index) => (
                                    <div key={index} className={styles.mobileMenuItem}>
                                        <BuilderLink
                                            label={item?.label}
                                            href={item?.url}
                                            id={item?.linkId}
                                            isVisible={item?.linkVisible}
                                            className="h6"
                                            sectionId={sectionId}
                                            suffix={`mobile-menu-${index}`}
                                            onLabelChange={(val) => updateMenuItem(index, "label", val)}
                                            onHrefChange={(val) => updateMenuItem(index, "url", val)}
                                            onIdChange={(val) => updateMenuItem(index, "linkId", val)}
                                            onVisibilityChange={(val) => updateMenuItem(index, "linkVisible", val)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </BuilderSection>
        </section>
    );
}
