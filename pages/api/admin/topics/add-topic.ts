import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/api/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name } = req.body;

        // Validate input
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Invalid Topic Name" });
        }

        try {
            // Check if the topic already exists
            const topics = await prisma.topics.findMany();

            const isTopicExist = () => {
                return topics.some(
                    (t) => t.name.toLowerCase() === name.toLowerCase()
                );
            };

            if (isTopicExist()) {
                return res
                    .status(409)
                    .json({ error: "This topic already exist!" });
            }

            // Create a new topic
            const newTopic = await prisma.topics.create({
                data: {
                    name,
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