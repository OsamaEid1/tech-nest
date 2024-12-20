import { ArticleCard } from "app/helpers/constants";

export const fetchMyArticles = async (userId: string) => {
    try {
        const response = await fetch(`/api/user/article/get-my-articles?userId=${userId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data.articles as ArticleCard[];
    } catch (error: any) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("Failed to fetch article Or User have not wrote any articles yet: ", error);
        throw error;
    }
};