"use client"
import { useEffect, useState } from 'react';
import Slider from 'components/ui/Slider';
import { fetchMyArticles } from 'app/helpers/user/article/fetchMyArticles';
import { ArticleCard } from 'app/helpers/constants';
import Loading from '@components/ui/Loading';
import Link from 'next/link';
import MiniArticleCard from './MiniArticleCard';
import { fetchSavedArticles } from "app/helpers/user/article/fetchSavedArticles";
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setMyLatestArticles } from 'state/slices/articleSlice';

function MainContent({ userId, savedArticlesIDs }) {
    // fetch my articles
    const [myArticles, setMyArticles] = useState<ArticleCard[]>();
    const [myArticlesLoading, setMyArticlesLoading] = useState<boolean>(true);
    const [myArticlesErr, setMyArticlesErr] = useState<string | null>(null);
    // Keep Up updated while deleting any article
    const dispatch = useAppDispatch();
    const updatedMyArticles = useAppSelector(state => state.articles.myArticles);
    useEffect(() => {setMyArticles(updatedMyArticles)}, [updatedMyArticles]);

    const handleGetMyArticles = async () => {
        setMyArticlesLoading(true);
        setMyArticlesErr(null);

        if (userId) {
            try {
                const articles = await fetchMyArticles(userId);
                setMyArticles(articles);
                dispatch(setMyLatestArticles(articles))
            } catch (error: any) {
                setMyArticlesErr(error);
            } finally {
                setMyArticlesLoading(false);
            }
        } else {
            setMyArticlesLoading(false);
        }
    };

    // fetch saved articles
    const [savedArticles, setSavedArticles] = useState<ArticleCard[]>();
    const [savedArticlesLoading, setSavedArticlesLoading] = useState<boolean>(true);
    const [savedArticlesErr, setSavedArticlesErr] = useState<string | null>(null);
    const handleGetSavedArticles = async () => {
        setSavedArticlesLoading(true);
        setSavedArticlesErr(null);

        if (savedArticlesIDs?.length) {
            try {
                const articles = await fetchSavedArticles(userId, savedArticlesIDs);
                setSavedArticles(articles);
            } catch (error: any) {
                setSavedArticlesErr(error);
            } finally {
                setSavedArticlesLoading(false);
            }
        } else {
            setSavedArticlesErr("You haven't saved any article yet!");
            setSavedArticlesLoading(false);
        }
    };

    useEffect(() => {
        if (userId) handleGetMyArticles();
        if (userId && savedArticlesIDs) handleGetSavedArticles();
    }, [userId, savedArticlesIDs]);

    return (
        <>
            {/* Start My Articles */}
            <div className="relative" id="my-articles">
                <h2 className="text-3xl font-mono mb-3">My Articles</h2>
                <Slider>
                    {myArticlesLoading ? (
                        <div className="min-w-[200px] py-4 text-center rounded-main flex-1">
                            <Loading className="rounded-main" />
                        </div>
                    ) : myArticles?.length ? (
                        myArticles.map((article, indx) => (
                            <MiniArticleCard
                                key={indx}
                                id={article.id}
                                status={article.status}
                                refusingReason={article.refusingReason}
                                title={article.title}
                                thumbnail={article.thumbnail}
                                likesCount={article.likesCount}
                                commentsCount={article.commentsCount}
                                authorId={userId}
                            />
                        ))
                    ) : (
                        <div className="min-w-[200px] text-center rounded-main flex-1">
                            {myArticlesErr}
                            <Link
                                href="/articles/write"
                                className="ms-1 text-green-600 font-semibold underline duration-300 hover:no-underline"
                            >
                                Publish now?
                            </Link>
                        </div>
                    )}
                </Slider>
                <Link
                    href="/articles/write"
                    className="block mt-3 -mb-2 text-right text-green-600 font-semibold underline duration-300 hover:no-underline"
                >
                    Publish New Article?
                </Link>
            </div>
            {/* End My Articles */}

            <hr className="my-5 h-[2px] bg-light" />

            {/* Start Saved Articles */}
            <div className="relative" id="saved-articles">
                <h2 className="text-3xl font-mono mb-3">Saved Articles</h2>
                <Slider>
                    {savedArticlesLoading ? (
                        <div className="min-w-[200px] py-4 text-center rounded-main flex-1">
                            <Loading className="rounded-main" />
                        </div>
                    ) : savedArticles?.length ? (
                        savedArticles?.map((article, indx) => (
                            <MiniArticleCard
                                key={indx}
                                id={article.id}
                                status={article.status}
                                title={article.title}
                                thumbnail={article.thumbnail}
                                likesCount={article.likesCount}
                                commentsCount={article.commentsCount}
                            />
                        ))
                    ) : (
                        <div className="min-w-[200px] text-center rounded-main flex-1">
                            {savedArticlesErr}
                            <Link
                                href="/"
                                className="ms-1 text-green-600 font-semibold underline duration-300 hover:no-underline"
                            >
                                Browse more articles?
                            </Link>
                        </div>
                    )}
                </Slider>
                <Link
                    href="article/write"
                    className="block mt-3 text-right text-green-600 font-semibold underline duration-300 hover:no-underline"
                >
                    Browse more articles?
                </Link>
            </div>
            {/* End Saved Articles */}
        </>
    );
}

export default MainContent