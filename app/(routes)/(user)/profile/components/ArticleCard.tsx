import { faComment, faHeartCircleBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ArticleCard } from 'app/helpers/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// { id, title, thumbnail, likesCount, commentsCount, } : ArticleCard
function ArticleCard() {
    return (
        <div>
            <Link
                href={'articles/id'}
            >
                {/* Thumbnail */}
                <Image height={150} width={250} src={'/public/assets/article-test.png'} alt={'title'} priority
                    className=''
                />
                {/* Title */}
                <p>Title</p>
                {/* Likes & Comments Counts */}
                <ul>
                    <li><FontAwesomeIcon icon={faHeartCircleBolt} /> {3}</li>
                    <li><FontAwesomeIcon icon={faComment} /> {1}</li>
                </ul>
            </Link>
        </div>
    )
}

export default ArticleCard