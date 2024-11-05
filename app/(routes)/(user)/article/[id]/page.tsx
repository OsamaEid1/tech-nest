"use client";
import React from "react";
import { useParams } from "next/navigation";
import Header from "components/layout/Header";
import Image from "next/image";
import star from "public/assets/Designer.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
// Sample static data
const staticData = [
  {
    title: "Mental Note Vol. 24",
    text: "Merry Christmas and Happy Holidays...",
    author: "Ryan Fan",
    date: "Oct 1",
    views: 479,
    comments: 8,
    imageUrl: "/assets/images/profile.png",
    id: 0,
  },
  {
    title: "Your Brain On Coronavirus",
    text: "A guide to the curious and troubling impact of the pandemic...",
    author: "Simon Spichak",
    date: "Sep 23",
    views: 320,
    comments: 5,
    imageUrl: "/assets/images/profile.png",
    id: 1,
  },
];

export default function Page() {
  const { id } = useParams(); // Extract the dynamic id from the URL
  const card = staticData.find((item) => item.id === Number(id));

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div className="text-black">
      <Header />
      <div className=" mx-32 text-start">
        <div className="flex gap-4">
          <Image src="/assets/Designer.png" alt="" width={20} height={20} />
          <p>Member-only story</p>
        </div>

        <h1 className="text-[50px]">{card.title}</h1>
        <div className="flex gap-6 mt-4">
          <Image
            src="/assets/autherimg.jpg"
            width={30}
            height={30}
            alt="auther img"
          />
          <p className="text-2xl text-gray-700 font-semibold">{card.text}</p>
        </div>
        <div className="flex items-center text-gray-400  space-x-4 border-y-2 border-gray-200 py-3 mt-8">
          <div className="flex items-center">
            <span className="ml-1">{card.date}</span>
          </div>
          <div className="flex items-center">
            <VisibilityIcon fontSize="small" />
            <span className="ml-1">{card.views}</span>
          </div>
          <div className="flex items-center">
            <CommentIcon fontSize="small" />
            <span className="ml-1">{card.comments}</span>
          </div>
        </div>
        <Image
          src={card.imageUrl}
          alt="img"
          width={600}
          height={500}
          className="mx-auto mt-10"
        />
        <p className="text-2xl font-normal mt-8 ">
          {card.text} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Distinctio eos sequi esse nobis iusto enim architecto minus.
          Distinctio incidunt adipisci totam laborum tenetur aut, explicabo ex
          eius doloribus animi placeat harum dolor odit id ullam beatae
          excepturi libero. Veritatis dolore ea voluptates placeat
          necessitatibus quod excepturi quasi dolorum cupiditate rerum! Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Dicta quia alias
          ratione maiores fuga, eveniet, id nesciunt facere voluptatum provident
          assumenda hic sapiente debitis recusandae repudiandae aliquid eum
          placeat harum architecto quaerat perspiciatis! Nam, vel unde qui ab
          beatae, id excepturi aperiam rem magnam nisi magni molestias fugiat?
          Eaque, cumque!
        </p>
      </div>
    </div>
  );
}
