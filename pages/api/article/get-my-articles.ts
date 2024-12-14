import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId } = req.query;

        // Validate input
        if (!userId) 
            return res.status(400).json({ error: "Invalid or missing user id parameter." });

        try {
            // Retrieve article profile by email
            const articles = await prisma.article.findMany({
                where: { authorId: String(userId) }
            });

            if (!articles) 
                return res.status(404).json({ error: "You have not any articles yet!" });

            res.status(200).json({ articles });
        } catch (error) {
            console.error("Error happened while trying get your articles:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}