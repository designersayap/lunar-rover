import styles from "./terra-footer.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
import BuilderLink from "@/app/page-builder/utils/builder/builder-link";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

const SocialIcons = {
    facebook: (
        <div className={`${styles.socialIcon} icon-social-mask icon-social-facebook`} />
    ),
    twitter: (
        <div className={`${styles.socialIcon} icon-social-mask icon-social-x`} />
    ),
    instagram: (
        <div className={`${styles.socialIcon} icon-social-mask icon-social-instagram`} />
    ),
    tiktok: (
        <div className={`${styles.socialIcon} icon-social-mask icon-social-tiktok`} />
    ),
    youtube: (
        <div className={`${styles.socialIcon} icon-social-mask icon-social-youtube`} />
    ),
};

export default function FooterTerra({
    image = componentDefaults["footer-terra"].image,
    imageId,
    imageVisible,
    copyrightText = componentDefaults["footer-terra"].copyrightText,
    socialLinks = componentDefaults["footer-terra"].socialLinks,
    availableAtTitle = componentDefaults["footer-terra"].availableAtTitle,
    findUsOnLinks = componentDefaults["footer-terra"].findUsOnLinks,
    resourcesTitle = componentDefaults["footer-terra"].resourcesTitle,
    resourceLinks = componentDefaults["footer-terra"].resourceLinks,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const update = createUpdateHandler(onUpdate);
    const defaults = componentDefaults["footer-terra"];

    return (
        <footer className={styles.footer} id={sectionId}>
            <div className={getContainerClasses({ fullWidth, removePaddingLeft, removePaddingRight })}>
                <div className={`grid items-center-desktop`}>
                    {/* Left Column: Logo */}
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-6`}>
                        <div className={styles.leftColumn}>
                            <div className={styles.logoWrapper}>
                                <BuilderImage
                                    src={image}
                                    onSrcChange={update('image')}
                                    className={`${styles.image} object-contain`}
                                    id={imageId}
                                    sectionId={sectionId}
                                    isVisible={imageVisible}
                                    onIdChange={update('imageId')}
                                    suffix="logo"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Available at (Tersedia Di) */}
                    <div className={`col-mobile-4 col-tablet-4 col-desktop-3`}>
                        <div className={styles.column}>
                            <BuilderText
                                tagName="p"
                                className={`body-bold ${styles.columnTitle} truncate-1-line`}
                                content={availableAtTitle || defaults.availableAtTitle}
                                onChange={update('availableAtTitle')}
                                sectionId={sectionId}
                                suffix="available-at-title"
                            />
                            <div className={styles.linkList}>
                                {findUsOnLinks.slice(0, 3).map((link, index) => (
                                    <div key={link.id || index} className={styles.linkWrapper}>
                                        <BuilderLink
                                            id={link.id}
                                            label={link.label}
                                            href={link.url}
                                            isVisible={link.visible}
                                            showLinkType={false}
                                            sectionId={sectionId}
                                            onLabelChange={(val) => {
                                                const newLinks = [...findUsOnLinks];
                                                newLinks[index].label = val;
                                                update('findUsOnLinks')(newLinks);
                                            }}
                                            onHrefChange={(val) => {
                                                const newLinks = [...findUsOnLinks];
                                                newLinks[index].url = val;
                                                update('findUsOnLinks')(newLinks);
                                            }}
                                            onIdChange={(val) => {
                                                const newLinks = [...findUsOnLinks];
                                                newLinks[index].id = val;
                                                update('findUsOnLinks')(newLinks);
                                            }}
                                            onVisibilityChange={(val) => {
                                                const newLinks = [...findUsOnLinks];
                                                newLinks[index].visible = val;
                                                update('findUsOnLinks')(newLinks);
                                            }}
                                            justify="flex-start"
                                            iconLeft={
                                                <div style={{ width: 16, height: 16, position: 'relative', overflow: 'hidden' }}>
                                                    <BuilderImage
                                                        src={link.image}
                                                        onSrcChange={(val) => {
                                                            const newLinks = [...findUsOnLinks];
                                                            newLinks[index].image = val;
                                                            update('findUsOnLinks')(newLinks);
                                                        }}
                                                        id={link.imageId}
                                                        onIdChange={(val) => {
                                                            const newLinks = [...findUsOnLinks];
                                                            newLinks[index].imageId = val;
                                                            update('findUsOnLinks')(newLinks);
                                                        }}
                                                        sectionId={sectionId}
                                                        suffix={`available-at-icon-${index}`}
                                                        className="object-contain"
                                                        style={{ width: '100%', height: '100%' }}
                                                        showLinkControls={false}
                                                    />
                                                </div>
                                            }
                                            className={`${styles.linkFooter} body-regular`}
                                            suffix={`link-${index + 1}`}
                                            fullWidth={true}
                                            tooltipIfTruncated={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Follow Us (Ikuti Kami) */}
                    <div className={`col-mobile-4 col-tablet-4 col-desktop-3`}>
                        <div className={styles.column}>
                            <BuilderText
                                tagName="p"
                                className={`body-bold ${styles.columnTitle} truncate-1-line`}
                                content={resourcesTitle || defaults.resourcesTitle}
                                onChange={update('resourcesTitle')}
                                sectionId={sectionId}
                                suffix="resources-title"
                            />
                            <div className={styles.linkList}>
                                {socialLinks.slice(0, 3).map((link, index) => (
                                    <div key={link.id || index} className={styles.linkWrapper}>
                                        <BuilderLink
                                            id={link.id}
                                            label={link.label}
                                            href={link.url}
                                            isVisible={link.visible}
                                            showLinkType={false}
                                            sectionId={sectionId}
                                            onLabelChange={(val) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].label = val;
                                                update('socialLinks')(newLinks);
                                            }}
                                            onHrefChange={(val) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].url = val;
                                                update('socialLinks')(newLinks);
                                            }}
                                            onIdChange={(val) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].id = val;
                                                update('socialLinks')(newLinks);
                                            }}
                                            onVisibilityChange={(val) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].visible = val;
                                                update('socialLinks')(newLinks);
                                            }}
                                            justify="flex-start"
                                            iconLeft={
                                                <div style={{ width: 16, height: 16, position: 'relative', overflow: 'hidden' }}>
                                                    <BuilderImage
                                                        src={link.image}
                                                        onSrcChange={(val) => {
                                                            const newLinks = [...socialLinks];
                                                            newLinks[index].image = val;
                                                            update('socialLinks')(newLinks);
                                                        }}
                                                        id={link.imageId}
                                                        onIdChange={(val) => {
                                                            const newLinks = [...socialLinks];
                                                            newLinks[index].imageId = val;
                                                            update('socialLinks')(newLinks);
                                                        }}
                                                        sectionId={sectionId}
                                                        suffix={`social-icon-${index}`}
                                                        className="object-contain"
                                                        style={{ width: '100%', height: '100%' }}
                                                        showLinkControls={false}
                                                    />
                                                </div>
                                            }
                                            className={`${styles.linkFooter} body-regular`}
                                            suffix={`social-${index + 1}`}
                                            fullWidth={true}
                                            tooltipIfTruncated={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className={styles.divider} />

                {/* Bottom Bar: Copyright & Legal Links */}
                <div className={`${styles.bottomBar} grid items-center`}>
                    <div className="col-mobile-4 col-tablet-4 col-desktop-9">
                        <div className={styles.column}>
                            <BuilderText
                                tagName="p"
                                className={`caption-regular ${styles.copyright}`}
                                content={copyrightText || defaults.copyrightText}
                                onChange={update('copyrightText')}
                                sectionId={sectionId}
                                suffix="copyright"
                            />
                        </div>
                    </div>
                    <div className="col-mobile-4 col-tablet-4 col-desktop-3">
                        <div className={styles.column}>
                            <div className={styles.legalLinks}>
                                {resourceLinks.map((link, index) => (
                                    <BuilderLink
                                        key={link.id || index}
                                        id={link.id}
                                        label={link.label}
                                        href={link.url}
                                        isVisible={link.visible}
                                        showLinkType={false}
                                        sectionId={sectionId}
                                        onLabelChange={(val) => {
                                            const newLinks = [...resourceLinks];
                                            newLinks[index].label = val;
                                            update('resourceLinks')(newLinks);
                                        }}
                                        onHrefChange={(val) => {
                                            const newLinks = [...resourceLinks];
                                            newLinks[index].url = val;
                                            update('resourceLinks')(newLinks);
                                        }}
                                        onVisibilityChange={(val) => {
                                            const newLinks = [...resourceLinks];
                                            newLinks[index].visible = val;
                                            update('resourceLinks')(newLinks);
                                        }}
                                        className={`${styles.legalLink} caption-regular`}
                                        suffix={`legal-${index + 1}`}
                                        justify="flex-start"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

