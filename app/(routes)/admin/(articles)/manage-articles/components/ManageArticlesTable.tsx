"use client"
import Loading from '@components/ui/Loading'
import Popup from '@components/ui/Popup'
import Link from 'next/link'
// React
import React, { useState } from 'react'
// FontAwesome


type Props = {
    body: any,
    // updateAdminsCount: (length: number) => void
    // updateActiveAdminsCount: (length: number) => void
    // updateInactiveAdminsCount: (length: number) => void
}
//  updateAdminsCount, updateActiveAdminsCount, updateInactiveAdminsCount

function ManageArticlesTable({ body } : Props) {
    const [articles, setArticles] = useState(body);
    
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<string>("normal");
    const [popupText, setPopupText] = useState<string>("");
    
    const [actionType, setActionType] = useState<"" | "toggleActivation" | "delete">("");
    const [triggeredAdminId, setTriggeredAdminId] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    

    // Admin Activation Toggle Operations
    const handleToggleActivation = (name: string, id:string) => {
        setIsPopupOpened(true);
        setPopupText(`هل أنت متأكد من أنك تريد تغيير حالة المسئول: (${name})؟`);

        setActionType("toggleActivation");
        setTriggeredAdminId(id);
    };
    const confirmToggleAdminActivation = async () => {
        setLoading(true);
        setError(null);

        // Get Triggered Admin
        // let admin = admins.find(admin => admin.id === triggeredAdminId);
        // Update the status
        try {
            // const updatedAdmin = await updateUserById({...admin, isActive: !admin.isActive}, admin.id);
            // Update the state
            // const updatedAdmins = admins.map(admin => admin.id === updatedAdmin.id ? updatedAdmin : admin);
            // setAdmins(updatedAdmins);
            // handleUpdateAdminsCountsStats(updatedAdmins);
            // Reset
            handlePopupToggle();
        } catch (error: any) {
            setError("حدث خطأ ما، حاول ثانيةً أو أعد تحميل الصفحة");
        } finally {
            setLoading(false);
        }
    }; 
    const handleUpdateAdminsCountsStats = (updatedAdmins) => {
        const activeCount = updatedAdmins.filter(admin => admin.isActive).length;
        const inactiveCount = updatedAdmins.length - activeCount;

        // updateActiveAdminsCount(activeCount);
        // updateInactiveAdminsCount(inactiveCount);
    }

    // Popup
    const handleOnConfirm = () => {
        if (actionType === 'toggleActivation') confirmToggleAdminActivation();
        // else confirmDelete();
    };
    const handlePopupToggle = () => {
        // Reset
        setIsPopupOpened(state => state = !state);
        setPopupType("normal");
        setPopupText("");

        setActionType("");
        setTriggeredAdminId("");

        setError(null);
    };

    return (
        <>
            {isPopupOpened && (
                <Popup
                    type={popupType}
                    text={popupText}
                    options={true}
                    onConfirm={handleOnConfirm}
                    onToggle={handlePopupToggle} 
                    className="bg-gray-500 text-white"
                >
                    {loading && (
                        <Loading className='rounded-main' />
                    )}
                    {error && (
                        <div className='bg-black/80 p-2 rounded-main mt-2'>
                            <span className="text-red-700 font-bold">{error}</span>
                        </div>
                    )}
                </Popup>
            )}
            <div
                className="relative max-w-full overflow-x-auto bg-white my-10 rounded-main text-center shadow"
            >
                <table className="w-full text-base">
                    <thead className="uppercase bg-white text-base">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title & Link
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='border-t-2 border-gray-200 py-10'>
                    {(articles.length === 0) ? (
                        <tr className='border-b border-gray-200 bg-white'>There is no pending articles yet!</tr>
                    ) 
                    : (
                        articles.map((article: any, i: number) => (
                            <tr key={i} className="border-b border-gray-200 bg-white duration-300 hover:bg-[#00BCD4] hover:text-white group">
                                <th scope="col" className="px-6 py-3 text-left">
                                    <Link
                                        href={`/article/${article.id}`}
                                        className='underline text-hovers hover:no-underline group-hover:text-white'
                                        title={article.title}
                                    >
                                        {article.title || "Not Found"}
                                    </Link>
                                </th>
                                <td scope="col" className="px-6 py-3">
                                    {article.authorName || "Not Found"}
                                </td>
                                <th scope="col" className="px-6 py-3 font-normal">
                                    {`${new Date(article.createdAt).toLocaleDateString()} / ${new Date(article.createdAt).toLocaleTimeString()}`}
                                </th>
                                <td className="px-6 py-4 flex justify-center flex-col lg:flex-row gap-2">
                                    <button
                                        title="Approve"
                                        className="font-medium text-green-500 py-1 px-2 rounded-full cursor-pointer shadow shadow-shadows bg-white duration-300 hover:bg-green-500 hover:text-white"
                                        // onClick={() => handleDeleteAdmin(admin.name, admin.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        title="Decline"
                                        className="font-medium py-1 px-2 rounded-full cursor-pointer shadow-md bg-red-500 text-white duration-300 hover:bg-red-700"
                                        // onClick={() => handleDeleteAdmin(admin.name, admin.id)}
                                    >
                                        Decline
                                    </button>
                                </td>
                                {/* <td className="px-6 py-4"> */}
                                {/* </td> */}
                            </tr>
                    )))}
                    </tbody>
                </table>
            </div>
        </>
    );   
}

export default ManageArticlesTable