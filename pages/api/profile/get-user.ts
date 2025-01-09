import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/api/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } = req.query;

        // Validate input
        if (!id) {
            return res.status(400).json({ error: "Invalid or missing id parameter." });
        }

        try {
            // Retrieve user profile by email
            const user = await prisma.user.findUnique({
                where: { id: String(id) },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    pic: true,
                    followingTopicsNames: true,
                    savedArticlesIDs: true,
                    isActive: true,
                    role: true,
                },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error("Error happened while trying get user profile:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
