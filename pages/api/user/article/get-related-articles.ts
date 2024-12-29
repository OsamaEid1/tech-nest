import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { topics } = req.query;

        try {
            // Validate input
            const topicsArray = Array.isArray(topics)
                ? topics
                : typeof topics === "string"
                ? topics.split(",")
                : [];

            let articles;
            if (topicsArray.length > 0) {
                // Fetch articles that have matching topics
                articles = await prisma.article.findMany({
                    where: {
                        topic: {
                            in: topicsArray,
                        },
                        status: 'approved'
                    },
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                        topic: true,
                        likes: true,
                        comments: true,
                        authorId: true,
                        authorName: true,
                        authorPic: true,
                        createdAt: true
                    }
                });

                if (!articles.length) 
                    return res.status(404).json({ error: "There is no articles that related to such topic/s" });
            } else {
                // Fetch all articles if no topics are provided
                articles = await prisma.article.findMany({
                    where: {status: 'approved'},
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                        topic: true,
                        likes: true,
                        comments: true,
                        authorId: true,
                        authorName: true,
                        authorPic: true,
                        createdAt: true
                    }
                });

                if (!articles.length) 
                    return res.status(404).json({ error: "There is no articles are published for now!" });
            }

            // Format the result to include counts directly
            const formattedArticles = articles.map((article) => ({
                id: article.id,
                title: article.title,
                thumbnail: article.thumbnail,
                topic: article.topic,
                likes: article.likes,
                commentsCount: article.comments.length,
                authorId: article.authorId,
                authorName: article.authorName,
                authorPic: article.authorPic,
                createdAt: article.createdAt,
            }));

            res.status(200).json({ articles: formattedArticles });
        } catch (error) {
            console.error("Error happened while trying to fetch articles:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}