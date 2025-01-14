"use client";

import { useEffect } from "react";

const DynamicTitle = ({ title }) => {
    useEffect(() => {
        document.title = 'Tech Nest | ' + title;
    }, [title]);

    return null;
};

export default DynamicTitle;
