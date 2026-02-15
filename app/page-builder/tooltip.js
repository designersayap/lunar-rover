import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../page.module.css';

export default function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200,
    className = '',
    zIndex = 9999,
}) {
    const [isVisible, setIsVisible] = useState(false);
    // Start off-screen/invisible to prevent flash
    const [tooltipStyle, setTooltipStyle] = useState({
        top: -9999,
        left: -9999,
        opacity: 0
    });

    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    // We need to know when we are mounted to use Portal
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // The core simplified positioning logic
    const updatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current || !isVisible) return;

        // 1. Get Trigger Rect
        let triggerEl = triggerRef.current;
        // Handle display:contents case by finding the real element inside
        if (triggerEl.style.display === 'contents' && triggerEl.firstElementChild) {
            triggerEl = triggerEl.firstElementChild;
        }
        const triggerRect = triggerEl.getBoundingClientRect();

        // 2. Get Tooltip Rect (it's rendered but invisible/offscreen, so we can measure)
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        if (tooltipRect.width === 0) return; // Not ready yet

        // 3. Calculate Center Points
        const triggerCenterX = triggerRect.left + (triggerRect.width / 2);
        const triggerCenterY = triggerRect.top + (triggerRect.height / 2);

        const gap = 6;
        let top = 0;
        let left = 0;

        // 4. Calculate Position based on prop
        switch (position) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - gap;
                left = triggerCenterX - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = triggerRect.bottom + gap;
                left = triggerCenterX - (tooltipRect.width / 2);
                break;
            case 'left':
                top = triggerCenterY - (tooltipRect.height / 2);
                left = triggerRect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = triggerCenterY - (tooltipRect.height / 2);
                left = triggerRect.right + gap;
                break;
            default: // Default to top
                top = triggerRect.top - tooltipRect.height - gap;
                left = triggerCenterX - (tooltipRect.width / 2);
        }

        // Constrain to viewport edges (4px padding)
        const padding = 4;
        const viewportWidth = window.innerWidth;

        // Clamp left position
        if (left < padding) {
            left = padding;
        } else if (left + tooltipRect.width > viewportWidth - padding) {
            left = viewportWidth - tooltipRect.width - padding;
        }

        // 5. Apply style directly (No CSS transforms)
        setTooltipStyle({
            top: top,
            left: left,
            opacity: 1 // Show it now that it's positioned
        });
    };

    // usage of useLayoutEffect ensures we position BEFORE the browser paints the frame
    useLayoutEffect(() => {
        if (isVisible) {
            updatePosition();
            // Optional: Listen to scroll/resize to keep it attached
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        } else {
            // Reset when hidden
            setTooltipStyle({ top: -9999, left: -9999, opacity: 0 });
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isVisible, position, content]); // Re-run if content changes size

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    if (!content) return children;

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={className}
                style={{ display: 'contents' }}
            >
                {children}
            </div>
            {mounted && isVisible && createPortal(
                <div
                    ref={tooltipRef}
                    className={styles.tooltip}
                    // IMPORTANT: We override the class's animation and transform to avoid conflicts
                    style={{
                        ...tooltipStyle,
                        position: 'fixed',
                        margin: 0,
                        zIndex: zIndex,
                        pointerEvents: 'none',
                        // Disable the CSS animation from the class that caused the glitch
                        animation: 'none',
                        transition: 'opacity 0.1s ease-out', // Simple fade instead
                        transform: 'none', // Ensure no transforms interfere
                        width: 'max-content',
                        maxWidth: '240px'
                    }}
                >
                    {content}
                </div>,
                document.body
            )}
        </>
    );
}
