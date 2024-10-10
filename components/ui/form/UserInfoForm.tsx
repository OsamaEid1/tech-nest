"use client"
import { useState } from "react";
import MainInput from "components/ui/form/MainInput";
import ImageUploader from "components/ui/form/ImageUploader";
import MainButton from "components/ui/form/MainButton";
import Loading from "components/ui/Loading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserInfo } from "components/constants";

type Props = {
    userInfo: UserInfo;
    handleSubmit: (e: React.FormEvent) => {};
    loading: boolean;
    submitButtonText?: string;
};

function UserInfoForm({ userInfo, handleSubmit, loading, submitButtonText='submit'} : Props) {
    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [password, setPass] = useState(userInfo?.password);
    const [rePassword, setRePass] = useState('');
    
    return (
        <form className="flex flex-col text-center" onSubmit={handleSubmit}>
            {loading && (
                <Loading />
            )}
            <ImageUploader />
            <MainInput 
                id="name"
                type="name" 
                placeholder="Name" 
                inputStyles="mb-3 w-[270px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
            />
            <MainInput 
                id="email"
                type="email" 
                placeholder="Email" 
                inputStyles="mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                />
            <MainInput 
                id="pass"
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                inputStyles="mb-3"
                required={true}
                />
            <MainInput 
                id="re-pass"
                type="password" 
                placeholder="Password"
                value={rePassword}
                onChange={(e) => setRePass(e.target.value)}
                inputStyles="mb-3"
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
}

export default UserInfoForm