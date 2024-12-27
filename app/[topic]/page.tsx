'use client'
import { usePathname } from 'next/navigation'
import Home from '../page'
import { useEffect } from 'react';

function TopicArticles({params}) {
    const pathname = usePathname();

    useEffect(() => {
        const topic = pathname?.replaceAll("-", ' ');

        try {
            
        } catch (error) {
            
        }
    }, [])

    return (
        <Home>
            <div>TopicArticles</div>
        </Home>
    )
}

export default TopicArticles