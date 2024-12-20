import { ArticleCard } from "app/helpers/constants";

export async function fetchSavedArticles(
    userId: string,
    savedArticlesIDs: string[]
) {
    try {
        const response = await fetch(`/api/user/article/get-saved-articles?userId=${userId}&savedArticlesIDs=${savedArticlesIDs.join(",")}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles as ArticleCard[];
    } catch (error: any) {
        if (typeof error  !== 'string') 
            throw 'There is an error occurred, Please try again later!'
        
        console.error("Failed to fetch saved article: ", error);
        throw error;
    }
}