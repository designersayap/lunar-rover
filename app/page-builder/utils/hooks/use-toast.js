"use client";

import { useState, useEffect, useCallback } from "react";

export function useToast({ duration = 3000 } = {}) {
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const updateToast = useCallback((message, type = "success") => {
        setToast({ show: true, message, type });
    }, []);

    const showToast = useCallback((message, type = "success") => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('lunar:toast', {
                detail: { message, type }
            }));
        }
    }, []);

    const hideToast = useCallback(() => {
        setToast(t => ({ ...t, show: false }));
    }, []);

    useEffect(() => {
        const handleToastEvent = (e) => {
            const { message, type } = e.detail || {};
            if (message) {
                updateToast(message, type || 'success');
            }
        };

        window.addEventListener('lunar:toast', handleToastEvent);
        return () => window.removeEventListener('lunar:toast', handleToastEvent);
    }, [updateToast]);

    useEffect(() => {
        if (!toast.show) return;
        const timeoutId = setTimeout(hideToast, duration);
        return () => clearTimeout(timeoutId);
    }, [toast.show, duration, hideToast]);

    return {
        toast,
        showToast,
        hideToast
    };
}
