import { ArticleCard } from "app/helpers/constants";

export async function fetchSavedArticles(userId: string) {
    try {
        const response = await fetch(`/api/article/get-saved-articles?userId=${userId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles as ArticleCard[];
    } catch (error: any) {
        console.error("Failed to fetch saved article: ", error);
        throw error;
    }
}