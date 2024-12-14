export const fetchUserProfile = async (id: string) => {
    try {
        const response = await fetch(`/api/article/get-article?id=${id}`);
        if (!response.ok) 
            throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();
        return data.article;
    } catch (error: any) {
        console.error("Failed to fetch article: ", error);
        throw error;
    }
};