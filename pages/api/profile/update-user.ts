import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use fs/promises for async file operations

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false, // Disable bodyParser to handle form-data
    },
};

// Formidable instance to handle file uploads
const form = new formidable.IncomingForm();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error while parsing the form data", err);
                return res
                    .status(500)
                    .json({ error: "There is an invalid data !" });
            }

            const { id, email, name, password, isActive } = fields;
            const picFile = Array.isArray(files.picFile)
                ? files.picFile[0]
                : files.picFile;

            if (!id)
                return res
                    .status(400)
                    .json({ error: "There is an invalid data!" });

            try {
                let newPicUrl = ""; // To store the new picture URL

                // Retrieve the current user's details from the database
                const user = await prisma.user.findUnique({
                    where: { id: String(id[0]) },
                });

                if (!user)
                    return res.status(404).json({ error: "User not found!" });

                // Handle image updates only if a new file is uploaded
                if (picFile && picFile.filepath) {
                    // Upload the new image to Cloudinary
                    const result = await cloudinary.uploader.upload(
                        picFile.filepath,
                        {
                            folder: "tech-nest-users-profile-pics", // Organize images in a folder
                        }
                    );

                    newPicUrl = result.secure_url; // Store the Cloudinary URL

                    // Delete the old image from Cloudinary if it exists
                    if (user.pic) {
                        const publicId = user.pic
                            .split("/")
                            .pop()
                            ?.split(".")[0]; // Extract public ID from URL
                        if (publicId) {
                            await cloudinary.uploader.destroy(
                                `tech-nest-users-profile-pics/${publicId}`
                            );
                        }
                    }
                } else if (fields.pic && typeof fields.pic === "string") {
                    // Retain the existing image URL if no new file is uploaded
                    newPicUrl = fields.pic;
                }

                // Dynamically build the update data object
                const data: Record<string, any> = {};

                if (email) data.email = String(email);
                if (name) data.name = String(name);
                if (password) {
                    // Hash the new password
                    const hashedPassword = await bcrypt.hash(password[0], 10);
                    data.password = String(hashedPassword);
                } else {
                    data.password = user.password; // Keep the existing password if no new one is provided
                }
                if (isActive !== undefined)
                    data.isActive = isActive[0] === "true";
                if (picFile || fields.pic) data.pic = newPicUrl;

                // Update user information in the database
                const updatedUser = await prisma.user.update({
                    where: { id: String(id[0]) },
                    data,
                });

                // Return the user information without the password
                const userWithoutPassword = { ...updatedUser };
                delete (userWithoutPassword as any).password; // Remove password from response

                res.status(201).json({ user: userWithoutPassword });
            } catch (error) {
                console.error("Error updating user info:", error);
                res.status(500).json({
                    error: "There is an error occurred, please try again later!",
                });
            } finally {
                // Clean up: Delete the temporary file after upload
                if (picFile && picFile.filepath) {
                    await fs.unlink(picFile.filepath).catch(console.error);
                }
            }
        });
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}