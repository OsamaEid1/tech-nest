import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import path from "path";
import * as formidable from "formidable";
import fs from "fs"; // Import fs for file operations

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false, // Disable bodyParser to handle form-data
    },
};

// Formidable instance with proper options for handling file uploads
const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), '/public/uploads'), // Define upload directory
    keepExtensions: true, // Keep file extension (e.g., .jpg, .png)
    filename: (name, ext, path, form) => `${Date.now()}-${name}${ext}` // Customize the filename
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Error parsing the form data." });
            }

            const { id, email, name, password, isActive } = fields;
            const picFile = Array.isArray(files.picFile) ? files.picFile[0] : files.picFile;

            if (!id) return res.status(400).json({error: 'There is an info for this user!'})

            try {
                let newPicPath = ''; // To store the new picture path

                // Retrieve the current user's details from the database to check for existing pic
                const user = await prisma.user.findUnique({
                    where: { id: String(id[0]) },
                });

                // Handle image updates only if a new file is uploaded
                if (picFile && picFile.filepath) {
                    const oldPicPath = user?.pic
                        ? path.join(process.cwd(), '/public', user.pic) // Path to the old image
                        : null;

                    // Save the new pic
                    let newPicFileName = `${Date.now()}-${picFile.originalFilename}`;
                    newPicPath = `/uploads/${newPicFileName}`;
                    const newPicFullPath = path.join(process.cwd(), '/public', newPicPath);

                    // Move the new pic to the upload directory
                    fs.renameSync(picFile.filepath, newPicFullPath);

                    // Remove the old picture if it exists and is different
                    if (oldPicPath && oldPicPath !== newPicFullPath && fs.existsSync(oldPicPath)) {
                        fs.unlinkSync(oldPicPath);
                    }
                } else if (fields.pic && typeof fields.pic === "string") {
                    // Retain the provided string path if it's not a file upload
                    newPicPath = fields.pic;
                }

                // Dynamically build the update data object
                const data: Record<string, any> = {};

                if (email) data.email = String(email);
                if (name) data.name = String(name);
                if (password) data.password = String(password);
                if (isActive !== undefined) data.isActive = isActive[0] === "true";
                if (picFile) data.pic = newPicPath;

                // Update user information in the database
                const updatedUser = await prisma.user.update({
                    where: { id: String(id) },
                    data
                });

                // Return the token and user information without the password
                const userWithoutPassword = { ...updatedUser };
                delete (userWithoutPassword as any).password; // Remove password from response

                res.status(201).json({ user: userWithoutPassword });
            } catch (error) {
                console.error("Error updating user info:", error);
                res.status(500).json({ error: "There is an error occurred, please try again later!" });
            }
        });
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}