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
    onChange
}) {
    const [text, setText] = useState(content);
    const elementRef = useRef(null);

    // Sync internal state if prop changes (e.g. undo/redo or initial load)
    useEffect(() => {
        if (elementRef.current && elementRef.current.innerText !== content) {
            setText(content);
            elementRef.current.innerText = content;
        }
    }, [content]);

    const handleBlur = (e) => {
        const newText = e.target.innerText;
        if (newText !== content && onChange) {
            onChange(newText);
        }
    };

    const handleInput = (e) => {
        // Optional: Update local state immediately if needed for other UI feedback
        // setText(e.target.innerText);
    };

    const Tag = tagName;

    return (
        <Tag
            ref={elementRef}
            className={className}
            style={{ ...style, outline: "none", cursor: "text" }}
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onInput={handleInput}
        >
            {text}
        </Tag>
    );
}
