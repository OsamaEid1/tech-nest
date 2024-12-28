import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "app/helpers/constants";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomCard: React.FC<ArticleCard> = ({
    id,
    title,
    authorPic,
    authorId,
    authorName,
    likesCount,
    commentsCount,
    thumbnail,
    createdAt,
}) => {
    return (
        <Card className="flex items-center p-4 mb-2 shadow-none bg-transparent border-b-2 mt-8 pb-4 hover:rounded-main hover:shadow-md hover:shadow-shadows">
            <div className="flex-1 pr-4">
                <div className="flex items-center">
                    <Link href={`/profile/${authorId}`}>
                        <Avatar
                            alt={authorName}
                            src={authorPic || "/assets/images/full-back-user.png"}
                            sx={{ width: 40, height: 40 }}
                            className="mr-2 border border-hovers"
                        />
                    </Link>
                    <Typography
                        variant="body2"
                        className="text-gray-500 font-semibold capitalize text-xl"
                    >
                        {authorName}
                    </Typography>
                </div>

                {/* Updated Link to pass the ID */}
                <Link href={`/article/${id}`}>
                    <Typography
                        variant="h6"
                        className="font-bold mb-1 cursor-pointer"
                    >
                        {title}
                    </Typography>
                </Link>

                <div className="flex items-center text-gray-400 mt-2">
                    <ul className="flex gap-4 pe-2 border-e">
                        <li>
                            <button>
                                <FontAwesomeIcon
                                    icon={faHeartRegular}
                                    className="duration-300 hover:text-red-500"
                                />
                                <span className="text-gray-500">
                                    {" "}
                                    {likesCount}
                                </span>
                            </button>
                        </li>
                        <li>
                            <Link href="#comments">
                                <FontAwesomeIcon
                                    icon={faComment}
                                    flip="horizontal"
                                />
                                <span className="text-gray-500">
                                    {" "}
                                    {commentsCount}
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <span className="ml-1">{new Date(createdAt as string).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="w-32 h-32">
                <Image
                    src={thumbnail || "/assets/images/full-back-article.jpeg"}
                    alt={title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded"
                />
            </div>
        </Card>
    );
};

export default CustomCard;
