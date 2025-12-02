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
    label = "Button",
    href = "#",
    suffix,
    sectionId,
    className = "",
    onLabelChange,
    style = {}
}) {
    // Extract the button variant class (e.g., btn-primary, btn-ghost) from className
    const variantClass = className.split(' ').find(c => c.startsWith('btn-') && c !== 'btn-lg' && c !== 'btn-md' && c !== 'btn-sm' && c !== 'btn-icon') || 'btn-default';

    const buttonId = sectionId ? `${sectionId}-${variantClass}${suffix ? `-${suffix}` : ''}` : undefined;

    // If href is empty, don't render the button (per previous logic)
    if (!href) return null;

    const handleClick = (e) => {
        // Prevent navigation in builder
        e.preventDefault();
    };

    return (
        <Link
            id={buttonId}
            href={href}
            className={className}
            onClick={handleClick}
            style={style}
        >
            <BuilderText
                tagName="span"
                content={label}
                onChange={onLabelChange}
            />
        </Link>
    );
}
