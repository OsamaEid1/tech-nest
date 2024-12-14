async function updateSavedArticles(userId: string, savedArticlesIDs: string[]) {
    try {
        const response = await fetch('/api/article/update-saved-articles', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, savedArticlesIDs }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to update saved articles:", errorData.error);
            throw errorData.error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating saved articles:", error);
        throw error;
    }
}