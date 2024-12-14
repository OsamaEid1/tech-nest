export const fetchUserProfile = async (id: string) => {
    try {
        const response = await fetch(`/api/profile/get-user?id=${id}`);
        if (!response.ok) 
            throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("Failed to fetch user profile: ", error);
        throw error;
    }
};