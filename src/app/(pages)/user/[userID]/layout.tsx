import { ChevronDown } from "lucide-react";
import Image from "next/image";
import NavItem from "./Navbar";
import {
  FaHome,
  FaUsers,
  FaFolder,
  FaCog,
  FaBell,
  FaInbox,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md flex flex-col justify-between fixed top-0 left-0 h-full z-20">
        {/* Logo */}
        <div className="flex h-[10%] items-center justify-center space-x-3 pt-5">
          <Image
            src={"/mainlogo.jpeg"}
            alt="logo"
            width={100}
            height={100}
            className="w-14 h-14 rounded-full"
          />
          <span className="text-xl font-semibold">Semester Simplified</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pt-7 space-y-1">
          <NavItem icon={<FaHome size={20} />} label="Home" urllink="home" />
          <NavItem icon={<FaInbox size={20} />} label="Inbox" urllink="inbox" />
          <NavItem
            icon={<FaUsers size={20} />}
            label="Community"
            urllink="community"
          />
          <NavItem
            icon={<FaFolder size={20} />}
            label="Saved Docs"
            urllink="saved"
          />
        </nav>

        {/* Settings */}
        <div className="p-4 border-t">
          <NavItem icon={<FaCog />} label="Settings" urllink="account" />
        </div>
      </div>

      {/* Main Content Area + Top Bar + Right Panel */}
      <div className="flex flex-col flex-1 ml-[20%] w-4/5">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 shadow-sm fixed top-0 left-[20%] right-0 z-10">
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl">
            <IoSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center ml-4 space-x-2">
            <button className="relative hover:text-yellow-500 transition">
              <span className="absolute -top-1 w-2 h-2 bg-red-400 rounded-full"></span>
              <FaBell className="text-gray-600" size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <Image
                src="/mainlogo.jpeg"
                alt="Profile"
                className="w-10 h-10 rounded-full"
                width="100"
                height="40"
              />
              <span className="text-base font-bold text-gray-800">
                Tom Cook
              </span>
              <ChevronDown
                className="text-gray-600 hover:text-yellow-500 transition"
                size="20"
              />
            </div>
          </div>
        </div>

        {/* Main Content + Right Panel */}
        <div className="flex flex-1 mt-16 w-full">
          {/* Main Content */}
          <div className="w-4/5 p-6 overflow-y-auto bg-gray-50">
            {children}
          </div>

          {/* Right Panel (Contacts Panel) */}
          <div className="w-1/5 bg-white shadow-md flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              Contacts Panel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}