"use client";
import Card from "./Card";
import { useState, useEffect } from "react";
import { fetchRelatedArticles } from "app/helpers/user/article/fetchRelatedArticles";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { ArticleCard } from "app/helpers/constants";
// import { Article } from "@prisma/client";
// const articles = [
//   {
//     id: "63e2e455c6f3f0a9a1b0",
//     title: "The Dawn of Quantum Computing",
//     thumbnail: "https://example.com/thumbnails/quantum.jpg",
//     content:
//       "Quantum computing is set to revolutionize technology as we know it.",
//     topics: ["Technology", "Quantum Computing"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-01T08:00:00Z",
//     updatedAt: "2024-12-01T08:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Alice Johnson",
//     authorId: "63e2d123c6f3f0a9a1b0",
//     authorPic: "https://example.com/profiles/alice.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e456c6f3f0a9a1b1",
//     title: "Understanding Artificial Intelligence",
//     thumbnail: "https://example.com/thumbnails/ai.jpg",
//     content: "AI is transforming the way we interact with machines.",
//     topics: ["AI", "Machine Learning"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-02T09:00:00Z",
//     updatedAt: "2024-12-02T09:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Bob Smith",
//     authorId: "63e2d124c6f3f0a9a1b1",
//     authorPic: "https://example.com/profiles/bob.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e457c6f3f0a9a1b2",
//     title: "The Rise of Renewable Energy",
//     thumbnail: "https://example.com/thumbnails/renewable.jpg",
//     content: "Renewable energy sources are becoming more viable each year.",
//     topics: ["Environment", "Energy"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-03T10:00:00Z",
//     updatedAt: "2024-12-03T10:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Cathy Lee",
//     authorId: "63e2d125c6f3f0a9a1b2",
//     authorPic: "https://example.com/profiles/cathy.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e458c6f3f0a9a1b3",
//     title: "Exploring the Cosmos",
//     thumbnail: "https://example.com/thumbnails/cosmos.jpg",
//     content: "Space exploration continues to inspire generations.",
//     topics: ["Science", "Astronomy"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-04T11:00:00Z",
//     updatedAt: "2024-12-04T11:00:00Z",
//     status: "PUBLISHED",
//     authorName: "David Chen",
//     authorId: "63e2d126c6f3f0a9a1b3",
//     authorPic: "https://example.com/profiles/david.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e459c6f3f0a9a1b4",
//     title: "The Future of Transportation",
//     thumbnail: "https://example.com/thumbnails/transport.jpg",
//     content: "Electric and autonomous vehicles are leading the way.",
//     topics: ["Technology", "Transportation"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-05T12:00:00Z",
//     updatedAt: "2024-12-05T12:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Ella Wright",
//     authorId: "63e2d127c6f3f0a9a1b4",
//     authorPic: "https://example.com/profiles/ella.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e460c6f3f0a9a1b5",
//     title: "Blockchain Beyond Cryptocurrency",
//     thumbnail: "https://example.com/thumbnails/blockchain.jpg",
//     content: "Blockchain technology has applications far beyond Bitcoin.",
//     topics: ["Technology", "Blockchain"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-06T13:00:00Z",
//     updatedAt: "2024-12-06T13:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Frank Garcia",
//     authorId: "63e2d128c6f3f0a9a1b5",
//     authorPic: "https://example.com/profiles/frank.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e461c6f3f0a9a1b6",
//     title: "Virtual Reality in Gaming",
//     thumbnail: "https://example.com/thumbnails/vr.jpg",
//     content: "VR gaming provides an immersive experience like never before.",
//     topics: ["Technology", "Gaming"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-07T14:00:00Z",
//     updatedAt: "2024-12-07T14:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Grace Hall",
//     authorId: "63e2d129c6f3f0a9a1b6",
//     authorPic: "https://example.com/profiles/grace.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e462c6f3f0a9a1b7",
//     title: "Advances in Medicine",
//     thumbnail: "https://example.com/thumbnails/medicine.jpg",
//     content: "Medical technology is advancing rapidly, improving lives.",
//     topics: ["Health", "Technology"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-08T15:00:00Z",
//     updatedAt: "2024-12-08T15:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Henry Kim",
//     authorId: "63e2d130c6f3f0a9a1b7",
//     authorPic: "https://example.com/profiles/henry.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e463c6f3f0a9a1b8",
//     title: "Urban Farming Trends",
//     thumbnail: "https://example.com/thumbnails/farming.jpg",
//     content: "Urban farming is reshaping agriculture in cities.",
//     topics: ["Environment", "Agriculture"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-09T16:00:00Z",
//     updatedAt: "2024-12-09T16:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Ivy Parker",
//     authorId: "63e2d131c6f3f0a9a1b8",
//     authorPic: "https://example.com/profiles/ivy.jpg",
//     user: null,
//   },
//   {
//     id: "63e2e464c6f3f0a9a1b9",
//     title: "Cybersecurity Essentials",
//     thumbnail: "https://example.com/thumbnails/cybersecurity.jpg",
//     content: "Protecting digital assets is more important than ever.",
//     topics: ["Technology", "Cybersecurity"],
//     likes: [],
//     comments: [],
//     createdAt: "2024-12-10T17:00:00Z",
//     updatedAt: "2024-12-10T17:00:00Z",
//     status: "PUBLISHED",
//     authorName: "Jack Nelson",
//     authorId: "63e2d132c6f3f0a9a1b9",
//     authorPic: "https://example.com/profiles/jack.jpg",
//     user: null,
//   },
// ];
export default function Home() {
  const { loading, error, userProfile } = useGetUserProfile();
  const [staticData, setStaticData] = useState<ArticleCard[]>([]);
  useEffect(() => {
    // fetchRelatedArticles().then((data) => setStaticData(data));
    const fetchingData = async () => {
      try {
        if (userProfile?.followingTopicsNames) {
          const data = await fetchRelatedArticles(
            userProfile?.followingTopicsNames
          );
          setStaticData(data);
        }
      } catch (error) {
        console.error(error);
      }
      // const data = await fetchRelatedArticles();
      // setStaticData(data);
    };
    fetchingData();
  }, [userProfile, loading]);
  console.log(staticData);
  return (
    <div className="p-4">
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
// id: string,
// title: string,
// thumbnail: string,
// status: 'pending' | 'approved' | 'refused',
// likesCount: number,
// commentsCount: number,
// authorId?: string,
// authorName?: string,
// authorPic?: string