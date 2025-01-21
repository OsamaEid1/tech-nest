import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
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
    if (req.method === "POST") {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error while parsing the form data: ", err);
                return res
                    .status(500)
                    .json({ error: "There is an invalid data !" });
            }

            const {
                title,
                content,
                outsourceArticleUrl,
                topic,
                authorName,
                authorId,
                authorPic,
            } = fields;
            const thumbnailFile = Array.isArray(files.thumbnailFile)
                ? files.thumbnailFile[0]
                : files.thumbnailFile;

            // Validate input
            if (
                !title ||
                !(content || outsourceArticleUrl) ||
                !topic ||
                !authorId ||
                (authorId && !authorId[0]) ||
                !authorName ||
                !authorPic
            ) {
                console.error(
                    "There are required fields missing!",
                    title,
                    content,
                    thumbnailFile
                );
                return res
                    .status(400)
                    .json({ error: "Missing Required Fields!" });
            }

            try {
                let thumbnailUrl = ""; // To store the Cloudinary URL

                // Handle image upload if a new file is provided
                if (thumbnailFile && thumbnailFile.filepath) {
                    // Upload the thumbnail to Cloudinary
                    const result = await cloudinary.uploader.upload(
                        thumbnailFile.filepath,
                        {
                            folder: "tech-nest-articles-thumbnails", // Organize images in a folder
                            transformation: {
                                width: 800,
                                height: 450,
                                crop: "limit",
                            }, // Optional: Resize image
                        }
                    );

                    thumbnailUrl = result.secure_url; // Store the Cloudinary URL
                }

                // Create a new article
                const article = await prisma.article.create({
                    data: {
                        title: title[0],
                        ...(content && content[0] && { content: content[0] }),
                        ...(outsourceArticleUrl &&
                            outsourceArticleUrl[0] && {
                                outsourceArticleUrl: outsourceArticleUrl[0],
                            }),
                        ...(thumbnailUrl && { thumbnail: thumbnailUrl }), // Use Cloudinary URL
                        topic: topic[0],
                        authorName: authorName[0],
                        authorPic: authorPic[0],
                        authorId: authorId[0],
                        likes: [],
                        comments: [],
                        status: "pending",
                    },
                });

                res.status(201).json({ article });
            } catch (error) {
                console.error(
                    "Error occurred while creating new article:",
                    error
                );
                res.status(500).json({
                    error: "There is an error occurred, please try again later.",
                });
            } finally {
                // Clean up: Delete the temporary file after upload
                if (thumbnailFile && thumbnailFile.filepath) {
                    await fs
                        .unlink(thumbnailFile.filepath)
                        .catch(console.error);
                }
            }
        });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
