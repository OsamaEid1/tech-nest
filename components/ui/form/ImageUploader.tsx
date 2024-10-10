import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // Correct type: string or null
    const [error, setError] = useState<string | null>(null); // Error state can also be string or null
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input element

    // File validation logic
    const validateFile = (file: File) => {
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
        setError("Only JPG, PNG, and GIF files are allowed.");
        return false;
    }
    if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setError("File size should not exceed 2MB.");
        return false;
    }
    return true;
    };

    // File input change handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Use optional chaining in case no file is selected

        if (file && validateFile(file)) {
            setError('');
            const reader = new FileReader();

            // FileReader.onloadend type handling
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setSelectedImage(reader.result); // Only set if it's a string (base64 image)
                }    else {
                    setSelectedImage(null); // Handle the case when result is ArrayBuffer or null
                }
            };

            reader.readAsDataURL(file); // Read file as data URL (base64 string)
        } else {
            setSelectedImage(null); // Reset if invalid file is selected
        }
    };

    const handleClickOnFileButton = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div
            className="mb-5"
        >
            <div className={`relative w-[160px] h-[160px] mx-auto rounded-full shadow-md bg-light shadow-shadows
                            overflow-hidden ${selectedImage ? 'hidden' : 'block'}`}
            >
                <span
                    className="absolute top-[55%] left-1/2 -right-1/2 -translate-x-1/2 -translate-y-[50%]
                    text-base text-slate-600 font-semibold h-fit w-fit "
                >   Add Your Pic
                    <span className="text-4xl block -mt-3">+</span>
                </span>
                <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    title="Add Your Pic"
                    className="
                        opacity-0 cursor-pointer outline outline-red-500
                        w-full h-full max-w-full rounded-full
                    "
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {selectedImage && (
                <div>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className={`inline w-[160px] h-[160px] rounded-full shadow-md shadow-shadows`}
                    />
                    <ul
                        className="bg-light w-fit mx-auto mt-1 -mb-2 p-1 rounded-main"
                    >
                        <li 
                            title="Click to change the pic"
                            className="
                            text-xl font-bold inline bg-light me-3 py-[1px] px-2 
                                rounded-main duration-300 hover:bg-hovers hover:text-white cursor-pointer
                            "
                            onClick={handleClickOnFileButton}
                        >
                            +
                        </li>
                        <li
                            title="Click to remove the pic"
                            className="
                                inline bg-light py-[3px] px-2 rounded-main duration-300
                                hover:bg-red-500 hover:text-white cursor-pointer
                            "
                            onClick={() => setSelectedImage(null)}
                        ><FontAwesomeIcon icon={faTrash} size='sm' /></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;