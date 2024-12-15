"use client"
import SelectTopicsBox from './components/SelectTopicsBox'

function ManageFollowingTopics() {
    return (
        <div className="min-h-screen flex justify-center items-center relative text-left py-8">
            <div className="
                    text-lg bg-white shadow-xl shadow-shadows w-fit max-w-[500px] flex flex-col justify-center items-center
                    py-3 px-5 rounded-main text-black relative
                ">
                <h4 className="font-extrabold mt-1 mb-8 text-xl">Choose The Topics That Interest You</h4>
                <div className="text-center">
                    <SelectTopicsBox />
                </div>
            </div>
        </div>
    )
}

export default ManageFollowingTopics