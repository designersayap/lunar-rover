
import styles from "./terra-footer.module.css";
import BuilderText from "@/app/page-builder-components/utils/builder-text";

import BuilderLink from "@/app/page-builder-components/utils/builder-link";
import { componentDefaults } from "../content/component-defaults";

/**
 * Footer Component
 */
export default function TerraFooter({
    brand = componentDefaults["footer"].brand,
    products = componentDefaults["footer"].products,
    social = componentDefaults["footer"].social,
    bottomBar = componentDefaults["footer"].bottomBar,
    onUpdate,
    sectionId
}) {
    const getSocialIcon = (label) => {
        switch (label) {
            case "Facebook":
                return (
                    <svg className="icon-social" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" />
                    </svg>
                );
            case "Twitter":
                return (
                    <svg className="icon-social" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16.01 6.01 17.26 7.87 17.29C6.4 18.45 4.55 19.13 2.54 19.13C2.19 19.13 1.85 19.11 1.5 19.07C3.4 20.29 5.66 21 8.09 21C16 21 20.32 14.46 20.32 8.79C20.32 8.61 20.32 8.42 20.31 8.23C21.16 7.63 21.88 6.87 22.46 6Z" />
                    </svg>
                );
            case "Instagram":
                return (
                    <svg className="icon-social" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.6 4 4 5.6 4 7.6V16.4C4 18.4 5.6 20 7.6 20H16.4C18.4 20 20 18.4 20 16.4V7.6C20 5.6 18.4 4 16.4 4H7.6ZM12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7ZM12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9ZM17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75C18.5 7.44 17.94 8 17.25 8C16.56 8 16 7.44 16 6.75C16 6.06 16.56 5.5 17.25 5.5Z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const handleUpdate = (section, key, value) => {
        if (!onUpdate) return;
        onUpdate({ [section]: { ...[section], [key]: value } });
    };

    const updateBrand = (key, val) => onUpdate && onUpdate({ brand: { ...brand, [key]: val } });
    const updateProductsTitle = (val) => onUpdate && onUpdate({ products: { ...products, title: val } });
    const updateProductLink = (index, val) => {
        if (!onUpdate) return;
        const newLinks = [...products.links];
        newLinks[index] = { ...newLinks[index], label: val };
        onUpdate({ products: { ...products, links: newLinks } });
    };
    const updateSocialTitle = (val) => onUpdate && onUpdate({ social: { ...social, title: val } });

    const updateCopyright = (val) => onUpdate && onUpdate({ bottomBar: { ...bottomBar, copyright: val } });
    const updateLegalLink = (index, val) => {
        if (!onUpdate) return;
        const newLinks = [...bottomBar.legalLinks];
        newLinks[index] = { ...newLinks[index], label: val };
        onUpdate({ bottomBar: { ...bottomBar, legalLinks: newLinks } });
    };

    return (
        <footer className={styles.section}>
            <div className="container-grid">
                <div className="grid">
                    {/* Brand Column */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 ${styles.brandColumn}`}>
                        <h4 className={`h4 ${styles.title}`}>
                            <BuilderText content={brand?.title} onChange={(val) => updateBrand('title', val)} tagName="span" sectionId={sectionId} />
                        </h4>
                        <p className={`body-regular ${styles.description}`}>
                            <BuilderText content={brand?.subtitle} onChange={(val) => updateBrand('subtitle', val)} tagName="span" sectionId={sectionId} />
                        </p>
                    </div>

                    {/* Products Column */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-2 ${styles.linksColumn}`}>
                        <h4 className={`body-regular ${styles.title}`}>
                            <BuilderText content={products?.title} onChange={updateProductsTitle} tagName="span" sectionId={sectionId} />
                        </h4>
                        <ul className={styles.linkList}>
                            {products?.links.map((link, index) => (
                                <li key={index}>
                                    <BuilderLink
                                        href={link.href}
                                        className={`body-regular ${styles.linkItem}`}
                                        sectionId={sectionId}
                                        suffix={`product-${index}`}
                                    >
                                        <BuilderText content={link.label} onChange={(val) => updateProductLink(index, val)} tagName="span" sectionId={sectionId} noId={true} />
                                    </BuilderLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow Us Column */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-2 ${styles.linksColumn}`}>
                        <h4 className={`body-regular ${styles.title}`}>
                            <BuilderText content={social?.title} onChange={updateSocialTitle} tagName="span" sectionId={sectionId} />
                        </h4>
                        <ul className={styles.linkList}>
                            {social?.links.map((link, index) => (
                                <li key={index}>
                                    <BuilderLink
                                        href={link.href}
                                        className={`body-regular ${styles.linkItem}`}
                                        sectionId={sectionId}
                                        suffix={`social-${index}`}
                                    >
                                        {getSocialIcon(link.label)}
                                        {link.label}
                                    </BuilderLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={`caption-regular ${styles.copyright}`}>
                        <BuilderText content={bottomBar?.copyright} onChange={updateCopyright} tagName="span" sectionId={sectionId} />
                    </div>
                    <div className={styles.legalLinks}>
                        {bottomBar?.legalLinks.map((link, index) => (
                            <BuilderLink
                                key={index}
                                href={link.href}
                                className={`caption-regular ${styles.legalLink}`}
                                sectionId={sectionId}
                                suffix={`legal-${index}`}
                            >
                                <BuilderText content={link.label} onChange={(val) => updateLegalLink(index, val)} tagName="span" sectionId={sectionId} noId={true} />
                            </BuilderLink>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
