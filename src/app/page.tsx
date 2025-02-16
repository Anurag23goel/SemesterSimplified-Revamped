import Image from "next/image";
import NavBarHome from "./UiComponents/LandingPage/NavBarHome";
import { ArrowUpRight, CheckCircleIcon } from "lucide-react";
import {
  CollegeCarousel,
  UniversityCarousel,
} from "./UiComponents/LandingPage/UniversityCarousel";
import { FAQsAccordion } from "./UiComponents/LandingPage/FaqAccordian";
import Link from "next/link";

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
      <div className="w-full fixed top-0 left-0 bg-white z-50">
        <NavBarHome />
      </div>

      {/* FIRST SECTION (Yellow Background, Fixed) */}
      <div className="h-full w-screen bg-[#F8C365] flex flex-col justify-center items-center">
        {/* MAIN CONTENT */}
        <div className="w-full h-fit flex flex-grow  mt-[80px]">
          {/* LEFT DIV */}
          <div className="w-full md:w-1/2  flex flex-col justify-center text-3xl font-bold">
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
              <Link
                href={"/user/login"}
                className="flex items-center gap-2 w-fit bg-black font-fancy font-base text-white py-2 px-4 rounded-2xl"
              >
                Get Started <ArrowUpRight size={30} />
              </Link>
            </div>
          </div>

          {/* RIGHT DIV (GIF IMAGE) */}
          <div className="w-1/2 hidden  md:flex items-center justify-center">
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
        <div className="h-fit py-20 w-full bg-white ">
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

        {/* UNIVERSITIES AND COLLEGE CAROUSEL */}
        <div className="h-fit py-10 bg-[#FFF6E5] flex flex-col items-center justify-center ">
          {/* <h1 className="text-3xl font-bold">Carousel</h1> */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold font-fancy">
              Leading Universities
            </h1>
            <UniversityCarousel />
            <h1 className="text-4xl font-bold font-fancy mt-4">
              Leading Colleges
            </h1>
            <CollegeCarousel />
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="w-[80%] mx-auto py-14 bg-[#FFFFFD] grid grid-cols-3 gap-4">
          {/* BLACK BANNER */}
          <div className="w-full col-span-2 h-[300px] bg-black text-white p-8 gap-10 rounded-lg flex flex-col justify-between">
            <h2 className="text-5xl font-semibold italic">
              Our <span className="text-yellow-400 italic">Features</span>
              <p className="text-5xl mt-2">Specially Designed For Students</p>
            </h2>
            <button className="mt-10 w-fit flex items-center text-xl gap-2 bg-yellow-400 text-black font-semibold px-5 py-5 rounded-lg">
              Explore All Features <ArrowUpRight size={20} />
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

        {/* TOP SEARCHED SUBJECTS */}
        <div className="w-full h-fit py-10 bg-[#FFF6E5]">
          <div className="w-[90%] mx-auto flex justify-between ">
            {/* HEADING */}
            <div className="w-[40%] ">
              <div className="flex flex-col gap-4 items-center justify-center pt-16">
                <p className="text-5xl font-semibold font-fancy">
                  Top Searched Subjects
                </p>
                <Image
                  src={"/landing/books.png"}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* LIST */}
            <div className="w-[60%] "></div>
          </div>
        </div>

        {/* FAQs ACCORDION */}
        <div className="h-fit py-10 w-full bg-[#FFFFFD]">
          <div className="w-[80%] mx-auto flex flex-col gap-5">
            <h1 className="text-5xl font-bold font-fancy">
              Frequently Asked Questions
            </h1>
            <FAQsAccordion />
          </div>
        </div>

        {/* CREATE ACCOUNT */}
        <div className="w-full h-fit py-10 bg-[#FFF6E5]">
          <div className="w-[90%] mx-auto flex justify-center gap-4">
            {/* LEFT PART => CREATE ACCOUNT */}
            <div className="w-[45%] px-5 flex flex-col justify-center gap-10">
              <h1 className=" text-[42px] font-semibold font-fancy">
                Its Easy to <span>Create</span> an Account
              </h1>
              <p className="w-[85%] capitalize font-fancy text-xl font font-semibold">
                Our sign-in process lets you start your learning journey without
                much hassle. Our aim is to create a great learning experience
                for you.
              </p>
              <ul className="w-[85%]">
                <li className="text-xl flex gap-2 capitalize font-fancy text-md font font-semibold">
                  <CheckCircleIcon />
                  Create an Account
                </li>
                <li className="text-xl flex gap-2 capitalize font-fancy text-md font font-semibold">
                  <CheckCircleIcon />
                  Complete Your Profile
                </li>
                <li className="text-xl flex gap-2 capitalize font-fancy text-md font font-semibold">
                  <CheckCircleIcon />
                  Start Learning
                </li>
              </ul>
              <Link
                href={"/user/register"}
                className="w-[85%] flex items-center justify-center gap-3 mx-auto text-xl bg-yellow-400 text-black font-semibold px-5 py-5 rounded-lg"
              >
                <span className="text-center">Create an Account</span>
                <ArrowUpRight size={25} />
              </Link>
            </div>
            {/* RIGHT PART => CREATE ACCOUNT IMAGGE */}
            <div className="w-[45%]">
              <Image
                src={"/landing/registerMan.png"}
                alt=""
                height={1000}
                width={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
