'use client'

import { useParams } from "next/navigation";

function BrowseProfileContent() {
    const params = useParams();
    if (!params?.id) history.back();


    return (
        <div>{params?.id}</div>
    )
}

export default BrowseProfileContent