type UserInfo = {
    img: string;
    name: string;
    email: string;
    password: string;
}

const INITIAL_USER_INFO : UserInfo = {
    img: "",
    name: "",
    email: "",
    password: "",
} 

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
    UserInfo,
}