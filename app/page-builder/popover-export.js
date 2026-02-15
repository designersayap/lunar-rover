import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import BasePopover from "./base-popover";
import Tooltip from "./tooltip";

export default function ExportPopover({
    isOpen,
    onClose,
    position,
    className = "",
    analyticsData,
    setAnalyticsData,
    handleDirectExport
}) {
    const [pageTitle, setPageTitle] = useState(analyticsData.websiteTitle || "");
    const [favicon, setFavicon] = useState(analyticsData.favicon || "");
    const [faviconStatus, setFaviconStatus] = useState('idle'); // idle, valid, error
    const [isExporting, setIsExporting] = useState(false);

    // Sync local state with analyticsData when it changes or when popover opens
    useEffect(() => {
        setPageTitle(analyticsData.websiteTitle || "");
        setFavicon(analyticsData.favicon || "");
    }, [analyticsData, isOpen]);

    // Validate Favicon URL by trying to load it
    useEffect(() => {
        if (!favicon) {
            setFaviconStatus('idle');
            return;
        }
        const img = new Image();
        img.src = favicon;
        img.onload = () => setFaviconStatus('valid');
        img.onerror = () => setFaviconStatus('error');
    }, [favicon]);

    const handlePageTitleChange = (e) => {
        const newVal = e.target.value;
        setPageTitle(newVal);
        setAnalyticsData(prev => ({ ...prev, websiteTitle: newVal }));
    };

    const handleFaviconChange = (e) => {
        const newVal = e.target.value;
        setFavicon(newVal);
        setAnalyticsData(prev => ({ ...prev, favicon: newVal }));
    };

    const isValid = pageTitle.trim().length > 0 && favicon.trim().length > 0;

    const onExportClick = async () => {
        if (!isValid) return;

        setIsExporting(true);
        try {
            await handleDirectExport();
            onClose();
        } catch (error) {
            console.error("Export failed", error);
            alert("Export failed. Check console for details.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            className={`${styles.exportPopover} ${className}`}
        >
            <div className={styles.popoverContent}>
                <div className={styles.exportInputWrapper}>

                    {/* Page Title Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pb-space-xs)', marginBottom: 'var(--pb-space-sm)' }}>
                        <label className={styles.formInputTitle}>Page Title</label>
                        <input
                            type="text"
                            value={pageTitle}
                            onChange={handlePageTitleChange}
                            className={styles.formInput}
                            placeholder="My Awesome Page"
                        />
                    </div>

                    {/* Favicon Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pb-space-xs)' }}>
                        <label className={styles.formInputTitle}>Favicon URL</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={favicon}
                                onChange={handleFaviconChange}
                                className={styles.formInput}
                                placeholder="https://example.com/favicon.ico"
                                style={{
                                    paddingRight: '32px'
                                }}
                            />
                            {favicon && faviconStatus === 'valid' && (
                                <CheckCircleIcon
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        color: 'var(--pb-success)',
                                        position: 'absolute',
                                        right: 'var(--pb-space-sm)',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}
                                />
                            )}
                        </div>
                        {favicon && (
                            <div className={styles.imagePreviewContainer}>
                                {faviconStatus === 'valid' ? (
                                    <img
                                        src={favicon}
                                        alt="Preview"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'contain',
                                            borderRadius: 'var(--pb-radius)'
                                        }}
                                        onError={() => setFaviconStatus('error')}
                                    />
                                ) : (
                                    <span className={styles.captionRegular} style={{ color: 'var(--pb-neutral-200)' }}>
                                        The image isn't available
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Tooltip
                        content={!isValid ? "Please fill the page title and favicon url first" : ""}
                        position="top"
                        zIndex={20000}
                    >
                        <div style={{ width: '100%', cursor: !isValid ? 'not-allowed' : 'default' }}>
                            <button
                                className={`${styles.btn} ${styles.btnSecondary} ${styles.wFull}`}
                                style={{ pointerEvents: !isValid ? 'none' : 'auto' }}
                                onClick={onExportClick}
                                disabled={!isValid || isExporting}
                            >
                                {isExporting ? "Exporting..." : "Export to ZIP"}
                            </button>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </BasePopover>
    );
}
