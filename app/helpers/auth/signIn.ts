import { UserInfo } from "../constants";

export const signIn = async (email: string, password: string) => {
    try {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
    
        
        console.log("11 response: ", response);
        if (response.ok) {
            const data = await response.json();
            console.log("22 ", data);
            return data.user as UserInfo;
        } else {
            const errorData = await response.json();
            throw errorData.error;
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};