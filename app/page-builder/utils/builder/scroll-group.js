"use client";

import { useRef, useContext, useState, useEffect } from "react";
import styles from "../../../page.module.css";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import BuilderControlsPopover from "./builder-controls-popover";
import { Cog6ToothIcon, TrashIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { getContainerClasses } from "../section-utils";
import { createPortal } from "react-dom";
import { componentLibrary } from "@/app/page-builder/content/component-library";

export default function ScrollGroup({
    sectionId,
    components = [],
    image,
    mobileImage,
    imageIsPortrait,
    imageMobileRatio,
    scrollEffect = "parallax", // 'parallax' | 'sticky'
    onUpdate,
    updateComponent // passed from Canvas to render children
}) {
    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId } = useContext(BuilderSelectionContext);
    const elementId = sectionId;
    const isActive = activeElementId === elementId;
    const myPopoverId = `popover-${elementId}`;
    const showSettings = activePopoverId === myPopoverId;

    const sectionRef = useRef(null);
    const [popoverPosition, setPopoverPosition] = useState(null);
    const [overlayRect, setOverlayRect] = useState(null);

    // Desktop/Mobile Image Source Logic
    // We'll use a simple approach: if mobileImage exists and we are on mobile (via CSS media query or JS check), use it.
    // For this inline style implementation, we'll just prioritize desktop image for the background style, 
    // but in a real responsive implementation we might use a styled-component or class.
    // However, since we are doing inline styles for background, we can't easily do media queries without a hook.
    // For simplicity, we will stick to the 'image' prop for the main background.

    const isParallax = scrollEffect === 'parallax' || !scrollEffect;
    const isSticky = scrollEffect === 'sticky';
    const isStacked = scrollEffect === 'stacked';

    // Styles for Parallax (Fixed Background)
    const parallaxStyle = {
        backgroundImage: `url(${image})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        position: "relative"
    };

    // Styles for Sticky (Sticky Top Background)
    // Structure: Container (grid) -> Background (sticky top, z-1) + Content (relative, z1) in same cell
    const stickyContainerStyle = {
        position: "relative",
        width: '100%',
        isolation: 'isolate',
        display: 'grid',
        gridTemplateAreas: '"stack"'
    };

    const stickyBackgroundStyle = {
        gridArea: 'stack',
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: -1, // Behind content
        alignSelf: 'start'
    };

    // Styles for Stacked (Sticky Component, Next Section Slides Over)
    const stackedStyle = {
        position: "sticky",
        top: 0,
        zIndex: 0, // Low z-index so next section covers it
        width: "100%",
        minHeight: "100vh", // Build height to ensure effect is visible
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    const contentStyle = {
        gridArea: 'stack',
        position: "relative",
        zIndex: 1
    };


    useEffect(() => {
        if (isActive && sectionRef.current) {
            const updatePosition = () => {
                if (sectionRef.current) {
                    const rect = sectionRef.current.getBoundingClientRect();
                    setOverlayRect(rect);
                    if (showSettings) {
                        setPopoverPosition({
                            top: rect.top,
                            left: rect.left + rect.width / 2
                        });
                    }
                }
            };
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isActive, showSettings]);

    const handleSettingsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!showSettings && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setPopoverPosition({ top: rect.top, left: rect.left + rect.width / 2 });
        }
        setActivePopoverId(prev => prev === myPopoverId ? null : myPopoverId);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        setActiveElementId(elementId);
    };

    const renderOverlay = () => (
        isActive && (
            <div
                className={styles.activeOverlay}
                style={{
                    top: overlayRect ? Math.max(-24, 42 - overlayRect.top) : -24
                }}
            >
                <div className={styles.overlayLabel}>
                    <span className={styles.overlayIdText}>Group: #{elementId}</span>
                </div>
                <button
                    type="button"
                    className={`${styles.settingsButton} ${showSettings ? styles.settingsButtonActive : ''}`}
                    onClick={handleSettingsClick}
                >
                    <Cog6ToothIcon className={styles.overlayIcon} />
                </button>
            </div>
        )
    );

    const renderChildren = () => (
        <div className={styles.parallaxContent}>
            {components.map((item) => {
                // Prioritize the component instance if passed (Export/UAT), otherwise lookup (Builder)
                const Component = item.component || Object.values(componentLibrary).flat().find(c => c.id === item.id)?.component;

                if (!Component) return null;

                return (
                    <div key={item.uniqueId} className={styles.componentWrapper}>
                        <Component
                            {...item.props}
                            sectionId={item.sectionId}
                            onUpdate={(newProps) => updateComponent(item.uniqueId, newProps)}
                        />
                    </div>
                )
            })}
        </div>
    );

    const renderPopover = () => (
        isActive && (
            <BuilderControlsPopover
                isOpen={showSettings}
                onClose={() => setActivePopoverId(null)}
                position={popoverPosition}

                // Scroll Settings
                showScrollEffect={true}
                scrollEffect={scrollEffect}
                onScrollEffectChange={(val) => onUpdate({ scrollEffect: val })}

                // Image Settings
                showImageSrc={true}
                imageSrc={image}
                onImageSrcChange={(val) => onUpdate({ image: val })}

                showMobileRatio={false}
                mobileRatio={imageMobileRatio}
                onMobileRatioChange={(val) => onUpdate({ imageMobileRatio: val })}

                showMobileImageSrc={true}
                mobileImageSrc={mobileImage}
                onMobileImageSrcChange={(val) => onUpdate({ mobileImage: val })}

                showLinkType={false}
                showVariant={false}
                showUrl={false}
            />
        )
    );

    if (isSticky) {
        return (
            <div
                ref={sectionRef}
                id={elementId}
                onClick={handleClick}
                className={`${styles.parallaxGroup} ${isActive ? styles.activeWrapper : ''}`}
                style={stickyContainerStyle}
            >
                <div style={stickyBackgroundStyle} />
                <div style={contentStyle}>
                    {renderChildren()}
                </div>
                {renderOverlay()}
                {renderPopover()}
            </div>
        );
    }

    if (isStacked) {
        return (
            <div
                ref={sectionRef}
                id={elementId}
                onClick={handleClick}
                className={`${styles.parallaxGroup} ${isActive ? styles.activeWrapper : ''}`}
                style={stackedStyle}
            >
                {renderOverlay()}
                {renderChildren()}
                {renderPopover()}
            </div>
        );
    }

    // Default Parallax
    return (
        <div
            ref={sectionRef}
            id={elementId}
            onClick={handleClick}
            className={`${styles.parallaxGroup} ${isActive ? styles.activeWrapper : ''}`}
            style={parallaxStyle}
        >
            {renderOverlay()}
            {renderChildren()}
            {renderPopover()}
        </div>
    );
}
