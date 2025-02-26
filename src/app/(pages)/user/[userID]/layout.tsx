import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import NavItem from "./Navbar";
import {
  FaHome,
  FaUsers,
  FaFolder,
  FaCalendar,
  FaFileAlt,
  FaChartPie,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col justify-between">
        {/* Logo */}
        <div className="flex h-[10%] items-center justify-center pt-5">
          <Image
            src={"/mainlogo.jpeg"}
            alt="logo"
            width={100}
            height={100}
            className="w-14 h-14 rounded-full"
          />
          <span className="text-lg font-semibold">Semester Simplified</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pt-7 space-y-1">
          <NavItem icon={<FaHome size={20} />} label="Home" active />
          <NavItem icon={<FaUsers size={20} />} label="Community" />
          <NavItem icon={<FaFolder size={20} />} label="Saved Docs" />
          <NavItem icon={<FaCalendar size={20} />} label="Calendar" />
          <NavItem icon={<FaFileAlt size={20} />} label="Documents" />
          <NavItem icon={<FaChartPie size={20} />} label="Reports" />

          {/* Teams */}
          <div className=" text-black font-semibold">Socials</div>
          <NavItem label="Heroicons" team />
          <NavItem label="Tailwind Labs" team />
          <NavItem label="Workcation" team />
        </nav>

        {/* Settings */}
        <div className="p-4 border-t">
          <NavItem icon={<FaCog />} label="Settings" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-[95%] h-[10%] mx-auto border-b-2 px-6">
          {/* Search Bar */}
          <div className="relative w-[85%] flex items-center">
            <IoSearch className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2  rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-4 w-fit">
            <button className="relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <FaBell className="text-gray-500 text-lg" size={25} />
            </button>
            <div className="flex items-center justify-between">
              <Image
                src={"/mainlogo.jpeg"}
                alt="Profile"
                className="w-12 h-12 rounded-full"
                width={100}
                height={100}
              />
              <span className="text-lg font-semibold text-gray-700">
                Tom Cook
              </span>
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 m-6  border border-black">{children}</div>
      </div>
    </div>
  );
}
