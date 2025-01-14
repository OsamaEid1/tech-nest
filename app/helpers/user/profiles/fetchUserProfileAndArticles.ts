/**
 *
 *  Use process.env.NEXT_PUBLIC_BASE_URL to define the base URL for your app in the environment variables.
Fallback to http://localhost:3000 for local development.
2. Add the Environment Variable
In your .env.local file, add the base URL of your app:

NEXT_PUBLIC_BASE_URL=https://your-domain.com
 * 
 */

export const fetchUserProfileAndArticles = async (id: string) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${baseUrl}/api/user/${id}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";

        console.error("Failed to fetch user profile: ", error);
        throw error;
    }
};
