export const signIn = async (email: string, password: string) => {
    console.log(2);
    const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw data.error;
    }

    return data.user;
};