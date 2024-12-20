'use client'
import React, { useEffect, useState } from 'react'
import ManageTopicsTable from './components/ManageTopicsTable';
import MainButton from '@components/ui/form/MainButton';
import { fetchAllTopics } from 'app/helpers/topics/fetchAllTopics';
import { Topic } from 'app/helpers/constants';
import Loading from '@components/ui/Loading';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setUpdatedTopics } from 'state/slices/topicsSlice';

function ManageTopics() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);

    // Handle Get Updated Topics
    const dispatch = useAppDispatch();
    const updatedTopics = useAppSelector(state => state.topics.topics);
    useEffect(() => {setTopics(updatedTopics)}, [updatedTopics])

    // Fetch All Topics
    const handleGetAllTopics = async () => {
        try {
            const topics = await fetchAllTopics();
            setTopics(topics);
            dispatch(setUpdatedTopics(topics));
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {handleGetAllTopics()}, []);

    return (
        <>
            <h2 className='text-secTextColor'>Manage Topics</h2>
            <div
                className='mt-10 mb-2 p-5 bg-white shadow rounded-main flex justify-between items-center'
            >
                <p className='font-bold'>
                    Topics: <span className='font-bold text-hovers'>{topics?.length || 0}</span>
                </p>
                <MainButton
                
                >
                    <Link href={'add-topic'} className='focus:outline-none'>
                        Add New Topic
                    </Link>
                </MainButton>
            </div>
            <div className='relative min-h-28'>
                {loading ? (<Loading className='rounded-main' />) 
                : error ? <span className='err-msg'>{error}</span>
                : (
                    <ManageTopicsTable
                        topics={topics}
                    />
                )}
            </div>
        </>
    )
}

export default ManageTopics