import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import star from "app/assets/images/Designer.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  // text: string;
  author: string;
  // date: string;
  views: number;
  comments: number;
  imageUrl: string;
  id: string;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  // text,
  author,
  // date,
  views,
  comments,
  imageUrl,
  id,
}) => {
  return (
    <Card className="flex items-center p-4 mb-4 shadow-none bg-transparent border-b-2 mt-8 pb-8">
      <div className="flex-1 pr-4">
        <div className="flex items-center mb-2">
          <Avatar
            alt={author}
            src="https://via.placeholder.com/40"
            className="mr-2"
          />
          <Typography variant="body2" className="text-gray-500">
            {author} in Level Up Coding
          </Typography>
        </div>

        {/* Updated Link to pass the ID */}
        <Link href={`/article/${id}`}>
          <Typography variant="h6" className="font-bold mb-1 cursor-pointer">
            {title}
          </Typography>
        </Link>

        <div className="flex items-center text-gray-400 mt-2 space-x-4">
          <div className="flex items-center">
            {/* <span className="ml-1">{date}</span> */}
          </div>
          <div className="flex items-center">
            <VisibilityIcon fontSize="small" />
            <span className="ml-1">{views}</span>
          </div>
          <div className="flex items-center">
            <CommentIcon fontSize="small" />
            <span className="ml-1">{comments}</span>
          </div>
        </div>
      </div>

      <div className="w-32 h-32">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>
    </Card>
  );
};

export default CustomCard;
