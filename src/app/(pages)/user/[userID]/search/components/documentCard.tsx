import Image from "next/image";

export default function DocumentCard() {
  return (
    <div className="w-full h-fit flex justify-center p-2">
      {/* IMAGE PART */}
      <div className="w-fit border border-black">
        <div className="w-32 h-32 flex items-center justify-center bg-gray-400">
          <Image
            src={"/mainlogo.jpeg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-28"
          />
        </div>
      </div>

      {/* TEXT PART */}
      <div className="w-[85%] border border-black flex justify-between px-4">
        <div className="flex flex-col justify-around">
          <h1 className="text-lg font-semibold">
            Document Name{" "}
            <span className="bg-gray-500 text-white px-2 rounded-3xl">
              Category
            </span>
          </h1>
          <p className="text-sm text-gray-600">Document description</p>
          <p className="text-sm text-gray-600">Date Uploaded</p>
        </div>

        <div className=" flex items-center">
          <span>Rating</span>
        </div>
      </div>
    </div>
  );
}
