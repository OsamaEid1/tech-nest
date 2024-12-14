import { LikeData } from "app/helpers/constants";

export async function updateArticleLikes(articleId: string, updatedLikes: LikeData[]) {
    try {
        const response = await fetch("/api/article/update-article-likes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleId, updatedLikes }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Error updating likes:", error);
            throw error;
        }

        const result = await response.json();
        return result.updatedArticle;
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        throw error;
    }
}