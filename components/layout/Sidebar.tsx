import Image from "next/image"
import NavLink from "../ui/NavLink"

const Sidebar = ({ links }) => {

    return (
        <aside
            className='
                w-[15vw] min-h-screen flex flex-col items-center justify-center text-white font-semibold
                bg-secondary p-5
                fixed right-0 top-0 bottom-0
            '
        >
            <Image src="/logo.png" width={80} height={80} alt="Logo" />
            <h2 className='pb-5'>Name</h2>
            <ul>
                {links?.map((link: string[], index: number) => (
                    <li key={index} className="p-3 ">
                        <NavLink
                            exact
                            href={link[1]}
                            className="p-2 px-3 rounded-full duration-300 hover:bg-elementHover hover:text-mainActiveText"
                        >
                            {link[0]}
                        </NavLink>
                        </li>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar