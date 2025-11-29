"use client";

import React from 'react';

/**
 * BuilderText Component
 * A wrapper component that handles contentEditable logic for inline editing.
 * 
 * @param {string} initialText - The text to display.
 * @param {function} onUpdate - Callback function when text is updated.
 * @param {string} propName - The name of the prop to update (e.g., 'title', 'description').
 * @param {string} as - The HTML tag to render (default: 'span').
 * @param {object} style - Inline styles to apply.
 * @param {string} className - CSS classes to apply.
 * @param {object} ...props - Other props to pass to the element.
 */
export default function BuilderText({
    initialText,
    onUpdate,
    propName,
    as: Tag = 'span',
    style = {},
    className = '',
    ...props
}) {
    const handleBlur = (e) => {
        if (onUpdate && propName) {
            onUpdate({ [propName]: e.currentTarget.textContent });
        }
    };

    // If onUpdate is provided, we are in "edit mode" (on the canvas)
    const isEditable = !!onUpdate;

    return (
        <Tag
            contentEditable={isEditable}
            suppressContentEditableWarning={isEditable}
            onBlur={isEditable ? handleBlur : undefined}
            style={{ outline: isEditable ? "none" : undefined, ...style }}
            className={className}
            onClick={isEditable ? (e) => e.stopPropagation() : undefined}
            {...props}
        >
            {initialText}
        </Tag>
    );
}
