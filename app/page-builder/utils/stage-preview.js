
import { COMPONENT_PATHS } from './component-paths';
import { componentDefaults } from '@/app/templates/content/data';

// Helper to extract component name from path
const getComponentName = (filePath) => {
    if (!filePath) return null;
    const filename = filePath.split('/').pop();
    return filename.replace('.js', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
};

export const generateStagingPageContent = (selectedComponents, folderName, activeThemePath) => {
    let pageContent = `"use client";\n\n`;

    // Import staging data overrides
    pageContent += `import { data as stagingData } from "./data";\n`;

    // Collect Imports (Recursive)
    const imports = new Map();

    const collectImports = (components) => {
        if (!components || !Array.isArray(components)) return;

        components.forEach(item => {
            const filePath = COMPONENT_PATHS[item.id];
            if (filePath) {
                const importPath = filePath.replace('.js', '').replace('app/', '@/app/');
                const componentName = getComponentName(filePath);
                imports.set(componentName, importPath);
            }

            // Check for nested components property (e.g. ScrollGroup)
            // Note: We check 'components' prop specifically as that's what ScrollGroup uses
            if (item.components && Array.isArray(item.components)) {
                collectImports(item.components);
            }
            if (item.props && item.props.components && Array.isArray(item.props.components)) {
                collectImports(item.props.components);
            }
        });
    };

    collectImports(selectedComponents);

    // Write Imports
    imports.forEach((path, name) => {
        pageContent += `import ${name} from "${path}";\n`;
    });
    pageContent += `import StickyManager from "@/app/page-builder/utils/sticky-manager";\n`;
    pageContent += `import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";\n`;
    pageContent += `import { useState, useEffect } from "react";\n`;

    pageContent += `\nexport default function StagingPage() {\n`;

    // Inject Theme Effect
    if (activeThemePath) {
        pageContent += `
    useEffect(() => {
        const themeLink = document.getElementById("theme-stylesheet");
        if (themeLink) {
            themeLink.href = "${activeThemePath}";
        }
    }, []);
    `;
    }

    // Staging State for Context
    pageContent += `
    const [activeElementId, setActiveElementId] = useState(null);
    const [activePopoverId, setActivePopoverId] = useState(null);
    const [localData, setLocalData] = useState(stagingData);
    `;

    // Inject handleUpdate
    pageContent += `
    const handleUpdate = async (uniqueId, newData) => {
        setLocalData(prev => ({
            ...prev,
            [uniqueId]: { ...(prev[uniqueId] || {}), ...newData }
        }));
        
        try {
            await fetch('/api/save-staging-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folderName: "${folderName}",
                    componentId: uniqueId,
                    updates: newData
                })
            });
            console.log("Saved update for", uniqueId);
        } catch (e) {
            console.error("Failed to save update", e);
        }
    };

`;

    const stickyIndices = [];
    selectedComponents.forEach((item, index) => {

        const compDefaults = componentDefaults[item.id] || componentDefaults[item.componentName] || {};

        // Merge defaults into item if missing
        Object.keys(compDefaults).forEach(key => {
            if (item[key] === undefined && (item.props && item.props[key] === undefined)) {
                item[key] = compDefaults[key];
            }
        });

        // Determine stickiness
        const isSticky = item.props?.isSticky ?? compDefaults.isSticky ?? false;

        // Store stickiness for sorting
        item._isSticky = isSticky;

        if (isSticky) {
            stickyIndices.push(index);
        }
    });

    // Sort components: Sticky items first!
    // This mimics the behavior in the Page Builder Canvas
    selectedComponents.sort((a, b) => {
        if (a._isSticky && !b._isSticky) return -1;
        if (!a._isSticky && b._isSticky) return 1;
        return 0; // Maintain relative order
    });

    // Re-calculate indices after sort (since order changed)
    const sortedStickyIndices = [];
    const stackedIndices = [];

    selectedComponents.forEach((item, index) => {
        const isStacked = item.props?.scrollEffect === 'stacked';
        // Item is sticky if it was originally sticky (via prop) OR if it is stacked
        const isEffectiveSticky = item._isSticky || isStacked;

        if (isEffectiveSticky) {
            sortedStickyIndices.push(index);
        }
        if (isStacked) {
            stackedIndices.push(index);
        }
    });

    // Fix: We need to preserve 'componentName' in the serialised data so that if components uses it (rare), it's there.
    // However, the builder mostly uses the component prop.
    // For the context value, plain JSON is fine.
    const stagingComponents = JSON.stringify(selectedComponents.map(c => ({
        ...c,
        id: c.id,
        uniqueId: c.uniqueId,
        sectionId: c.sectionId,
        componentName: c.componentName
    })));

    pageContent += `
    const stagingComponents = ${stagingComponents};

    const contextValue = {
        activeElementId,
        setActiveElementId,
        activePopoverId,
        setActivePopoverId,
        selectedComponents: stagingComponents,
        updateComponent: handleUpdate,
        isStaging: true,
        localData
    };
    `;

    pageContent += `  return (\n`;
    pageContent += `    <main style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'clip' }}>\n`;
    pageContent += `      <BuilderSelectionContext.Provider value={contextValue}>\n`;
    pageContent += `      <div id="canvas-background-root" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto', overflow: 'hidden' }} />\n`;
    pageContent += `      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>\n`;
    pageContent += `      <StickyManager stickyIndices={[${sortedStickyIndices.join(',')}]} stackedIndices={[${stackedIndices.join(',')}]}>\n`;


    // 2. Render Components
    selectedComponents.forEach(item => {
        const filePath = COMPONENT_PATHS[item.id];
        if (!filePath) return;

        const componentName = getComponentName(filePath);

        // Prepare Props
        const props = { ...item, ...(item.props || {}) };

        delete props.id;
        delete props.name;
        delete props.componentId;
        delete props.category;
        delete props.isSticky;
        delete props.uniqueId;
        delete props.config;
        delete props.isOpen;
        delete props.sectionId;

        const finalSectionId = item.sectionId || item.uniqueId;
        if (finalSectionId) {
            props.sectionId = finalSectionId;
        }

        // Cleanup internal props that shouldn't be passed
        delete props.props;
        delete props.component;

        const propsString = Object.entries(props).map(([key, value]) => {
            if (value === undefined || value === null) return '';

            // SPECIAL HANDLING: If the prop is 'components' (used by ScrollGroup), we must serialize it carefully
            if (key === 'components' && Array.isArray(value)) {
                // We need to transform the array of component objects into code that references the Component classes
                const serializedComponents = value.map(childComp => {
                    const childFilePath = COMPONENT_PATHS[childComp.id];
                    const childComponentName = getComponentName(childFilePath);

                    let childProps = { ...childComp };

                    // Clean up metadata
                    delete childProps.id;
                    delete childProps.name;
                    delete childProps.component;
                    // Do NOT delete childProps.props

                    // Re-attach uniqueId and sectionId as they are needed by ScrollGroup to render children
                    childProps.uniqueId = childComp.uniqueId;
                    childProps.sectionId = childComp.sectionId || childComp.uniqueId;

                    // Serialize the props object
                    const propsJson = JSON.stringify(childProps);

                    // Inject the component reference
                    // Remove the last brace '}' and add component reference
                    return propsJson.slice(0, -1) + `, component: ${childComponentName || 'null'}}`;
                }).join(', ');

                return `components={[${serializedComponents}]}`;
            }

            if (typeof value === 'string') {
                return `${key}={${JSON.stringify(value)}}`;
            } else if (typeof value === 'boolean') {
                return value ? `${key}` : `${key}={false}`;
            } else {
                return `${key}={${JSON.stringify(value)}}`;
            }
        }).filter(Boolean).join(' ');

        // Add override spread and handler
        const overrideString = `{...localData['${finalSectionId}']}`;
        const onUpdateString = `onUpdate={(newData) => handleUpdate('${finalSectionId}', newData)}`;

        const componentJSX = `<${componentName} ${propsString} ${overrideString} ${onUpdateString} updateComponent={handleUpdate} />`;

        pageContent += `      ${componentJSX}\n`;
    });

    pageContent += `      </StickyManager>\n`;
    pageContent += `      </div>\n`;
    pageContent += `      </BuilderSelectionContext.Provider>\n`;
    pageContent += `    </main>\n`;
    pageContent += `  );\n`;
    pageContent += `}\n`;

    return pageContent;
};

export const generateStagingLayoutContent = (analytics = {}) => {
    const title = analytics.websiteTitle || "Lunar Staging";
    const description = analytics.metaDescription || "Staging Preview";
    const keywords = analytics.metaKeywords || "";
    const favicon = analytics.favicon || "";
    const canonicalUrl = analytics.canonicalUrl || "";
    const ogTitle = analytics.ogTitle || "";
    const ogDescription = analytics.ogDescription || "";
    const ogImage = analytics.ogImage || "";

    // Scripts
    const gtmId = analytics.googleTagManagerId;
    const clarityId = analytics.microsoftClarityId;
    const tiktokId = analytics.tikTokPixel;
    const metaPixelId = analytics.metaPixel;

    const hasScripts = gtmId || clarityId || tiktokId || metaPixelId;

    return `${hasScripts ? 'import Script from "next/script";' : ''}

export const metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
  ${keywords ? `keywords: "${keywords.replace(/"/g, '\\"')}",` : ''}
  ${favicon ? `icons: { icon: "${favicon.replace(/"/g, '\\"')}" },` : ''}
  ${canonicalUrl ? `alternates: { canonical: "${canonicalUrl.replace(/"/g, '\\"')}" },` : ''}
  openGraph: {
    ${ogTitle ? `title: "${ogTitle.replace(/"/g, '\\"')}",` : ''}
    ${ogDescription ? `description: "${ogDescription.replace(/"/g, '\\"')}",` : ''}
    ${ogImage ? `images: [{ url: "${ogImage.replace(/"/g, '\\"')}" }],` : ''}
  },
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function StagingLayout({ children }) {
  return (
    <>
      {children}
      
      {/* Analytics Scripts */}
      ${gtmId ? `
      <Script id="gtm" strategy="afterInteractive">
        {\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');\`}
      </Script>` : ''}

      ${clarityId ? `
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {\`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");\`}
      </Script>` : ''}

      ${tiktokId ? `
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {\`!function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t.align=2,ttq.push([t].concat(Array.prototype.slice.call(e,0)))};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.setAndDefer(t,e),n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${tiktokId}');
          ttq.page();
        }(window, document, 'ttq');\`}
      </Script>` : ''}

      ${metaPixelId ? `
      <Script id="meta-pixel" strategy="afterInteractive">
        {\`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');\`}
      </Script>` : ''}
    </>
  );
}
`;
};

export const extractBuilderData = (components) => {
    const data = {};

    const traverse = (list) => {
        if (!list || !Array.isArray(list)) return;

        list.forEach(item => {
            const finalId = item.sectionId || item.uniqueId;
            if (finalId) {
                // Extract props: Use item props AND item top-level keys that act as props (legacy builder structure)
                // We start with item.props
                const cleanItem = { ...(item.props || {}) };

                // Merge top-level keys that are NOT metadata, overwriting props if needed
                // (Builder sometimes uses top-level keys for props)
                Object.keys(item).forEach(key => {
                    const metadataKeys = [
                        'id', 'name', 'component', 'componentId', 'config', 'isOpen',
                        'sectionId', 'uniqueId', 'props', 'components', '_isSticky' // exclude internal
                    ];
                    if (!metadataKeys.includes(key)) {
                        cleanItem[key] = item[key];
                    }
                });

                // Do NOT include children arrays in the data object for this node
                // (children will have their own entries in the flat data object)
                delete cleanItem.components;

                data[finalId] = cleanItem;
            }

            // Recurse
            if (item.components && Array.isArray(item.components)) {
                traverse(item.components);
            }
            if (item.props && item.props.components && Array.isArray(item.props.components)) {
                traverse(item.props.components);
            }
        });
    };

    traverse(components);
    return data;
};

export const handleStagePreview = async (selectedComponents, folderName, analytics, activeThemePath) => {
    try {
        const fileContent = generateStagingPageContent(selectedComponents, folderName, activeThemePath);
        const layoutContent = generateStagingLayoutContent(analytics);
        const builderData = extractBuilderData(selectedComponents);

        const res = await fetch('/api/staging-preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                folderName,
                fileContent,
                layoutContent,
                componentIds: selectedComponents.map(c => c.sectionId || c.uniqueId), // Keep this for legacy/redundancy, or remove if builderData keys suffice
                builderData // New payload
            })
        });

        if (res.ok) {
            const data = await res.json();
            // Open in new tab
            window.open(data.path, '_blank');
            return true;
        } else {
            console.error("Failed to create staging page");
            alert("Failed to create staging page");
            return false;
        }
    } catch (e) {
        console.error("Error staging preview", e);
        alert("Error staging preview");
        return false;
    }
};
