import { ArticleCard } from "app/helpers/constants";

export const fetchMyArticles = async (userId: string) => {
    try {
        const response = await fetch(`/api/article/get-my-articles?userId=${userId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles as ArticleCard[];
    } catch (error: any) {
        console.error("Failed to fetch article Or User have not wrote any articles yet: ", error);
        throw error;
    }
};