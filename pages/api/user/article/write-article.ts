import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import path from "path";
import * as formidable from "formidable";

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false, // Disable bodyParser to handle form-data
    },
};

// Formidable instance with proper options for handling file uploads
const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "/public/uploads/articles/thumbnails"), // Define upload directory
    keepExtensions: true, // Keep file extension (e.g., .jpg, .png)
    filename: (name, ext, path, form) => `${Date.now()}-${name}${ext}`, // Customize the filename
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error while parsing the form data: ", err);
                return res.status(500).json({ error: "There is an invalid data !" });
            }

            const { title, content, outsourceArticleUrl, topic, authorName, authorId, authorPic } = fields;
            const thumbnailFile = Array.isArray(files.thumbnailFile) ? files.thumbnailFile[0] : files.thumbnailFile;

            // Validate input
            if (!title || !(content || outsourceArticleUrl) || !topic || !authorId || (authorId && !authorId[0]) || !authorName || !authorPic) {
                console.error('there is an required fields missed!', title, content, thumbnailFile)
                return res.status(400).json({ error: "Missing Required Fields!" });
            }

            try {
                // Handle image updates only if a new file is uploaded
                let thumbnailPath; 
                if (thumbnailFile && thumbnailFile.filepath) {
                    thumbnailPath = `/uploads/articles/thumbnails/${thumbnailFile.newFilename}`; // Generate path for the image
                }
                // Create a new topic
                const article = await prisma.article.create({
                    data: {
                        title: title[0],
                        ...(content && content[0] && { content: content[0] }),
                        ...(outsourceArticleUrl && outsourceArticleUrl[0] && { outsourceArticleUrl: outsourceArticleUrl[0] }),
                        ...(thumbnailPath && { thumbnail: thumbnailPath }),
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
                console.error("Error occurred while creating new article:", error);
                res.status(500).json({ error: "There is an error occurred, please try again later." });
            }
        });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}