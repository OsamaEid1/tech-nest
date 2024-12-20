export const updateFollowingTopics = async (id: string, followingTopics: string[]) => {
    try {
        const response = await fetch(`/api/user/update-following-topics`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, followingTopics}),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error;
        }
        
        const data = await response.json();
        return data.updatedUser;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error('Failed to update the following topics: ', error);
        throw error;
    }
};