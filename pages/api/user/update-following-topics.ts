import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        let {
            id,
            followingTopics
        } = req.body;

        // Check if the required fields are present
        if (!id || !followingTopics) 
            return res.status(400).json({ error: 'There is an error occurred !' });
        
        try {
            // Update the room in the database
            const updatedUser = await prisma.user.update({
                where: { id: String(id) },  
                data: {
                    followingTopicsNames: followingTopics
                }
            });

            // Check if the update was successful
            if (!updatedUser) 
                return res.status(404).json({ error: 'User not found !' });

            res.status(200).json({ updatedUser });
        } catch (error: any) {
            console.error(Error("Error while trying update the following topics for the user: ",error));
            res.status(500).json({ error: 'There is an error occurred, Try again later!' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}