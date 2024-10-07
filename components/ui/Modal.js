const Modal = ({ children }) => {
    return (
        <div
            className="
                fixed inset-0 w-screen h-screen flex z-50 justify-center items-center bg-black/40
            "
        >
            <div className="shadow-lg shadow-slate-800 rounded-main">
                {children}
            </div>
        </div>
    )
};

export default Modal;