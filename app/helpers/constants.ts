interface LikeData {
    userId: string,
    userName: string,
    userPicPath: string,
    createdAt: string
}
interface CommentData {
    userId: string,
    userName: string,
    userPicPath: string,
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
    likesCount: number,
    commentsCount: number,
    authorId?: string,
    authorName?: string,
    authorPic?: string
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

const TAGS: string[] = [
  "Blockchain",
  "Data Science",
  "Technology",
  "Programming",
  "Machine Learning",
  "Python",
  "JavaScript",
  "Artificial Intelligence",
  "Data Visualization",
  "Science",
  "Tech",
  "UX",
  "Deep Learning",
  "Data",
  "Coding",
  "Software Engineering",
  "Web Development",
  "AWS",
  "DevOps",
  "Big Data",
  "Java",
  "Android",
  "Nodejs",
  "Docker",
  "Algorithms",
];
const MAIN_TAGS:string[]=[
  "Data Science",
  "Python",
  "JavaScript",
  "AWS",
  "DevOps",
  "Nodejs",
  "Docker",
]

export {
    INITIAL_USER_INFO,
    TAGS,
    MAIN_TAGS
}
export type {
    LikeData,
    CommentData,
    UserInfo,
    Topic,
    ArticleCard
}