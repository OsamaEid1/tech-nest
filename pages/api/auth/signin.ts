import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";

const prisma = new PrismaClient();

const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.SECRET_KEY || 'e87ae886e49904ac30df7b0d6c934d70be9598420512a159cf2d43ccfba7effaa900e801b7ce807deaa37150dd606b301da11b87441a1ecf0beee5243296313f');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        
        if (!email || !password) 
            return res.status(400).json({ error: 'برجاء إدخال الإيميل وكلمة السر' });

        try {
            // Fetch user from the database
            let user = await prisma.user.findUnique({
                where: { email },
            });
            
            if (!user) {
                return res.status(401).json({ error: 'الإيميل أو الباسورد خطأ، أعد المحاولة' });
            } else if (!user.isActive) {
                return res.status(401).json({ error: '!لقد خالفت القواعد لذا لم يعد بإمكانك الدخول على النظام' });
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'الإيميل أو الباسورد خطأ، أعد المحاولة' });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: user.id, name: user.name, role: user.role }, // Include role in the payload
                Buffer.from(SECRET_KEY),
                { expiresIn: '24h' }
            );
            // Set Token to Cookies
            res.setHeader('Set-Cookie', serialize('token', token, {
                secure: process.env.NODE_ENV === 'production', // set to true in production
                sameSite: 'strict',
                maxAge: 24 * 60 * 60, // 24 hours
                path: '/',
            }));

            // Return the token and user information without the password
            const userWithoutPassword = { ...user };
            delete (userWithoutPassword as any).password; //Mark as `any` to avoid TypeScript error
            
            return res.status(200).json({ user: userWithoutPassword });
        } catch (error) {
            console.error("Something happened while fetching user info! ", error)
            return res.status(500).json({ error: 'حدث خطأ أثناء محاولة تسجيل الدخول، حاول ثانيةً!' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}