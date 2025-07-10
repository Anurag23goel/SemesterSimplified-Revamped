import Image from "next/image";
import NavItem from "./Navbar";
import { FaHome, FaUsers, FaFolder, FaCog, FaInbox } from "react-icons/fa";
import Topbar from "./layout_components/Topbar";
import ContactsPanel from "./layout_components/ContactsPanel";

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
        <Topbar />

        {/* Main Content + Right Panel */}
        <div className="flex flex-1 mt-16 w-full">
          {/* Main Content */}
          <div className="w-4/5 p-6 overflow-y-auto bg-gray-50">{children}</div>

          {/* Right Panel (Contacts Panel) */}
          <div className="w-1/5 bg-white shadow-md flex flex-col">
            <ContactsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
