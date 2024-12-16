'use client'
import useGetUserInfo from "app/helpers/hooks/user/useGetUserInfo";
import { fetchUserProfile } from "app/helpers/profile/fetchUserProfile";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setUserInfo } from "state/slices/userSlice";

export const useGetFollowingTopics = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [followingTopics, setFollowingTopics] = useState<string[]>([]);

    const userInfo = useAppSelector(state => state.user.userInfo);
    const dispatch = useAppDispatch();
    const {loading: userCardinalitiesLoading, userInfo: userCardinalities} = useGetUserInfo();
    
    const handleGetFollowingTopics = async () => {
        setError(null);
            
        if (!userCardinalitiesLoading && userCardinalities) {
            try {
                const user = await fetchUserProfile(userCardinalities.id);
                dispatch(setUserInfo(user));
                setFollowingTopics(user.followingTopicsNames);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("Can't get the following topics now, try again later!");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Can't get the following topics now, try again later!");
            setLoading(false);
        }
    };
    useEffect(() => {
        // If userInfo is stored in the redux store
        if (userInfo?.followingTopicsNames) { 
            setFollowingTopics([...userInfo.followingTopicsNames]);
            setLoading(false);
            setError(null);
        } else { // If userInfo is not stored in the redux store
            handleGetFollowingTopics();
        }
    }, [userCardinalities]);

    return { loading, error, followingTopics }
};