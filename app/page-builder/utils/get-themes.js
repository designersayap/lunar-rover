
export async function getThemes() {
    try {
        const res = await fetch('/api/themes');
        if (!res.ok) {
            console.error("Failed to fetch themes:", res.statusText);
            return [];
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await res.json();
        } else {
            console.warn("Received non-JSON response from /api/themes (likely HTML redirect)");
            return [];
        }
    } catch (error) {
        console.error("Error fetching themes:", error);
        return [];
    }
}
