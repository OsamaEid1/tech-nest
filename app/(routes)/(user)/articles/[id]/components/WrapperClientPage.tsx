"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchArticleById } from "app/helpers/user/article/fetchArticleById";
import { Article } from "app/helpers/constants";
import Loading from "@components/ui/Loading";
import ArticleFooter from "./ArticleFooter";
import useGetUserInfo from "app/helpers/hooks/user/useGetUserInfo";
import { useAppSelector } from "state/hooks";
import Link from "next/link";

export default function WrapperClientPage() {
    const params = useParams();
    if (!params?.id) history.back();

    // Fetch User Info, IF User has role Admin then disappear the user info and interactions Sections
    const { loading: userInfoLoading, userInfo } = useGetUserInfo();

    // Fetch The Article
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const handleGetArticle = async (articleId: string) => {
        setLoading(false);
        setError(null);

        try {
            const article = await fetchArticleById(articleId);
            setArticle(article);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (params?.id) handleGetArticle(params.id as string);
    }, []);

    // Trigger Updates for Article (Likes, Comments, etc)
    const updatedArticle = useAppSelector((state) => state.articles.article);
    useEffect(() => {
        if (Object.keys(updatedArticle).length)
            setArticle(updatedArticle as Article);
    }, [updatedArticle]);

    return (
        <div className="container lg:w-[800px] 2xl:w-[900px] mx-auto pt-10 pb-14 min-h-screen">
            {loading && <Loading />}
            {error && <span className="err-msg my-1">{error}</span>}
            {article && (
                <div className="bg-white p-5 rounded-main">
                    <h1>{article.title}</h1>
                    <Image
                        src={
                            article?.thumbnail ||
                            "/assets/images/full-back-article.jpeg"
                        }
                        alt="Article Thumbnail"
                        className="w-full rounded-main mt-4 mb-8 bg-gray-200"
                        width={400}
                        height={400}
                        quality={100}
                        priority
                        unoptimized
                    />
                    <hr className="my-5" />
                    {/* Start Content */}
                    {article.content && (
                        <article
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />
                    )}
                    {/* Start Article Url for Outsourced Articles */}
                    {article.outsourceArticleUrl && (
                        <Link
                            href={article.outsourceArticleUrl}
                            target="_blank"
                            className={`block text-center font-semibold bg-blue-500 text-white ${
                                article.status === "pending" ? "" : "-mb-6"
                            } p-3 rounded-main duration-300 hover:bg-blue-700`}
                        >
                            Go To Read The Article
                        </Link>
                    )}
                    {/* End Content */}
                    {userInfo?.role !== "ADMIN" &&
                        article.status === "approved" && (
                            <>
                                <hr className="mb-5 mt-12" />
                                <ArticleFooter
                                    articleId={article.id}
                                    authorName={article.authorName}
                                    authorId={article.authorId}
                                    authorPic={article.authorPic}
                                    likes={article.likes}
                                    comments={article.comments}
                                />
                            </>
                        )}
                </div>
            )}
        </div>
    );
}
