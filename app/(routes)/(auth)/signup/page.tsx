"use client"
import Loading from "@components/ui/Loading";
import { signUp } from "app/helpers/auth/signUp";
import { INITIAL_USER_INFO } from "app/helpers/constants";
import UserInfoForm from "components/ui/form/UserInfoForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";


const SignUp = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [picFile, setPicFile] = useState<File | null>(null);

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state => state.user.userInfoForm);
    
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Reset
        setIsLoading(true);
        setError(null);

        // Form validation
        if (!picFile || !userInfo.name || !userInfo.email || !userInfo.password || !userInfo.rePassword) {
            setError("Please fill in all fields including profile picture !");
            setIsLoading(false);
            return;
        }
        if (userInfo.password !== userInfo.rePassword) {
            setError("Passwords do not match !");
            setIsLoading(false);
            return;
        }

        // Initialize Form Data
        const formData = new FormData();
        formData.append("name", userInfo.name);
        formData.append("email", userInfo.email);
        formData.append("password", userInfo.password);
        formData.append("picFile", picFile);

        // Perform Signing Up
        try {
            await signUp(formData);
            alert("You have successfully Signed Up !");
            router.replace('/'); // Redirect to Home Page
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen  flex justify-center items-center relative">
            <div className="main-card">
                {loading && (<Loading className="rounded-main" />)}
                <h2 className="font-extrabold mt-1 mb-8 text-4xl">Sign Up</h2>
                <UserInfoForm 
                    userInfo={INITIAL_USER_INFO}    
                    handleSubmit={handleSubmit}
                    setPicFile={setPicFile}
                    loading={loading}
                    submitButtonText="Sign Up"
                />
                {error && <span className="err-msg mt-2">{ error }</span>}
            </div>
        </div>
    )
}

export default SignUp;