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
        userInfoForm: {} as SigningUpUserInfo,
        userInfo: {} as UserInfo
    },
    reducers: {
        addToUserInfo(state, action) {
            const updatedUserInfo = action.payload;
            state.userInfoForm = { ...state.userInfoForm, ...updatedUserInfo };
        },
        setUSerInfo(state, action) {
            const updatedUserInfo = action.payload;
            state.userInfoForm = { ...state.userInfo, ...updatedUserInfo };
        }
    }
});

export const { addToUserInfo, setUSerInfo } = userSlice.actions;