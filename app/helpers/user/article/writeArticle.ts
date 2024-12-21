export const writeArticle = async (formData: FormData) => {
    try {
        const response = await fetch("/api/user/article/write-article", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.article;
        } else {
            const data = await response.json();
            throw data.error;
        }
    } catch (error) {
        console.error("Error while creating new article: ", error);
        throw error;
    }
};
