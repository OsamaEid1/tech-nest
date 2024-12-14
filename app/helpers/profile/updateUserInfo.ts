export const updateUserInfo = async (formData: FormData) => {
    try {
        const response = await fetch("/api/profile/update-user", {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update user profile.");
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};