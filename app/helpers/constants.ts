interface LikeData {
    userId: string,
    userName: string,
    userPic: string,
    createdAt: string
}
interface CommentData {
    userId: string,
    userName: string,
    userPic: string,
    content: string,
    createdAt: string
}

interface UserInfo {
    id?: string,
    name: string,
    email: string,
    password?: string,
    pic: string,
    followingTopicsNames: string[],
    savedArticlesIDs: string[],
    isActive?: Boolean,
    role: String,
    createdAt?: string
}

interface ArticleCard {
    id: string,
    title: string,
    thumbnail: string,
    status?: 'pending' | 'approved' | 'refused',
    refusingReason?: string,
    likesCount: number,
    likes?: LikeData[],
    commentsCount: number,
    authorId?: string,
    authorName?: string,
    authorPic?: string,
    createdAt?: string,
    topic?: string
}

interface PendingArticle {
    id: string,
    title: string,
    content: string,
    thumbnail: string,
    authorName: string,
    createdAt: string
}

interface Article {
    id: string,
    title: string,
    thumbnail?: string,
    content: string,
    likes: LikeData[],
    comments: CommentData[],
    topic: string,
    status: 'pending' | 'approved' | 'refused',
    authorId: string,
    authorName: string,
    authorPic: string,
    createdAt: Date,
    updatedAt: Date
}

const INITIAL_USER_INFO : UserInfo = {
    name: "",
    email: "",
    password: "",
    pic: "",
    followingTopicsNames: [''],
    savedArticlesIDs: [''],
    role: "",
    createdAt: "",
};

interface Topic {
    id: string;
    name: string;
    createdAt: Date;
};

export type {
    LikeData,
    CommentData,
    UserInfo,
    Topic,
    Article,
    ArticleCard,
    PendingArticle
}
export {
    INITIAL_USER_INFO,
}