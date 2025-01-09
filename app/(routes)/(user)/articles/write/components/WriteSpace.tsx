import React, { useRef } from 'react'
import ReactQuill from 'react-quill';

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


function WriteSpace({ setArticleAsText, content, setContent }) {
    const quillRef = useRef<ReactQuill | null>(null);

    // Extract The Article Text to AI model can work with
    const handleSetArticleAsText = () => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const plainText = quill.getText();
            if (plainText.trim() !== '')
                setArticleAsText(plainText);
        }
    };

    return (
        <ReactQuill
            theme="snow"
            modules={quillModules}
            placeholder="Write your article..."
            className=" shadow-lg"
            value={content}
            ref={quillRef}
            onChange={setContent}
            onBlur={handleSetArticleAsText}
        />
    )
}

export default WriteSpace