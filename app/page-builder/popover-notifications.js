import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { TrashIcon as TrashIconSolid } from '@heroicons/react/24/solid';
import styles from '../page.module.css';
import BasePopover from './base-popover';
import Tooltip from './tooltip';

export default function NotificationPopover({
    position,
    onClose,
    className,
    onUnreadCountChange
}) {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sync unread count to parent via separate effect (avoids setState-during-render)
    useEffect(() => {
        if (onUnreadCountChange) {
            onUnreadCountChange(notifications.filter(n => !n.read).length);
        }
    }, [notifications]);

    // Fetch notifications on mount
    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000);

                const res = await fetch(`/api/notifications?t=${Date.now()}`, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data.notifications || []);
                }
            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.warn('Failed to fetch notifications:', e);
                    setError('Failed to load notifications');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleMarkAllRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));

        try {
            await fetch('/api/notifications', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markAll: true })
            });
        } catch (e) {
            console.warn('Failed to mark all as read:', e);
        }
    };

    const handleDelete = async (e, ids) => {
        e.stopPropagation();
        const idList = Array.isArray(ids) ? ids : [ids];
        setNotifications(prev => prev.filter(n => !idList.includes(n.id)));

        try {
            await fetch(`/api/notifications?id=${idList.join(',')}`, { method: 'DELETE' });
        } catch (e) {
            console.warn('Failed to delete notification:', e);
        }
    };

    const formatTime = (timestamp) => {
        try {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString();
        } catch {
            return '';
        }
    };

    if (!position) return null;

    return (
        <BasePopover
            isOpen={true}
            onClose={onClose}
            position={position}
            className={className}
        >
            <div className={styles.popoverContent}>
                <div className={styles.exportInputWrapper}>
                    <label className={styles.formInputTitle}>Notifications</label>
                    <div className={styles.popoverList}>
                        {isLoading ? (
                            <div className={styles.emptyStateMessage}>
                                <div className={styles.spinner} style={{ margin: '0 auto' }} />
                            </div>
                        ) : error ? (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className={styles.emptyStateMessage}>
                                No notifications
                            </div>
                        ) : (
                            Object.entries(
                                notifications.reduce((acc, notif) => {
                                    const key = notif.folderName || 'System';
                                    if (!acc[key]) acc[key] = [];
                                    acc[key].push(notif);
                                    return acc;
                                }, {})
                            ).map(([folderName, items]) => {
                                const unreadCount = items.filter(n => !n.read).length;
                                const latestTime = Math.max(...items.map(n => new Date(n.timestamp).getTime()));
                                const isUnread = unreadCount > 0;

                                return (
                                    <div
                                        key={folderName}
                                        className={`${styles.notificationItem} ${isUnread ? styles.notificationItemUnread : ''}`}
                                    >
                                        <div className={styles.notificationDot}>
                                            {isUnread && <span className={styles.notificationDotInner} />}
                                        </div>
                                        <div className={styles.notificationBody}>
                                            <span className={styles.notificationMessage}>
                                                {items.length} updates on <strong>{folderName}</strong>
                                            </span>
                                            <span className={styles.notificationTime}>{formatTime(latestTime)}</span>
                                        </div>
                                        <div className={styles.treeActions}>
                                            <Tooltip content="Delete Group" position="top">
                                                <button
                                                    className={styles.sidebarDeleteButton}
                                                    onClick={(e) => handleDelete(e, items.map(n => n.id))}
                                                >
                                                    <TrashIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                                                    <TrashIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    {!isLoading && notifications.some(n => !n.read) && (
                        <button
                            className={styles.notificationMarkAllBtn}
                            onClick={handleMarkAllRead}
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>
        </BasePopover>
    );
}
