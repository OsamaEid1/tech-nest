import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/api/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId, savedArticlesIDs } = req.query;

        // Validate input
        const savedArticlesIDsArray = Array.isArray(savedArticlesIDs)
            ? savedArticlesIDs
            : typeof savedArticlesIDs === "string"
            ? savedArticlesIDs.split(",")
            : [];
        if (!userId || !savedArticlesIDsArray?.length) {
            return res
                .status(400)
                .json({ error: "There is an error occurred!" });
        }


        try {
            // Fetch articles by savedArticlesIDs
            const articles = await prisma.article.findMany({
                where: {
                    id: {
                        in: savedArticlesIDsArray,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    likes: true,
                    comments: true,
                    createdAt: true
                },
            });

            if (!articles.length)
                return res
                    .status(404)
                    .json({ error: "You haven't saved any articles yet!" });

            // Format the result to include counts directly
            const formattedArticles = articles.map((article) => ({
                id: article.id,
                title: article.title,
                thumbnail: article.thumbnail,
                likesCount: article.likes.length,
                commentsCount: article.comments.length,
                createdAt: article.createdAt,
            }));

            res.status(200).json({ articles: formattedArticles });
        } catch (error) {
            console.error("Error happened while trying to fetch articles: ", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}