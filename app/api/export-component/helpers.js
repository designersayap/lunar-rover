// Helper utilities for export-component route
import path from 'path';
import { promises as fs } from 'fs';


export const ALLOWED_DIRS = [
  path.resolve(process.cwd(), 'app/template-components'),
  path.resolve(process.cwd(), 'app/foundation'),
  path.resolve(process.cwd(), 'app/page-builder-components'),
  path.resolve(process.cwd(), 'public')
];

export const BINARY_SET = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico',
  '.mp4', '.webm', '.ogv', '.mp3', '.wav'
]);

export function isBinary(ext) {
  return BINARY_SET.has(ext);
}

/**
 * Resolve a requested path safely.
 * Handles leading '/' (maps to public) and normalises to an absolute path.
 * Returns { absolutePath, finalPath, isExternal }.
 */
export function resolvePath(requestedPath) {
  let finalPath = requestedPath;
  const isExternal = finalPath.startsWith('http://') || finalPath.startsWith('https://');
  if (!isExternal && finalPath.startsWith('/') && !finalPath.startsWith('//')) {
    finalPath = path.join('public', finalPath);
  }
  const absolutePath = path.resolve(process.cwd(), finalPath);
  return { absolutePath, finalPath, isExternal };
}

/** Simple logger – can be swapped for a proper logger later */
export function log(...args) {
  console.log('[export-component]', ...args);
}

/** Clean Builder‑specific imports and props from component source */
export function cleanBuilderContent(src) {
  const hasShim = (name) => new RegExp(`const\\s+${name}\\s*=`).test(src);

  const hasBuilderLink = src.includes('BuilderLink') && !hasShim('BuilderLink');
  const hasBuilderImage = src.includes('BuilderImage') && !hasShim('BuilderImage');
  const hasBuilderSection = src.includes('BuilderSection') && !hasShim('BuilderSection');
  const hasBuilderText = src.includes('BuilderText') && !hasShim('BuilderText');
  const hasBuilderButton = src.includes('BuilderButton') && !hasShim('BuilderButton');
  const hasBuilderElement = src.includes('BuilderElement') && !hasShim('BuilderElement');

  // Remove Builder imports
  src = src.replace(/import\s+.*?\s+from\s+['"]@\/app\/page-builder-components\/utils\/builder\/.*?['"];?\n?/g, '');

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
const BuilderSection = ({ tagName = 'div', className, innerContainer, fullWidth, style, children, id }) => {
  const Tag = tagName;
  const containerClass = \`container-grid \${fullWidth ? 'container-full' : ''}\`;
  
  if (innerContainer) {
    return (
      <Tag id={id} className={className} style={style}>
        <div className={containerClass}>
          {children}
        </div>
      </Tag>
    );
  }

  return <Tag id={id} className={\`\${containerClass} \${className || ''}\`} style={style}>{children}</Tag>;
};`);
  }

  if (hasBuilderText) {
    shims.push(`
// Shim for BuilderText
const BuilderText = ({ tagName = 'p', content, className, style, children }) => {
  const Tag = tagName;
  return <Tag className={className} style={style}>{content || children}</Tag>;
};`);
  }

  if (hasBuilderButton) {
    shims.push(`
// Shim for BuilderButton
const BuilderButton = ({ label, href, openInNewTab, className, style, children, linkType, targetDialogId, id, sectionId, suffix }) => {
  const finalId = id || (sectionId && suffix ? sectionId + '-' + suffix : undefined);

  if (linkType === 'dialog' && targetDialogId) {
    return (
      <button
        id={finalId}
        className={className}
        style={style}
        onClick={(e) => {
             e.preventDefault();
             openDialog(targetDialogId);
        }}
      >
        {label || children}
      </button>
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
        {label || children}
    </Link>
  );
};`);
  }

  if (hasBuilderLink) {
    shims.push(`
// Shim for BuilderLink
const BuilderLink = ({ label, href, openInNewTab, className, style, children, linkType, targetDialogId, id, sectionId, suffix }) => {
  const finalId = id || (sectionId && suffix ? sectionId + '-' + suffix : undefined);
  
  if (linkType === 'dialog' && targetDialogId) {
    return (
      <button
        id={finalId}
        className={className}
        style={{ ...style, cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit' }}
        onClick={(e) => {
            e.preventDefault();
            openDialog(targetDialogId);
        }}
      >
        {label || children}
      </button>
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
      {label || children}
    </Link>
  );
};`);
  }

  if (hasBuilderImage) {
    shims.push(`
const BuilderImage = ({ src, alt, className, style, mobileRatio, href, linkType, openInNewTab, targetDialogId, id, sectionId, suffix }) => {
  const finalId = id || (sectionId && suffix ? sectionId + '-' + suffix : undefined);
  let finalClassName = className || '';
  if (mobileRatio) {
     finalClassName += \` mobile-aspect-\${mobileRatio}\`;
  }
  
  const defaultStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const imgElement = (
    <img 
      id={finalId}
      src={src} 
      alt={alt || ''} 
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
                <img 
                    id={finalId}
                    src={src} 
                    alt={alt || ''} 
                    style={{ ...defaultStyle, ...style, width: '100%', height: '100%' }} 
                />
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
        <img 
            id={finalId}
            src={src} 
            alt={alt || ''} 
            style={{ ...defaultStyle, ...style }} 
        />
      </Link>
    );
  }

  return imgElement;
};`);
  }

  if (hasBuilderElement) {
    shims.push(`
// Shim for BuilderElement
const BuilderElement = ({ tagName = 'div', className, style, children, id }) => {
  const Tag = tagName;
  return <Tag id={id} className={className} style={style}>{children}</Tag>;
};`);
  }

  if (shims.length > 0) {
    // Shared openDialog helper
    const openDialogHelper = `
const openDialog = (id) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lunar:open-dialog', { detail: { id } }));
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

  return src;
}

export function getCacheHeaders(isBinary) {
  return {
    'Cache-Control': isBinary ? 'public, max-age=31536000, immutable' : 'no-store'
  };
}
