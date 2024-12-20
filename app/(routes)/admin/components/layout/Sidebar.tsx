'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import NavLink from "@components/ui/NavLink"
import MainButton from "@components/ui/form/MainButton"
import { signOut } from "app/helpers/auth/signOut"

const AdminSidebar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className="bg-white w-[15vw] absolute z-[40] sm:fixed left-0 top-0 h-[64px] sm:h-screen sm:bottom-0 bg-secondary flex justify-center items-center">
            <button className=" sm:hidden mx-auto focus:outline-none" onClick={() => setShowMenu(true)}>
                <FontAwesomeIcon icon={faBars} color="white" size="lg" />
            </button>
            <aside
                className={`${showMenu ? 'fixed inset-0 z-[999] text-center sm:static' : 'hidden mt-[500px] sm:mt-0'}
                    sm:h-full sm:flex sm:flex-col sm:items-center sm:justify-between font-semibold
                    p-5 max-w-full
                `}
            >
                <button className="block ml-auto sm:hidden focus:outline-none" onClick={() => setShowMenu(false)}>
                    <FontAwesomeIcon icon={faClose} color="white" size="lg" />
                </button>
                <h2 className='text-secTextColor sm:text-lg md:text-xl lg:text-3xl text-nowrap tracking-tight'>TechNest</h2>
                <div>
                    <NavLink
                        exact
                        href={'/admin/manage-articles'}
                        className="p-1 px-2 sm:py-2 sm:px-3 rounded-full duration-300 hover:bg-hovers hover:text-white block text-center"
                        onClick={showMenu ? () => setShowMenu(false) : ''}
                    >
                        Manage Articles
                    </NavLink>
                    <NavLink
                        exact
                        href={'/admin/manage-topics'}
                        className="mt-3 p-1 px-2 sm:py-2 sm:px-3 rounded-full duration-300 hover:bg-hovers hover:text-white block text-center"
                        onClick={showMenu ? () => setShowMenu(false) : ''}
                    >
                        Manage Topics
                    </NavLink>
                </div>
            <MainButton
                className="px-8"
                onClick={() => signOut()}
            >
                Sign out
            </MainButton>
            </aside>
        </div>
    )
}

export default AdminSidebar