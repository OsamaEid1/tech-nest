import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        try {
            // Retrieve articles
            const articles = await prisma.article.findMany({
                where: { status: 'pending' },
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    content: true,
                    authorName: true,
                    createdAt: true,
                },
            });
            

            res.status(200).json({ articles });
        } catch (error) {
            console.error("Error happened while trying get pending articles:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}