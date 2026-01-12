import styles from "./terra-footer.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg";
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
    findUsOnTitle = componentDefaults["footer-terra"].findUsOnTitle,
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
                <div className={`grid`}>
                    {/* Left Column */}
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-8`}>
                        <div className={styles.leftColumn}>
                            {/* Logo */}
                            <div className={styles.logoWrapper}>
                                <BuilderImage
                                    src={image || DEFAULT_PLACEHOLDER_IMAGE}
                                    onSrcChange={update('image')}
                                    className={`${styles.image} object-contain`}
                                    id={imageId}
                                    sectionId={sectionId}
                                    isVisible={imageVisible}
                                    onIdChange={update('imageId')}
                                    suffix="logo"
                                />
                            </div>

                            {/* Copyright */}
                            <BuilderText
                                tagName="p"
                                className={`caption-regular ${styles.copyright}`}
                                content={copyrightText || defaults.copyrightText}
                                onChange={update('copyrightText')}
                                sectionId={sectionId}
                                suffix="copyright"
                            />

                            {/* Social Icons */}
                            <div className={styles.socialWrapper}>
                                {socialLinks.map((link, index) => (
                                    link.visible && (
                                        <BuilderLink
                                            key={link.id || index}
                                            id={link.id}
                                            href={link.url}
                                            isVisible={link.visible}
                                            sectionId={sectionId}
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
                                            linkType={link.linkType}
                                            targetDialogId={link.targetDialogId}
                                            onLinkTypeChange={(val) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].linkType = val;
                                                update('socialLinks')(newLinks);
                                            }}
                                            onTargetDialogIdChange={(val) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].targetDialogId = val;
                                                update('socialLinks')(newLinks);
                                            }}
                                            hideLabel={true}
                                            iconLeft={SocialIcons[link.platform] || null}
                                            className={styles.socialLink}
                                            tooltipIfTruncated={true}
                                            style={{ width: '16px', height: '16px' }}
                                            suffix={`social-${index + 1}`}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Find Us On */}
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-2`}>
                        <div className={styles.column}>
                            <BuilderText
                                tagName="p"
                                className={"body-bold truncate-1-line"}
                                content={findUsOnTitle || defaults.findUsOnTitle}
                                onChange={update('findUsOnTitle')}
                                sectionId={sectionId}
                                suffix="find-us-title"
                            />
                            <div className={styles.linkList}>
                                {findUsOnLinks.map((link, index) => (
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
                                                <div className="icon-social" style={{ position: 'relative' }}>
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
                                                        suffix={`find-us-icon-${index}`}
                                                        className="object-cover"
                                                        style={{ width: '100%', height: '100%', borderRadius: 2 }}
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

                    {/* Resources */}
                    <div className={`col-mobile-4 col-tablet-8 col-desktop-2`}>
                        <div className={styles.column}>
                            <BuilderText
                                tagName="p"
                                className={"body-bold truncate-1-line"}
                                content={resourcesTitle || defaults.resourcesTitle}
                                onChange={update('resourcesTitle')}
                                sectionId={sectionId}
                                suffix="resources-title"
                            />
                            <div className={styles.linkList}>
                                {resourceLinks.map((link, index) => (
                                    <div key={link.id || index} className={styles.linkWrapper}>
                                        <BuilderLink
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
                                            onIdChange={(val) => {
                                                const newLinks = [...resourceLinks];
                                                newLinks[index].id = val;
                                                update('resourceLinks')(newLinks);
                                            }}

                                            onVisibilityChange={(val) => {
                                                const newLinks = [...resourceLinks];
                                                newLinks[index].visible = val;
                                                update('resourceLinks')(newLinks);
                                            }}
                                            justify="flex-start"
                                            className={`${styles.linkFooter} body-regular`}
                                            suffix={`res-${index + 1}`}
                                            fullWidth={true}
                                            tooltipIfTruncated={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
