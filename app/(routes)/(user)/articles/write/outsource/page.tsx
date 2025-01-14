'use client'
import DynamicTitle from "@components/global/DynamicTitle";
import MainButton from "@components/ui/form/MainButton";
import MainInput from "@components/ui/form/MainInput";
import Loading from "@components/ui/Loading";
import Popup from "@components/ui/Popup";
import { Autocomplete, TextField } from "@mui/material";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { writeArticle } from "app/helpers/user/article/writeArticle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setAllTopics } from "state/slices/topicsSlice";

function AddOutsourceArticle() {
    // Article Info
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    // Handle Article Thumbnail
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    // Handle Publishing The Article
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitErr, setSubmitError] = useState<string| null>(null);
    // Handle Choose The Article's Topic
    const [showSearchTopicsBar, setShowSearchTopicsBar] = useState<boolean>(false);
    const [chosenTopic, setChosenTopic] = useState<string | null>(null);
    const [fetchAllTopicsLoading, setFetchAllTopicsLoading] = useState<boolean>(false);
    const [fetchAllTopicsErr, setFetchAllTopicsErr] = useState<string | null>(null);
    // Popup
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    // Get User Profile To Use It In Store The Article Info
    const {loading: userProfileLoading, error: userProfileErr, userProfile} = useGetUserProfile();

    // Article Thumbnail
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

    // Handle Choose The Article's Topic
    const dispatch = useAppDispatch();
    const allTopics = useAppSelector(state => state.topics.allTopics);
    const handleGetAllTopics = async () => {
        // Fetch Topics for the first time
        setFetchAllTopicsLoading(true);
        setFetchAllTopicsErr(null);

        try {
            const topics = await fetchAllTopics();
            dispatch(setAllTopics(topics));
        } catch (error: any) {
            setFetchAllTopicsErr('There is an error occurred, you can try automatic suggest the topic for now');
        } finally {
            setFetchAllTopicsLoading(false);
        }
    };
    useEffect(() => {
        if (allTopics.length === 0) handleGetAllTopics();
    }, [allTopics])

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
            articleData.append('thumbnailFile', thumbnailFile ? thumbnailFile : '');
            articleData.append("outsourceArticleUrl", url);
            articleData.append("topic", chosenTopic as string);
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
        if (!title.trim() || !url.trim() || !chosenTopic) {
            alert("Thumbnail, Title, content, and Topic cannot be empty!");
            return;
        }

        publishTheArticle();
    };


    // Popup
    const handlePopupToggle = () => {
        setIsPopupOpened(false);
        // Reset States
        setTitle("");
        setThumbnailFile(null);
        setThumbnailPreview(null);
    };

    return (
        <>
            <DynamicTitle title='Add OutSourced Article' />
            {isPopupOpened && (
                <Popup type="success" onToggle={handlePopupToggle}>
                    <p>
                        Your Article (
                        <span className="font-medium text-black">{title}</span>)
                        is published successfully✅
                    </p>
                    <p className="font-medium italic">
                        it's pending now until the admins review it.
                    </p>
                    <Link
                        href={"/profile#my-articles"}
                        className="block my-2 mx-auto bg-white text-green-500 shadow-shadows duration main py-2.5 px-5 rounded-main duration-300 hover:bg-slate-200"
                    >
                        See your articles list
                    </Link>
                </Popup>
            )}
            {/* Article Thumbnail */}
            <div className="my-10 p-6 bg-white rounded-main shadow-md flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold mb-4">
                        Upload Article Thumbnail
                    </h1>
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
                            className="w-full h-48 shadow object-cover rounded-main"
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
                className="font-bold text-lg !text-black"
                inputStyles="mb-5 font-bold !text-xl !shadow"
            />
            {/* URL Input */}
            <MainInput
                type="url"
                placeholder="Article url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="font-bold text-lg !text-black"
                inputStyles="mb-5 font-bold !text-xl !shadow"
            />

            {/* Select The Related Topic */}
            <hr className='my-6' />
            <h3>The Article's Topic: </h3>
            <div className="relative">
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={allTopics.map((topic) => topic.name)}
                    renderInput={(params) => <TextField {...params} label="Topic" />}
                    className="rounded-main my-5 shadow-md"
                    onChange={(e, value) => setChosenTopic(value)}
                    disabled={allTopics.length > 0 ? false: true}
                />
                {(fetchAllTopicsLoading) && <Loading />}         
                {fetchAllTopicsErr && <span className="err-msg my-1">{fetchAllTopicsErr}</span>}       
            </div>
            <hr className="my-6" />
            {/* Submitting Process */}
            {submitLoading && (<Loading className="rounded-main" />)}
            {submitErr && (<span className="err-msg my-1">{submitErr}</span>)} 
            {/* Publish Button */}
            <MainButton
                onClick={handlePublishing}
                className="px-5 mx-auto text-lg"
                disabled={(!submitLoading && (title && url && chosenTopic) ? false : true)}
            >
                Publish
            </MainButton>
        </>
    );
}

export default AddOutsourceArticle;