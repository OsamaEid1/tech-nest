export const fetchMyArticles = async (userId: string) => {
    try {
        const response = await fetch(`/api/article/get-my-articles?userId=${userId}`);
        if (!response.ok) 
            throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();
        return data.articles;
    } catch (error: any) {
        console.error("Failed to fetch article Or User have not any articles yet: ", error);
        throw error;
    }
};