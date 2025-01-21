import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables.");
        }

        if (!email || !password)
            return res
                .status(400)
                .json({ error: "برجاء إدخال الإيميل وكلمة السر" });

        try {
            // Fetch user from the database
            let user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Email/Password is wrong, try again!" });
            } else if (!user.isActive) {
                return res
                    .status(401)
                    .json({
                        error: "You break our rules, so you are not allow to be with us again.",
                    });
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ error: "Email/Password is wrong, try again!" });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: user.id, name: user.name, role: user.role }, // Include role in the payload
                SECRET_KEY, // Use the SECRET_KEY directly
                { expiresIn: "24h" }
            );

            // Set Token to Cookies
            res.setHeader(
                "Set-Cookie",
                serialize("token", token, {
                    secure: process.env.NODE_ENV === "production", // set to true in production
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60, // 24 hours
                    path: "/",
                })
            );

            // Return the token and user information without the password
            const userWithoutPassword = { ...user };
            delete (userWithoutPassword as any).password; // Mark as `any` to avoid TypeScript error

            return res.status(200).json({ user: userWithoutPassword });
        } catch (error) {
            console.error(
                "Something happened while fetching user info! ",
                error
            );
            return res
                .status(500)
                .json({
                    error: "There is an error occurred, try again later!",
                });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
