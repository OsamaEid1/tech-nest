import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'pages/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { userId, savedArticlesIDs } = req.body;

        // Validate input
        if (!userId || typeof userId !== "string") 
            return res.status(400).json({ error: "Invalid or missing userId parameter." });

        if (!Array.isArray(savedArticlesIDs)) 
            return res.status(400).json({ error: "Invalid or missing savedArticlesIDs parameter." });

        try {
            // Update user's savedArticlesIDs
            const updatedUser = await prisma.user.update({
                where: { id: String(userId) },
                data: { savedArticlesIDs },
            });

            res.status(200).json({ message: "User's saved articles updated successfully.", user: updatedUser });
        } catch (error) {
            console.error("Error happened while updating saved articles:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}