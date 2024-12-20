export const fetchAllTopics = async () => {
    try {
        const response = await fetch(`/api/topics/get-all-topics`);
        
        if (!response.ok){
            const errorData = await response.json();
            throw errorData.error;
        }
        
        const data = await response.json();
        return data.topics;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("Failed to fetch all topics: ", error);
        throw error;
    }
};