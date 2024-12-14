"use client"
import MainButton from "components/ui/form/MainButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "components/ui/Loading";
import { useState } from "react";
import MainInput from "components/ui/form/MainInput";
import Link from "next/link";
import { signIn } from "app/helpers/auth/signIn";
import { useAppDispatch } from "state/hooks";


const SignIn = () => {
    const [password, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const userInfo = await signIn(email, password);
            // Handle redirection based on user role
            if (userInfo.role === "ADMIN") {
                dispatch(userInfo);
                router.replace('/admin/dashboard');
            } else {
                dispatch(userInfo);
                router.replace('/');
            }
        } catch (error: any) {
            setError(error);
            setIsLoading(false);
        }
    };


    return(
        <div className="min-h-screen flex justify-center items-center relative">
            {loading && (<Loading />)}
            <div className="main-card xl:w-[20vw]">
                <h2 className="font-extrabold mt-1 mb-8 text-4xl">Sign In</h2>
                <form className="flex flex-col text-center w-full" onSubmit={handleSubmit}>
                    <MainInput 
                        type="email" 
                        placeholder="Email" 
                        inputStyles="mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <MainInput 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
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
                    <Link href="/signup"
                        className="text-sm text-left underline mt-2 duration-300 hover:text-hovers focus:outline-none"
                    >
                        New User? Sign Up 
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn