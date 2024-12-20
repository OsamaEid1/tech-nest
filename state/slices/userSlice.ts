import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "app/helpers/constants";

type SigningUpUserInfo = {
    name: string,
    email: string,
    password: string,
    rePassword: string
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {} as UserInfo,
        userInfoForm: {} as SigningUpUserInfo,
    },
    reducers: {
        addToUserInfoForm(state, action) {
            const updatedUserInfo = action.payload;
            state.userInfoForm = { ...state.userInfoForm, ...updatedUserInfo };
        },
        setUserInfo(state, action) {
            const updatedUserInfo = action.payload;
            state.userInfo = { ...state.userInfo, ...updatedUserInfo };
        }
    }
});

export const { addToUserInfoForm, setUserInfo } = userSlice.actions;