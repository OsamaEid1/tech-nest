
export default function ManageTopicsLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal?: React.ReactNode;
}>) {
    return (
        <>
            {modal}
            {children}
        </>
    );
}
