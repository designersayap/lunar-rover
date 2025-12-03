import { componentDefaults } from "@/app/template-components/content/data";

/**
 * Determine the property type of a content field
 * @param {string} key - The field key
 * @param {any} value - The field value
 * @returns {string} - The property type (text, link, or image)
 */
function getPropertyType(key, value) {
    const lowerKey = key.toLowerCase();

    // Check if it's an image field
    if (lowerKey.includes('image') || lowerKey.includes('img') || lowerKey.includes('logo') || lowerKey.includes('icon')) {
        return 'image';
    }

    // Check if it's a link field
    if (lowerKey.includes('link') || lowerKey.includes('url') || lowerKey.includes('href')) {
        return 'link';
    }

    // Check if the value looks like a URL
    if (typeof value === 'string') {
        if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('//')) {
            return 'link';
        }
        if (value.startsWith('assets/') || value.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
            return 'image';
        }
    }

    // Default to text
    return 'text';
}

/**
 * Exports the selected components to a CSV file.
 * Columns: section_instance_id, content_key, content_value, property
 * @param {Array} selectedComponents - List of selected components.
 */
export const handleExportCsv = (selectedComponents) => {
    if (!selectedComponents || selectedComponents.length === 0) {
        alert("No components to export.");
        return;
    }

    // CSV Header
    const headers = ["content_key", "content_value", "property"];

    // CSV Rows - each component becomes multiple rows
    const rows = [];

    selectedComponents.forEach(component => {
        // Use custom sectionId if available, otherwise fall back to id-uniqueId
        const sectionInstanceId = component.sectionId || `${component.id}-${component.uniqueId}`;

        // Get default content for this component ID
        const defaults = componentDefaults[component.id] || {};

        // Merge defaults with current props
        const combinedContent = { ...defaults, ...(component.props || {}) };

        // Create a row for each content field
        Object.entries(combinedContent).forEach(([key, value]) => {
            // Handle arrays by creating separate rows for each item
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    // Create indexed key (e.g., menuItem_1, menuItem_2)
                    const fieldName = `${key.replace(/s$/, '')}_${index + 1}`;
                    const contentKey = `${sectionInstanceId}-${fieldName}`;

                    // Handle objects within arrays
                    let displayValue = item;
                    if (typeof item === 'object' && item !== null) {
                        displayValue = JSON.stringify(item);
                    }

                    // Determine property type
                    const propertyType = getPropertyType(fieldName, displayValue);

                    // Escape quotes for CSV
                    const escapedValue = `"${String(displayValue).replace(/"/g, '""')}"`;

                    rows.push([contentKey, escapedValue, propertyType].join(","));
                });
            } else {
                // Handle non-array values
                let displayValue = value;
                if (typeof value === 'object' && value !== null) {
                    displayValue = JSON.stringify(value);
                }

                // Determine property type
                const propertyType = getPropertyType(key, displayValue);

                // Construct content_key: sectionId-fieldName
                const contentKey = `${sectionInstanceId}-${key}`;

                // Escape quotes for CSV
                const escapedValue = `"${String(displayValue).replace(/"/g, '""')}"`;

                rows.push([contentKey, escapedValue, propertyType].join(","));
            }
        });
    });

    // Combine header and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create Blob and Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "template_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
