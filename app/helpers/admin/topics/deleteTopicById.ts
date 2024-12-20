export const deleteTopicById = async (id: string) => {
    try {
        const response = await fetch(`/api/admin/topics/delete-topic?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData?.error || "An unexpected error occurred";
        }

        const result = await response.json();
        return result.message;
    } catch (error) {
        console.error("Failed to delete the topic: ", error);
        if (typeof error !== "string")
            throw "An unexpected error occurred";
        throw error;
    }
};
