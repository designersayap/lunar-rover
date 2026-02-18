export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { S3Manual } from '@/app/lib/s3-manual';

const NOTIF_KEY = 'notifications/notifications.json';

async function getNotifications() {
    try {
        const data = await S3Manual.getJson(NOTIF_KEY);
        return data.notifications || [];
    } catch {
        return [];
    }
}

async function saveNotifications(notifications) {
    await S3Manual.putJson(NOTIF_KEY, { notifications });
}

// GET: List all notifications
export async function GET() {
    try {
        const notifications = await getNotifications();
        return NextResponse.json({ notifications }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Mark notification as read
export async function PUT(request) {
    try {
        const { id, read, markAll } = await request.json();

        const notifications = await getNotifications();

        if (markAll) {
            const updated = notifications.map(n => ({ ...n, read: true }));
            await saveNotifications(updated);
            return NextResponse.json({ success: true });
        }

        if (!id) {
            return NextResponse.json({ error: 'Missing notification id' }, { status: 400 });
        }

        const index = notifications.findIndex(n => n.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }

        notifications[index].read = read !== undefined ? read : true;
        await saveNotifications(notifications);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove a notification
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const idParam = searchParams.get('id');

        if (!idParam) {
            return NextResponse.json({ error: 'Missing notification id' }, { status: 400 });
        }

        const idsToDelete = idParam.split(',');

        const notifications = await getNotifications();
        const filtered = notifications.filter(n => !idsToDelete.includes(n.id));
        await saveNotifications(filtered);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
