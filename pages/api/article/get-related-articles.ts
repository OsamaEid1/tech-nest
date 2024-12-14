import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
                        topics: {
                            hasSome: topicsArray,
                        },
                    },
                });
            } else {
                // Fetch all articles if no topics are provided
                articles = await prisma.article.findMany();
            }

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