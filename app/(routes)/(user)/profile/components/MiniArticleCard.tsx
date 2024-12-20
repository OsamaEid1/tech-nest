import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArticleCard } from "app/helpers/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function MiniArticleCard({
   id,
   title,
   thumbnail,
   status,
   likesCount,
   commentsCount,
}: ArticleCard) {
   return (
      <div className={`rounded-main shadow-lg ${status === 'pending' ? 'outline-1 outline-yellow-200' : 'outline-1 outline-green-200'}`}>
         <Link
            href={`articles/${id}`}
            className="
                     block min-w-[250px] min-h-[180px] bg-slate-200 rounded-main flex-shrink-0
                     relative duration-300 group/card
               "
         >
            {/* Thumbnail */}
            <Image
               height={180}
               width={250}
               src={thumbnail ? thumbnail : "/assets/images/article-test.png"}
               alt={title}
               priority
               className="w-[250px] h-[180px] rounded-main"
            />
            <div className="absolute bottom-0 px-4 bg-black/40 duration-300 group-hover/card:bg-black/90 w-full rounded-b-main h-[40%]">
               {/* Title */}
               <p
                  title={title}
                  className="
                     text-white font-medium underline duration-300 py-1 truncate
                     group-hover/card:no-underline group-hover/card:text-hovers leading-tight
                  "
               >
                  {title}
               </p>
               {/* Likes & Comments Counts */}
               {status !== 'approved' ? (<p>Status:<span className="font-medium"> {status}</span></p>)
               : (
                  <ul className="flex gap-2 text-white py-1 mt-auto">
                     <li>
                        <FontAwesomeIcon
                           icon={faHeart}
                           size="sm"
                           className="text-red-500 "
                        />
                        <span> {likesCount}</span>
                     </li>
                     <li>
                        <FontAwesomeIcon
                           icon={faComment}
                           size="sm"
                           flip="horizontal"
                           className=""
                        />
                        <span> {commentsCount}</span>
                     </li>
                  </ul>
               )}
            </div>
         </Link>
      </div>
   );
}

export default MiniArticleCard;
