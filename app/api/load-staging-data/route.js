import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const folderName = searchParams.get('folder');

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folder name' }, { status: 400 });
        }

        const STAGING_DIR = path.join(process.cwd(), 'app', 'staging');
        const targetDir = path.join(STAGING_DIR, folderName);
        const pageFilePath = path.join(targetDir, 'page.js');
        const dataFilePath = path.join(targetDir, 'data.js');

        if (!fs.existsSync(pageFilePath)) {
            return NextResponse.json({ error: 'Staging page not found' }, { status: 404 });
        }

        // 1. Read page.js and extract stagingComponents
        const pageContent = fs.readFileSync(pageFilePath, 'utf-8');

        // Regex to find "const stagingComponents = [...]"
        const structureMatch = pageContent.match(/const stagingComponents = (\[[\s\S]*?\]);/);

        if (!structureMatch || !structureMatch[1]) {
            return NextResponse.json({ error: 'Could not parse stagingComponents from page.js' }, { status: 500 });
        }

        let components = [];
        try {
            components = JSON.parse(structureMatch[1]);
        } catch (e) {
            console.error("JSON Parse Error for components:", e);
            return NextResponse.json({ error: 'Invalid component JSON in page.js' }, { status: 500 });
        }

        // 2. Read data.js and merge overrides
        let overrides = {};
        if (fs.existsSync(dataFilePath)) {
            const dataContent = fs.readFileSync(dataFilePath, 'utf-8');
            const start = dataContent.indexOf('{');
            const end = dataContent.lastIndexOf('}');

            if (start !== -1 && end !== -1) {
                try {
                    const jsonString = dataContent.substring(start, end + 1);
                    overrides = JSON.parse(jsonString);
                } catch (e) {
                    console.warn("Failed to parse data.js, continuing without overrides", e);
                }
            }
        }

        // 3. Merge
        const applyOverrides = (list) => {
            return list.map(comp => {
                // Determine the key used in data.js
                // data.js typically uses sectionId as the key if available, otherwise it might use uniqueId (as string)

                let override = null;

                // Priority 1: Check by sectionId (most common for Staging)
                if (comp.sectionId && overrides[comp.sectionId]) {
                    override = overrides[comp.sectionId];
                }
                // Priority 2: Check by uniqueId (string or number)
                else if (overrides[comp.uniqueId]) {
                    override = overrides[comp.uniqueId];
                }
                else if (overrides[String(comp.uniqueId)]) {
                    override = overrides[String(comp.uniqueId)];
                }

                let newComp = { ...comp };
                let newProps = { ...(comp.props || {}) };

                if (override) {
                    Object.entries(override).forEach(([k, v]) => {
                        // Known structural keys that belong on the node
                        const topLevelKeys = ['id', 'uniqueId', 'sectionId', 'componentName', 'isSticky'];

                        if (topLevelKeys.includes(k)) {
                            newComp[k] = v;
                        } else {
                            // Everything else is a prop
                            // Recursive merge or direct set? 
                            // data.js usually contains the fully flattened "final" state of props, so direct set is usually correct/safer than deep merge which might retain stale list items.
                            newProps[k] = v;
                        }
                    });

                    newComp.props = newProps;
                }

                // Case 1: props.components (Used by ScrollGroup)
                if (newProps.components && Array.isArray(newProps.components)) {
                    newProps.components = applyOverrides(newProps.components);
                    newComp.props = newProps;
                }

                // Case 2: components property (Potential direct nested structure)
                if (newComp.components && Array.isArray(newComp.components)) {
                    newComp.components = applyOverrides(newComp.components);
                }

                return newComp;
            });
        };

        const mergedComponents = applyOverrides(components);

        return NextResponse.json({ components: mergedComponents });

    } catch (error) {
        console.error('Error loading staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
