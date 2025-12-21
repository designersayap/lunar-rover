
import { COMPONENT_PATHS } from './component-paths';
import { componentDefaults } from '@/app/template-components/content/data';

/**
 * generateStagingPageContent: Generates the content for app/staging/[name]/page.js
 * Imports components directly from '@/app/template-components/...' using COMPONENT_PATHS
 */
export const generateStagingPageContent = (selectedComponents, folderName) => {
    let pageContent = `"use client";\n\n`;

    // Import staging data overrides
    pageContent += `import { data as stagingData } from "./data";\n`;

    // 1. Collect Imports
    // We map component names to their import paths
    const imports = new Map();

    selectedComponents.forEach(item => {
        const filePath = COMPONENT_PATHS[item.id];
        if (!filePath) return;

        // Convert file path (e.g. "app/template-components/foo.js") to import path ("@/app/template-components/foo")
        const importPath = filePath.replace('.js', '').replace('app/', '@/app/');

        const filename = filePath.split('/').pop();
        const componentName = filename.replace('.js', '')
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        imports.set(componentName, importPath);
    });

    // Write Imports
    imports.forEach((path, name) => {
        pageContent += `import ${name} from "${path}";\n`;
    });

    pageContent += `\nexport default function StagingPage() {\n`;

    // Inject handleUpdate
    pageContent += `
    const handleUpdate = async (uniqueId, newData) => {
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
    };\n\n`;

    pageContent += `  return (\n`;
    pageContent += `    <main className="flex min-h-screen flex-col items-center justify-between">\n`;

    // 2. Render Components
    selectedComponents.forEach(item => {
        const filePath = COMPONENT_PATHS[item.id];
        if (!filePath) return;

        const filename = filePath.split('/').pop();
        const componentName = filename.replace('.js', '')
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        // Prepare Props
        const props = { ...item, ...(item.props || {}) };

        // Clean internal props
        delete props.id;
        delete props.name;
        delete props.componentId;
        delete props.category;
        delete props.isSticky;
        delete props.uniqueId;
        delete props.config;
        delete props.isOpen;
        delete props.sectionId; // Will use item.sectionId below

        const finalSectionId = item.sectionId || item.uniqueId;
        if (finalSectionId) {
            props.sectionId = finalSectionId;
        }

        const propsString = Object.entries(props).map(([key, value]) => {
            if (value === undefined || value === null) return '';
            if (typeof value === 'string') {
                return `${key}="${value}"`;
            } else if (typeof value === 'boolean') {
                return value ? `${key}` : `${key}={false}`;
            } else {
                return `${key}={${JSON.stringify(value)}}`;
            }
        }).filter(Boolean).join(' ');

        // Add override spread and handler
        const overrideString = `{...stagingData['${finalSectionId}']}`;
        const onUpdateString = `onUpdate={(newData) => handleUpdate('${finalSectionId}', newData)}`;

        let componentJSX = `<${componentName} ${propsString} ${overrideString} ${onUpdateString} />`;

        // Sticky Wrapper
        if (item.isSticky) {
            componentJSX = `
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        ${componentJSX}
      </div>`;
        }

        pageContent += `      ${componentJSX}\n`;
    });

    pageContent += `    </main>\n`;
    pageContent += `  );\n`;
    pageContent += `}\n`;

    return pageContent;
};

export const handleStagePreview = async (selectedComponents, folderName) => {
    try {
        const fileContent = generateStagingPageContent(selectedComponents, folderName);

        const res = await fetch('/api/staging-preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folderName, fileContent })
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
