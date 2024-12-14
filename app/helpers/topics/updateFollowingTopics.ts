export const updateFollowingTopics = async (id: string, followingTopics: string[]) => {
    try {
        const response = await fetch(`/api/user/update-following-topics`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, followingTopics}),
        });
        const data = await response.json();
        
        if (!response.ok) throw data.error;

        return data.updatedUser;
    } catch (error) {
        console.error('Failed to update the following topics:', error);
        throw error;
    }
};