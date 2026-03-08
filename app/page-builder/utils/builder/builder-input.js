"use client";

import { useIdSync } from "../hooks/use-id-sync";
import BuilderText from "./builder-text";

export default function BuilderInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    className = "form-input",
    labelClassName = "form-label caption-regular",
    containerClassName = "form-group",
    isVisible = true,
    sectionId,
    id, // Current ID from props (e.g. nameFieldId)
    onIdChange,
    suffix,
    required = false,
    onVisibilityChange,
    onLabelChange,
    onRequiredChange,
    children, // For prefix/suffix wrappers
    ...props
}) {
    const { elementId } = useIdSync({
        id,
        sectionId,
        suffix: suffix || name,
        onIdChange
    });

    if (!isVisible) return null;

    return (
        <div className={containerClassName}>
            {label && (
                <BuilderText
                    tagName="label"
                    className={labelClassName}
                    htmlFor={elementId}
                    content={label}
                    onChange={onLabelChange}
                    sectionId={sectionId}
                    suffix={`${suffix || name}-label`}
                />
            )}

            {children ? (
                /* Handle cases like WhatsApp with the prefix wrapper */
                <div className="form-input-prefix-wrapper">
                    {children}
                    <input
                        id={elementId}
                        name={name}
                        className={className}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required={required}
                        {...props}
                    />
                </div>
            ) : (
                <input
                    id={elementId}
                    name={name}
                    className={className}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                />
            )}
        </div>
    );
}
