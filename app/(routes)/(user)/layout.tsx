import Header from "@components/layout/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="mt-[65px]">
                {children}
            </main>
        </>
    );
}
