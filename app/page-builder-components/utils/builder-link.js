"use client";

import Link from "next/link";

/**
 * BuilderLink Component
 * Renders a link with consistent ID generation and builder-safe navigation.
 * 
 * @param {string} href - Link URL
 * @param {string} className - CSS classes
 * @param {string} sectionId - Parent section ID
 * @param {string} suffix - ID suffix (e.g. 'product-1')
 * @param {object} style - Inline styles
 * @param {React.ReactNode} children - Link content
 */
export default function BuilderLink({
    href = "#",
    className = "",
    sectionId,
    suffix,
    children,
    style = {}
}) {
    // Generate ID: {sectionId}-{suffix} or {sectionId}-link if no suffix
    const linkId = sectionId ? `${sectionId}-${suffix || 'link'}` : undefined;

    const handleClick = (e) => {
        // Prevent navigation in builder
        e.preventDefault();
    };

    return (
        <Link
            id={linkId}
            href={href || "#"}
            className={className}
            onClick={handleClick}
            style={style}
        >
            {children}
        </Link>
    );
}
