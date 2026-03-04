"use client";

import { useIdSync } from "../hooks/use-id-sync";
import BuilderText from "./builder-text";

export default function BuilderSelect({
    label,
    labelContent, // For BuilderText
    onLabelChange, // For BuilderText
    type = "select", // select, checkbox, radio
    name,
    value,
    onChange,
    className,
    containerClassName = "form-group",
    isVisible = true,
    sectionId,
    id,
    onIdChange,
    suffix,
    required = false,
    onVisibilityChange,
    onRequiredChange,
    options = [], // For select type
    ...props
}) {
    const { elementId } = useIdSync({
        id,
        sectionId,
        suffix: suffix || name,
        onIdChange
    });

    if (!isVisible) return null;

    // Render for Dropdown (Select)
    if (type === "select") {
        return (
            <div className={containerClassName}>
                {label && (
                    <label className="form-label caption-regular" htmlFor={elementId}>
                        {label}
                    </label>
                )}
                <select
                    id={elementId}
                    name={name}
                    className={className || "form-select"}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // Render for Checkbox or Radio
    return (
        <div className={containerClassName}>
            <label className="form-checkbox-group" htmlFor={elementId}>
                <input
                    type={type}
                    id={elementId}
                    name={name}
                    className={className || (type === "checkbox" ? "form-checkbox" : "form-radio")}
                    checked={type === "checkbox" || type === "radio" ? value : undefined}
                    onChange={onChange}
                    required={required}
                    {...props}
                />
                <BuilderText
                    tagName="span"
                    className="form-checkbox-label body-regular"
                    content={labelContent}
                    onChange={onLabelChange}
                    sectionId={sectionId}
                    suffix={suffix}
                />
            </label>
        </div>
    );
}
