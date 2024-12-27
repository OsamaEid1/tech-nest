'use client'
import React, { forwardRef, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import MainInput from "@components/ui/form/MainInput";
import MainButton from "@components/ui/form/MainButton";
import Loading from "@components/ui/Loading";
import ReactQuill from "react-quill";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { writeArticle } from "app/helpers/user/article/writeArticle";
import Popup from "@components/ui/Popup";
import Link from "next/link";

// Dynamically import ReactQuill to handle SSR (react-quill requires a browser environment)
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

const WriteArticlePage = () => {
    // Get User Profile To Use It In Store The Article Info
    const {loading: userProfileLoading, error: userProfileErr, userProfile} = useGetUserProfile();
    
    // Handle Article Thumbnail
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const handleUploadThumbnailFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Save The Thumbnail File
            setThumbnailFile(file);
            // Convert file to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Article Editor Space
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    // Handle Publishing The Article
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitErr, setSubmitError] = useState<string| null>(null);
    // Popup
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    // Extract The Article Text to AI model can work with
    const quillRef = useRef<ReactQuill | null>(null);
    const handleGetText = () => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const plainText = quill.getText();
            console.log("Plain Text:", plainText);
        }
    };
    
    // Publish the article Process
    const publishTheArticle = async () => {
        // Reset Submit States
        setSubmitLoading(true);
        setSubmitError(null);

        try {
            // Check Required User Info
            if (!userProfile?.id || !userProfile?.name || !userProfile?.pic) {
                console.error("Can't get user info for creating new article!");
                throw 'There is an error occurred, refresh the page or try re-sign in.'
            }
            // Set Article Info in the form of Form Data to can parse the thumbnail image in backend API
            const articleData = new FormData();
            articleData.append('title', title);
            articleData.append('content', content);
            articleData.append('thumbnailFile', thumbnailFile ? thumbnailFile : '');
            articleData.append("topics", ["python", "Data Science"].join());
            articleData.append('authorId', userProfile.id);
            articleData.append('authorName', userProfile.name);
            articleData.append('authorPic', userProfile.pic);
            // Call The API
            await writeArticle(articleData);
            setIsPopupOpened(true);
        } catch (error: any) {
            console.error(error);
            setSubmitError(error);
        } finally {
            setSubmitLoading(false);
        }
    };
    const handlePublishing = () => {
        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty!");
            return;
        }
        // Pass the article content text to API Model to retrieve the suggested topics for the articles
        // handleGetText();

        publishTheArticle();
    };

    // Popup
    const handlePopupToggle = () => {
        setIsPopupOpened(false);
        // Reset States
        setTitle("");
        setContent("");
        setThumbnailFile(null);
        setThumbnailPreview(null);
    };

    return (
        <div className="max-w-4xl mt-[90px] mb-14 mx-auto px-8 py-4 bg-white rounded-main shadow shadow-shadows relative">
            {isPopupOpened && <Popup
                type="success"
                onToggle={handlePopupToggle}
            >
                <p>Your Article (<span className="font-medium text-black">{title}</span>) is published successfully✅</p>
                <p className="font-medium italic">it's pending now until the admins review it.</p>
                <Link href={'/profile#my-articles'}
                    className="block my-2 mx-auto bg-white text-green-500 shadow-shadows duration main py-2.5 px-5 rounded-main duration-300 hover:bg-slate-200"
                >See your articles list</Link>
            </Popup>
            }
            <h1 className="mb-8 text-center font-mono">Write Your Article</h1>
            {/* Article Thumbnail */}
            <div className="my-10 p-6 bg-white rounded-main shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold mb-4">Upload Article Thumbnail</h1>
                    {/* Thumbnail Upload Section */}
                    <label
                        htmlFor="thumbnailPreview-input"
                        className="block mb-4 cursor-pointer text-center duration-300 bg-blue-500 text-white py-2 px-4 rounded-main hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Choose Thumbnail
                        <input
                            id="thumbnailPreview-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadThumbnailFile}
                        />
                    </label>
                </div>
                {/* Preview Section */}
                {thumbnailPreview ? (
                    <div className="mt-4">
                        <p className="text-gray-600 mb-2">Preview:</p>
                        <img
                            src={thumbnailPreview}
                            alt="Thumbnail Preview"
                            className="w-full h-48 object-cover rounded-main"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">No thumbnail selected!</p>
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
            {submitLoading && (<Loading className="rounded-main" />)}
            {submitErr && (<span className="err-msg my-1">{submitErr}</span>)} 
            {/* Publish Button */}
            <MainButton
                onClick={handlePublishing}
                className="px-5 mx-auto text-lg"
                disabled={submitLoading}
            >
                Publish
            </MainButton>
        </div>
    );
};

export default WriteArticlePage;
