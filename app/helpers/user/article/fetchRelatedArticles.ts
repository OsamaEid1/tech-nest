import { ArticleCard } from "app/helpers/constants";

export async function fetchRelatedArticles(topics: string[]) {
    try {
        // Construct the query string
        const query = topics.length > 0 ? `${topics.join(",")}` : "";
        const response = await fetch(`/api/user/article/get-related-articles?topics=${encodeURIComponent(query)}`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles as ArticleCard[];
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("Failed to fetch articles: ", error);
        throw error;
    }
}