/**
 * Filters the component library based on a search query.
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


