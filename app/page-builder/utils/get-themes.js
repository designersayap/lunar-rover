
export async function getThemes() {
    try {
        const res = await fetch('/api/themes');
        if (!res.ok) {
            console.error("Failed to fetch themes:", res.statusText);
            return [];
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching themes:", error);
        return [];
    }
}
