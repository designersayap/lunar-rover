// Helper utilities for export-component route
// Edge Runtime Compatible (No 'path' or 'fs' imports)

export const ALLOWED_DIRS = [
  'app/templates',
  'app/foundation',
  'app/page-builder',
  'public',
  'app/constants.js'
];

export const BINARY_SET = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico',
  '.mp4', '.webm', '.ogv', '.mp3', '.wav'
]);

export function isBinary(ext) {
  return BINARY_SET.has(ext);
}

// resolvePath removed as it relied on Node.js path module

/** Simple logger – can be swapped for a proper logger later */
export function log(...args) {
  console.log('[export-component]', ...args);
}

/** Clean Builder‑specific imports and props from component source */
export function cleanBuilderContent(src, componentName) {
  if (typeof src !== 'string') {
    console.warn('[export-component] cleanBuilderContent received non-string:', typeof src);
    return typeof src === 'undefined' ? '' : String(src);
  }

  const hasShim = (name) => new RegExp(`const\\s+${name}\\s*=`).test(src);

  const hasBuilderLink = src.includes('BuilderLink') && !hasShim('BuilderLink');
  const hasBuilderImage = src.includes('BuilderImage') && !hasShim('BuilderImage');
  const hasBuilderSection = src.includes('BuilderSection') && !hasShim('BuilderSection');
  const hasBuilderText = src.includes('BuilderText') && !hasShim('BuilderText');
  const hasBuilderButton = src.includes('BuilderButton') && !hasShim('BuilderButton');
  const hasBuilderElement = src.includes('BuilderElement') && !hasShim('BuilderElement');
  const hasBuilderInput = src.includes('BuilderInput') && !hasShim('BuilderInput');
  const hasBuilderSelect = src.includes('BuilderSelect') && !hasShim('BuilderSelect');
  const hasBuilderControlsPopover = src.includes('BuilderControlsPopover') && !hasShim('BuilderControlsPopover');
  const hasUseIdSync = src.includes('useIdSync') && !hasShim('useIdSync');
  const hasUseActiveOverlay = src.includes('useActiveOverlayPosition') && !hasShim('useActiveOverlayPosition');
  const hasGetContainerClasses = src.includes('getContainerClasses') && !hasShim('getContainerClasses');

  // Remove Builder imports (Absolute & Relative)
  src = src.replace(/import\s+.*?\s+from\s+['"](?:@\/app\/|.*\/)page-builder\/.*?['"];?\n?/g, '');
  src = src.replace(/import\s+{[^}]*(?:BuilderSelectionContext|useCanvas|useActiveOverlayPosition|useIdSync)[^}]*}\s+from\s+['"][^'"]+['"];?\n?/g, '');

  // Strip componentDefaults imports (DISABLED: Preserving default data/text in export)
  // src = src.replace(/import\s+{[^}]*componentDefaults[^}]*}\s+from\s+['"][^'"]+['"];?\n?/g, '');

  // Strip component-library imports (used in ScrollGroup) (DISABLED: Preserving registry for fallback logic)
  // src = src.replace(/import\s+{[^}]*componentLibrary[^}]*}\s+from\s+['"][^'"]+['"];?\n?/g, '');

  // Remove onUpdate props and update handler calls
  src = src.replace(/onUpdate\s*=\s*\{[^}]+\}/g, '');
  // Only replace actual calls, not definitions (const/let/var/function/async) (DISABLED: Aggressive stripping can break non-builder logic)
  // src = src.replace(/(?<!\b(?:const|let|var|function|async)\s+)\bupdate[A-Za-z0-9_]*\([^)]*\)/g, 'undefined');

  // Replace componentDefaults access with empty strings/nulls to strip "dummy data" (DISABLED: Preserving default data/text in export)
  /*
  // 1. Handle arrays (items, images, links, etc.) -> []
  src = src.replace(/=\s*componentDefaults\s*\[['"][^'"]+['"]\]\.(items|images|links|socialLinks|findUsOnLinks|resourceLinks|testimonies|categories|products|videos)/gi, '= []');
  // 2. Handle booleans (Visible, is*, has*, fullWidth) -> true
  src = src.replace(/=\s*componentDefaults\s*\[['"][^'"]+['"]\]\.([a-zA-Z0-9_]*(?:Visible|is[A-Z]|has[A-Z]|fullWidth|isSticky|isOverlay))/g, '= true');
  // 3. Handle everything else -> ""
  src = src.replace(/=\s*componentDefaults\s*\[['"][^'"]+['"]\]\.(?!.*(?:Visible|is[A-Z]|has[A-Z]|fullWidth|isSticky|isOverlay|items|images|links|socialLinks|findUsOnLinks|resourceLinks|testimonies|categories|products|videos))([a-zA-Z0-9_]+)/gi, '= ""');
  src = src.replace(/componentDefaults\s*\[['"][^'"]+['"]\]/g, '{}');
  */

  // Replace BuilderSelectionContext and useCanvas usages to avoid ReferenceErrors since import is removed
  // Matches various destructuring patterns from both hooks
  src = src.replace(/const\s*{\s*([^}]*(?:activeElementId|setActiveElementId|activePopoverId|setActivePopoverId|selectedComponents|updateComponent|isStaging|canvasWidth|canvasWidthSimulation)[^}]*)\s*}\s*=\s*(?:useContext\s*\(\s*BuilderSelectionContext\s*\)|useCanvas\s*\(\s*\)|useBuilderSelection\s*\(\s*\));?/g, (match, p1) => {
    // Keep isStaging as true for exported components to ensure they render content correctly
    const vars = p1.split(',').map(v => v.trim());
    const replacements = vars.map(v => {
      if (v === 'isStaging') return 'isStaging = true';
      if (v === 'canvasWidth') return "canvasWidth = '100%'";
      if (v === 'activeElementId') return "activeElementId = '__EXPORTED__'";
      return v;
    });
    return `const { ${replacements.join(', ')} } = {};\n  // Context values mocked for export`;
  });

  // Remove renderActiveOverlay, renderOverlay, renderPopover functions and their calls
  src = src.replace(/const\s+render(?:ActiveOverlay|Overlay|Popover)\s*=\s*\(\)\s*=>\s*{[\s\S]*?};/g, '');
  src = src.replace(/{\s*render(?:ActiveOverlay|Overlay|Popover)\(\)\s*}/g, '');

  // Remove Builder-only hooks and state (overlays, selection tracking)
  src = src.replace(/const\s+overlayStyle\s*=\s*useActiveOverlayPosition\(overlayRect\);?/g, '');
  src = src.replace(/const\s+isMobileSimulation\s*=\s*useMemo\([\s\S]*?canvasWidth === '100%'[\s\S]*?\]\);/g, 'const isMobileSimulation = false;');
  src = src.replace(/const\s+\[(?:overlayRect|popoverPosition),\s*set(?:OverlayRect|PopoverPosition)\]\s*=\s*useState\(null\);?/g, '');
  src = src.replace(/use(?:Layout)?Effect\(\(\)\s*=>\s*{[\s\S]*?requestAnimationFrame[\s\S]*?}\s*,\s*\[[\s\S]*?\]\);/g, '');
  src = src.replace(/const\s+wrapperRef\s*=\s*useRef\(null\);?/g, '');
  src = src.replace(/const\s+whiteOverlayRef\s*=\s*useRef\(null\);?/g, '');
  src = src.replace(/const\s+blurContainerRef\s*=\s*useRef\(null\);?/g, '');

  // Remove empty import lines left behind
  src = src.replace(/^\s*\n/gm, '\n');

  let shims = [];

  // Ensure Link is imported if not present but needed
  if ((hasBuilderLink || hasBuilderButton || hasBuilderImage) && !src.includes("from 'next/link'") && !src.includes('from "next/link"')) {
    const useClientRegex = /^(['"]use client['"];?)\s*/;
    const nextLinkImport = "import Link from 'next/link';\n";
    const nextImageImport = "";
    
    if (useClientRegex.test(src)) {
      src = src.replace(useClientRegex, `$1\n${nextLinkImport}${nextImageImport}`);
    } else {
      src = `${nextLinkImport}${nextImageImport}${src}`;
    }
  }

  if (hasBuilderImage || hasBuilderText || hasUseActiveOverlay) {
    const useClientRegex = /^(['"]use client['"];?)\s*/;
    const hooksNeeded = [];
    if (hasBuilderImage || hasBuilderText || hasUseActiveOverlay) hooksNeeded.push('useState');
    if (hasBuilderImage) {
        hooksNeeded.push('useEffect');
        hooksNeeded.push('useRef');
    }
    if (hasUseActiveOverlay) hooksNeeded.push('useMemo');
    
    // Filter out hooks that are already imported literal strings
    const missingHooks = hooksNeeded.filter(h => !src.includes(h));
    
    if (missingHooks.length > 0) {
        if (src.includes('from \'react\'') || src.includes('from "react"')) {
            // Attempt to add to existing import
            missingHooks.forEach(hook => {
                const reactImportRegex = /import\s*{([^}]*)}\s*from\s*['"]react['"]/;
                const match = src.match(reactImportRegex);
                if (match && !match[1].includes(hook)) {
                    const newImport = `import { ${match[1].trim()}, ${hook} } from 'react'`;
                    src = src.replace(reactImportRegex, newImport);
                }
            });
        } else {
            // Add new import
            const newImport = `import { ${[...new Set(hooksNeeded)].join(', ')} } from 'react';\n`;
            if (useClientRegex.test(src)) {
                src = src.replace(useClientRegex, `$1\n${newImport}`);
            } else {
                src = newImport + src;
            }
        }
    }
  }

  if (hasBuilderSection) {
    shims.push(`
// Shim for BuilderSection
const BuilderSection = ({ tagName = 'div', className, innerContainer, fullWidth, style, children, id, sectionId, isVisible = true, removePaddingLeft, removePaddingRight }) => {
  if (!isVisible) return null;
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || normalizedSectionId;
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  
  const containerClasses = ["container-grid"];
  if (removePaddingLeft === true || removePaddingLeft === "true") containerClasses.push("pl-0");
  if (removePaddingRight === true || removePaddingRight === "true") containerClasses.push("pr-0");
  if (fullWidth === true || fullWidth === "true") containerClasses.push("container-full");
  const containerClass = containerClasses.join(" ");
  
  if (innerContainer) {
    return (
      <Tag id={finalId} className={className} style={style}>
        <div className={containerClass}>
          {children}
        </div>
      </Tag>
    );
  }

  return <Tag id={finalId} className={\`\${containerClass} \${className || ''}\`} style={style}>{children}</Tag>;
};`);
  }

  if (hasGetContainerClasses) {
    shims.push(`
// Shim for getContainerClasses
const getContainerClasses = ({ removePaddingLeft, removePaddingRight, fullWidth }) => {
  const classes = ["container-grid"];
  if (removePaddingLeft) classes.push("pl-0");
  if (removePaddingRight) classes.push("pr-0");
  if (fullWidth) classes.push("container-full");
  return classes.join(" ");
};`);
  }

  if (hasBuilderText) {
    shims.push(`
// Shim for BuilderText
const BuilderText = ({ tagName = 'p', content, className, style, children, id, sectionId, suffix, isVisible = true, tooltipIfTruncated }) => {
  if (!isVisible) return null;
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const effectiveSuffix = suffix || (className ? className.split(' ')[0] : tagName);
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + effectiveSuffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  const finalClassName = \`builder-text \${className || ''} \${!content && !children ? 'empty-builder-text' : ''}\`.trim();
  const title = tooltipIfTruncated ? content : undefined;

  return (
    <Tag
      id={finalId}
      className={finalClassName}
      style={style}
      dangerouslySetInnerHTML={content ? { __html: content } : undefined}
      title={title}
    >
      {children}
    </Tag>
  );
};`);
  }

  if (hasBuilderButton) {
    // HeroIcons optimization: Only import used icons or provide a lightweight shim
    // We'll replace the * as HeroIcons with a more targeted approach if possible,
    // but for now, we'll shift to dynamic individual imports if the build system supports it
    // or just use a simpler fallback.
    if (!src.includes("import { createElement } from 'react'")) {
       src = "import { createElement } from 'react';\n" + src;
    }

    shims.push(`
// Shim for BuilderButton
const BuilderButton = ({ label, href, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight, hideLabel, isVisible = true }) => {
  if (!isVisible) return null;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  // Resolve Icons (Lightweight Fallback)
  const renderIcon = (icon) => {
      if (!icon) return null;
      // In exported mode, icons are handled via props if they were passed as JSX, 
      // or we can add a simple lookup if needed.
      return icon;
  };

  const content = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: 'inherit' }}>
         {renderIcon(iconLeft) && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{renderIcon(iconLeft)}</span>}
         {!hideLabel && (
             <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {label || children}
             </div>
         )}
         {renderIcon(iconRight) && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{renderIcon(iconRight)}</span>}
      </div>
  );

  if (linkType === 'dialog' && targetDialogId) {
    return (
      <a
        id={finalId}
        href="#"
        className={className}
        style={{ ...style, cursor: 'pointer', textDecoration: 'none' }}
        rel="noopener"
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
    <a
      id={finalId}
      href={href || '#'} 
      className={className} 
      style={style}
      rel="noopener"
    >
        {content}
    </a>
  );
};`);
  }

  if (hasBuilderLink) {
    shims.push(`
// Shim for BuilderLink
const BuilderLink = ({ label, href, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight, justify, hideLabel, isVisible = true }) => {
  if (!isVisible) return null;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  
  const content = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify || 'center', width: '100%', height: '100%', gap: 'inherit' }}>
         {iconLeft && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconLeft}</span>}
         {!hideLabel && (
             <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: justify || 'center' }}>
                {label || children}
             </div>
         )}
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
        rel="noopener"
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
    <a
      id={finalId}
      href={href || '#'} 
      className={className} 
      style={style}
      rel="noopener"
    >
      {content}
    </a>
  );
};`);
  }

  if (hasBuilderImage) {
    shims.push(`
const BuilderImage = ({ src, mobileSrc, alt, className, style, mobileRatio, href, linkType, targetDialogId, id, sectionId, suffix, isPortrait, isVisible = true, priority, aspectRatio: propAspectRatio }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const wrapperRef = useRef(null);

  const isVideoFile = (url) => url && typeof url === 'string' && url.match(/\\.(mp4|webm|ogg|mov)$/i);
  const isYoutube = (url) => url && typeof url === 'string' && url.match(/^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$/);
  const isVimeo = (url) => url && typeof url === 'string' && url.match(/^(https?:\\/\\/)?(www\\.)?(vimeo\\.com)\\/.*$/);

  const getPaddingTop = (ratio, classes) => {
    if (ratio) {
      const parts = ratio.includes(':') ? ratio.split(':') : ratio.split('-');
      if (parts.length === 2) {
        const w = parseFloat(parts[0]);
        const h = parseFloat(parts[1]);
        if (w > 0) return (h / w * 100).toFixed(2) + '%';
      }
    }
    if (classes && typeof classes === 'string') {
      if (classes.includes('imagePlaceholder-1-1')) return '100%';
      if (classes.includes('imagePlaceholder-16-9')) return '56.25%';
      if (classes.includes('imagePlaceholder-4-3')) return '75%';
      if (classes.includes('imagePlaceholder-3-4')) return '133.33%';
      if (classes.includes('imagePlaceholder-5-4')) return '80%';
      if (classes.includes('imagePlaceholder-4-5')) return '125%';
      if (classes.includes('imagePlaceholder-21-9')) return '42.85%';
      if (classes.includes('imagePlaceholder-9-21')) return '233.33%';
    }
    return undefined;
  };

  useEffect(() => {
    if (priority || typeof window === 'undefined' || !window.IntersectionObserver) {
      setShouldLoad(true);
      return;
    }

    const isVideo = isVideoFile(src) || isYoutube(src) || isVimeo(src);
    const isPlaceholder = !src || src === "" || src === "https://space.lunaaar.site/assets-lunar/placeholder.svg" || (typeof src === 'string' && src.includes('assets-lunar/placeholder.svg'));

    if (!isVideo && !isPlaceholder) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [src, priority]);

  if (!isVisible) return null;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  const effectiveAlt = (!alt || alt === '#') && normalizedSectionId ? normalizedSectionId : (alt || '');
  let baseClassName = className || '';
  
  if (isPortrait === true || String(isPortrait) === 'true') {
    const portraitMap = {
        'imagePlaceholder-4-3': 'imagePlaceholder-3-4',
        'imagePlaceholder-16-9': 'imagePlaceholder-9-16',
        'imagePlaceholder-21-9': 'imagePlaceholder-9-21',
        'imagePlaceholder-5-4': 'imagePlaceholder-4-5'
    };
    Object.entries(portraitMap).forEach(([landscape, portrait]) => {
        baseClassName = baseClassName.replace(landscape, portrait);
    });
  }

  if (mobileRatio) {
     baseClassName += \` mobile-aspect-\${mobileRatio}\`;
  }
  
  const defaultStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const getYoutubeEmbedUrl = (url) => {
      if (!url) return '';
      const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const id = (match && match[2].length === 11) ? match[2] : null;
      return id ? \`https://www.youtube.com/embed/\${id}?autoplay=1&mute=1&loop=1&playlist=\${id}&controls=0\` : url;
  };

  const getVimeoEmbedUrl = (url) => {
      if (!url) return '';
      const regExp = /vimeo\\.com\\/(\\d+)/;
      const match = url.match(regExp);
      const id = match ? match[1] : null;
      return id ? \`https://player.vimeo.com/video/\${id}?autoplay=1&loop=1&muted=1&background=1\` : url;
  };

  const placeholderSrc = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
  const imageSrc = (src && src !== "") ? src : placeholderSrc;

  const isLink = href || (linkType === 'dialog' && targetDialogId);
  
  // MERGE PROP ASPECT RATIO
  const effectiveRatio = propAspectRatio || style?.aspectRatio;
  const paddingVal = getPaddingTop(effectiveRatio, baseClassName);

  const mediaStyle = { ...defaultStyle, ...style };
  const mediaClass = baseClassName;

  const finalMediaStyle = paddingVal ? {
    ...mediaStyle,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  } : mediaStyle;

  let mediaContent;
  if (isYoutube(src)) {
      mediaContent = shouldLoad ? (
          <iframe
              id={!isLink ? finalId : undefined}
              src={getYoutubeEmbedUrl(src)}
              className={mediaClass}
              style={{ ...finalMediaStyle, border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="YouTube video"
          />
      ) : <div className={mediaClass} style={{ ...finalMediaStyle, backgroundColor: '#eee' }} />;
  } else if (isVimeo(src)) {
      mediaContent = shouldLoad ? (
          <iframe
              id={!isLink ? finalId : undefined}
              src={getVimeoEmbedUrl(src)}
              className={mediaClass}
              style={{ ...finalMediaStyle, border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Vimeo video"
          />
      ) : <div className={mediaClass} style={{ ...finalMediaStyle, backgroundColor: '#eee' }} />;
  } else if (isVideoFile(src)) {
      mediaContent = (
          <video
              id={!isLink ? finalId : undefined}
              className={mediaClass}
              style={finalMediaStyle}
              autoPlay={shouldLoad}
              loop
              muted
              playsInline
              preload="none"
          >
              {shouldLoad && (
                <>
                  {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" />}
                  <source src={src} />
                </>
              )}
              Your browser does not support the video tag.
          </video>
      );
  } else {
      const TRANSPARENT_PIXEL = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E";
      const isPlaceholder = imageSrc === "https://space.lunaaar.site/assets-lunar/placeholder.svg";
      const isEmpty = !imageSrc;
      mediaContent = (shouldLoad || priority || isPlaceholder || isEmpty) ? (
        <img 
          id={!isLink ? finalId : undefined}
          src={imageSrc || "https://space.lunaaar.site/assets-lunar/placeholder.svg"} 
          alt={effectiveAlt} 
          className={mediaClass} 
          style={finalMediaStyle} 
          loading={(priority || isPlaceholder || isEmpty) ? "eager" : "lazy"}
          fetchPriority={(priority || isPlaceholder || isEmpty) ? "high" : undefined}
          decoding="async"
        />
      ) : (
        <img
          id={!isLink ? finalId : undefined}
          src={TRANSPARENT_PIXEL}
          alt=""
          className={mediaClass}
          style={{ ...finalMediaStyle, backgroundColor: '#eee' }}
        />
      );
  }

  const content = (mobileSrc && !isVideoFile(src) && !isYoutube(src) && !isVimeo(src)) ? (
     <picture style={{ display: 'contents' }}>{mediaContent}</picture>
  ) : mediaContent;

  const wrapperStyle = { 
    ...style, 
    display: 'block', 
    width: '100%', 
    textDecoration: 'none', 
    position: 'relative',
    paddingTop: paddingVal,
    overflow: 'hidden'
  };

  if (isLink) {
    
    if (isDialog) {
        return (
            <a
                ref={wrapperRef}
                id={finalId}
                href="#"
                className={baseClassName}
                style={{ ...wrapperStyle, cursor: 'pointer' }}
                rel="noopener"
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
      <a
         ref={wrapperRef}
         id={finalId}
         href={href || '#'} 
         className={baseClassName} 
         style={wrapperStyle}
         rel="noopener"
      >
        {content}
      </a>
    );
  }

  return <div ref={wrapperRef} className={baseClassName} style={wrapperStyle}>{content}</div>;
};`);
  }

  if (hasBuilderElement) {
    shims.push(`
// Shim for BuilderElement
const BuilderElement = ({ tagName = 'div', className, style, children, id, sectionId, elementProps, isVisible = true, ref }) => {
  if (!isVisible) return null;
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const suffix = elementProps || 'element';
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  return <Tag ref={ref} id={finalId} className={className} style={style}>{children}</Tag>;
};`);
  }

  if (hasBuilderInput) {
    shims.push(`
// Shim for BuilderInput
const BuilderInput = ({ label, type = 'text', name, value, onChange, placeholder, className = 'form-input', labelClassName = 'form-label caption-regular', containerClassName = 'form-group', isVisible = true, sectionId, id, onIdChange, suffix, required = false, onVisibilityChange, onLabelChange, onRequiredChange, children, ...props }) => {
  if (!isVisible) return null;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const effectiveSuffix = suffix || name;
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + effectiveSuffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  return (
    <div className={containerClassName}>
      {label && <label className={labelClassName} htmlFor={finalId}>{label}</label>}
      {children ? (
        <div className="form-input-prefix-wrapper">
          {children}
          <input id={finalId} name={name} className={className} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} {...props} />
        </div>
      ) : (
        <input id={finalId} name={name} className={className} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} {...props} />
      )}
    </div>
  );
};`);
  }

  if (hasBuilderSelect) {
    shims.push(`
// Shim for BuilderSelect
const BuilderSelect = ({ label, labelContent, onLabelChange, type = 'select', name, value, onChange, className, containerClassName = 'form-group', isVisible = true, sectionId, id, onIdChange, suffix, required = false, onVisibilityChange, onRequiredChange, options = [], ...props }) => {
  if (!isVisible) return null;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const effectiveSuffix = suffix || name;
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + effectiveSuffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  if (type === 'select') {
    return (
      <div className={containerClassName}>
        {label && <label className="form-label caption-regular" htmlFor={finalId}>{label}</label>}
        <select id={finalId} name={name} className={className || 'form-select'} value={value} onChange={onChange} required={required} {...props}>
          {options.map(opt => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <label className="form-checkbox-group" htmlFor={finalId}>
        <input type={type} id={finalId} name={name} className={className || (type === 'checkbox' ? 'form-checkbox' : 'form-radio')} checked={type === 'checkbox' || type === 'radio' ? value : undefined} onChange={onChange} required={required} {...props} />
        <span className="form-checkbox-label body-regular" dangerouslySetInnerHTML={{ __html: labelContent }} />
      </label>
    </div>
  );
};`);
  }

  if (hasBuilderControlsPopover) {
    shims.push(`
// Shim for BuilderControlsPopover
const BuilderControlsPopover = () => null;`);
  }

  if (hasUseIdSync) {
    shims.push(`
// Shim for useIdSync
const useIdSync = ({ id, sectionId, suffix }) => {
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const generatedId = normalizedSectionId ? (suffix ? \`\${normalizedSectionId}-\${suffix}\` : \`\${normalizedSectionId}-element\`) : undefined;
  const elementId = id || generatedId;
  return { elementId: elementId ? elementId.replace(/-+/g, '-') : undefined };
};`);
  }

  if (hasUseActiveOverlay) {
    shims.push(`
// Shim for useActiveOverlayPosition
const useActiveOverlayPosition = (overlayRect) => {
  return useMemo(() => {
    if (!overlayRect) return {};
    const cx = overlayRect.left + (overlayRect.width / 2);
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    let leftPos, rightPos, transform;
    if (cx < 88) { leftPos = 8; rightPos = 'auto'; transform = 'none'; }
    else if (cx > windowWidth - 88) { leftPos = 'auto'; rightPos = 8; transform = 'none'; }
    else { leftPos = cx; rightPos = 'auto'; transform = 'translateX(-50%)'; }
    return {
      position: 'fixed',
      top: Math.max(overlayRect.top - 24, 42),
      left: leftPos,
      right: rightPos,
      zIndex: 10002,
      transform: transform
    };
  }, [overlayRect]);
};`);
  }

  if (shims.length > 0) {
    // Shared openDialog helper
    const openDialogHelper = `
const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
    
    // Runtime Fallback: If specific ID fails (e.g. timestamp from old data), try default dialogs
    if (id && id !== 'dialog-item-list' && id !== 'dialog-accordion' && id !== 'dialog-form') {
        window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id: 'dialog-item-list' } }));
        window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id: 'dialog-form' } }));
        window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id: 'dialog-accordion' } }));
    }
  }
};

const showToast = (message, type = 'success') => {
  if (typeof window !== 'undefined') {
    // In exported files, we can use a simple alert as a fallback
    // or the user can implement their own toast listener
    alert(message);
  }
};`;
    shims.unshift(openDialogHelper);

    // Append shims after the last import to keep top-level scope
    const lastImportIdx = src.lastIndexOf('import ');
    if (lastImportIdx !== -1) {
      const endOfLineIdx = src.indexOf('\n', lastImportIdx);
      const insertionPoint = endOfLineIdx + 1;
      src = src.slice(0, insertionPoint) + '\n' + shims.join('\n') + '\n' + src.slice(insertionPoint);
    } else {
      src = shims.join('\n') + '\n' + src;
    }
  }

  // Safety Check: If export default was replaced by return, restoration
  src = restoreExportPattern(src, componentName);

  return src;
}

/**
 * restoreExportPattern
 * 
 * Safety check and restoration for mangled 'export default' patterns.
 * Build tools in some environments (like Cloudflare Edge) aggressively transform
 * 'export default function' into 'return function' during static analysis.
 * 
 * This function uses an obfuscated approach to identify and reverse this transformation.
 */
export function restoreExportPattern(src, componentName) {
  if (typeof src !== 'string') return src;

  // OBFUSCATION: Avoid static analysis replacing "export default function" with "return function"
  // The build tool seems to aggressively transform this pattern even in strings.
  const KW_EXPORT = 'ex' + 'port';
  const KW_DEFAULT = 'de' + 'fault';
  const KW_FUNCTION = 'fun' + 'ction';
  const TARGET_PHRASE = `${KW_EXPORT} ${KW_DEFAULT} ${KW_FUNCTION}`; // "export default function"

  // 1. Targeted Fix using Component Name (Hybrid Regex + Manual)
  if (componentName) {
    // Regex to find the function definition - handles "async", tabs, newlines, multiple spaces
    const funcRegex = new RegExp(`(?:async\\s+)?${KW_FUNCTION}\\s+${componentName}`, 'g');
    let match;
    let matches = [];

    // Collect all matches first
    while ((match = funcRegex.exec(src)) !== null) {
      matches.push({ index: match.index, length: match[0].length });
    }

    // Process in reverse order to avoid index shifts
    for (let i = matches.length - 1; i >= 0; i--) {
      const { index: idx } = matches[i];

      // Scan backwards from idx
      let ptr = idx - 1;

      // Skip whitespace/newlines
      while (ptr >= 0 && /\s/.test(src[ptr])) {
        ptr--;
      }

      // Check for "return" (6 chars: r-e-t-u-r-n)
      if (ptr >= 5 && src.substring(ptr - 5, ptr + 1) === 'return') {
        console.log(`[export-component] Hybrid Fix: Replaced 'return' for ${componentName} at ${idx}`);

        const beforeReturn = src.substring(0, ptr - 5);
        const afterReturn = src.substring(idx);

        // Replacement using constructed string
        src = beforeReturn + `${KW_EXPORT} ${KW_DEFAULT} ` + afterReturn;
        continue;
      }

      // Check if already correct
      const isExportDefault = (ptr >= 13 && src.substring(ptr - 13, ptr + 1) === `${KW_EXPORT} ${KW_DEFAULT}`);
      if (!isExportDefault) {
        const isExport = (ptr >= 6 && src.substring(ptr - 6, ptr + 1) === KW_EXPORT);

        if (!isExport) {
          console.log(`[export-component] Hybrid Fix: Injected 'export default' for ${componentName}`);
          const before = src.substring(0, idx);
          const after = src.substring(idx);
          src = before + `${KW_EXPORT} ${KW_DEFAULT} ` + after;
        }
      }
    }
  }

  // 2. Fallback: Aggressive Global Replace
  if (!src.includes(TARGET_PHRASE)) {
    src = src.replace(new RegExp(`return\\s+(async\\s+)?${KW_FUNCTION}`, 'g'), `${KW_EXPORT} ${KW_DEFAULT} $1${KW_FUNCTION}`);
  }

  return src;
}

export function getCacheHeaders(isBinary) {
  return {
    'Cache-Control': isBinary ? 'public, max-age=31536000, immutable' : 'no-store'
  };
}
