'use client'
import React, { forwardRef, useEffect, useRef, useState } from "react";
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
import { predictTheTopic } from "app/helpers/user/article/predictTheTopic";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { Topic } from "app/helpers/constants";
import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setAllTopics } from "state/slices/topicsSlice";

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
            if (plainText.trim() !== '')
                return plainText;
        }
        return null;
    };
    // Handle Predict The Article's Topic
    const [predictedTopic, setPredictedTopic] = useState<string | null>(null);
    const [predictingLoading, setPredictingLoading] = useState<boolean>(false);
    const [predictingErr, setPredictingErr] = useState<string | null>(null);
    const handlePredictTheTopic = async () => {
        setShowSearchTopicsBar(false);
        setChosenTopic(null);
        setPredictingLoading(true);
        setPredictingErr(null);
        setFetchAllTopicsErr(null);
        
        try {
            const articleText = handleGetText();
            if (!articleText) 
                throw 'You must write an article first!'
            
            const predictingTopic = await predictTheTopic(articleText);
            setPredictedTopic(predictingTopic);
        } catch (error: any) {
            setPredictingErr(error);
        } finally {
            setPredictingLoading(false);
        }
    };
    // Handle Choose The Article's Topic
    const dispatch = useAppDispatch();
    const allTopics = useAppSelector(state => state.topics.allTopics);
    const [showSearchTopicsBar, setShowSearchTopicsBar] = useState<boolean>(false);
    const [chosenTopic, setChosenTopic] = useState<string | null>(null);
    const [fetchAllTopicsLoading, setFetchAllTopicsLoading] = useState<boolean>(false);
    const [fetchAllTopicsErr, setFetchAllTopicsErr] = useState<string | null>(null);
    const handleGetAllTopics = async () => {
        if (!showSearchTopicsBar) {
            // Reset Predicted Topic
            setPredictedTopic(null);
            // Toggle Search Bar
            setShowSearchTopicsBar(true);
            // Check if All Topics Already Fetched
            if (allTopics.length > 0) 
                return;
    
            // Fetch Topics for the first time
            setFetchAllTopicsLoading(true);
            setFetchAllTopicsErr(null);
            setPredictingErr(null);
            try {
                const topics = await fetchAllTopics();
                dispatch(setAllTopics(topics));
            } catch (error: any) {
                setFetchAllTopicsErr('There is an error occurred, you can try automatic suggest the topic for now');
            } finally {
                setFetchAllTopicsLoading(false);
            }
        } else {
            setShowSearchTopicsBar(false);
        }
    };


    // Publish article Process
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
            if (predictedTopic) articleData.append("topic", predictedTopic);
            if (chosenTopic) articleData.append("topic", chosenTopic);
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
        if (!title.trim() || !content.trim() || !(predictedTopic || chosenTopic)) {
            alert("Thumbnail, Title, content, and Topic cannot be empty!");
            return;
        }

        setFetchAllTopicsErr(null);
        setPredictingErr(null);
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
        setShowSearchTopicsBar(false);
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
                >
                    See your articles list
                </Link>
            </Popup>
            }
            <h1 className="mb-8 text-center font-mono text-secTextColor italic">Write Your Article</h1>
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
                inputStyles="mb-5 font-bold !text-xl !shadow-lg"
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
            {/* Suggested / Write The Related Topic */}
            <hr className='my-6' />
            <div className="relative">
                <h3>The Article's Topic: </h3>
                <div className='flex gap-7 mt-3'>
                    {/* System Will SUGGEST The Topic Based On Article Text Using AI Model */}
                    <MainButton
                        className="!bg-hovers hover:!bg-hovers/80 disabled:!bg-gray-600"
                        disabled={(thumbnailFile && title && content) ? false : true}
                        onClick={handlePredictTheTopic}
                    >
                        Suggest To Me
                    </MainButton>
                    {/* User Will Select The Topic By Himself */}
                    <MainButton
                        onClick={handleGetAllTopics}
                    >
                        {showSearchTopicsBar ? 'Hide Search Bar' : 'I will Choose'}
                    </MainButton>
                </div>
                {/* Topics Search Bar FOR USER Choosing Case */}
                {showSearchTopicsBar && (!fetchAllTopicsLoading || !fetchAllTopicsErr) && allTopics.length > 0 && (
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={allTopics.map((topic) => topic.name)}
                        renderInput={(params) => <TextField {...params} label="Topic" />}
                        className="rounded-main my-5"
                        onChange={(e, value) => setChosenTopic(value)}
                    />
                )}
                {/* Fetch All Topics Process */}
                {fetchAllTopicsErr && (<span className="err-msg my-1">{fetchAllTopicsErr}</span>)}
                {fetchAllTopicsLoading && (<Loading className="p-1" />)}

                {/* Suggesting Process */}
                {predictedTopic && (<p className="font-semibold text-center">The Suggested Topic Is: <span className="font-bold text-xl text-hovers">{predictedTopic}</span></p>)}
                {predictingLoading && (<Loading className="p-1" />)}
                {predictingErr && (<span className="err-msg my-1">{predictingErr}</span>)} 
            </div>

            <hr className="my-6" />
            {/* Submitting Process */}
            {submitLoading && (<Loading className="rounded-main" />)}
            {submitErr && (<span className="err-msg my-1">{submitErr}</span>)} 
            {/* Publish Button */}
            <MainButton
                onClick={handlePublishing}
                className="px-5 mx-auto text-lg"
                disabled={(!submitLoading && (thumbnailFile && title && content && (predictedTopic || chosenTopic))) ? false : true}
            >
                Publish
            </MainButton>
        </div>
    );
};

export default WriteArticlePage;
