
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function Profile() {


    return (
        <div className='min-h-screen'>
            {/* Start Main Content */}
            <div className="w-[75%] px-20 pt-24 pb-20">
                <MainContent />
            </div>
            {/* End Main Content */}
            {/* Start Sidebar */}
            <div
                className='w-[25%] h-full fixed right-0 top-0 bottom-0 shadow-xl shadow-shadows p-5 flex justify-center items-center'
            >
                <Sidebar />
            </div>
            {/* End Sidebar */}
        </div>
    );
}

export default Profile;
