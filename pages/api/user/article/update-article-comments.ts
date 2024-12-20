import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { articleId, updatedComments } = req.body;

        // Validate input
        if (!articleId || !Array.isArray(updatedComments)) 
            return res.status(400).json({ error: "Invalid or missing required fields !" });

        try {
            // Update article's comments
            const updatedArticle = await prisma.article.update({
                where: { id: String(articleId) },
                data: { 
                    comments: updatedComments
                },
            });

            res.status(200).json({ updatedArticle });
        } catch (error) {
            console.error("Error happened while commenting to the article:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}