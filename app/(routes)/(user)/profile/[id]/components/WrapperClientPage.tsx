"use client";
import Loading from "@components/ui/Loading";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { ArticleCard } from "app/helpers/constants";
import { fetchUserProfileAndArticles } from "app/helpers/user/profiles/fetchUserProfileAndArticles";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type UserInfo = {
    name: string;
    email: string;
    pic: string;
};

function WrapperClientPage() {
    let params = useParams();
    if (!params?.id) history.back();
    const userId = params?.id;

    // User Data
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userArticles, setUserArticles] = useState<ArticleCard[] | null>(null);
    // States
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch Data
    const handleGetProfileData = async () => {
        setLoading(true);

        try {
            const { user, articles } = await fetchUserProfileAndArticles(userId as string);

            setUserInfo(user);
            setUserArticles(articles);
        } catch (error: any) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        handleGetProfileData();
    }, []);

    return (
        <div className="container lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto py-10">
            {/* Fetch States */}
            {loading && <Loading />}
            {error && <p className="err-msg ms-2">{error}</p>}
            {userInfo && (
                <>
                    {/* User Info */}
                    <div className="text-center mb-8">
                        <Image
                            src={userInfo.pic}
                            alt={userInfo.name}
                            width={180}
                            height={180}
                            className="rounded-full shadow shadow-hovers mx-auto"
                        />
                        <h2 className="capitalize">{userInfo.name}</h2>
                        <p className="text-gray-600 italic">{userInfo.email}</p>
                    </div>
                    <hr className="my-5" />
                    {/* User Articles */}
                    <>
                        <h1 className="text-center mb-8 capitalize">
                            {userInfo.name}'s Articles
                        </h1>
                        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 items-stretch justify-center">
                            {userArticles?.map((article, index) => (
                                <div key={index}>
                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className="!rounded-main !h-full mx-auto !shadow-sm hover:!shadow-lg hover:!shadow-shadows"
                                    >
                                        <CardMedia
                                            sx={{ height: 180 }}
                                            image={
                                                article.thumbnail ||
                                                "/public/assets/images/full-back-article.jpeg"
                                            }
                                            title="Article Thumbnail"
                                        />
                                        <div className="h-[calc(100%-180px)] flex flex-col !items-between">
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="div"
                                                >
                                                    <Link
                                                        href={`articles/${article.id}`}
                                                        className="duration-300 hover:underline hover:text-hovers"
                                                    >
                                                        {article.title}
                                                    </Link>
                                                </Typography>
                                            </CardContent>
                                            <CardActions className="justify-between !px-4 !mt-auto">
                                                <ul className="flex gap-2 py-1 mt-auto">
                                                    <li>
                                                        <FontAwesomeIcon
                                                            icon={faHeart}
                                                            size="sm"
                                                            className="text-red-500 "
                                                        />
                                                        <span>
                                                            {" "}
                                                            {article.likesCount}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon
                                                            icon={faComment}
                                                            size="sm"
                                                            flip="horizontal"
                                                            className=""
                                                        />
                                                        <span>
                                                            {" "}
                                                            {
                                                                article.commentsCount
                                                            }
                                                        </span>
                                                    </li>
                                                </ul>
                                                <p className="ms-auto">
                                                    {new Date(
                                                        article.createdAt as string
                                                    ).toLocaleDateString()}
                                                </p>
                                            </CardActions>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        {userArticles?.length === 0 && (
                            <p className="my-5 bg-white p-5 font-medium rounded-main shadow">
                                Didn't publish any articles yet.
                            </p>
                        )}
                    </>
                </>
            )}
        </div>
    );
}

export default WrapperClientPage;
