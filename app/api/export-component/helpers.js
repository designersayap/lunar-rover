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

  // Remove Builder imports (Absolute & Relative)
  // Matches: import ... from "@/app/page-builder/..." OR ".../page-builder/..."
  src = src.replace(/import\s+.*?\s+from\s+['"](?:@\/app\/|.*\/)page-builder\/utils\/(?:builder\/|toast).*?['"];?\n?/g, '');

  // Remove generic imports that are not needed (keep CSS imports)
  // src = src.replace(/import\s+{[^}]*}\s+from\s+['"][^'\"]+['"];?\n?/g, '');

  // Remove onUpdate props and update handler calls
  src = src.replace(/onUpdate\s*=\s*\{[^}]+\}/g, '');
  src = src.replace(/update[A-Za-z0-9_]*\([^)]*\)/g, 'undefined');

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
const BuilderSection = ({ tagName = 'div', className, innerContainer, fullWidth, style, children, id, sectionId, isVisible = true }) => {
  if (!isVisible) return null;
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
const BuilderText = ({ tagName = 'p', content, className, style, children, id, sectionId, suffix, isVisible = true }) => {
  if (!isVisible) return null;
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
const BuilderButton = ({ label, href, className, style, children, linkType, targetDialogId, id, sectionId, suffix, iconLeft, iconRight, hideLabel, isVisible = true }) => {
  if (!isVisible) return null;
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
const BuilderImage = ({ src, mobileSrc, alt, className, style, mobileRatio, href, linkType, targetDialogId, id, sectionId, suffix, isPortrait, isVisible = true }) => {
  if (!isVisible) return null;
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
  const placeholderSrc = "https://space.lunaaar.site/assets-lunar/placeholder.svg";
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
            <a
                id={finalId}
                href="#"
                className={finalClassName}
                style={{ ...style, display: 'block', width: '100%', height: '100%', cursor: 'pointer', textDecoration: 'none' }}
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
         className={finalClassName} 
         style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
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
const BuilderElement = ({ tagName = 'div', className, style, children, id, sectionId, elementProps, isVisible = true }) => {
  if (!isVisible) return null;
  const Tag = tagName;
  const normalizedSectionId = (sectionId && typeof sectionId === 'string') ? sectionId.replace(/-+$/, '') : '';
  const suffix = elementProps || 'element';
  let finalId = id || (normalizedSectionId ? normalizedSectionId + '-' + suffix : undefined);
  finalId = finalId ? finalId.replace(/-+/g, '-') : undefined;
  return <Tag id={finalId} className={className} style={style}>{children}</Tag>;
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

    // Process in reverse order
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
