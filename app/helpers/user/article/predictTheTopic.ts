export const predictTheTopic = async (article: string) => {
    try {
<<<<<<< HEAD
        const response = await fetch("https://be49-35-201-169-156.ngrok-free.app/classify", {
=======
        const response = await fetch("https://7422-35-189-18-94.ngrok-free.app/classify", {
>>>>>>> f189509 (Add outSourceArticleUrl to Article model to accept)
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: article }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.tag;
        } else {
            const data = await response.json();
            throw data.error;
        }
    } catch (error) {
        console.error("Error while predicting the article's topic: ", error);
        throw 'There is an error occurred, You can choose a one by yourself for now.';
    }
};
