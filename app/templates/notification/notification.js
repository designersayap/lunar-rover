"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircleIcon, XMarkIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import styles from "./notification.module.css";

const DEFAULT_DURATION = 5000;

export default function Notification() {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const addNotification = useCallback((message, type = "success", duration = DEFAULT_DURATION) => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        const newNotification = { id, message, type, duration };

        setNotifications((prev) => [...prev, newNotification]);

        if (duration !== Infinity) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, [removeNotification]);

    useEffect(() => {
        const handleToastEvent = (e) => {
            const { message, type, duration } = e.detail || {};
            if (message) {
                addNotification(message, type || "success", duration);
            }
        };

        window.addEventListener("lunar:toast", handleToastEvent);
        return () => window.removeEventListener("lunar:toast", handleToastEvent);
    }, [addNotification]);

    if (notifications.length === 0) return null;

    return (
        <div className={styles.notificationContainer}>
            {notifications.map((n) => (
                <NotificationCard
                    key={n.id}
                    notification={n}
                    onClose={() => removeNotification(n.id)}
                />
            ))}
        </div>
    );
}

function NotificationCard({ notification, onClose }) {
    const { message, type } = notification;

    const Icon = {
        success: CheckCircleIcon,
        error: ExclamationCircleIcon,
        info: InformationCircleIcon,
        warning: ExclamationCircleIcon,
    }[type] || CheckCircleIcon;

    return (
        <div className={styles.notificationCard}>
            <Icon className={styles.icon} />
            <div className={styles.notificationContent}>
                {message}
            </div>
            <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close"
            >
                <XMarkIcon className={styles.closeIcon} />
            </button>
        </div>
    );
}
