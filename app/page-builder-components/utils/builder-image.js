"use client";

import styles from "../../page.module.css";

/**
 * BuilderImage Component
 * Renders an image with consistent styling and placeholder support.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 */
export default function BuilderImage({
    src,
    alt = "#",
    className = "",
    style = {}
}) {
    const imageSrc = src || "/images/placeholder.svg";
    const isPlaceholder = !src || src === "/images/placeholder.svg";
    const finalStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        backgroundColor: isPlaceholder ? "#676767" : "transparent",
        ...style
    };
    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            style={finalStyle}
        />
    );
}
