"use client";

import { useState, useEffect, useCallback } from "react";

export function useToast({ duration = 3000 } = {}) {
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const showToast = useCallback((message, type = "success") => {
        setToast({ show: true, message, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast(t => ({ ...t, show: false }));
    }, []);

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
