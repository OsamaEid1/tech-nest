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

export default function Sidebar({ items }) {
  const { loading, error, userProfile: user } = useGetUserProfile();
  return (
    <div className=" border-t-2 border-[#F2F2F2]">
      <Image
        src={user?.pic}
        alt="profile img"
        width={90}
        height={90}
        className="rounded-full mt-6 max-w-40 mx-auto"
      />

      <div className="flex gap-7 flex-col text-black mt-10 text-lg border-b-2 border-[#F2F2F2] pb-6">
        <Link href={"/profile"} className="flex gap-3 items-center">
          <PersonIcon /> <p>Profile</p>
        </Link>
        <Link href={"/profile#my-articles"} className="flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <LibraryBooksIcon /> <p>My Articles</p>
          </div>
        </Link>
        <Link
          href={"/manage-following-topics"}
          className="flex gap-3 items-center"
        >
          <div className="flex gap-3 items-center">
            <TurnedInNotIcon /> <p>Saved Articles</p>
          </div>
        </Link>
        {/* <div className="flex gap-3 items-center">
          <SettingsIcon /> <p>Setting</p>
        </div>
        <div className="flex gap-3 items-center">
          <HelpIcon /> <p>Help</p>
        </div> */}
        <h3 className="mt-8">Recommended topics</h3>
        <div className="flex flex-wrap gap-5">
          {items.map((item) => {
            return (
              <button
                key={item}
                className="text-black bg-gray-300 px-3 py-1 rounded-2xl"
              >
                {item}
              </button>
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
