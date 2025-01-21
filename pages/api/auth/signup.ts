import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import * as formidable from 'formidable';
import fs from 'fs/promises';

const prisma = new PrismaClient();

const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.SECRET_KEY);  

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js body parsing to handle file uploads manually
export const config = {
    api: {
        bodyParser: false,
    },
};

// Formidable instance to handle file uploads
const form = new formidable.IncomingForm();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Parse the form data (file upload and fields)
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'There was an error while uploading the picture, please try again' });
            }

            const { name, email, password } = fields;
            const picFile = files.picFile as formidable.File[]; // Get the profile picture file

            // Validate required fields
            if (!name || !email || !password || !picFile) {
                return res.status(400).json({ error: 'Please fill all the inputs' });
            }

            try {
                // Check if the email already exists
                const existingUser = await prisma.user.findUnique({
                    where: { email: email[0] },
                });

                if (existingUser) {
                    return res.status(400).json({ error: 'This email is already in use' });
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password[0], 10);

                // Upload image to Cloudinary
                const result = await cloudinary.uploader.upload(picFile[0].filepath, {
                    folder: 'tech-nest-users-profile-pics', // Organize images in a folder
                });

                // Create the new user
                const user = await prisma.user.create({
                    data: {
                        name: name[0],
                        email: email[0],
                        password: hashedPassword,
                        pic: result.secure_url, // Store Cloudinary URL
                        followingTopicsNames: [], // Initialize as empty array
                        savedArticlesIDs: [], // Initialize as empty array
                        isActive: true, // By default, new users are active
                        role: 'USER', // Default role
                    },
                });

                // Create a JWT token
                const token = jwt.sign(
                    { id: user.id, name: user.name, role: user.role }, // Include role in the payload
                    Buffer.from(SECRET_KEY),
                    { expiresIn: "24h" }
                );

                // Set Token to Cookies
                res.setHeader('Set-Cookie', serialize('token', token, {
                    secure: process.env.NODE_ENV === 'production', // Set to true in production
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60, // 24 hours
                    path: '/',
                }));

                // Return the token and user information without the password
                const userWithoutPassword = { ...user };
                delete (userWithoutPassword as any).password; // Remove password from response

                res.status(201).json({ token, user: userWithoutPassword });
            } catch (error) {
                console.error('Error while creating the user:', error);
                res.status(500).json({ error: 'There is an error, try again!' });
            } finally {
                // Clean up: Delete the temporary file after upload
                if (picFile && picFile[0].filepath) {
                    await fs.unlink(picFile[0].filepath).catch(console.error);
                }
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}