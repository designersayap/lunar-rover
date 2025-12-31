import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './lacto-navigation.module.css';
import { createUpdateHandler } from './component-helpers';
import { componentDefaults } from './data';
import { Bars3Icon } from '@heroicons/react/24/solid';

const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
  }
};

// Shim for BuilderLink
const BuilderLink = ({ label, href, openInNewTab, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight, justify }) => {
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  const content = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify || 'center', width: '100%', height: '100%', gap: 'inherit' }}>
         {iconLeft && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconLeft}</span>}
         <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: justify || 'center' }}>
            {label || children}
         </div>
         {iconRight && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconRight}</span>}
      </div>
  );

  if (linkType === 'dialog' && targetDialogId) {
    return (
      <a
        id={finalId}
        href="#"
        className={className}
        style={style}
        onClick={(e) => {
            e.preventDefault();
            openDialog(targetDialogId);
        }}
      >
        {content}
      </a>
    );
  }
  return (
    <Link 
      id={finalId}
      href={href || '#'} 
      className={className} 
      style={style}
      target={openInNewTab ? '_blank' : undefined}
    >
      {content}
    </Link>
  );
};

const BuilderImage = ({ src, mobileSrc, alt, className, style, mobileRatio, href, linkType, openInNewTab, targetDialogId, id, sectionId, suffix, isPortrait }) => {
  const normalizedSectionId = sectionId ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  const effectiveAlt = (!alt || alt === '#') && normalizedSectionId ? normalizedSectionId : (alt || '');
  let finalClassName = className || '';

  if (isPortrait === true || String(isPortrait) === 'true') {
    const portraitMap = {
        'imagePlaceholder-4-3': 'imagePlaceholder-3-4',
        'imagePlaceholder-16-9': 'imagePlaceholder-9-16',
        'imagePlaceholder-21-9': 'imagePlaceholder-9-21',
        'imagePlaceholder-5-4': 'imagePlaceholder-4-5'
    };
    Object.entries(portraitMap).forEach(([landscape, portrait]) => {
        finalClassName = finalClassName.replace(landscape, portrait);
    });
  }

  if (mobileRatio) {
     finalClassName += ` mobile-aspect-${mobileRatio}`;
  }

  const defaultStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const imageContent = (
    <>
      {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
      <img 
        id={finalId}
        src={src} 
        alt={effectiveAlt} 
        className={finalClassName} 
        style={{ ...defaultStyle, ...style }} 
      />
    </>
  );

  const imgElement = mobileSrc ? (
     <picture style={{ display: 'contents' }}>{imageContent}</picture>
  ) : (
    <img 
      id={finalId}
      src={src} 
      alt={effectiveAlt} 
      className={finalClassName} 
      style={{ ...defaultStyle, ...style }} 
    />
  );

  if (href || (linkType === 'dialog' && targetDialogId)) {
    const isNewTab = linkType === 'external' || openInNewTab;
    const isDialog = linkType === 'dialog' && targetDialogId;

    if (isDialog) {
        return (
            <button
                className={finalClassName}
                style={{ ...style, display: 'block', width: '100%', height: '100%', border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }}
                onClick={(e) => {
                     e.preventDefault();
                     openDialog(targetDialogId);
                }}
            >
                {mobileSrc ? <picture style={{ display: 'contents' }}>{imageContent}</picture> : 
                <img 
                    id={finalId}
                    src={src} 
                    alt={effectiveAlt} 
                    style={{ ...defaultStyle, ...style, width: '100%', height: '100%' }} 
                />}
            </button>
        );
    }

    return (
      <Link 
         href={href || '#'} 
         target={isNewTab ? '_blank' : undefined}
         className={finalClassName}
         style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {mobileSrc ? <picture style={{ display: 'contents' }}>{imageContent}</picture> :
        <img 
            id={finalId}
            src={src} 
            alt={effectiveAlt} 
            style={{ ...defaultStyle, ...style }} 
        />}
      </Link>
    );
  }

  return imgElement;
};

export default function LactoNavigation({
    sectionId,
    logo = componentDefaults["lacto-navigation"].logo,
    logoId,
    logoVisible,

    menu1Label = componentDefaults["lacto-navigation"].menu1Label,
    menu1Url = componentDefaults["lacto-navigation"].menu1Url,
    menu1OpenInNewTab = componentDefaults["lacto-navigation"].menu1OpenInNewTab,
    menu1Visible = true,
    menu1LinkType = componentDefaults["lacto-navigation"].menu1LinkType,
    menu1TargetDialogId = componentDefaults["lacto-navigation"].menu1TargetDialogId,
    menu1Id,

    menu2Label = componentDefaults["lacto-navigation"].menu2Label,
    menu2Url = componentDefaults["lacto-navigation"].menu2Url,
    menu2OpenInNewTab = componentDefaults["lacto-navigation"].menu2OpenInNewTab,
    menu2Visible = true,
    menu2LinkType = componentDefaults["lacto-navigation"].menu2LinkType,
    menu2TargetDialogId = componentDefaults["lacto-navigation"].menu2TargetDialogId,
    menu2Id,

    menu3Label = componentDefaults["lacto-navigation"].menu3Label,
    menu3Url = componentDefaults["lacto-navigation"].menu3Url,
    menu3OpenInNewTab = componentDefaults["lacto-navigation"].menu3OpenInNewTab,
    menu3Visible = true,
    menu3LinkType = componentDefaults["lacto-navigation"].menu3LinkType,
    menu3TargetDialogId = componentDefaults["lacto-navigation"].menu3TargetDialogId,
    menu3Id,

    menu4Label = componentDefaults["lacto-navigation"].menu4Label,
    menu4Url = componentDefaults["lacto-navigation"].menu4Url,
    menu4OpenInNewTab = componentDefaults["lacto-navigation"].menu4OpenInNewTab,
    menu4Visible = true,
    menu4LinkType = componentDefaults["lacto-navigation"].menu4LinkType,
    menu4TargetDialogId = componentDefaults["lacto-navigation"].menu4TargetDialogId,
    menu4Id,

    onUpdate
}) {
    const update = createUpdateHandler(onUpdate);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);

    // Check for empty, null, or matching the specific placeholder ID structure
    const isPlaceholder = !logo || (typeof logo === 'string' && logo.includes('placeholder_falj5i'));
    const logoStyle = {
        objectFit: isPlaceholder ? 'cover' : 'contain',
        borderRadius: isPlaceholder ? '0px' : undefined
    };

    useEffect(() => {
        setPortalContainer(document.body);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Check window scroll first (Staging/Export)
            let scrollTop = window.scrollY;

            // If 0, check the builder canvas container
            if (scrollTop === 0) {
                const canvasContainer = document.getElementById('canvas-scroll-container');
                if (canvasContainer) {
                    scrollTop = canvasContainer.scrollTop;
                }
            }

            if (scrollTop > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Attach to window (for Staging/Export)
        window.addEventListener('scroll', handleScroll);

        // Attach to builder canvas (for Page Builder)
        const canvasContainer = document.getElementById('canvas-scroll-container');
        if (canvasContainer) {
            canvasContainer.addEventListener('scroll', handleScroll);
        }

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (canvasContainer) {
                canvasContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const menuItems = [
        {
            label: menu1Label,
            url: menu1Url,
            openInNewTab: menu1OpenInNewTab,
            visible: menu1Visible,
            linkType: menu1LinkType,
            targetDialogId: menu1TargetDialogId,
            id: menu1Id,
            handlers: {
                onLabelChange: undefined,
                onUrlChange: undefined,
                onOpenInNewTabChange: undefined,
                onLinkTypeChange: undefined,
                onTargetDialogIdChange: undefined,
                onIdChange: undefined
            },
            suffix: 'menu-1',
            mobileSuffix: 'mobile-menu-1'
        },
        {
            label: menu2Label,
            url: menu2Url,
            openInNewTab: menu2OpenInNewTab,
            visible: menu2Visible,
            linkType: menu2LinkType,
            targetDialogId: menu2TargetDialogId,
            id: menu2Id,
            handlers: {
                onLabelChange: undefined,
                onUrlChange: undefined,
                onOpenInNewTabChange: undefined,
                onLinkTypeChange: undefined,
                onTargetDialogIdChange: undefined,
                onIdChange: undefined
            },
            suffix: 'menu-2',
            mobileSuffix: 'mobile-menu-2'
        },
        {
            label: menu3Label,
            url: menu3Url,
            openInNewTab: menu3OpenInNewTab,
            visible: menu3Visible,
            linkType: menu3LinkType,
            targetDialogId: menu3TargetDialogId,
            id: menu3Id,
            handlers: {
                onLabelChange: undefined,
                onUrlChange: undefined,
                onOpenInNewTabChange: undefined,
                onLinkTypeChange: undefined,
                onTargetDialogIdChange: undefined,
                onIdChange: undefined
            },
            suffix: 'menu-3',
            mobileSuffix: 'mobile-menu-3'
        },
        {
            label: menu4Label,
            url: menu4Url,
            openInNewTab: menu4OpenInNewTab,
            visible: menu4Visible,
            linkType: menu4LinkType,
            targetDialogId: menu4TargetDialogId,
            id: menu4Id,
            handlers: {
                onLabelChange: undefined,
                onUrlChange: undefined,
                onOpenInNewTabChange: undefined,
                onLinkTypeChange: undefined,
                onTargetDialogIdChange: undefined,
                onIdChange: undefined
            },
            suffix: 'menu-4',
            mobileSuffix: 'mobile-menu-4'
        }
    ];

    return (
        <nav className={`${styles.navigationWrapper} z-content-1 ${isScrolled ? styles.scrolled : ''}`} id={sectionId}>
            <div className="container-grid">
                <div className="grid align-center">
                    {menuItems.slice(0, 2).map((item, index) => (
                        <div
                            key={`desktop-${item.suffix}`}
                            className={`col-desktop-2 ${index === 0 ? 'offset-desktop-1 offset-tablet-1' : ''} ${styles.desktopNav} ${styles.menuItemWrapper}`}
                        >
                            <div className={styles.truncatedText}>
                                <BuilderLink
                                    label={item.label}
                                    href={item.url}
                                    openInNewTab={item.openInNewTab}
                                    onLabelChange={item.handlers.onLabelChange}
                                    onHrefChange={item.handlers.onUrlChange}
                                    onOpenInNewTabChange={item.handlers.onOpenInNewTabChange}
                                    sectionId={sectionId}
                                    id={item.id}
                                    onIdChange={item.handlers.onIdChange}
                                    className="body-bold link-nav"
                                    suffix={item.suffix}
                                    fullWidth={true}
                                    isVisible={item.visible}
                                    linkType={item.linkType}
                                    targetDialogId={item.targetDialogId}
                                    onLinkTypeChange={item.handlers.onLinkTypeChange}
                                    onTargetDialogIdChange={item.handlers.onTargetDialogIdChange}
                                    tooltipIfTruncated={true}
                                />
                            </div>
                        </div>
                    ))}

                    <div className={`col-desktop-2 col-tablet-2 ${styles.desktopNav} ${styles.logoWrapper}`}>
                        <div className={styles.logoContainer}>
                            <BuilderImage
                                src={logo}
                                onSrcChange={undefined}
                                id={logoId}
                                sectionId={sectionId}
                                onIdChange={undefined}
                                isVisible={logoVisible}
                                suffix="logo"
                                className={styles.logoImage}
                                style={logoStyle}
                            />
                        </div>
                    </div>

                    {menuItems.slice(2, 4).map((item) => (
                        <div
                            key={`desktop-${item.suffix}`}
                            className={`col-desktop-2 ${styles.desktopNav} ${styles.menuItemWrapper}`}
                        >
                            <div className={styles.truncatedText}>
                                <BuilderLink
                                    label={item.label}
                                    href={item.url}
                                    openInNewTab={item.openInNewTab}
                                    onLabelChange={item.handlers.onLabelChange}
                                    onHrefChange={item.handlers.onUrlChange}
                                    onOpenInNewTabChange={item.handlers.onOpenInNewTabChange}
                                    sectionId={sectionId}
                                    id={item.id}
                                    onIdChange={item.handlers.onIdChange}
                                    className="body-bold link-nav"
                                    suffix={item.suffix}
                                    fullWidth={true}
                                    isVisible={item.visible}
                                    linkType={item.linkType}
                                    targetDialogId={item.targetDialogId}
                                    onLinkTypeChange={item.handlers.onLinkTypeChange}
                                    onTargetDialogIdChange={item.handlers.onTargetDialogIdChange}
                                    tooltipIfTruncated={true}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Mobile Layout */}
                    <div className={`col-mobile-2 col-tablet-4 ${styles.mobileNav} ${styles.mobileLogoWrapper}`}>
                        <div className={styles.logoContainer}>
                            <BuilderImage
                                src={logo}
                                id={logoId}
                                isVisible={logoVisible}
                                readOnly={true}
                                className={styles.logoImage}
                                style={logoStyle}
                            />
                        </div>
                    </div>

                    <div className={`col-mobile-2 col-tablet-4 ${styles.mobileNav} ${styles.mobileBurgerWrapper}`}>
                        <button
                            className={styles.burgerButton}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Bars3Icon style={{ width: 24, height: 24 }} />
                        </button>
                    </div>

                </div >
            </div>

            {/* Mobile Menu Dialog - Rendered via Portal */}
            {
                portalContainer && createPortal(
                    <>
                        <div className="overlay z-system-modal-fullscreen" onClick={() => setIsMobileMenuOpen(false)} style={{ display: isMobileMenuOpen ? 'flex' : 'none', pointerEvents: 'auto' }} />
                        <div className={`${styles.dialogWrapper} z-system-modal-fullscreen ${isMobileMenuOpen ? styles.open : ''}`}>
                            <div className="container-grid">
                                <div className="grid">
                                    <div className={`${styles.mobileDialog} col-12 col-mobile-4 col-tablet-4 col-desktop-6 offset-desktop-3 offset-tablet-2`}>
                                        {menuItems.map((item) => (
                                            <div key={`mobile-${item.mobileSuffix}`} className={styles.mobileMenuLink}>
                                                <BuilderLink
                                                    label={item.label}
                                                    href={item.url}
                                                    openInNewTab={item.openInNewTab}
                                                    onLabelChange={item.handlers.onLabelChange}
                                                    onHrefChange={item.handlers.onUrlChange}
                                                    onOpenInNewTabChange={item.handlers.onOpenInNewTabChange}
                                                    sectionId={sectionId}
                                                    id={undefined}
                                                    suffix={item.mobileSuffix}
                                                    className={`${styles.mobileLinkText} body-bold link-nav`}
                                                    fullWidth={true}
                                                    isVisible={item.visible}
                                                    linkType={item.linkType}
                                                    targetDialogId={item.targetDialogId}
                                                    onLinkTypeChange={item.handlers.onLinkTypeChange}
                                                    onTargetDialogIdChange={item.handlers.onTargetDialogIdChange}
                                                    tooltipIfTruncated={true}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>,
                    portalContainer
                )
            }
        </nav >
    );
}
