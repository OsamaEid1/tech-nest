import { CommentData } from "app/helpers/constants";

export async function updateArticleComments(articleId: string, updatedComments: CommentData[]) {
    try {
        const response = await fetch("/api/article/update-article-comments", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleId, updatedComments }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const result = await response.json();
        return result.updatedArticle;
    } catch (error) {
        console.error("An unexpected error occurred while updating comments: ", error);
        throw error;
    }
}