import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } = req.query;

        // Validate input
        if (!id) 
            return res.status(400).json({ error: "Invalid or missing ID parameter." });

        try {
            // Retrieve article profile by email
            const article = await prisma.article.findUnique({
                where: { id: String(id) }
            });

            if (!article) 
                return res.status(404).json({ error: "Article not found." });

            res.status(200).json({ article });
        } catch (error) {
            console.error("Error happened while trying get article:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}