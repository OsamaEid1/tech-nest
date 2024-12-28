export const predictTheTopic = async (article: string) => {
    try {
        const response = await fetch("https://956b-34-83-138-168.ngrok-free.app/classify", {
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
