import AdminSidebar from "./components/layout/Sidebar";

export default function AdminLayout({
        children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
        return (
            <div className="overflow-hidden">
                <AdminSidebar />ّ
                <section className="w-[85vw] ml-[15vw] px-12">
                    {children}
                </section>
            </div>
        );
}