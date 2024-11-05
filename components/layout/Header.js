import MainButton from "../ui/form/MainButton"

const Header = ({ }) => {
    return (
        <header className="
                    max-w-full flex items-center justify-between gap-x-24 py-3 px-8 bg-secondary
                ">
            <h3 className="text-2xl">
                TechNest
            </h3>
            <MainButton>
                Sign out
            </MainButton>
        </header>
    )
}

export default Header