export const signUp = async (formData: FormData) => {
    try {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            throw data.error;
        }
    } catch (error) {
        console.error("Error while signing up: ", error);
        throw error;
    }
};