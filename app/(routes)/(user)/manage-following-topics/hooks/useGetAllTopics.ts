'use client'

import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { useEffect, useState } from "react";

export const useGetAllTopics = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [allTopics, setAllTopics] = useState<string[]>();


    const handleGetAllTopics = async () => {
        setLoading(true);
        setError(null);

        try {
            const fetchedTopics = await fetchAllTopics();
            const topicsNames = fetchedTopics.map((topic) => topic.name);
            setAllTopics(topicsNames);
        } catch (error) {
            setError("There is no topics to show !");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!allTopics) handleGetAllTopics();
    }, []);

    return { loading, error, allTopics }
};