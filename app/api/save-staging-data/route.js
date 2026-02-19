export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { S3Manual } from '@/app/lib/s3-manual';

export async function POST(request) {
    try {
        const { folderName, componentId, updates, builderData } = await request.json();

        if (!folderName) {
            return NextResponse.json({ error: 'Missing folderName' }, { status: 400 });
        }

        const prefix = `staging-data/${folderName}`;

        let currentData = {};
        let stagingConfig = {};

        try {
            // Find latest file using Manual Client
            // listObjects already sorts or I might need to sort here? 
            // S3Manual.listObjects returns { Contents: [] }
            let { Contents } = await S3Manual.listObjects(prefix + '/').catch(() => ({ Contents: [] }));

            let targetKey = null;

            if (Contents && Contents.length > 0) {
                Contents.sort((a, b) => b.LastModified - a.LastModified);
                targetKey = Contents[0].Key;
            } else {
                // Try legacy
                const { Contents: LegacyContents } = await S3Manual.listObjects(prefix + '.json');
                if (LegacyContents && LegacyContents.length > 0) {
                    targetKey = LegacyContents[0].Key;
                }
            }

            if (targetKey) {
                stagingConfig = await S3Manual.getJson(targetKey);
                currentData = stagingConfig.builderData || {};
            }
        } catch (e) {
            console.warn("Could not fetch existing data to merge, starting fresh or erroring", e);
        }

        // Apply Updates
        if (builderData) {
            stagingConfig.builderData = builderData;
        } else if (componentId && updates) {
            const componentData = currentData[componentId] || {};
            const newData = { ...componentData, ...updates };
            currentData[componentId] = newData;
            stagingConfig.builderData = currentData;
        } else {
            return NextResponse.json({ error: 'Missing data to save' }, { status: 400 });
        }

        stagingConfig.timestamp = new Date().toISOString();

        // Save new version
        const newFilename = `staging-data/${folderName}/${Date.now()}.json`;

        await S3Manual.putJson(newFilename, stagingConfig);

        // Create notification (fire-and-forget)
        try {
            const notifKey = 'notifications/notifications.json';
            let notifications = [];
            try {
                const existing = await S3Manual.getJson(notifKey);
                notifications = existing.notifications || [];
            } catch { /* file doesn't exist yet */ }

            // Check for existing notification to merge
            const latest = notifications[0];
            const targetComponentId = componentId || 'Project Settings';
            const isSameComponent = latest &&
                latest.folderName === folderName &&
                latest.componentId === targetComponentId;

            if (isSameComponent) {
                // Merge: Update timestamp and count
                latest.timestamp = new Date().toISOString();
                latest.count = (latest.count || 1) + 1;
                latest.read = false; // Mark as unread again
                // Update message to reflect count if > 1
                latest.message = `Changes saved on '${folderName}'`;
            } else {
                // Create New
                notifications.unshift({
                    id: String(Date.now()),
                    folderName,
                    componentId: targetComponentId,
                    count: 1,
                    message: `Changes saved on '${folderName}'`,
                    timestamp: new Date().toISOString(),
                    read: false
                });
            }

            // Keep max 50 notifications
            if (notifications.length > 50) notifications = notifications.slice(0, 50);
            await S3Manual.putJson(notifKey, { notifications });
        } catch (notifErr) {
            console.warn('Notification creation failed:', notifErr);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
