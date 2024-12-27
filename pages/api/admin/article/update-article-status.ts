import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
            const { articleId, status, refusingReason } = req.body;

            if (!articleId || !status || (status !== 'approved' && status !== 'refused'))
                return res.status(400).json({error: 'There is an invalid data!'})

            try {
                // Update article information in the database
                const updatedArticle = await prisma.article.update({
                    where: { id: String(articleId) },
                    data: {
                        status,
                        refusingReason
                    }
                });

                res.status(201).json({ article: updatedArticle });
            } catch (error) {
                console.error("Error updating article info:", error);
                res.status(500).json({ error: "There is an error occurred, please try again later!" });
            }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}