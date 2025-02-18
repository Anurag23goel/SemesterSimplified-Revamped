import { BookOpen, Search } from "lucide-react";
import DocumentCard from "./components/documentCard";
import AnchorTemporaryDrawer from "./components/filterDrawer";

interface ProfilePageProps {
  params: { userID: string }; // ✅ Type for params
}

export default async function Page({ params }: ProfilePageProps) {
  const { userID } = await params; // ✅ Extract userID from URL

  return (
    <div className="w-full h-full">
      {/* SEARCH DIV */}
      <div className="w-[97%] h-fit mx-auto bg-black rounded-3xl">
        <div className="flex flex-col gap-3 px-5 pt-20 pb-6">
          {/* SEARCH HEADING */}
          <h1 className="text-5xl  italic text-white capitalize">
            find all material you want
          </h1>

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white rounded-2xl shadow-md p-2 w-full mx-auto">
            {/* Search Input */}
            <div className="flex items-center flex-1 border-r px-3">
              <Search />
              <div className="w-[1px] h-10 rounded-full bg-gray-400 ml-2"></div>
              <span className="text-gray-400 pl-3">
                <BookOpen />
              </span>
              <input
                type="text"
                placeholder="Enter Course"
                className="w-full outline-none px-2 py-2"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center flex-1 px-3 border-r">
              <span className="text-gray-400">
                <BookOpen />
              </span>
              <input
                type="text"
                placeholder="Enter Subject"
                className="w-full outline-none px-2 py-2"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <AnchorTemporaryDrawer />
            </div>

            {/* Search Button */}
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="w-[97%] mx-auto">
        <DocumentCard />
      </div>
    </div>
  );
}
