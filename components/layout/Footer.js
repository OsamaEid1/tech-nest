import Link from "next/link";

export default function Footer() {
    return (
        <footer className="absolute bottom-0 left-0 right-0 text-center bg-white p-2 text-sm text-gray-800 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
                TechNest
            </Link>
            . All Rights Reserved.
        </footer>
    );
}
