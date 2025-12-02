"use client";

import Link from "next/link";
import BuilderText from "./builder-text";

/**
 * BuilderButton Component
 * Renders a button or link with consistent styling and ID generation.
 * 
 * @param {string} label - Button text
 * @param {string} href - Link URL
 * @param {string} variant - ID variant suffix (e.g. 'cta', 'primary')
 * @param {string} sectionId - Parent section ID
 * @param {string} className - CSS classes
 * @param {function} onLabelChange - Callback when label changes
 * @param {function} onHrefChange - Callback when href changes (not yet implemented in UI but good to have)
 */
export default function BuilderButton({
    label = "Label",
    href = "#",
    suffix,
    sectionId,
    className = "",
    onLabelChange,
    style = {},
    iconLeft,
    iconRight
}) {
    // Extract the button variant class (e.g., btn-primary, btn-ghost) from className
    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && !['btn-lg', 'btn-md', 'btn-sm', 'btn-icon'].includes(c)) || 'btn-default';

    const buttonId = sectionId ? `${sectionId}-${variantClass}${suffix ? `-${suffix}` : ''}` : undefined;

    // If href is empty, we still render the button in builder mode to allow editing
    // if (!href) return null;

    const handleClick = (e) => {
        // Prevent navigation in builder
        e.preventDefault();
    };

    return (
        <Link
            id={buttonId}
            href={href || "#"}
            className={className}
            onClick={handleClick}
            style={style}
        >
            {iconLeft}
            <BuilderText
                tagName="span"
                content={label}
                onChange={onLabelChange}
                placeholder="Button Label"
                multiline={false}
                noId={true}
            />
            {iconRight}
        </Link>
    );
}
