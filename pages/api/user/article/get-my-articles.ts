import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId } = req.query;

        // Validate input
        if (!userId) 
            return res.status(400).json({ error: "Invalid or missing user id parameter." });

        try {
            // Retrieve articles
            const articles = await prisma.article.findMany({
                where: { authorId: String(userId) },
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    status: true,
                    refusingReason: true,
                    likes: true,
                    comments: true,
                    createdAt: true
                }
            });
            
            if (!articles.length) 
                return res.status(404).json({ error: "You have't published any article yet!" });
            
            // Format the result to include counts directly
            const formattedArticles = articles.map(article => ({
                id: article.id,
                title: article.title,
                thumbnail: article.thumbnail,
                status: article.status,
                refusingReason: article.refusingReason,
                likesCount: article.likes.length,
                commentsCount: article.comments.length,
                createdAt: article.createdAt
            }));

            res.status(200).json({ articles: formattedArticles });
        } catch (error) {
            console.error("Error happened while trying get user's articles:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}