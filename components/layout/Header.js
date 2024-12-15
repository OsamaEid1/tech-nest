'use client'
import { signOut } from "app/helpers/auth/signOut"
import MainButton from "../ui/form/MainButton"
import Link from "next/link"

const Header = ({ }) => {
    return (
        <header className="
                    max-w-full flex items-center justify-between gap-x-24 py-3 px-8 bg-secondary
                ">
            <h3 className="text-2xl font-extrabold tracking-tight">
                <Link href="/">
                    TechNest
                </Link>
            </h3>
            <MainButton
                onClick={() => signOut()}
            >
                Sign out
            </MainButton>
        </header>
    )
}

export default Header