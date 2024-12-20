export const createNewTopic = async (name: string) => {
    try {
        const response = await fetch("/api/admin/topics/add-topic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData?.error || "An unexpected error occurred";
        }

        const result = await response.json();
        return result.topic;
    } catch (error) {
        console.error("Error while adding a topic:", error);
        if (typeof error !== 'string')
            throw 'An unexpected error occurred';
        
        throw error;
    }
};
