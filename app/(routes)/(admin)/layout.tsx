import  Header from "components/layout/Header"

export default function AdminLayout({
        children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {

        // const [sidebarLinks, setSidebarLinks] = useState<[string, unknown][]>([]);
        // useEffect(() => {
        //     const links = localStorage.getItem("sidebar-links") || "";
        //     const parsedLinks = JSON.parse(links);

        //     setSidebarLinks(Object.entries(parsedLinks));
        // }, [])


        return (
            <>
                <Header />
                {/* <Sidebar links={sidebarLinks} />ّ */}
                <section className="w-[85vw] container px-8">
                    {children}
                </section>
            </>
        );
}