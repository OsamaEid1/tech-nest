"use client";
import Card from "./Card";
import { useState, useEffect } from "react";
import { fetchRelatedArticles } from "app/helpers/user/article/fetchRelatedArticles";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { ArticleCard } from "app/helpers/constants";
import Loading from "@components/ui/Loading";


export default function Home() {
  const { loading: profileLoading, error: profileErr, userProfile } = useGetUserProfile();

  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [fetchErr, setFetchErr] = useState<string | null>(null);
  const [staticData, setStaticData] = useState<ArticleCard[]>([]);


  useEffect(() => {
    const fetchingData = async () => {
      setFetchLoading(true);
      setFetchErr(null);

      try {
          const data = await fetchRelatedArticles(
            userProfile?.followingTopicsNames as string[]
          );
          setStaticData(data);
      } catch (error: any) {
        console.error(error);
        setFetchErr(error);
      } finally {
        setFetchLoading(false);
      }
    };


    if (!profileLoading && userProfile) fetchingData();
  }, [userProfile, profileLoading]);
  
  
  return (
    <div className="p-4">
      {(profileLoading || fetchLoading) && (<Loading />)}
      {(profileErr || fetchErr) && <span className="err-msg my-3">{profileErr || fetchErr}</span>}
      {staticData.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          // text={item.content}
          author={item.authorName  || ""}
          // date={item.createdAt || ""}
          views={item.likesCount}
          comments={item.commentsCount}
          imageUrl={item.thumbnail}
          id={item.id}
        />
      ))}
    </div>
  );
}