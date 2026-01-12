"use client";

import { useRef, useContext, useState, useEffect } from "react";
import styles from "../../../page.module.css";
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls";
import BuilderControlsPopover from "./builder-controls-popover";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

import { createPortal } from "react-dom";
import { componentLibrary } from "@/app/page-builder/content/component-library";
import { useActiveOverlayPosition } from "../hooks/use-active-overlay";

export default function ScrollGroup({
    sectionId,
    components = [],
    image,
    mobileImage,
    imageMobileRatio,
    scrollEffect = "parallax", // 'parallax' | 'sticky'
    onUpdate,
    updateComponent // passed from Canvas to render children
}) {
    const { activeElementId, setActiveElementId, activePopoverId, setActivePopoverId, localData, isStaging } = useContext(BuilderSelectionContext);
    const elementId = sectionId;
    const isActive = activeElementId === elementId;
    const myPopoverId = `popover-${elementId}`;
    const showSettings = activePopoverId === myPopoverId;

    const sectionRef = useRef(null);
    const [popoverPosition, setPopoverPosition] = useState(null);
    const [overlayRect, setOverlayRect] = useState(null);

    // Desktop/Mobile Image Source Logic
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
        position: "relative", // Changed from sticky to relative since wrapper handles stickiness
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

    const overlayStyle = useActiveOverlayPosition(overlayRect);

    const renderOverlay = () => {
        if (!isActive || !overlayRect || typeof document === 'undefined') return null;

        return createPortal(
            <div
                className={styles.activeOverlay}
                style={overlayStyle}
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
            </div>,
            document.body
        );
    };

    const renderChildren = () => (
        <div className={styles.parallaxContent}>
            {components.map((item) => {
                // Prioritize the component instance if passed (Export/UAT), otherwise lookup (Builder)
                const Component = item.component || Object.values(componentLibrary).flat().find(c => c.id === item.id)?.component;

                if (!Component) return null;

                // Staging Merge Logic:
                const effectiveId = item.uniqueId || item.id; // Fallback to id if uniqueId missing
                const stagingOverride = localData ? (localData[effectiveId] || localData[item.uniqueId]) : {};


                // Robustly determine base props: handle both nested props (Builder default) and flat props (legacy/staging edge cases)
                const baseProps = item.props ? item.props : item;

                // Filter out metadata from baseProps if falling back to item (to avoid passing 'component', 'uniqueId' etc as props)
                const cleanBaseProps = item.props ? baseProps : (() => {
                    const { component, uniqueId, sectionId, id, ...rest } = baseProps;
                    return rest;
                })();

                const mergedProps = { ...cleanBaseProps, ...stagingOverride };

                return (
                    <div key={item.uniqueId} className={styles.componentWrapper}>
                        <Component
                            {...mergedProps}
                            sectionId={item.sectionId}
                            onUpdate={(newProps) => updateComponent && updateComponent(item.uniqueId, newProps)}
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
                showScrollEffect={!isStaging}
                scrollEffect={scrollEffect}
                onScrollEffectChange={(val) => onUpdate({ scrollEffect: val })}

                // Image Settings (Staging Only)
                showImageSrc={isStaging}
                imageSrc={image}
                onImageSrcChange={(val) => onUpdate({ image: val })}

                showMobileRatio={false}
                mobileRatio={imageMobileRatio}
                onMobileRatioChange={(val) => onUpdate({ imageMobileRatio: val })}

                showMobileImageSrc={isStaging}
                mobileImageSrc={mobileImage}
                onMobileImageSrcChange={(val) => onUpdate({ mobileImage: val })}

                showLinkType={false}
                showVariant={false}
                showUrl={false}
            />
        )
    );

    // Mobile Image Logic
    const mobileImageCss = mobileImage ? `
        @media (max-width: 768px) {
            #${elementId} {
                background-image: url(${mobileImage}) !important;
            }
        }
    ` : '';

    const stickyMobileImageCss = mobileImage ? `
        @media (max-width: 768px) {
            #${elementId}-bg {
                background-image: url(${mobileImage}) !important;
            }
        }
    ` : '';

    if (isSticky) {
        return (
            <div
                ref={sectionRef}
                id={elementId}
                onClick={handleClick}
                className={`${styles.parallaxGroup} ${isActive ? styles.activeWrapper : ''}`}
                style={stickyContainerStyle}
            >
                <div id={`${elementId}-bg`} style={stickyBackgroundStyle} />
                <div style={contentStyle}>
                    {renderChildren()}
                </div>
                {renderOverlay()}
                {renderPopover()}
                <style jsx global>{stickyMobileImageCss}</style>
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
                <style jsx global>{mobileImageCss}</style>
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
            <style jsx global>{mobileImageCss}</style>
        </div>
    );
}
