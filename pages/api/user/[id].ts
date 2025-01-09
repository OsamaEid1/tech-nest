import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing user profile" });
        }

        // Use Prisma transaction to fetch user info and articles
        const [user, articles] = await prisma.$transaction([
            prisma.user.findUnique({
                where: { id },
                select: {
                    name: true,
                    email: true,
                    pic: true,
                },
            }),
            prisma.article.findMany({
                where: { authorId: String(id), status: "approved" },
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    topic: true,
                    outsourceArticleUrl: true,
                    likes: true,
                    comments: true,
                    createdAt: true,
                },
            }),
        ]);

        if (!user || !articles)
            return res.status(404).json({ error: "There is an error occurred, try again later!" });

        // Format the result to include counts directly
        const formattedArticles = articles.map((article) => ({
            id: article.id,
            title: article.title,
            thumbnail: article.thumbnail,
            topic: article.topic,
            likesCount: article.likes.length,
            commentsCount: article.comments.length,
            authorId: id,
            authorName: user.name,
            authorPic: user.pic,
            createdAt: article.createdAt,
        }));

        // Return the user information and their articles
        return res.status(200).json({ user, articles: formattedArticles });
    } catch (error) {
        console.error("Error fetching user info or articles:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};