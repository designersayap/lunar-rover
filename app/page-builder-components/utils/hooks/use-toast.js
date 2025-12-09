"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for toast notifications
 * Handles:
 * - Toast state management
 * - Auto-hide after duration
 * - Multiple toast types
 * 
 * @param {Object} options - Hook options
 * @param {number} options.duration - Auto-hide duration in ms (default: 3000)
 * @returns {Object} Hook state and helpers
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
