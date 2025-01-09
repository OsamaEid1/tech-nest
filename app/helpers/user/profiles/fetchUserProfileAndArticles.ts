export const fetchUserProfileAndArticles = async (id: string) => {
    try {
        const response = await fetch(`/api/user/${id}`);

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
