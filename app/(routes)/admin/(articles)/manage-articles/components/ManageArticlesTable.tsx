"use client"
import MainInput from '@components/ui/form/MainInput'
import Loading from '@components/ui/Loading'
import Popup from '@components/ui/Popup'
import { fetchPendingArticles } from 'app/helpers/admin/articles/fetchPendingArticles'
import { updateArticleStatus } from 'app/helpers/admin/articles/updateArticleStatus'
import Image from 'next/image'
import Link from 'next/link'
// React
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setPendingArticles } from 'state/slices/articleSlice'
// FontAwesome

function ManageArticlesTable() {
    // Fetch Pending Articles States
    const [fetchLoading, setFetchLoading] = useState<boolean>(true);
    // Triggered Article
    const [triggeredArticleId, setTriggeredArticleId] = useState<string>("");
    const [triggeredArticleTitle, setTriggeredArticleTitle] = useState<string>("");
    // Action States
    const [triggeredStatus, setTriggeredStatus] = useState<'approved' | 'refused'>('approved');
    const [refusingReason, setRefusingReason] = useState<string>();
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [actionErr, setActionErr] = useState<string | null>(null);
    // Popup
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<'normal' | 'success'>('normal');
    const [popupText, setPopupText] = useState<string>('');
    
    // Pending Articles Redux
    const dispatch = useAppDispatch();
    const pendingArticles = useAppSelector(state => state.articles.pendingArticles);

    // Fetch Pending Articles
    const handleFetchPendingArticles = async () => {
        setFetchLoading(true);

        try {
            const fetchedArticles = await fetchPendingArticles();
            dispatch(setPendingArticles(fetchedArticles));
        } catch (error: any) {
            console.error(error)
        } finally {
            setFetchLoading(false);
        }
    };
    useEffect(() => { handleFetchPendingArticles() }, []);


    // Call when decline article button triggered
    const handleUpdateArticleStatus = (articleId: string, articleTitle: string, status: 'Approving' | 'Refusing') => {
        // Set Triggered Article
        setTriggeredArticleId(articleId);
        setTriggeredArticleTitle(articleTitle);
        setTriggeredStatus(status === 'Approving' ? 'approved' : 'refused');
        // Set Popup Info
        setPopupType('normal');
        setPopupText(`Are you sure with ${status} this article (${articleTitle}) ?`);
        setIsPopupOpened(true);
    };
    // Confirm the action
    const confirmUpdateArticleStatus = async () => {
        setActionLoading(true);
        setActionErr(null);
        
        try {
            if (triggeredStatus === 'refused' && (!refusingReason || refusingReason === '')) 
                throw 'You must write the reason!'

            await updateArticleStatus(triggeredArticleId, triggeredStatus, refusingReason);
            handleSuccessOp();
        } catch (error: any) {
            setActionErr(error);
        } finally {
            setActionLoading(false);
        }
    };
    const updateLocalPendingArticles = () => {
        const updatedArticles = pendingArticles.filter(article => article.id != triggeredArticleId)
        dispatch(setPendingArticles(updatedArticles));
    };
    const handleSuccessOp = () => {
        // Set Popup Info
        setPopupType("success");
        setPopupText(`(${triggeredArticleTitle}) Status Changed Successfully ✅`);
        // Remove triggered article from local pending articles state
        updateLocalPendingArticles();
    };

    // Popup
    const handlePopupToggle = () => {
        // Reset
        setIsPopupOpened(state => state = !state);
        setPopupType("normal");
        setPopupText("");

        setTriggeredArticleId('');
        setTriggeredArticleTitle('');
        setTriggeredStatus('approved');
        setRefusingReason('');
    };


    return (
        <>
            {isPopupOpened && (
                <Popup
                    type={popupType}
                    text={popupText}
                    options={popupType === "normal"}
                    onConfirm={confirmUpdateArticleStatus}
                    onToggle={handlePopupToggle}
                    className="bg-gray-500 text-white"
                >
                    {(triggeredStatus === 'refused' && popupType !== 'success') && (
                        <MainInput
                            type='text'
                            placeholder='Write Why you refuse this article'
                            inputStyles='mb-3'
                            value={refusingReason}
                            onChange={(e) => setRefusingReason(e.target.value)}
                            required={true}
                        />
                    )}
                    {actionLoading && <Loading className="rounded-main" />}
                    {actionErr && (
                        <div className="-mt-1 mb-2">
                            <span className="text-red-600 font-bold">
                                {actionErr}
                            </span>
                        </div>
                    )}
                </Popup>
            )}
            <div className="relative max-w-full overflow-x-auto bg-white my-10 rounded-main text-center shadow">
                {fetchLoading && <Loading />}
                <table className="w-full text-base">
                    <thead className="uppercase text-base">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Thumbnail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title & Link
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-t-2 border-hovers py-10">
                        {!fetchLoading && pendingArticles.length === 0 ? (
                            <tr className="border-b border-gray-200 bg-white text-lg">
                                <td colSpan={4} className="p-3">
                                    There is no pending articles yet !
                                </td>
                            </tr>
                        ) : (
                            pendingArticles.map((article: any, i: number) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-200 bg-white duration-300 hover:bg-[#00BCD4] hover:text-white group"
                                >
                                    <td scope="col" className="px-6 py-3">
                                        {article.thumbnail ? (
                                            <Image
                                                src={article.thumbnail}
                                                alt="Article Thumbnail"
                                                width={80}
                                                height={80}
                                                className="rounded-main"
                                            />
                                        ) : (
                                            "Not found"
                                        )}
                                    </td>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left max-w-24 truncate"
                                    >
                                        <Link
                                            href={`/articles/${article.id}`}
                                            target="_blank"
                                            className="underline block hover:text-hovers hover:no-underline group-hover:text-white"
                                            title={article.title}
                                        >
                                            {article.title || "Not Found"}
                                        </Link>
                                    </th>
                                    <td scope="col" className="px-6 py-3">
                                        {article.authorName || "Not Found"}
                                    </td>
                                    <td
                                        scope="col"
                                        className="px-6 py-3 font-normal"
                                    >
                                        {`${new Date(
                                            article.createdAt
                                        ).toLocaleDateString()} / ${new Date(
                                            article.createdAt
                                        ).toLocaleTimeString()}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-1 justify-center items-center flex-col lg:flex-row gap-2">
                                            <button
                                                title="Approve"
                                                className="font-medium text-green-500 py-1 px-2 rounded-full cursor-pointer shadow shadow-shadows bg-white duration-300 hover:bg-green-500 hover:text-white"
                                                onClick={() => handleUpdateArticleStatus(article.id, article.title, 'Approving')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                title="Decline"
                                                className="font-medium py-1 px-2 rounded-full cursor-pointer shadow-md bg-red-500 text-white duration-300 hover:bg-red-700"
                                                onClick={() => handleUpdateArticleStatus(article.id, article.title, 'Refusing')}
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );   
}

export default ManageArticlesTable