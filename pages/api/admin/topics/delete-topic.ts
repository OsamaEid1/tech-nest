import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({error : 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({error : 'Invalid topic ID' });
        }

        await prisma.topics.delete({
            where: {
                id: String(id),
            },
        });

        res.status(200).json({message : 'Topic deleted successfully' });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({error : 'Topic not found or not owned by user' });
        }
        
        console.error('Failed to delete the topic:', error);
        res.status(500).json({error : 'There is an error occurred, try again later.' });
    }
}
