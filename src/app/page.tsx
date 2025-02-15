import Image from "next/image";
import NavBarHome from "./UiComponents/NavBarHome";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  CollegeCarousel,
  UniversityCarousel,
} from "./UiComponents/UniversityCarousel";

const features = [
  {
    title: "Get Certificate",
    description:
      "Add value to your certificates and increase your chances of getting hired in your dream job.",
    icon: "/icons/certificate.svg", // Replace with actual icon URL
  },
  {
    title: "Amazing Instructor",
    description:
      "Our amazing instructors bring experience, knowledge, and fun on the table.",
    icon: "/icons/instructor.svg",
  },
  {
    title: "Life Time Support",
    description:
      "You will have lifetime access to all courses & resources. Also, contact instructors any time!",
    icon: "/icons/support.svg",
  },
  {
    title: "Video Lesson",
    description:
      "Recorded versions of lectures from professional instructors to boost your growth.",
    icon: "/icons/video.svg",
  },
];

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden">
      {/* NAVBAR (Separate from the first section) */}
      <div className="w-full h-[80px] border-b border-black fixed top-0 left-0 bg-white z-50">
        <NavBarHome />
      </div>

      {/* FIRST SECTION (Yellow Background, Fixed) */}
      <div className="h-screen w-screen bg-[#F8C365] flex flex-col justify-center items-center">
        {/* MAIN CONTENT */}
        <div className="w-full flex flex-grow border border-black mt-[80px]">
          {/* LEFT DIV */}
          <div className="w-full md:w-1/2 border border-black flex flex-col justify-center text-3xl font-bold">
            {/* ACTUAL TEXT */}
            <div className="w-[85%] mx-auto gap-4 flex flex-col">
              <p className="text-4xl font-semibold font-fancy">
                Master Your Semester with Smarter Learning and Simpler Guidance
              </p>

              <p className="text-lg font-normal text-gray-700 font-fancy">
                Designed to make learning easier and more efficient. Your One
                Stop Solution for University and Course Search. Access notes,
                videos, and expert study materials in one place. Started as
                final year project now aims to be a full-fledged learning
                platform.
              </p>
              {/* BUTTON */}
              <button className="flex items-center gap-2 w-fit bg-black font-fancy font-base text-white py-2 px-4 rounded-2xl">
                Get Started <ArrowUpRight size={30} />
              </button>
            </div>
          </div>

          {/* RIGHT DIV (GIF IMAGE) */}
          <div className="w-1/2 hidden border border-black md:flex items-center justify-center">
            <Image
              src={"/landing/ss.png"}
              alt="Landing Animation"
              width={1000}
              height={1000}
              className="w-[95%] mx-auto h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* SCROLLING CONTENT BELOW */}
      <div className="relative">
        {/* STATS */}
        <div className="h-80 w-full bg-white border border-black">
          <div className="grid h-full w-[75%] mx-auto place-content-center place-items-center grid-cols-7  text-center">
            {/* STAT 1 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-5xl font-bold font-fancy">4.5</h2>
              <p className="text-gray-500 text-xl font-fancy">80K Reviews</p>
            </div>

            {/* DIVIDER */}
            <div className="hidden md:block w-[1px] bg-gray-300 h-10 mx-auto"></div>

            {/* STAT 2 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-5xl font-bold font-fancy">30M</h2>
              <p className="text-gray-500 text-xl font-fancy">Enrollments</p>
            </div>

            {/* DIVIDER */}
            <div className="hidden md:block w-[1px] bg-gray-300 h-10 mx-auto"></div>

            {/* STAT 3 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-5xl font-bold font-fancy">2M+</h2>
              <p className="text-gray-500 text-xl font-fancy">Learners</p>
            </div>

            {/* DIVIDER */}
            <div className="hidden md:block w-[1px] bg-gray-300 h-10 mx-auto"></div>

            {/* STAT 4 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-5xl font-bold font-fancy">1k+</h2>
              <p className="text-gray-500 text-xl font-fancy">
                Popular Courses
              </p>
            </div>
          </div>
        </div>

        {/* MORE CONTENT */}
        <div className="h-fit py-10 bg-[#FFF6E5] flex flex-col items-center justify-center border border-black">
          {/* <h1 className="text-3xl font-bold">Carousel</h1> */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold font-fancy">Leading Universities</h1>
            <UniversityCarousel />
            <h1 className="text-4xl font-bold font-fancy mt-4">Leading Colleges</h1>
            <CollegeCarousel />
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="w-[80%] mx-auto py-14 bg-[#FFFFFD] grid grid-cols-3 gap-4">
          {/* BLACK BANNER */}
          <div className="w-full col-span-2 h-[300px] bg-black text-white p-8 gap-10 rounded-lg flex flex-col justify-between">
            <h2 className="text-5xl font-semibold">
              Our <span className="text-yellow-400 italic">Features</span>
              <p className="text-4xl mt-2">Special For You</p>
            </h2>
            <button className="mt-10 w-fit flex items-center text-xl gap-2 bg-yellow-400 text-black font-semibold px-5 py-5 rounded-lg">
              See All Features <ArrowUpRight size={20} />
            </button>
          </div>
          {/* SINGLE FEATURE CARD */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full bg-white shadow-md rounded-lg p-6 flex flex-col items-start border border-gray-200 "
            >
              <Image
                src={"/mainlogo.jpeg"}
                alt={feature.title}
                height={100}
                width={100}
                className="h-12 w-12"
              />
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
