"use client"
import { memo } from "react";
import MainInput from "components/ui/form/MainInput";
import ImageUploader from "components/ui/form/ImageUploader";
import MainButton from "components/ui/form/MainButton";
import { UserInfo } from "app/helpers/constants";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { addToUserInfo } from "state/slices/userSlice";

type Props = {
    userInfo: UserInfo;
    handleSubmit: (e: React.FormEvent) => void;
    loading?: boolean;
    submitButtonText?: string;
    setPicFile: (file: File) => void
};

const UserInfoForm = memo(function UserInfoForm({ userInfo, handleSubmit, setPicFile, loading, submitButtonText='submit'} : Props) {
    const dispatch = useAppDispatch();
    const updatedUserInfo = useAppSelector(state => state.user.userInfoForm);

    return (
        <form className="flex flex-col text-center w-full" onSubmit={handleSubmit}>
            <ImageUploader setPicFile={setPicFile} />
            <MainInput 
                id="name"
                type="name" 
                placeholder="Name" 
                inputStyles="mb-4 w-[350px] max-w-full"
                value={userInfo?.name || updatedUserInfo.name}
                onChange={(e) => dispatch(addToUserInfo({name: e.target.value}))}
                required={true}
            />
            <MainInput 
                id="email"
                type="email" 
                placeholder="Email" 
                inputStyles="mb-4"
                value={userInfo?.email || updatedUserInfo.email}
                onChange={(e) => dispatch(addToUserInfo({email: e.target.value}))}
                required={true}
            />
            <MainInput 
                id="pass"
                type="password" 
                placeholder="Password"
                value={userInfo?.password || updatedUserInfo.password}
                onChange={(e) => dispatch(addToUserInfo({password: e.target.value}))}
                inputStyles="mb-4"
                required={true}
                />
            <MainInput 
                id="re-pass"
                type="password" 
                placeholder="Confirm Password"
                value={updatedUserInfo.rePassword}
                onChange={(e) => dispatch(addToUserInfo({rePassword: e.target.value}))}
                inputStyles="mb-4"
                required={true}
            />
            <MainButton
                type="submit"
                className="
                            w-fit mx-auto mt-5
                            font-semibold py-1 px-2
                        "
                        disabled={loading}
                    >
                        {submitButtonText}
            </MainButton>
        </form>
    )
});

export default UserInfoForm;