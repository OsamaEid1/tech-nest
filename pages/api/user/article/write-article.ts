import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { title, content, thumbnail, topics, authorName, authorId, authorPic } = req.body;

        // Validate input
        if (!title || !content || !thumbnail || !topics || !authorId || !authorName || !authorPic) {
            return res.status(400).json({ error: "Missing Required Fields!" });
        }

        try {
            // Create a new topic
            const newTopic = await prisma.article.create({
                data: {
                    title,
                    content,
                    thumbnail,
                    authorName,
                    authorPic,
                    authorId,
                    likes: [],
                    comments: [],
                    status: 'pending'
                },
            });

            res.status(201).json({ topic: newTopic });
        } catch (error) {
            console.error("Error occurred while adding a new topic:", error);
            res.status(500).json({ error: "There is an error occurred, please try again later." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}