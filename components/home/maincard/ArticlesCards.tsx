"use client";
import Card from "./Card";
import { useState, useEffect } from "react";
import { fetchRelatedArticles } from "app/helpers/user/article/fetchRelatedArticles";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { ArticleCard } from "app/helpers/constants";
import Loading from "@components/ui/Loading";
import { useAppSelector } from "state/hooks";
import { usePathname } from "next/navigation";


export default function ArticlesCards() {
  // Get Target Topic from the Dynamic Route /[topic]
  const pathname = usePathname();
  const targetTopic = pathname?.substring(1).replaceAll('-', ' ');
  // Fetch User profile to know user's following topics
  const { loading: profileLoading, error: profileErr, userProfile } = useGetUserProfile();
  // Fetch Articles States
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [fetchErr, setFetchErr] = useState<string | null>(null);
  const [articles, Articles] = useState<ArticleCard[]>([]);


  useEffect(() => {
    const fetchingData = async (targetTopics: string[]) => {
      setFetchLoading(true);
      setFetchErr(null);

      try {
          const data = await fetchRelatedArticles(targetTopics);
          Articles(data);
      } catch (error: any) {
        setFetchErr(error);
      } finally {
        setFetchLoading(false);
      }
    };


    if (targetTopic && targetTopic !== '') fetchingData(targetTopic.split(' '));
    else if (userProfile) fetchingData(userProfile.followingTopicsNames)
  }, [targetTopic, userProfile]);
  
  
  return (
    <div className="p-4">
      {(profileLoading || fetchLoading) && (<Loading />)}
      {(profileErr || fetchErr) && <span className="err-msg my-3">{profileErr || fetchErr}</span>}
      {articles?.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          author={item.authorName  || ""}
          views={item.likesCount}
          comments={item.commentsCount}
          imageUrl={item.thumbnail}
          id={item.id}
        />
      ))}
    </div>
  );
}