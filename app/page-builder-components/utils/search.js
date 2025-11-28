/**
 * Filters the component library based on a search query.
 * @param {string} query - The search query.
 * @param {object} library - The component library object.
 * @returns {object} - The filtered component library.
 */
export const searchComponents = (query, library) => {
    if (!query) return library;

    const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const filteredLibrary = {};

    Object.keys(library).forEach(category => {
        const lowerCategory = category.toLowerCase();

        const filteredComponents = library[category].filter(component => {
            const lowerName = component.name.toLowerCase();
            // Combine category and component name for search
            const combinedSearchableText = `${lowerCategory} ${lowerName}`;
            // Check if all query terms are present in the combined text
            return queryTerms.every(term => combinedSearchableText.includes(term));
        });

        if (filteredComponents.length > 0) {
            filteredLibrary[category] = filteredComponents;
        }
    });

    return filteredLibrary;
};

/**
 * Filters analytics sections based on a search query.
 * @param {string} query - The search query.
 * @param {Array} sections - The list of analytics sections.
 * @returns {Array} - The filtered list of analytics sections.
 */
export const searchAnalytics = (query, sections) => {
    if (!query) return sections;

    const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return sections.filter(section => {
        const lowerTitle = section.title.toLowerCase();
        return queryTerms.every(term => lowerTitle.includes(term));
    });
};
