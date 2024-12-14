export async function fetchSavedArticles(userId: string) {
    try {
        const response = await fetch(`/api/article/get-saved-articles?userId=${userId}`);

        if (!response.ok)
            throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        return data.articles;
    } catch (error: any) {
        console.error("Failed to fetch saved article: ", error);
        throw error;
    }
}