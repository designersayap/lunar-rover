import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// WORKAROUND: Allow self-signed certs for corporate proxy (Vercel Blob SDK usage)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const folderName = searchParams.get('folder');

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folder name' }, { status: 400 });
        }

        const filename = `staging-data/${folderName}`;

        // List blobs to find the latest one (timestamped or legacy)
        // We look for `staging-data/folderName/` (new) OR `staging-data/folderName.json` (legacy)

        let targetBlobUrl = null;

        // 1. Check for new timestamped folder structure
        const { blobs } = await list({
            prefix: filename + '/', // staging-data/folderName/
            // get more than 1 to sort, though usually list returns sorted? 
            // verified: Vercel Blob list doesn't guarantee sort order by time in docs, so we sort manually.
            limit: 1000
        });

        if (blobs.length > 0) {
            // Sort by uploadedAt desc
            blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
            targetBlobUrl = blobs[0].url;
            console.log(`[Load Staging] Found ${blobs.length} files. Latest: ${targetBlobUrl} (${blobs[0].uploadedAt})`);
        } else {
            // 2. Check for legacy single file
            // Note: The prefix 'staging-data/folderName' might also match 'staging-data/folderName.json' if we are not careful with the slash.
            // But Vercel Blob prefix matches string.
            // If filename = 'staging-data/folder', it matches 'staging-data/folder.json' AND 'staging-data/folder/foo.json'.

            // To be safe, explicit check for legacy file:
            const legacyFilename = `staging-data/${folderName}.json`;
            const { blobs: legacyBlobs } = await list({
                prefix: legacyFilename,
                limit: 1
            });
            if (legacyBlobs.length > 0) {
                targetBlobUrl = legacyBlobs[0].url;
                console.log(`[Load Staging] Found legacy file: ${targetBlobUrl}`);
            }
        }

        if (!targetBlobUrl) {
            console.log(`[Load Staging] No data found for folder: ${folderName}`);
            return NextResponse.json({ error: 'Staging data not found' }, { status: 404 });
        }

        // Fetch the JSON content from the blob URL
        const bustUrl = targetBlobUrl + (targetBlobUrl.includes('?') ? '&' : '?') + 't=' + new Date().getTime();

        const response = await fetch(bustUrl, {
            cache: 'no-store',
            // Forward any potential headers if needed, generally public access is fine
        });

        if (!response.ok) {
            return NextResponse.json({
                error: `Failed to fetch blob: ${response.statusText}`
            }, { status: response.status });
        }

        const data = await response.json();

        // MERGE LOGIC: Apply builderData overrides to components
        // The staging-client-page saves updates to 'builderData', but 'components' remains the original structure.
        // We must merge them so the restore receives the latest props.

        const builderData = data.builderData || {};
        const components = data.components || [];

        const applyOverrides = (list) => {
            if (!Array.isArray(list)) return [];
            return list.map(comp => {
                let override = null;

                // Match by sectionId (preferred) or uniqueId
                if (comp.sectionId && builderData[comp.sectionId]) {
                    override = builderData[comp.sectionId];
                }
                else if (comp.uniqueId && builderData[comp.uniqueId]) {
                    override = builderData[comp.uniqueId];
                }

                let newComp = { ...comp };
                let newProps = { ...(comp.props || {}) };

                if (override) {
                    Object.entries(override).forEach(([k, v]) => {
                        // Structural keys (id, sectionId, etc) and Props are mixed in builderData flat map.
                        // We apply them to the component or props appropriate.

                        const topLevelKeys = ['id', 'uniqueId', 'sectionId', 'componentName', 'isSticky'];
                        if (topLevelKeys.includes(k)) {
                            newComp[k] = v;
                        } else {
                            newProps[k] = v;
                        }
                    });
                    newComp.props = newProps;
                }

                // Recursion
                if (newProps.components && Array.isArray(newProps.components)) {
                    newProps.components = applyOverrides(newProps.components);
                    newComp.props = newProps; // Ensure the prop is updated with the new list
                }
                if (newComp.components && Array.isArray(newComp.components)) {
                    newComp.components = applyOverrides(newComp.components);
                }

                return newComp;
            });
        };

        const mergedComponents = applyOverrides(components);

        return NextResponse.json({ ...data, components: mergedComponents }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

    } catch (error) {
        console.error('Error loading staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
