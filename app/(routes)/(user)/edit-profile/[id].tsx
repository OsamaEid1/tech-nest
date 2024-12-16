"use client"
import { INITIAL_USER_INFO } from "app/helpers/constants";
import UserInfoForm from "components/ui/form/UserInfoForm";
import { useRouter } from "next/navigation";
import { useState } from "react";


// Next
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "PS Hub | Super Admin",
// };

const EditProfile = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="min-h-screen flex justify-center items-center relative">
            <div className="
                    text-lg bg-white shadow-xl shadow-shadows w-fit flex flex-col justify-center items-center
                    pb-3 pt-2 px-6 rounded-main text-black
                ">
                <h2 className="font-extrabold mt-1 mb-8 text-4xl">Edit Profile</h2>
                <UserInfoForm 
                    userInfo={INITIAL_USER_INFO}    
                    handleSubmit={handleSubmit}
                    loading={loading}
                    submitButtonText="Edit Profile"
                />
                {error && <span className="err-msg mt-2">{ error }</span>}
            </div>
        </div>
    )
}

export default EditProfile