import Cookies from 'js-cookie';


const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.SECRET_KEY);

export const getTokenAndSecretKey = async () => {
    const token = Cookies.get('token');

    try {
        if (!token) {
            throw new Error("Token or secret key not found in cookies");
        }

        return { token, SECRET_KEY };
    } catch(error) {
        console.error(error);
        return null;
    };
};