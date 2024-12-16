import { ArticleCard } from "app/helpers/constants";

export async function fetchRelatedArticles(topics = []) {
    try {
        // Construct the query string
        const query = topics.length > 0 ? `?topics=${topics.join(",")}` : "";
        const response = await fetch(`/api/article/get-related-articles${query}`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles as ArticleCard[];
    } catch (error) {
        console.error("Failed to fetch articles: ", error);
        throw error;
    }
}