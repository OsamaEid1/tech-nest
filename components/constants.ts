type UserInfo = {
    img: string;
    name: string;
    email: string;
    password: string;
}

const INITIAL_USER_INFO : UserInfo = {
    img: "",
    name: "",
    email: "",
    password: "",
} 

export {
    INITIAL_USER_INFO
}

export type {
    UserInfo,
}