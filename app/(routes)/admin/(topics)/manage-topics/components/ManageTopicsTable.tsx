"use client";
import Loading from "@components/ui/Loading";
import Popup from "@components/ui/Popup";
import { deleteTopicById } from "app/helpers/admin/topics/deleteTopicById";
import Link from "next/link";
// React
import React, { useState } from "react";
import { useAppDispatch } from "state/hooks";
import { setUpdatedTopics } from "state/slices/topicsSlice";
// FontAwesome

type Props = {
    topics: any;
    // updateAdminsCount: (length: number) => void
    // updateActiveAdminsCount: (length: number) => void
    // updateInactiveAdminsCount: (length: number) => void
};
//  updateAdminsCount, updateActiveAdminsCount, updateInactiveAdminsCount

function ManageTopicsTable({ topics }: Props) {
    // Triggered Topic
    const [triggeredTopicId, setTriggeredTopicId] = useState<string>("");
    const [triggeredTopicName, setTriggeredTopicName] = useState<string>("");
    // Popup
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<'delete' | 'success'>('delete');
    const [popupText, setPopupText] = useState<string>('');
    // Logical States
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // Call when delete topic button triggered
    const handleDeleteTopic = (topicId: string, topicName: string) => {
        // Set Triggered Topic
        setTriggeredTopicId(topicId);
        setTriggeredTopicName(topicName);
        // Set Popup Info
        setPopupType('delete');
        setPopupText(`Are you sure with deleting this topic (${topicName}) ?`);
        setIsPopupOpened(true);
    };
    // Confirm the deletion
    const confirmDeleteTopic = async () => {
        setLoading(true);
        setError(null);

        try {
            await deleteTopicById(triggeredTopicId);
            handleSuccessDeleteOp();
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    const handleSuccessDeleteOp = () => {
        // Set Popup Info
        setPopupType("success");
        setPopupText(`(${triggeredTopicName}) Deleted Successfully ✅`);
        // Remove deleted topic from local state Topics
        updateTopics();
    };
    const dispatch = useAppDispatch();
    const updateTopics = () => {
        const updatedTopics = topics.filter(topic => topic.id != triggeredTopicId)
        dispatch(setUpdatedTopics(updatedTopics));
    };

    // Popup
    const handlePopupToggle = () => {
        // Reset
        setIsPopupOpened(false);
        setTriggeredTopicId("");
        setTriggeredTopicName("");
        setError(null);
    };

    return (
        <>
            {isPopupOpened && (
                <Popup
                    type={popupType}
                    text={popupText}
                    options={popupType === 'delete'}
                    onConfirm={confirmDeleteTopic}
                    onToggle={handlePopupToggle}
                    className="bg-gray-500 text-white"
                >
                    {loading && <Loading className="rounded-main" />}
                    {error && (
                        <div className="bg-black/80 p-2 rounded-main mt-2">
                            <span className="text-red-700 font-bold">
                                {error}
                            </span>
                        </div>
                    )}
                </Popup>
            )}
            <div className="relative overflow-x-auto my-10 rounded-main text-center shadow-lg">
                <table className="w-full text-base">
                    <thead className="uppercase text-base">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-t-2 border-gray-200 py-10">
                        {topics?.length === 0 ? (
                            <tr className="border-b border-gray-200 bg-white">
                                There is no Topics Stored yet!
                            </tr>
                        ) : (
                            topics.map((topic: any, i: number) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-200 bg-white duration-300 hover:bg-[#00BCD4] hover:text-white group"
                                >
                                    <th
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        {topic.name || "Not Found"}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-normal"
                                    >
                                        {new Date(topic.createdAt).toLocaleDateString()} / {new Date(topic.createdAt).toLocaleTimeString()}
                                    </th>
                                    <td className="px-6 py-4">
                                        <button
                                            title="Delete"
                                            className="font-medium ms-2 py-1 px-2 rounded-full cursor-pointer shadow-shadows bg-red-500 text-white duration-300 hover:bg-white hover:text-red-500"
                                            onClick={() => handleDeleteTopic(topic.id, topic.name)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    {/* <td className="px-6 py-4"> */}
                                    {/* </td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageTopicsTable;
