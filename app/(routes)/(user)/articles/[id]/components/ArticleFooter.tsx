'use client'
import Image from 'next/image';
import { faBookmark as faBookmarkSolid, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular, faComment, faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from 'react';
import MainButton from '@components/ui/form/MainButton';
import { CommentData, LikeData } from 'app/helpers/constants';
import { useGetUserProfile } from 'app/helpers/hooks/user/useGetUserProfile';
import { useAppDispatch } from 'state/hooks';
import { setUserInfo } from 'state/slices/userSlice';
import Popup from '@components/ui/Popup';
import updateSavedArticles from 'app/helpers/user/article/updateSavedArticles';
import { updateArticleLikes } from 'app/helpers/user/article/updateArticleLikes';
import { setArticle } from 'state/slices/articleSlice';
import { updateArticleComments } from 'app/helpers/user/article/updateArticleComments';
import Loading from '@components/ui/Loading';

function ArticleFooter({ articleId, likes, comments, authorName, authorPic }) {
    // Popup
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
    // User Profile
    const dispatch = useAppDispatch();
    const {loading: userProfileLoading, error: userProfileErr, userProfile} = useGetUserProfile();
    // Bookmark
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [bookmarkErr, setBookmarkErr] = useState<string | null>(null);
    // Like
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likingErr, setLikingErr] = useState<string | null>(null);
    // Comment
    const [writtenComment, setWrittenComment] = useState<string>('');
    const [submitCommentLoading, setSubmitCommentLoading] = useState<boolean>(false);
    const [commentErr, setCommentErr] = useState<string | null>(null);
    

    // Bookmark
    const isThisArticlePreviouslyBookmarked = (bookmarkedArticlesIDs: string[]) => bookmarkedArticlesIDs.includes(articleId);
    useEffect(() => {
        if (userProfile && isThisArticlePreviouslyBookmarked(userProfile.savedArticlesIDs)) setIsBookmarked(true);
    }, [userProfileLoading]);

    const unBookmark = (bookmarkedArticlesIDs) => {
        const updatedBookmarkedIDs = bookmarkedArticlesIDs.filter(bookmarkedArticleId => bookmarkedArticleId !== articleId);
        return updatedBookmarkedIDs;
    };
    const handleToggleBookmark = async () => {
        setBookmarkErr(null);

        if (userProfile) {
            let updatedSavedArticlesIDs: string[];
            if (isBookmarked)
                updatedSavedArticlesIDs = unBookmark(userProfile.savedArticlesIDs);
            else
                updatedSavedArticlesIDs = [...userProfile.savedArticlesIDs, articleId];
                
            try {
                const updatedUser = await updateSavedArticles(userProfile.id as string, updatedSavedArticlesIDs);
                dispatch(setUserInfo(updatedUser));
                setIsBookmarked(!isBookmarked);
            } catch (error: any) {
                setBookmarkErr(error);
                setIsPopupOpened(true);
            }
        } else {
            console.error("Error while bookmark the article, can't find the user profile");
            setBookmarkErr('There is an error occurred, Please try again later!');
        }
    };
    
    // Like
    const isThisArticlePreviouslyLiked = (userId) => likes.find(likeData => likeData.userId === userId);
    useEffect(() => {
        if (userProfile && isThisArticlePreviouslyLiked(userProfile.id)) setIsLiked(true);
    }, [userProfileLoading]);

    const unLike = (userId) => {
        const updatedLikedData = likes.filter(likeItem => likeItem.userId !== userId);
        return updatedLikedData;
    };
    const handleToggleLike = async () => {
        setLikingErr(null);

        if (userProfile) {
            let updatedLikesData: LikeData[];
            if (isLiked)
                updatedLikesData = unLike(userProfile.id);
            else
                updatedLikesData = [...likes, {
                    userId: userProfile.id,
                    userName: userProfile.name,
                    userPic: userProfile.pic,
                    createdAt: new Date()
                }];
                
            try {
                const updatedArticle = await updateArticleLikes(articleId, updatedLikesData);
                dispatch(setArticle(updatedArticle));
                setIsLiked(!isLiked);
            } catch (error: any) {
                setLikingErr(error);
                setIsPopupOpened(true);
            }
        } else {
            console.error("Error while liking the article, can't find the user profile");
            setLikingErr('There is an error occurred, please try refresh the page and try again later.');
            setIsPopupOpened(true);
        }
    };

    // Comment
    const handleWriteComment = async () => {
        setSubmitCommentLoading(true);
        setCommentErr(null);

        if (userProfile) {
            const updatedCommentsData = [...comments, {
                userId: userProfile.id,
                userName: userProfile.name,
                userPic: userProfile.pic,
                content: writtenComment,
                createdAt: new Date()
            }];
                
            try {
                const updatedArticle = await updateArticleComments(articleId, updatedCommentsData);
                dispatch(setArticle(updatedArticle));
                setWrittenComment('');
            } catch (error: any) {
                setCommentErr(error);
            } finally {
                setSubmitCommentLoading(false);
            }
        } else {
            console.error("Error while commenting to the article, can't find the user profile");
            setCommentErr('There is an error occurred, please try refresh the page and try again later.');
            setIsPopupOpened(true);
            setSubmitCommentLoading(false);
        }
    };


    return (
        <>
            {/* Start Error Popup */}
            {(isPopupOpened) && (
                <Popup
                    type='delete'
                    text={bookmarkErr || likingErr || ''}
                    onToggle={() => setIsPopupOpened(false)}
                />
            )}
            {/* End Error Popup */}
            {/* Start Interactions */}
            <div className="flex items-center justify-between px-3">
                <div className='flex gap-4'>
                    <button 
                        className='group'
                        onClick={handleToggleLike}
                    >
                        <FontAwesomeIcon
                            icon={isLiked ? faHeartSolid : faHeartRegular}
                            className={`
                                duration-300
                                ${isLiked ? 'text-red-500 group-hover:text-red-400' : 'group-hover:text-red-500'}
                            `}
                        />
                        <span className="font-semibold">
                            {" "}
                            {likes.length}
                        </span>
                    </button>
                    <Link href="#comments">
                        <FontAwesomeIcon
                            icon={faComment}
                            flip="horizontal"
                        />
                        <span className="font-semibold">
                            {" "}
                            {comments.length}
                        </span>
                    </Link>
                </div>
                <button className="group"
                    onClick={handleToggleBookmark}
                >
                    <FontAwesomeIcon
                        icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                        className={`
                            duration-300
                            ${isBookmarked ? 'text-blue-500 group-hover:text-blue-400' : 'group-hover:text-blue-500'}
                        `}
                    />
                </button>
            </div>
            {/* End Interactions */}
            <hr className="my-5" />
            {/* Start Author Info  */}
            <div className="flex gap-5 items-center">
                <Image
                    src={authorPic || "/assets/images/full-back-user.png"}
                    alt="Author Pic"
                    width={65}
                    height={65}
                    className="rounded-full bg-slate-200 border border-hovers"
                />
                <p className="font-semibold text-lg italic text-gray-700">
                    Published By:{" "}
                    <Link href={userProfile?.id ? `/profile/${userProfile.id}` : ''} className="text-black font-mono font-bold text-xl not-italic capitalize">
                        {authorName}
                    </Link>
                </p>
            </div>
            {/* End Author Info  */}
            <hr className="my-5" />
            {/* Start Comments */}
            <div
                id="comments"
                className="bg-white rounded-main shadow-md shadow-shadows p-5"
            >
                {/* Write Comment */}
                <div className="mb-10 flex items-center relative">
                    {submitCommentLoading && (<Loading className='rounded-main' />)}
                    <textarea
                        required
                        value={writtenComment}
                        onChange={(e) => setWrittenComment(e.target.value)}
                        placeholder="Write Your Comment Here.."
                        rows={3}
                        className="
                            flex-1 border-b-2 border-gray-200 transition-[border] px-2
                            duration-300 focus:outline-none focus:border-hovers me-3
                        "
                    />
                    <MainButton
                        disabled={writtenComment === ''}
                        onClick={handleWriteComment}
                    >
                        Submit
                    </MainButton>
                </div>
                {/* Display Comments */}
                <div className="my-5">
                    <h3 className="font-mono text-secTextColor mb-4">
                        Comments:
                    </h3>
                    <div>
                        {comments.length <= 0 ? (
                            <p className="shadow shadow-shadows rounded-main p-3">
                                There are no comments yet.
                            </p>
                        ) : (
                            comments.map((comment: CommentData, indx) => (
                                <>
                                    <div
                                        key={indx}
                                        className="shadow shadow-shadows rounded-main p-3"
                                    >
                                        <div className="flex gap-3 items-center">
                                            <Image
                                                src={
                                                    comment.userPic ||
                                                    "/assets/images/full-back-user.png"
                                                }
                                                alt="commenter pic"
                                                width={50}
                                                height={50}
                                                loading='eager'
                                                className="rounded-full bg-slate-200 border border-hovers"
                                            />
                                            <p className="text-black font-mono font-bold text-xl">
                                                {comment.userName}
                                            </p>
                                        </div>
                                        <p className="mt-3">
                                            {comment.content}
                                        </p>
                                        <p className="text-gray-500 text-sm text-right">
                                            {new Date(
                                                comment.createdAt
                                            )?.toLocaleString()}
                                        </p>
                                    </div>
                                    <hr className="my-2" />
                                </>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* End Comments */}
        </>
    );
}

export default ArticleFooter