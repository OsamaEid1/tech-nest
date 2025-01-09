'use client'
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function Profile() {
    const {loading, error, userProfile} = useGetUserProfile();
    

    return (
        <div className='min-h-screen'>
            {/* Start Main Content */}
            <div className="w-[75%] px-20 pt-24 pb-20">
                <MainContent userId={userProfile?.id} savedArticlesIDs={userProfile?.savedArticlesIDs} />
            </div>
            {/* End Main Content */}
            {/* Start Sidebar */}
            <div
                className='w-[25%] h-full fixed right-0 top-0 bottom-0 shadow-xl shadow-shadows p-5 flex justify-center items-center'
            >
                <Sidebar
                    id={userProfile?.id}
                    name={userProfile?.name}
                    pic={userProfile?.pic}
                    followingTopics={userProfile?.followingTopicsNames.length ? userProfile.followingTopicsNames : null}
                />
            </div>
            {/* End Sidebar */}
        </div>
    );
}

export default Profile;