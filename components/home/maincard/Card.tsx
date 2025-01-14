'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard, LikeData } from "app/helpers/constants";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "state/hooks";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { updateArticleLikes } from "app/helpers/user/article/updateArticleLikes";
import { updateArticlesWithUpdatedArticle } from "state/slices/articleSlice";

const CustomCard: React.FC<ArticleCard> = ({
    id,
    title,
    authorPic,
    authorId,
    authorName,
    likes,
    commentsCount,
    thumbnail,
    createdAt,
}) => {
    // User Profile
    const dispatch = useAppDispatch();
    const {loading: userProfileLoading, error: userProfileErr, userProfile} = useGetUserProfile();
    // Like
    const [isLiked, setIsLiked] = useState<boolean>(false);
    // const [likingErr, setLikingErr] = useState<string | null>(null);

    // Like
    const isThisArticlePreviouslyLiked = (userId) => likes?.find(likeData => likeData.userId === userId);
    useEffect(() => {
        if (userProfile && isThisArticlePreviouslyLiked(userProfile.id)) setIsLiked(true);
    }, [userProfileLoading]);

    const unLike = (userId) => {
        if (likes) {
            const updatedLikedData = likes.filter((likeItem) => likeItem.userId as string !== userId);
            return updatedLikedData;
        }
        return [];
    };
    const handleToggleLike = async () => {
        // setLikingErr(null);

        if (userProfile && likes) {
            let updatedLikesData: LikeData[];
            if (isLiked)
                updatedLikesData = unLike(userProfile.id);
            else
                updatedLikesData = [...likes, {
                    userId: userProfile.id as string,
                    userName: userProfile.name,
                    userPic: userProfile.pic,
                    createdAt: `${new Date()}`
                }];
                
            try {
                const updatedArticle = await updateArticleLikes(id, updatedLikesData);
                dispatch(updateArticlesWithUpdatedArticle(updatedArticle));
                setIsLiked(!isLiked);
            } catch (error: any) {
                alert('There is an error occurred, please try refresh the page and try again later.');
            }
        } else {
            console.error("Error while liking the article, can't find the user profile");
            alert('There is an error occurred, please try refresh the page and try again later.');
        }
    };

    return (
        <Card className="flex items-center p-4 mt-8 mb-12 bg-transparent border-b-2 border-hovers pb-4 rounded-main hover:shadow-lg hover:shadow-shadows">
            <div className="flex-1 pr-4">
                <Link
                    href={`/profile/${authorId}`}
                    className="flex items-center w-fit gap-2 mb-3"
                >
                    <Avatar
                        alt={authorName}
                        src={authorPic || "/assets/images/full-back-user.png"}
                        sx={{ width: 50, height: 50 }}
                        className="mr-2 border border-hovers"
                    />
                    <span className="text-gray-600 font-semibold capitalize text-xl">
                        {authorName}
                    </span>
                </Link>

                {/* Updated Link to pass the ID */}
                <Link href={`/articles/${id}`}>
                    <Typography
                        variant="h6"
                        className="font-bold mb-1 cursor-pointer"
                    >
                        {title}
                    </Typography>
                </Link>

                <div className="flex items-center text-gray-400 mt-2">
                    <ul className="flex gap-4 pe-2 border-e">
                        <li>
                            <button
                                className="group"
                                onClick={handleToggleLike}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isLiked ? faHeartSolid : faHeartRegular
                                    }
                                    className={`
                                duration-300
                                ${
                                    isLiked
                                        ? "text-red-500 group-hover:text-red-400"
                                        : "group-hover:text-red-500"
                                }
                            `}
                                />
                                <span className="font-semibold">
                                    {" "}
                                    {likes?.length}
                                </span>
                            </button>
                        </li>
                        <li>
                            <Link href="#comments">
                                <FontAwesomeIcon
                                    icon={faComment}
                                    flip="horizontal"
                                />
                                <span className="text-gray-500">
                                    {" "}
                                    {commentsCount}
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <span className="ml-1">
                        {new Date(createdAt as string).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="w-32 h-32">
                <Image
                    src={thumbnail || "/assets/images/full-back-article.jpeg"}
                    alt={title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded bg-gray-200 shadow"
                    quality={100}
                    unoptimized
                />
            </div>
        </Card>
    );
};

export default CustomCard;
