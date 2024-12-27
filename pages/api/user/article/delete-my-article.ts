import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({error : 'Method not allowed' });
    }

    try {
        const { userId, articleId } = req.body;

        if (!userId || !articleId) {
            return res.status(400).json({error : 'There is an error occurred, try again later.' });
        }

        await prisma.article.delete({
            where: {
                id: String(articleId),
                authorId: String(userId)
            },
        });

        res.status(200).json({message : 'Article deleted successfully' });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({error : 'Article not found or not owned by user' });
        }
        
        console.error('Failed to delete the article:', error);
        res.status(500).json({error : 'There is an error occurred, try again later.' });
    }
}
