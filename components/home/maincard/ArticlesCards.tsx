"use client";
import Card from "./Card";
import { useState, useEffect } from "react";
import { fetchRelatedArticles } from "app/helpers/user/article/fetchRelatedArticles";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { ArticleCard } from "app/helpers/constants";
import Loading from "@components/ui/Loading";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setUpdatedArticles } from "state/slices/articleSlice";


export default function ArticlesCards() {
  // Get Target Topic from the Dynamic Route /[topic]
  const pathname = usePathname();
  const targetTopic = pathname?.substring(1).replaceAll('-', ' ');
  // Fetch User profile to know user's following topics
  const { loading: profileLoading, error: profileErr, userProfile } = useGetUserProfile();
  // Fetch Articles States
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [fetchErr, setFetchErr] = useState<string | null>(null);
  const [articles, setArticles] = useState<ArticleCard[]>([]);
  // Trigger Articles Updates
  const dispatch = useAppDispatch();
  const updatedArticles = useAppSelector(state => state.articles.articles);

  // Fetch Related Articles
  useEffect(() => {
    const fetchingData = async (targetTopics: string[]) => {
      setFetchLoading(true);
      setFetchErr(null);

      try {
          const fetchedArticles = await fetchRelatedArticles(targetTopics);
          setArticles(fetchedArticles);
          dispatch(setUpdatedArticles(fetchedArticles));
      } catch (error: any) {
        setFetchErr(error);
      } finally {
        setFetchLoading(false);
      }
    };


    if (targetTopic && targetTopic !== '') fetchingData((targetTopic.charAt(0).toUpperCase() + targetTopic.slice(1).toLowerCase()).split(' '));
    else if (userProfile) fetchingData(userProfile.followingTopicsNames)
  }, [targetTopic, userProfile]);
  
  // Trigger Articles Updates (likes, delete, etc)
  useEffect(() => {
    if (updatedArticles) setArticles(updatedArticles);
  }, [updatedArticles])


  
  return (
    <div className="p-4">
      {(profileLoading || fetchLoading) && (<Loading />)}
      {(profileErr || fetchErr) && <span className="err-msg my-3">{profileErr || fetchErr}</span>}
      {articles?.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          authorName={item.authorName}
          authorId={item.authorId}
          authorPic={item.authorPic}
          likes={item.likes}
          likesCount={item.likesCount}
          commentsCount={item.commentsCount}
          thumbnail={item.thumbnail}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
}