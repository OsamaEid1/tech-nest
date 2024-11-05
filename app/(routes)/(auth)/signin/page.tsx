"use client"
import MainButton from "components/ui/form/MainButton";
// import { signIn } from "./helpers/auth/signIn";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Constants
// import { superAdminSidebarLinks } from "./helpers/constants";
// import { adminSidebarLinks } from "./helpers/constants";
import Loading from "components/ui/Loading";
import { useState } from "react";
import MainInput from "components/ui/form/MainInput";

// Next
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "PS Hub | Super Admin",
// };

const SignIn = () => {
    const [password, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [loading, setIsLoading] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // try {
        //     const data = await signIn(email, password);
        //     // Handle redirection based on user role
        //     if (data.user.role === "ADMIN") {
        //         localStorage.setItem("sidebar-links", JSON.stringify(adminSidebarLinks));
        //         router.replace('/admin/display-rooms');
        //     } else if (data.user.role === 'SUPER_ADMIN') {
        //         localStorage.setItem("sidebar-links", JSON.stringify(superAdminSidebarLinks))
        //         router.replace('/super-admin/dashboard');
        //     } else {
        //         alert('ليس لديك صلاحية للدخول، راجع مدير النظم!');
        //         window.location.reload();
        //     }
        // } catch (error: any) {
        //     setError(errormessage);
        // } finally {
        //     setIsLoading(false);
        // }
    };


    return(
        <div className="min-h-screen flex justify-center items-center relative">
            {/* {loading && (
                // <Loading />
            )} */}
            <div className="
                    text-lg bg-white shadow-xl shadow-shadows w-fit max-w-[280px] flex flex-col justify-center items-center
                    py-7 px-5 rounded-main text-black
                ">
                <h2 className="font-extrabold mt-1 mb-8 text-4xl">Sign In</h2>
                <form className="flex flex-col text-center" onSubmit={handleSubmit}>
                    <MainInput 
                        id="email"
                        type="email" 
                        placeholder="Email" 
                        inputStyles="mb-3 w-[230px] max-w-full"
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
                    {error && <span className="err-msg mt-2">{ error }</span>}
                    <MainButton
                        type="submit"
                        className="
                            w-fit mx-auto mt-5
                            font-semibold py-1 px-2
                        "
                        disabled={loading}
                    >
                        Sign In
                    </MainButton>
                </form>
            </div>
        </div>
    )
}

export default SignIn