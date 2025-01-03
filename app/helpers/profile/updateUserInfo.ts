export const updateUserInfo = async (formData: FormData) => {
    try {
        const response = await fetch("/api/profile/update-user", {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.error || "Failed to update user profile.";
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        if (typeof error !== "string")
            throw "There is an error occurred, Please try again later!";
        
        console.error("Error updating user profile: ", error);
        throw error;
    }
};