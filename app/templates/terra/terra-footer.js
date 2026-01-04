import styles from "./terra-footer.module.css";
import BuilderText from "@/app/page-builder/utils/builder/builder-text";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import BuilderLink from "@/app/page-builder/utils/builder/builder-link";
import { componentDefaults } from "../content/data";
import { createUpdateHandler } from "../utils/component-helpers";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";

const SocialIcons = {
    facebook: (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={`${styles.socialIcon} icon-social`}>
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
    ),
    twitter: (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={`${styles.socialIcon} icon-social`}>
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
    ),
    instagram: (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={`${styles.socialIcon} icon-social`}>
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.37c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
    ),
    tiktok: (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={`${styles.socialIcon} icon-social`}>
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.88-2.91 6.37-1.79 1.5-4.19 2.11-6.53 1.7-2.34-.4-4.5-1.59-5.91-3.52-1.42-1.93-1.92-4.32-1.32-6.62a8.68 8.68 0 014.16-5.69c.14-.09.28-.17.43-.24l1.83 2.92c-.6.31-1.14.73-1.57 1.24-1.08 1.27-1.29 3.05-.56 4.54.73 1.49 2.27 2.47 3.94 2.51 1.66.04 3.23-.88 4.02-2.36.78-1.47.66-3.27-.32-4.63-.16-.22-.35-.42-.55-.61V.02z" />
        </svg>
    ),
    youtube: (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={`${styles.socialIcon} icon-social`}>
            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
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
