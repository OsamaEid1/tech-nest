export const updateArticleStatus = async (articleId: string, status: 'approved' | 'refused', refusingReason: string | undefined) => {
    try {
        const response = await fetch("/api/admin/article/update-article-status", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({articleId, status, refusingReason}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error || "Failed to update article status.";
        }

        const data = await response.json();
        return data.article;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";

        console.error("Error updating article status: ", error);
        throw error;
    }
};
