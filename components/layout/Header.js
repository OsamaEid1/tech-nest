import MainButton from "../ui/form/MainButton"

const Header = ({ }) => {
    return (
        <header className="max-w-full flex items-center justify-between gap-x-24
                            py-3 px-8 bg-secondary
                ">
            <MainButton>
                تسجيل خروج
            </MainButton>
            <h3>
                ! مرحباً <span className="text-red-500 font-semibold ">أسامة</span>
            </h3>
        </header>
    )
}

export default Header