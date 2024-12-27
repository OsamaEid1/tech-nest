export const deleteMyArticle = async (userId: string, articleId: string) => {
    try {
        const response = await fetch(
            `/api/user/article/delete-my-article`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId, articleId})
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData?.error || "An unexpected error occurred";
        }

        const result = await response.json();
        return result.message;
    } catch (error) {
        console.error("Failed to delete the article: ", error);
        if (typeof error !== "string") throw "An unexpected error occurred";
        
        throw error;
    }
};
