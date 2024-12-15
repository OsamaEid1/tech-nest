import Header from "@components/layout/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Header />
            <main>
                {children}
            </main>
        </html>
    );
}
