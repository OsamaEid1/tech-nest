import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import path from 'path';
import * as formidable from "formidable";

const prisma = new PrismaClient();

const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.SECRET_KEY || 'e87ae886e49904ac30df7b0d6c934d70be9598420512a159cf2d43ccfba7effaa900e801b7ce807deaa37150dd606b301da11b87441a1ecf0beee5243296313f');

// Formidable configuration to handle file upload
export const config = {
    api: {
        bodyParser: false, // Disables Next.js body parsing to handle file uploads manually
    },
};

// Formidable instance with proper options for handling file uploads
const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), '/public/uploads'), // Define upload directory
    keepExtensions: true, // Keep file extension (e.g., .jpg, .png)
    filename: (name, ext, path, form) => `${Date.now()}-${name}${ext}` // Customize the filename
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Parse the form data (file upload and fields)
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'There was an error while uploading the picture, please try again' });
            }

            let { name, email, password } = fields;
            const picFile = files.picFile; // Get the profile picture file

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
                // Store the image path in the public/uploads directory
                const picPath = `/uploads/${picFile[0].newFilename}`; // Generate path for the image

                // Create the new user
                const user = await prisma.user.create({
                    data: {
                        name: name[0],
                        email: email[0],
                        password: hashedPassword,
                        pic: picPath, // Store the image path in the database
                        followingTopicsNames: [], // Initialize as empty array
                        savedArticlesIDs: [], // Initialize as empty array
                        isActive: true, // By default, new users are active
                        role: 'USER', // Default role, can be adjusted later if needed
                    },
                });

                // Create a JWT token
                const token = jwt.sign(
                    { id: user.id, name: user.name, role: user.role }, // Include role in the payload
                    Buffer.from(SECRET_KEY),
                    { expiresIn: '24h' }
                );

                // Set Token to Cookies
                res.setHeader('Set-Cookie', serialize('token', token, {
                    httpOnly: true, // Secure and HttpOnly cookie
                    secure: process.env.NODE_ENV === 'production', // set to true in production
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
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}