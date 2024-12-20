'use client'
import React, { forwardRef, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import MainInput from "@components/ui/form/MainInput";
import MainButton from "@components/ui/form/MainButton";
import Loading from "@components/ui/Loading";
import ReactQuill from "react-quill"; // Import necessary types

// Dynamically import ReactQuill to handle SSR (react-quill requires a browser environment)
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type ArticleEditorProps = {
    onSave: (title: string, content: string) => void;
};

const WriteArticlePage: React.FC<ArticleEditorProps> = () => {
    // Handle Article Thumbnail
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Convert file to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Article Editor Space
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    // Toolbar Options
    const quillModules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    // Handle Publishing The Article
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string| null>(null);
    const handlePublishing = () => {
        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty!");
            return;
        }
        handleGetText()
        // console.log(getText(content));
        // publishTheArticle();
    };
    const quillRef = useRef<ReactQuill | null>(null);
    const handleGetText = () => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const plainText = quill.getText();
            console.log("Plain Text:", plainText);
        }
    };
    
    const publishTheArticle = async () => {
        setLoading(true);
        setError(null);

        try {
            
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mt-[90px] mb-14 mx-auto px-8 py-4 bg-white rounded-main shadow shadow-shadows relative">
            <h1 className="mb-8 text-center font-mono">Write Your Article</h1>
            {/* Article Thumbnail */}
            <div className="my-10 p-6 bg-white rounded-main shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold mb-4">Upload Article Thumbnail</h1>
                    {/* Thumbnail Upload Section */}
                    <label
                        htmlFor="thumbnail-input"
                        className="block mb-4 cursor-pointer text-center duration-300 bg-blue-500 text-white py-2 px-4 rounded-main hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Choose Thumbnail
                        <input
                            id="thumbnail-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                {/* Preview Section */}
                {thumbnail ? (
                    <div className="mt-4">
                        <p className="text-gray-600 mb-2">Preview:</p>
                        <img
                            src={thumbnail}
                            alt="Thumbnail Preview"
                            className="w-full h-48 object-cover rounded-main"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">No thumbnail selected.</p>
                )}
            </div>
            {/* Title Input */}
            <MainInput
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-bold text-xl !text-black"
                inputStyles="p-2 mb-5 font-bold !shadow-lg"
            />
            {/* ReactQuill (Article Editor) */}
            <div className="h-96 mb-4">
                <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    placeholder="Write your article..."
                    className=" shadow-lg"
                    value={content}
                    ref={quillRef}
                    onChange={setContent}
                />
            </div>
            {/* Submitting Process */}
            {loading && (<Loading className="rounded-main" />)}
            {error && (<span className="err-msg my-1">{error}</span>)} 
            {/* Publish Button */}
            <MainButton
                onClick={handlePublishing}
                className="px-5 mx-auto text-lg"
                disabled={loading}
            >
                Publish
            </MainButton>
        </div>
    );
};

export default WriteArticlePage;
