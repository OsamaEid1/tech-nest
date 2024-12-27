'use client'
import Loading from "@components/ui/Loading";
import Popup from "@components/ui/Popup";
import { faComment, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Diversity1 } from "@mui/icons-material";
import { ArticleCard } from "app/helpers/constants";
import { deleteMyArticle } from "app/helpers/user/article/deleteMyArticle";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setMyLatestArticles } from "state/slices/articleSlice";

function MiniArticleCard({
   id,
   title,
   thumbnail,
   status,
   refusingReason,
   likesCount,
   commentsCount,
   authorId
}: ArticleCard) {
   // Popup
   const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
   const [popupType, setPopupType] = useState<'delete' | 'success'>('delete');
   const [popupText, setPopupText] = useState<string>(``);
   // Delete Logical States
   const [deleteArticleLoading, setDeleteArticleLoading] = useState<boolean>(false);
   const [deleteArticleErr, setDeleteArticleErr] = useState<string | null>(null);

   // Set Updated My Articles
   const dispatch = useAppDispatch();
   const myArticles = useAppSelector(state => state.articles.myArticles);
   const updateMyLatestArticles = () => {
      const updatedArticles = myArticles.filter(article => article.id != id)
      dispatch(setMyLatestArticles(updatedArticles));
   };

   const handleDeleteArticle = () => {
      setIsPopupOpened(true);
      setPopupType('delete');
      setPopupText(`Are you sure with deleting this article (${title}) ?`);
   };
   // Confirm Deletion
   const handleSuccessOp = () => {
      // Set Popup Info
      setPopupType("success");
      setPopupText(`(${title}) Status Changed Successfully ✅`);
      // Remove triggered article from local my articles state
      updateMyLatestArticles();
   };
   const deleteTheArticle = async () => {
      setDeleteArticleLoading(true);
      setDeleteArticleErr(null);

      try {
         await deleteMyArticle(authorId as string, id);
         handleSuccessOp();
      } catch (error: any) {
         setDeleteArticleErr(error);
      } finally {
         setDeleteArticleLoading(false);
      }
   };

   // Popup
   const handlePopupToggle = () => {
      // Reset
      setIsPopupOpened(false);
      setPopupType("delete");
      setPopupText(`Are you sure with deleting this article (${title}) ?`);
   };

   return (
      <>
         {isPopupOpened && (
            <Popup
               type={popupType}
               options={true}
               text={popupText}
               onToggle={handlePopupToggle}
               onConfirm={deleteTheArticle}
            >
               {deleteArticleLoading && (<Loading />)}
               {deleteArticleErr && <span className="p-2 bg-black/80 text-red-700 font-semibold">{deleteArticleErr}</span>}
            </Popup>
         )}
         <div className={`
                     rounded-main relative
                     ${status === 'pending' 
                     ? 'shadow-[0px_1px_7px_0px_yellow]' 
                     : status === 'refused' 
                     ? 'shadow-[0px_1px_7px_0px_red]' 
                     : 'shadow-[0px_1px_7px_0px_green]'}
                  `}
         >
               {/* Remove Article Button  */}
               <button className="absolute top-1 right-1 z-10"
                  onClick={handleDeleteArticle}
               >
                  <FontAwesomeIcon icon={faTrash}
                     className="p-2 rounded-full bg-black/40 duration-300 hover:bg-white text-red-500"
                     size='xs'
                  />
               </button>
            <Link
               href={`articles/${id}`}
               target="_blank"
               className="
                        block min-w-[250px] min-h-[180px] bg-slate-200 rounded-main flex-shrink-0
                        relative duration-300 group/card
                  "
               title={title}
            >
               {/* Thumbnail */}
               <Image
                  height={180}
                  width={250}
                  src={thumbnail !== '' ? thumbnail : "/assets/images/full-back-article.jpeg"}
                  alt={title}
                  priority
                  className="w-[250px] h-[180px] rounded-main"
               />
               <div className={`absolute bottom-0 px-4 bg-black/40 duration-300 overflow-hidden ${refusingReason ? 'group-hover/card:h-full group-hover/card:rounded-t-main' : ''} group-hover/card:bg-black/90 w-full rounded-b-main h-[42%]`}>
                  {/* Title */}
                  <p
                     className="
                        text-white font-medium underline duration-300 py-1 truncate
                        group-hover/card:no-underline group-hover/card:text-hovers leading-tight
                     "
                  >
                     {title}
                  </p>
                  {/* Likes & Comments Counts */}
                  {status !== 'approved' ? (
                     <div className="text-white">
                        <p>
                           Status: 
                              <span className={`ms-1 font-medium capitalize ${status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                                 {status}
                              </span>
                        </p>
                        {refusingReason && (
                           <p>Reason: <span className="text-sm italic text-red-300 mb-2">{refusingReason}</span></p>
                        )}
                     </div>
                  ) : (
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
      </>
   );
}

export default MiniArticleCard;
