import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { articleId, updatedLikes } = req.body;

        // Validate input
        if (!articleId || !Array.isArray(updatedLikes)) 
            return res.status(400).json({ error: "Invalid or missing required fields !" });

        try {
            // Update article's likes
            const updatedArticle = await prisma.article.update({
                where: { id: String(articleId) },
                data: { 
                    likes: updatedLikes
                },
            });

            res.status(200).json({ updatedArticle });
        } catch (error) {
            console.error("Error happened while liking the article:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}