"use client"
import MainButton from "components/ui/form/MainButton";
import { useRouter } from "next/navigation";
import Loading from "components/ui/Loading";
import { useState } from "react";
import MainInput from "components/ui/form/MainInput";
import Link from "next/link";
import { signIn } from "app/helpers/auth/signIn";
import { useAppDispatch } from "state/hooks";
import { setUserInfo } from "state/slices/userSlice";
import DynamicTitle from "@components/global/DynamicTitle";


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
                dispatch(setUserInfo(userInfo));
                location.href = '/admin/manage-articles';
            } else if (userInfo.role === "USER") {
                dispatch(setUserInfo(userInfo));
                location.href = '/';
            }
        } catch (error: any) {
            console.error(error);
            setError(error);
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center relative">
            <DynamicTitle title="Sign In" />
            <div className="main-card xl:w-[20vw]">
                {loading && <Loading className="rounded-main" />}
                <h2 className="font-extrabold mt-1 mb-8 text-4xl">Sign In</h2>
                <form
                    className="flex flex-col text-center w-full"
                    onSubmit={handleSubmit}
                >
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
                    {error && <span className="err-msg mt-2">{error}</span>}
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
                    <Link
                        href="/signup"
                        className="text-sm text-left underline mt-2 duration-300 hover:text-hovers focus:outline-none"
                    >
                        New User? Sign Up
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignIn