export const fetchArticleById = async (id: string) => {
    try {
        const response = await fetch(`/api/user/article/get-article?id=${id}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }
        
        const data = await response.json();
        return data.article;
    } catch (error: any) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("Failed to fetch article: ", error);
        throw error;
    }
};