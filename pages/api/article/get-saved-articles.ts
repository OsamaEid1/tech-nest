import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId } = req.query;

        // Validate input
        if (!userId || typeof userId !== "string") {
            return res.status(400).json({ error: "Invalid or missing userId parameter." });
        }

        try {
            // Fetch user info by userId
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { savedArticlesIDs: true },
            });

            if (!user || !user.savedArticlesIDs) {
                return res.status(404).json({ error: "No saved articles." });
            }

            const savedArticlesIDs = user.savedArticlesIDs;

            // Fetch articles by savedArticlesIDs
            const articles = await prisma.article.findMany({
                where: {
                    id: {
                        in: savedArticlesIDs,
                    },
                },
            });

            res.status(200).json({ articles });
        } catch (error) {
            console.error("Error happened while trying to fetch articles:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}