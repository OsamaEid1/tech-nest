import { LikeData } from "app/helpers/constants";

export async function updateArticleLikes(articleId: string, updatedLikes: LikeData[]) {
    try {
        const response = await fetch("/api/user/article/update-article-likes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleId, updatedLikes }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const result = await response.json();
        return result.updatedArticle;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("An unexpected error occurred while updating likes: ", error);
        throw error;
    }
}