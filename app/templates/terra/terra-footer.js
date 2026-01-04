import styles from "./terra-footer.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import BuilderLink from "@/app/page-builder/utils/builder/builder-link";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

const SocialIcons = {
    facebook: (
        <div style={{ maskImage: "url(/images/social/facebook.svg)", WebkitMaskImage: "url(/images/social/facebook.svg)" }} className={`${styles.socialIcon} icon-social`} />
    ),
    twitter: (
        <div style={{ maskImage: "url(/images/social/x.svg)", WebkitMaskImage: "url(/images/social/x.svg)" }} className={`${styles.socialIcon} icon-social`} />
    ),
    instagram: (
        <div style={{ maskImage: "url(/images/social/instagram.svg)", WebkitMaskImage: "url(/images/social/instagram.svg)" }} className={`${styles.socialIcon} icon-social`} />
    ),
    tiktok: (
        <div style={{ maskImage: "url(/images/social/tiktok.svg)", WebkitMaskImage: "url(/images/social/tiktok.svg)" }} className={`${styles.socialIcon} icon-social`} />
    ),
    youtube: (
        <div style={{ maskImage: "url(/images/social/youtube.svg)", WebkitMaskImage: "url(/images/social/youtube.svg)" }} className={`${styles.socialIcon} icon-social`} />
    ),
};

export default function TerraFooter({
    image = componentDefaults["terra-footer"].image,
    imageId,
    imageVisible,
    copyrightText = componentDefaults["terra-footer"].copyrightText,
    socialLinks = componentDefaults["terra-footer"].socialLinks,
    findUsOnTitle = componentDefaults["terra-footer"].findUsOnTitle,
    findUsOnLinks = componentDefaults["terra-footer"].findUsOnLinks,
    resourcesTitle = componentDefaults["terra-footer"].resourcesTitle,
    resourceLinks = componentDefaults["terra-footer"].resourceLinks,
    onUpdate,
    sectionId,
    fullWidth,
    removePaddingLeft,
    removePaddingRight
}) {
    const update = createUpdateHandler(onUpdate);
    const defaults = componentDefaults["terra-footer"];

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
                                    src={image || defaults.image}
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
                                            label=""
                                            iconLeft={SocialIcons[link.platform] || null}
                                            className={styles.socialLink}
                                            tooltipIfTruncated={true}
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
                                className={"body-bold"}
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
                                                <div className="icon-social" style={{ marginRight: 12, position: 'relative' }}>
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
                                className={"body-bold"}
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
