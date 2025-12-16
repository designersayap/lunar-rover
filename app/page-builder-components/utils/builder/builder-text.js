"use client";

import { useState, useEffect, useRef } from "react";

/**
 * BuilderText Component
 * A contentEditable component that updates parent state on blur.
 * 
 * @param {string} content - The initial text content
 * @param {string} tagName - The HTML tag to render (p, h1, h2, etc.)
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 * @param {function} onChange - Callback when text changes (value) => void
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
    ...props
}) {
    const [text, setText] = useState(content);
    const elementRef = useRef(null);

    // Generate ID: {section_id}-{class_name}
    // We take the first class from className as the "class_name" identifier
    // If suffix is provided, we append it: {section_id}-{class_name}-{suffix}
    const firstClass = className.split(" ")[0] || tagName;
    const elementId = (sectionId && !noId) ? `${sectionId}-${firstClass}${suffix ? `-${suffix}` : ""}` : undefined;

    // Sync internal state if prop changes (e.g. undo/redo or initial load)
    useEffect(() => {
        if (elementRef.current && elementRef.current.innerText !== content) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setText(content);
            if (document.activeElement !== elementRef.current) {
                elementRef.current.innerText = content;
            }
        }
    }, [content]);

    const handleBlur = (e) => {
        const newText = e.target.innerText;
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

    return (
        <Tag
            id={elementId}
            ref={elementRef}
            className={`${className} ${!text ? "empty-builder-text" : ""}`}
            style={{ ...style, outline: "none", cursor: "default", minWidth: "1em", minHeight: "1em" }}
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            data-placeholder={placeholder}
            {...props}
        >
            {text}
        </Tag>
    );
}
