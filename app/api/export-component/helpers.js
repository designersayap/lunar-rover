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
export function cleanBuilderContent(src) {
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

  // Remove Builder imports (Absolute & Relative)
  // Matches: import ... from "@/app/page-builder/..." OR ".../page-builder/..."
  src = src.replace(/import\s+.*?\s+from\s+['"](?:@\/app\/|.*\/)page-builder\/utils\/builder\/(?!builder-controls).*?['"];?\n?/g, '');

  // Remove generic imports that are not needed (keep CSS imports)
  // src = src.replace(/import\s+{[^}]*}\s+from\s+['"][^'\"]+['"];?\n?/g, '');

  // Remove onUpdate props and update handler calls
  src = src.replace(/onUpdate=\{[^}]+\}/g, '');
  src = src.replace(/update\([^)]*\)/g, 'undefined');

  // Remove empty import lines left behind
  src = src.replace(/^\s*\n/gm, '\n');

  let shims = [];

  // Ensure Link is imported if not present but needed
  if ((hasBuilderLink || hasBuilderButton || hasBuilderImage) && !src.includes("from 'next/link'") && !src.includes('from "next/link"')) {
    const useClientRegex = /^(['"]use client['"];?)\s*/;
    if (useClientRegex.test(src)) {
      src = src.replace(useClientRegex, '$1\nimport Link from \'next/link\';\n');
    } else {
      src = "import Link from 'next/link';\n" + src;
    }
  }

  if (hasBuilderSection) {
    shims.push(`
// Shim for BuilderSection
const BuilderSection = ({ tagName = 'div', className, innerContainer, fullWidth, style, children, id, sectionId }) => {
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || normalizedSectionId;
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  const containerClass = \`container-grid \${fullWidth ? 'container-full' : ''}\`;
  
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

  if (hasBuilderText) {
    shims.push(`
// Shim for BuilderText
const BuilderText = ({ tagName = 'p', content, className, style, children, id, sectionId, suffix }) => {
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const effectiveSuffix = suffix || (className ? className.split(' ')[0] : tagName);
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + effectiveSuffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  // Append builder-text class
  const finalClassName = \`builder-text \${className || ''}\`.trim();

  if (content) {
    return <Tag id={finalId} className={finalClassName} style={style} dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <Tag id={finalId} className={finalClassName} style={style}>{children}</Tag>;
};`);
  }

  if (hasBuilderButton) {
    if (!src.includes('import * as HeroIcons')) {
      const useClientRegex = /^(['"]use client['"];?)\s*/;
      if (useClientRegex.test(src)) {
        src = src.replace(useClientRegex, '$1\nimport * as HeroIcons from \'@heroicons/react/24/solid\';\n');
      } else {
        // Try to find first import
        const firstImport = src.indexOf('import ');
        if (firstImport !== -1) {
          src = src.slice(0, firstImport) + "import * as HeroIcons from '@heroicons/react/24/solid';\n" + src.slice(firstImport);
        } else {
          src = "import * as HeroIcons from '@heroicons/react/24/solid';\n" + src;
        }
      }
    }

    shims.push(`
// Shim for BuilderButton
const BuilderButton = ({ label, href, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight }) => {
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  let finalId = id || (normalizedSectionId && suffix ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;

  // Resolve Icons
  const renderIcon = (icon) => {
      if (!icon) return null;
      if (typeof icon === 'string' && HeroIcons[icon]) {
          const IconComponent = HeroIcons[icon];
          return <IconComponent className="w-5 h-5" />;
      }
      return icon;
  };

  const content = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: 'inherit' }}>
         {renderIcon(iconLeft) && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{renderIcon(iconLeft)}</span>}
         <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {label || children}
         </div>
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
    >
        {content}
    </a>
  );
};`);
  }

  if (hasBuilderLink) {
    shims.push(`
// Shim for BuilderLink
const BuilderLink = ({ label, href, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight, justify }) => {
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
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
    <a
      id={finalId}
      href={href || '#'} 
      className={className} 
      style={style}
    >
      {content}
    </a>
  );
};`);
  }

  if (hasBuilderImage) {
    shims.push(`
const BuilderImage = ({ src, mobileSrc, alt, className, style, mobileRatio, href, linkType, targetDialogId, id, sectionId, suffix, isPortrait }) => {
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
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
     finalClassName += \` mobile-aspect-\${mobileRatio}\`;
  }
  
  const defaultStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const isVideoFile = (url) => url && typeof url === 'string' && url.match(/\\.(mp4|webm|ogg|mov)$/i);
  const isYoutube = (url) => url && typeof url === 'string' && url.match(/^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$/);
  const isVimeo = (url) => url && typeof url === 'string' && url.match(/^(https?:\\/\\/)?(www\\.)?(vimeo\\.com)\\/.*$/);

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

  // Safe Image handling
  const placeholderSrc = "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg";
  const imageSrc = (src && src !== "") ? src : placeholderSrc;

  let mediaContent;
  if (isYoutube(src)) {
      mediaContent = (
          <iframe
              id={finalId}
              src={getYoutubeEmbedUrl(src)}
              className={finalClassName}
              style={{ ...defaultStyle, ...style, height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="YouTube video"
          />
      );
  } else if (isVimeo(src)) {
      mediaContent = (
          <iframe
              id={finalId}
              src={getVimeoEmbedUrl(src)}
              className={finalClassName}
              style={{ ...defaultStyle, ...style, height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video"
          />
      );
  } else if (isVideoFile(src)) {
      mediaContent = (
          <video
              id={finalId}
              className={finalClassName}
              style={{ ...defaultStyle, ...style, height: '100%' }}
              autoPlay
              loop
              muted
              playsInline
          >
              {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" />}
              <source src={src} />
              Your browser does not support the video tag.
          </video>
      );
  } else {
      mediaContent = (
        <>
          {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
          <img 
            id={finalId}
            src={imageSrc} 
            alt={effectiveAlt} 
            className={finalClassName} 
            style={{ ...defaultStyle, ...style }} 
          />
        </>
      );
  }

  const content = (mobileSrc && !isVideoFile(src) && !isYoutube(src) && !isVimeo(src)) ? (
     <picture style={{ display: 'contents' }}>{mediaContent}</picture>
  ) : mediaContent;

  if (href || (linkType === 'dialog' && targetDialogId)) {
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
                {content}
            </button>
        );
    }

    return (
      <a
         href={href || '#'} 
         className={finalClassName}
         style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {content}
      </a>
    );
  }

  return content;
};`);
  }

  if (hasBuilderElement) {
    shims.push(`
// Shim for BuilderElement
const BuilderElement = ({ tagName = 'div', className, style, children, id, sectionId, elementProps }) => {
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const suffix = elementProps || 'element';
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  return <Tag id={finalId} className={className} style={style}>{children}</Tag>;
};`);
  }

  if (shims.length > 0) {
    // Shared openDialog helper
    const openDialogHelper = `
const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
    
    // Runtime Fallback: If specific ID fails (e.g. timestamp from old data), try default dialogs
    if (id && id !== 'dialog-item-list' && id !== 'dialog-accordion') {
        window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id: 'dialog-item-list' } }));
    }
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
  // We use a global Replace to catch any instance of "return function ComponentName"
  // This ignores indentation and line start anchors to be more robust
  src = src.replace(/return\s+function\s+([A-Z])/g, 'export default function $1');

  return src;
}

export function getCacheHeaders(isBinary) {
  return {
    'Cache-Control': isBinary ? 'public, max-age=31536000, immutable' : 'no-store'
  };
}
