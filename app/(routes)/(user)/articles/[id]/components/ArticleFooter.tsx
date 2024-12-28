'use client'
import Image from 'next/image';
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from 'react';
import MainButton from '@components/ui/form/MainButton';
import { CommentData } from 'app/helpers/constants';

function ArticleFooter({ articleId, likes, comments, authorName, authorPic }) {
    const [writtenComment, setWrittenComment] = useState<string>('');

    return (
        <>
            {/* Start Interactions */}
            <ul className="flex gap-4 ">
                <li>
                    <button>
                        <FontAwesomeIcon
                            icon={faHeartRegular}
                            className="duration-300 hover:text-red-500"
                        />
                        <span className="font-semibold">
                            {" "}
                            {likes.length}
                        </span>
                    </button>
                </li>
                <li>
                    <Link href="#comments">
                        <FontAwesomeIcon
                            icon={faComment}
                            flip="horizontal"
                        />
                        <span className="font-semibold">
                            {" "}
                            {comments.length}
                        </span>
                    </Link>
                </li>
            </ul>
            {/* End Interactions */}
            <hr className="my-5" />
            {/* Start Author Info  */}
            <div className="flex gap-5 items-center">
                <Image
                    src={authorPic || "/assets/images/full-back-user.png"}
                    alt="Author Pic"
                    width={65}
                    height={65}
                    className="rounded-full bg-slate-200 border border-hovers"
                />
                <p className="font-semibold text-lg italic text-gray-700">
                    Written By:{" "}
                    <span className="text-black font-mono font-bold text-xl not-italic">
                        {authorName}
                    </span>
                </p>
            </div>
            {/* End Author Info  */}
            <hr className="my-5" />
            {/* Start Comments */}
            <div
                id="comments"
                className="bg-white rounded-main shadow-md shadow-shadows p-5"
            >
                <div className="mb-10">
                    <div className="flex items-center">
                        <textarea
                            value={writtenComment}
                            onChange={(e) => setWrittenComment(e.target.value)}
                            placeholder="Write Your Comment Here.."
                            rows={2}
                            className="
                                flex-1 border-b-2 border-gray-200 transition-[border] px-2
                                duration-300 focus:outline-none focus:border-hovers me-3
                            "
                        />
                        <MainButton>Submit</MainButton>
                    </div>
                </div>
                <div className="my-5">
                    <h3 className="font-mono text-secTextColor mb-4">
                        Comments:
                    </h3>
                    <div>
                        {comments.length <= 0 ? (
                            <p className="shadow shadow-shadows rounded-main p-3">
                                There are no comments yet.
                            </p>
                        ) : (
                            comments.map((comment: CommentData, indx) => (
                                <>
                                    <div
                                        key={indx}
                                        className="shadow shadow-shadows rounded-main p-3"
                                    >
                                        <div className="flex gap-3 items-center">
                                            <Image
                                                src={
                                                    comment.userPic ||
                                                    "/assets/images/full-back-user.png"
                                                }
                                                alt="commenter pic"
                                                width={40}
                                                height={40}
                                                className="rounded-full bg-slate-200 border border-hovers"
                                            />
                                            <p className="text-black font-mono font-bold text-lg">
                                                {comment.userName}
                                            </p>
                                        </div>
                                        <p className="mt-3">
                                            {comment.content}
                                        </p>
                                        <p className="text-gray-500 text-sm text-right">
                                            {new Date(
                                                comment.createdAt
                                            )?.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <hr className="my-2" />
                                </>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* End Comments */}
        </>
    );
}

export default ArticleFooter