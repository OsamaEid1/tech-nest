export default async function updateSavedArticles(userId: string, savedArticlesIDs: string[]) {
    try {
        const response = await fetch('/api/user/article/update-saved-articles', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, savedArticlesIDs }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("Error while updating saved articles: ", error);
        throw error;
    }
}