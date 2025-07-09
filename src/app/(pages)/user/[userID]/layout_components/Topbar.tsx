"use client";
import { RootState } from "@/app/redux/Store";
import Image from "next/image";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Topbar() {

  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 shadow-sm fixed top-0 left-[20%] right-0 z-10">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <IoSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={25}
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center ml-4 space-x-4">
        <div className="rounded-lg w-[70px] flex items-center justify-center h-8 py-5 bg-black">
          <Image
            src={"/coins.png"}
            alt={"coins"}
            width={20}
            height={20}
            className={"w-5"}
          />
          <span className="text-white font-semibold">{user?.freeCredits}</span>
        </div>
        <button className="relative hover:text-yellow-500 transition">
          <span className="absolute -top-1 w-2 h-2 bg-red-400 rounded-full"></span>
          <FaBell className="text-gray-600" size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <Image
            src={user?.profilePicture || "/assets/default-profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
            width="100"
            height="40"
          />
          <span className="text-base font-bold text-gray-800">
            {user?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
