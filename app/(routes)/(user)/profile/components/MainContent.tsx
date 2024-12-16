"use client"
import { useEffect, useState } from 'react';
import Slider from 'components/ui/Slider';
import { fetchMyArticles } from 'app/helpers/user/article/fetchMyArticles';
import { ArticleCard } from 'app/helpers/constants';
import Loading from '@components/ui/Loading';
import Link from 'next/link';
import MiniArticleCard from './MiniArticleCard';


function MainContent({ userId, savedArticlesIDs }) {
    const [savedArticlesLoading, setSavedArticlesLoading] = useState<boolean>();
    const [savedArticles, setSavedArticles] = useState<string[]>(["Article 1", "Article 2", "Article 3", "Article 4", "Article 5", "Article 6"]);
    
    const [myArticles, setMyArticles] = useState<ArticleCard[]>();
    const [myArticlesLoading, setMyArticlesLoading] = useState<boolean>(false);
    const [myArticlesErr, setMyArticlesErr] = useState<string| null>(null);
    // fetch my articles
    const handleGetMyArticles = async () => {
        if (userId) {
            try {
                const articles = await fetchMyArticles(userId);
                setMyArticles(articles);
            } catch (error: any) {
                setMyArticlesErr(error)
            }
        }
    };
    // fetch saved articles (title, pic, id)

    useEffect(() => {
        if (userId) handleGetMyArticles();
    }, [userId, savedArticlesIDs]);

    return (
        <>
            {/* Start Articles */}
            <div className="relative">
                <h2 className="text-3xl font-mono mb-3">My Articles</h2>
                <Slider>
                    {myArticlesLoading && <Loading />}
                    {(!myArticlesLoading && myArticles) ? myArticles.map((article, indx) => (
                        <MiniArticleCard 
                            key={indx}
                            id={article.id}
                            title={article.title}
                            thumbnail={article.thumbnail}
                            likesCount={article.likesCount}
                            commentsCount={article.commentsCount}
                        />
                    ))
                    : <div className='min-w-[200px] text-center px-20 py-14 border bg-slate-200 rounded-main flex-1'>
                        {myArticlesErr}
                        <Link href="/write-article" className='ms-1 text-green-600 font-semibold underline duration-300 hover:no-underline'>Publish now?</Link>
                    </div>}
                </Slider>
            </div>
            {/* End Articles */}

            <hr className="my-5 h-[2px] bg-light" />

            {/* Start Saved Articles */}
            <div className="relative">
                <h2 className="text-3xl font-mono mb-3">Saved Articles</h2>
                <Slider>
                    {savedArticles.length !== 0 &&
                    savedArticles.map((article, indx) => (
                        <div
                            key={indx}
                            className="min-w-[200px] px-20 py-14 border bg-slate-200 rounded-main flex-shrink-0"
                        >
                            {article}
                        </div>
                    ))}
                </Slider>
            </div>
            {/* End Saved Articles */}
        </>
    );
}

export default MainContent