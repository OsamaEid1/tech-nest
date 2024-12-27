'use client'
import { usePathname } from 'next/navigation'
import Home from '../page'

function TopicArticles({params}) {
    const location = usePathname();

    console.log("sss ",location);

    return (
        <>
            <Home>
                <div>TopicArticles</div>
            </Home>
        </>
    )
}

export default TopicArticles