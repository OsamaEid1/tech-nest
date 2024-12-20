export const fetchPendingArticles = async () => {
    try {
        const response = await fetch(`/api/admin/article/get-pending-articles`);

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles;
    } catch (error: any) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";

        console.error("Failed to fetch pending articles: ", error);
        throw error;
    }
};
