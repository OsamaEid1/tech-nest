'use client'

import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setAllTopics } from "state/slices/topicsSlice";

export const useGetAllTopics = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [allTopics, setAllTopicsLocally] = useState<null | string[]>(null);
    
    const dispatch = useAppDispatch();
    const allTopicsRedux = useAppSelector(state => state.topics.allTopics);

    const setTopics = (topics) => {
        const topicsNames = topics.map((topic) => topic.name);
        setAllTopicsLocally(topicsNames);
    };

    const handleGetAllTopics = async () => {
        setLoading(true);
        setError(null);

        try {
            const fetchedTopics = await fetchAllTopics();
            setTopics(fetchedTopics);
            dispatch(setAllTopics(fetchedTopics));
        } catch (error) {
            setError("There is no topics to show !");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!allTopicsRedux.length) handleGetAllTopics();
        else {
            setTopics(allTopicsRedux);
            setLoading(false);
            setError(null);
        }
    }, []);

    return { loading, error, allTopics }
};