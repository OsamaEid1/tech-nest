"use client"
import Loading from '@components/ui/Loading';
import React, { useEffect, useState } from 'react';
import { useGetAllTopics } from '../hooks/useGetAllTopics';
import { useGetFollowingTopics } from '../hooks/useGetFollowingTopics';
import MainButton from '@components/ui/form/MainButton';
import { updateFollowingTopics } from 'app/helpers/topics/updateFollowingTopics';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setUserInfo } from 'state/slices/userSlice';
import Popup from '@components/ui/Popup';

function SelectTopicsBox() {
    // Handle Fetch All Topics From DB
    const {loading: allTopicsLoading, error: allTopicsErr, allTopics} = useGetAllTopics();
    
    // Handle Displayed Topics
    const [topicsInSelectBox, setTopicsInSelectBox] = useState<string[]>();
    useEffect(() => {if (allTopics) setTopicsInSelectBox(allTopics)}, [allTopics]);
    
    // Handle Get Topics that user already follow
    const {loading: fetchFTopicsLoading, error: fetchFTopicsErr, followingTopics} = useGetFollowingTopics();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    useEffect(() => {
        if (followingTopics?.length) {
            // Set following topics as the initial selected topics
            setSelectedTopics([...followingTopics]);
            // Remove the following topics from the displayed topics in the select box
            const updatedTopicsInSelectBox = topicsInSelectBox?.filter(topic => !followingTopics.includes(topic));
            setTopicsInSelectBox(updatedTopicsInSelectBox);
        }

    }, [followingTopics])

    // Handle Select/Deselect the topics
    const handleSelectTopic = (topic : string) => {
        // Remove The Selected Topic From the Select Topic Box
        const updatedTopics = topicsInSelectBox ? [...topicsInSelectBox] : [];
        const selectedTopicIndx = updatedTopics.indexOf(topic);

        updatedTopics.splice(selectedTopicIndx, 1);
        setTopicsInSelectBox(updatedTopics);

        // Add The Selected Topic To Selected Topics Box
        setSelectedTopics([...selectedTopics, topic]);
    };
    const handleDeselectTopic = (topic : string) => {
        // Deselect the Topic From Selected Topics
        const updatedSelectedTopics = [...selectedTopics];
        const selectedTopicIndx = updatedSelectedTopics.indexOf(topic);

        updatedSelectedTopics.splice(selectedTopicIndx, 1);
        setSelectedTopics(updatedSelectedTopics);

        // Add The Deselected Topic To The Select Topics Box
        setTopicsInSelectBox(topicsInSelectBox ? [...topicsInSelectBox, topic] : allTopics);
    };

    // Handle Save Updated Following Topics For The User
    const [saveFTopicsLoading, setSaveFTopicsLoading] = useState<boolean>(false);
    const [saveFTopicsErr, setSaveFTopicsErr] = useState<null | string>(null);
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state => state.user.userInfo);
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    const handleSaveUpdatedFollowingTopics = async () => {
        setSaveFTopicsLoading(true);
        setSaveFTopicsErr(null);

        try {
            if (userInfo?.id) {
                const updatedUser = await updateFollowingTopics(userInfo.id, selectedTopics);
                dispatch(setUserInfo(updatedUser));
                setIsPopupOpened(true);
            } else {
                console.error("Can't find the userId to update the Following Topics!")
                throw 'There is an error occurred, try refresh the page or re-sign in and try again!';
            }
        } catch (error) {
            setSaveFTopicsErr('There is an error occurred, try refresh the page or re-sign in and try again!');
        } finally {
            setSaveFTopicsLoading(false);
        }
    };


    return (
        <>
            {isPopupOpened && (<Popup
                type='success'
                text='Updated the following topics successfully'
                onToggle={() => setIsPopupOpened(false)}
            />)}
            {saveFTopicsLoading && (<Loading className='rounded-main' />)}
            {/* Display & Select The Topics */}
            <div className="bg-light flex flex-wrap rounded-main p-2 min-h-28 relative">
                {allTopicsLoading && <Loading className="rounded-main" />}
                {allTopicsErr && <span className="err-msg">{allTopicsErr}</span>}
                {topicsInSelectBox?.map((topic, indx) => (
                    <span
                    key={indx}
                    className={`m-1 py-2 px-3 rounded-full whitespace-nowrap cursor-pointer font-medium
                                        duration-200 bg-white hover:bg-hovers hover:text-white
                            `}
                    onClick={
                        fetchFTopicsErr
                            ? () =>
                                alert(
                                    "You can't select any topic right now, try again later!"
                                )
                            : () => handleSelectTopic(topic)
                    }
                    >
                    <span className="text-xl font-bold me-px">+</span>
                    {topic}
                    </span>
                ))}
            </div>
            {/* Display & Remove Selected Topics */}
            <h3 className="mt-4 mb-3">
                Selected Topics:{" "}
                <span className="text-hovers">{selectedTopics?.length}</span>
            </h3>
            <div className="bg-light flex flex-wrap rounded-main p-2 min-h-10 relative">
                {fetchFTopicsLoading && <Loading className="rounded-main" />}
                {fetchFTopicsErr && (
                    <span className="err-msg !mt-0">{fetchFTopicsErr}</span>
                )}
                {!fetchFTopicsErr && selectedTopics.length === 0 && (
                    <span>No selected topics yet!</span>
                )}
                {selectedTopics?.map((topic, indx) => (
                    <span
                    key={indx}
                    className={`m-1 py-2 px-3 rounded-full whitespace-nowrap cursor-pointer font-medium
                                duration-200 text-white bg-hovers hover:bg-red-500
                                `}
                    onClick={() => handleDeselectTopic(topic)}
                    >
                    <span className="text-xl font-bold">- </span>
                    {topic}
                    </span>
                ))}
            </div>

            {saveFTopicsErr && (<span className='err-msg'>{saveFTopicsErr}</span>)}
            <MainButton
                type="submit"
                className="
                        w-fit mx-auto mt-5
                        font-semibold py-1 px-4 text-xl
                    "
                disabled={
                    saveFTopicsLoading ||
                    allTopicsLoading ||
                    fetchFTopicsLoading ||
                    (allTopicsErr || fetchFTopicsErr || saveFTopicsErr
                    ? true
                    : false) ||
                    JSON.stringify(followingTopics) === JSON.stringify(selectedTopics)
                }
                onClick={handleSaveUpdatedFollowingTopics}
            >
                Save
            </MainButton>
        </>
    );
}

export default SelectTopicsBox;
