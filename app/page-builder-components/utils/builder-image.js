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

    // If it's the placeholder, we might want a specific background color if the image itself is transparent (like the SVG)
    // But based on previous steps, the SVG has a transparent background and we want it on #676767.
    // However, the user request "make the image on every js file not as the css class" implies we should control this here.
    // Let's stick to a simple img tag first, and apply the background color via CSS if needed, 
    // or if the src is the placeholder, we can apply a style.

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
