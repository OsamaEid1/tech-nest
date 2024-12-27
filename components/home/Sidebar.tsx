"use client";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Link from "next/link";
import { useGetUserProfile } from "app/helpers/hooks/user/useGetUserProfile";
import { useAppDispatch, useAppSelector } from "state/hooks";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userInfo);

  return (
      <div className="pt-3 border-t-2 border-[#F2F2F2]">
          <Image
              src={userProfile.pic || "/assets/images/full-back-user.png"}
              alt="User Image"
              priority
              width={160}
              height={160}
              className="rounded-full shadow shadow-hovers mx-auto"
          />

      <div className="flex gap-7 flex-col text-black mt-10 text-lg border-b-2 border-[#F2F2F2] pb-6">
        <Link href={"/profile"} className="flex gap-3 items-center duration-300 hover:text-hovers hover:underline">
          <PersonIcon /> <p>Profile</p>
        </Link>
        <Link href={"/profile#my-articles"} className="flex gap-3 items-center duration-300 hover:text-hovers hover:underline">
          <div className="flex gap-3 items-center">
            <LibraryBooksIcon /> <p>My Articles</p>
          </div>
        </Link>
        <Link
          href={"/manage-following-topics"}
          className="flex gap-3 items-center duration-300 hover:text-hovers hover:underline"
        >
          <div className="flex gap-3 items-center">
            <TurnedInNotIcon /> <p>Saved Articles</p>
          </div>
        </Link>
        <h3 className="mt-8">Following Topics</h3>
        <div className="flex flex-wrap gap-5">
          {userProfile?.followingTopicsNames?.length === 0 && (
            <span className="text-black bg-gray-300 px-3 py-1 rounded-2xl">
              You're not follow any topics yet!
            </span>
          )}
          {userProfile?.followingTopicsNames?.map((item, index) => {
            return (
              <Link
                key={index}
                href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                className="text-black bg-slate-200 duration-300 hover:text-hovers px-3 py-1 rounded-2xl"
              >
                {item}
              </Link>
            );
          })}
        </div>
        <Link
          href="/manage-following-topics"
          className="text-green-400 cursor-pointer underline duration:300 hover:no-underline"
        >
          See more topics
        </Link>
      </div>
    </div>
  );
}
