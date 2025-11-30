import { componentDefaults } from "../content/component-defaults";

/**
 * Exports the selected components to a CSV file.
 * Columns: Name of Section, Class ID, Content
 * @param {Array} selectedComponents - List of selected components.
 */
export const handleExportCsv = (selectedComponents) => {
    if (!selectedComponents || selectedComponents.length === 0) {
        alert("No components to export.");
        return;
    }

    // CSV Header
    const headers = ["Name of Section", "Class ID", "Content"];

    // CSV Rows
    const rows = selectedComponents.map(component => {
        const name = `"${component.name.replace(/"/g, '""')}"`; // Escape quotes
        const classId = `${component.id}-${component.uniqueId}`;

        // Get default content for this component ID
        const defaults = componentDefaults[component.id] || {};

        // Merge defaults with current props (props take precedence if they exist)
        // Note: Currently props are mostly style configs, but if we add content props later, this handles it.
        const combinedContent = { ...defaults, ...(component.props || {}) };

        // Content: Format as key: value
        let content = "";
        if (Object.keys(combinedContent).length > 0) {
            content = Object.entries(combinedContent)
                .map(([key, val]) => {
                    // Handle arrays/objects in content (e.g. menu items)
                    const displayVal = typeof val === 'object' ? JSON.stringify(val) : val;
                    return `${key}: ${displayVal}`;
                })
                .join("; ");
            content = `"${content.replace(/"/g, '""')}"`;
        }

        return [name, classId, content].join(",");
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
