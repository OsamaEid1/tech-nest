'use client'
import { UserInfo } from "app/helpers/constants";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import useGetUserInfo from "./useGetUserInfo";
import { fetchUserProfile } from "app/helpers/profile/fetchUserProfile";
import { setUserInfo } from "state/slices/userSlice";

export const useGetUserProfile = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [userProfile, setUserProfile] = useState<UserInfo | null>(null);

    // Check if the user info already stored in the redux
    const userInfoFromRedux = useAppSelector(state => state.user.userInfo);
    const dispatch = useAppDispatch();

    // Prepare userId because if the user info is not stored, fetch it
    const {loading: userCardinalitiesLoading, userInfo: userCardinalities} = useGetUserInfo();
    const handleFetchUserProfile = async () => {
        if (userCardinalities) {
            setError(null);
            
            try {
                const user = await fetchUserProfile(userCardinalities.id);
                dispatch(setUserInfo(user));
                setUserProfile(user);
                setError(null)
            } catch (error) {
                console.error(error);
                setError("There is an error occurred, try again later, or try re sign in!");
            } finally {
                setLoading(false);
            }
        } else {
            console.error("Can't get user cardinalities !");
            setLoading(false);
            setError("There is an error occurred, try again later, or try re sign in!");
        }
    };

    useEffect(() => {
        if (Object.keys(userInfoFromRedux).length) { // Check if the user info already stored in the redux
            setUserProfile(userInfoFromRedux);
            setLoading(false);
            setError(null);
        } else if (!userCardinalitiesLoading) {
            handleFetchUserProfile();
        }
    }, [userInfoFromRedux, userCardinalitiesLoading]);

    return { loading, error, userProfile };
};