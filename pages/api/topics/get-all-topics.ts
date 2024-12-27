import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            // Retrieve topics profile by email
            const topics = await prisma.topics.findMany();

            if (!topics?.length) {
                return res.status(404).json({ error: "No topics are stored!" });
            }

            res.status(200).json({ topics });
        } catch (error) {
            console.error("Error happened while trying get all topics:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}