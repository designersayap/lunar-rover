"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useToast: Manages toast notification state and auto-hide functionality.
 */
export function useToast({ duration = 3000 } = {}) {
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    });

    // Show toast
    const showToast = useCallback((message, type = "success") => {
        setToast({ show: true, message, type });
    }, []);

    // Hide toast
    const hideToast = useCallback(() => {
        setToast(t => ({ ...t, show: false }));
    }, []);

    // Auto-hide
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
