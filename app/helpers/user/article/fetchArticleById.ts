/**
 *
 *  Use process.env.NEXT_PUBLIC_BASE_URL to define the base URL for your app in the environment variables.
Fallback to http://localhost:3000 for local development.
2. Add the Environment Variable
In your .env.local file, add the base URL of your app:

NEXT_PUBLIC_BASE_URL=https://your-domain.com
 * 
 */

export const fetchArticleById = async (id: string) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${baseUrl}/api/user/article/get-article?id=${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }
        
        const data = await response.json();
        return data.article;
    } catch (error: any) {
        if (typeof error !== "string") {
            console.error(error)
            throw "There is an error occurred, Please try again later!";
        }
        
        console.error("Failed to fetch article: ", error);
        throw error;
    }
};