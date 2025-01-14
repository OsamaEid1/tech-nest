"use client"
import DynamicTitle from "@components/global/DynamicTitle";
import Loading from "@components/ui/Loading";
import Popup from "@components/ui/Popup";
import { INITIAL_USER_INFO } from "app/helpers/constants";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { updateUserInfo } from "app/helpers/profile/updateUserInfo";
import UserInfoForm from "components/ui/form/UserInfoForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { addToUserInfoForm, setUserInfo } from "state/slices/userSlice";


const EditProfile = () => {
    const [updateProfileLoading, setUpdateProfileLoading] = useState<boolean>(false);
    const [updateProfileErr, setUpdateProfileErr] = useState<string | null>(null);
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
    const [picFile, setPicFile] = useState<File | null>(null);
    
    const {loading: fetchProfileLoading, error: fetchProfileErr, userProfile} = useGetUserProfile();
    
    // Keep up with changes in the edit profile form
    const dispatch = useAppDispatch();
    const userInfoForm = useAppSelector(state => state.user.userInfoForm);
    const router = useRouter();
    useEffect(() => {
        if (userProfile) {
            const {name, email} = {...userProfile};
            dispatch(addToUserInfoForm({name, email}));
        }
    }, [userProfile]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateProfileLoading(true);
        setUpdateProfileErr(null);

        // Form validation
        if (!userInfoForm.name ||!userInfoForm.email) {
            setUpdateProfileErr(
                "Please fill in all fields including profile picture !"
            );
            setUpdateProfileLoading(false);
            return;
        }
        if (userInfoForm.password !== userInfoForm.rePassword) {
            setUpdateProfileErr("Passwords do not match !");
            setUpdateProfileLoading(false);
            return;
        }

        // Initialize Form Data
        const formData = new FormData();
        if (userProfile?.id) formData.append("id", userProfile.id);
        formData.append("name", userInfoForm.name);
        formData.append("email", userInfoForm.email);
        if (userInfoForm.password) formData.append("password", userInfoForm.password);
        if (picFile) formData.append("picFile", picFile);
        else if (userProfile) formData.append("picFile", userProfile.pic);


        // Perform Updating the profile
        try {
            const updatedUserInfo = await updateUserInfo(formData);
            setIsPopupOpened(true);
            const { name, email } = { ...updatedUserInfo };

            dispatch(addToUserInfoForm({name, email}));
            dispatch(setUserInfo(updatedUserInfo));
        } catch (error: any) {
            setUpdateProfileErr(error);
        } finally {
            setUpdateProfileLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-5 flex justify-center items-center relative">
            <DynamicTitle title='Edit Profile' />
            {isPopupOpened && (<Popup
                type="success"
                text="You have successfully updated your profile !"
                onToggle={() => setIsPopupOpened(false)}
            />)}
            <div className="main-card">
                <h2 className="font-extrabold mt-1 mb-8 text-4xl">Edit Profile</h2>
                {(fetchProfileLoading || updateProfileLoading) && (<Loading className="rounded-main" />)}
                <UserInfoForm 
                    userInfo={userProfile || INITIAL_USER_INFO}    
                    handleSubmit={handleSubmit}
                    setPicFile={setPicFile}
                    loading={fetchProfileLoading || updateProfileLoading}
                    submitButtonText="Edit Profile"
                />
                {(fetchProfileErr || updateProfileErr) && <span className="err-msg mt-2">{ fetchProfileErr || updateProfileErr }</span>}
            </div>
        </div>
    )
}

export default EditProfile