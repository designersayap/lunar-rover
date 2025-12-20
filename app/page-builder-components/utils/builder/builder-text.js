"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useIdSync } from "../hooks/use-id-sync";

/**
 * BuilderText: A contentEditable component that updates parent state on blur.
 */
export default function BuilderText({
    content = "",
    tagName = "p",
    className = "",
    style = {},
    onChange,
    multiline = true,
    placeholder = "Type here...",
    sectionId,
    suffix,
    noId = false,
    id,
    onIdChange,
    ...props
}) {
    const [text, setText] = useState(content);
    const elementRef = useRef(null);

    // Generate ID using standardized hook
    const firstClass = className.split(" ")[0] || tagName;
    const defaultSuffix = suffix || firstClass;

    const { elementId: generatedId } = useIdSync({
        id,
        sectionId,
        suffix: defaultSuffix,
        onIdChange
    });

    const elementId = noId ? undefined : generatedId;

    // Sync internal state if prop changes (undo/redo or initial load)
    useEffect(() => {
        if (elementRef.current && elementRef.current.innerText !== content) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setText(content);
            if (document.activeElement !== elementRef.current) {
                elementRef.current.innerText = content;
            }
        }
    }, [content]);

    const [isEditing, setIsEditing] = useState(false);

    const handleFocus = () => {
        setIsEditing(true);
    };

    const handleBlur = (e) => {
        setIsEditing(false);
        const newText = e.target.innerText;
        setText(newText);
        if (newText !== content && onChange) {
            onChange(newText);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const plainText = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, plainText);
    };

    const handleKeyDown = (e) => {
        if (!multiline && e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            e.target.blur();
        }
    };

    const Tag = tagName;

    // Filter out truncate classes if editing
    const activeClassName = isEditing
        ? className.split(' ').filter(c => !c.startsWith('truncate-')).join(' ')
        : className;

    // Check for truncation if enabled
    const [isTruncated, setIsTruncated] = useState(false);
    // Tooltip logic
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!props.tooltipIfTruncated) return;

        const checkTruncation = () => {
            const el = elementRef.current;
            if (el) {
                const isOverflowing =
                    el.scrollWidth > el.clientWidth + 2 ||
                    el.scrollHeight > el.clientHeight + 2;
                setIsTruncated(isOverflowing);
            }
        };

        checkTruncation();
        window.addEventListener('resize', checkTruncation);
        const timer = setTimeout(checkTruncation, 100);

        return () => {
            window.removeEventListener('resize', checkTruncation);
            clearTimeout(timer);
        };
    }, [text, props.tooltipIfTruncated, className, style]);

    const activeProps = { ...props };
    delete activeProps.tooltipIfTruncated;

    // Handle hover for tooltip positioning
    const handleMouseEnter = () => {
        if (!isTruncated || isEditing) return;

        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            setTooltipPos({
                top: rect.bottom + 8, // Gap
                left: rect.left + rect.width / 2
            });
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Portal Tooltip Content
    const tooltipContent = (isHovered && isTruncated && !isEditing) ? (
        <div className="z-system-modal-floating" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 0, overflow: 'visible', pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute',
                top: tooltipPos.top,
                left: tooltipPos.left,
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--background-neutral--neutral-strong)',
                color: 'var(--content-neutral--body-invert)',
                padding: '4px 8px',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '12px',
                lineHeight: '1.4',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 500,
                boxShadow: 'var(--shadow--md)',
                pointerEvents: 'none',
                maxWidth: '240px',
                wordWrap: 'break-word',
                textAlign: 'center',
                whiteSpace: 'normal',
                zIndex: 'inherit' // Inherits from z-system-modal-floating
            }}>
                {text}
            </div>
        </div>
    ) : null;

    return (
        <>
            <Tag
                id={elementId}
                ref={elementRef}
                className={`${activeClassName} ${!text ? "empty-builder-text" : ""}`}
                style={{ ...style, outline: "none", cursor: "default", minWidth: "1em", minHeight: "1em" }}
                contentEditable
                suppressContentEditableWarning={true}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-placeholder={placeholder}
                {...activeProps}
            >
                {text}
            </Tag>
            {tooltipContent && createPortal(tooltipContent, document.body)}
        </>
    );
}
