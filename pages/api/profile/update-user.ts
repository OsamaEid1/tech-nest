import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import formidable from "formidable";

const prisma = new PrismaClient();

// Set up formidable for parsing form-data
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export const config = {
    api: {
        bodyParser: false, // Disable bodyParser to handle form-data
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const form = new formidable.IncomingForm({
            uploadDir,
            keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: "Error parsing the form data." });
        }

        const { email } = fields;
        const { name, followingTopics, savedArticles, isActive } = fields;
        const picFile = files.pic;

        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Invalid or missing email parameter." });
        }

        try {
            // Find the user
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) 
                return res.status(404).json({ error: "User not found." });

            let newPicPath = user.pic;

            // If pic is provided and changed, upload the new one and delete the old one
            if (picFile) {
                const oldPicPath = user.pic ? path.join(uploadDir, path.basename(user.pic)) : null;

                // Save the new pic
                const newPicFileName = `${Date.now()}-${picFile.originalFilename}`;
                newPicPath = `/uploads/${newPicFileName}`;
                const newPicFullPath = path.join(uploadDir, newPicFileName);

                fs.renameSync(picFile.filepath, newPicFullPath);

                // Remove the old picture if it exists and is different
                if (oldPicPath && fs.existsSync(oldPicPath)) {
                    fs.unlinkSync(oldPicPath);
                }
            }

            // Update user information in the database
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    ...(name && { name }),
                    ...(newPicPath && { pic: newPicPath }),
                    ...(followingTopics && { followingTopicsNames: JSON.parse(followingTopics) }),
                    ...(savedArticles && { savedArticlesIDs: JSON.parse(savedArticles) }),
                    ...(isActive !== undefined && { isActive: isActive === "true" }),
                }
            });

            res.status(200).json({ user: updatedUser });
        } catch (error) {
            console.error("Error updating user info:", error);
            res.status(500).json({ error: "Internal server error." });
        }
        });
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}