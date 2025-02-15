import Link from "next/link";

export default function NavBarHome() {
  return (
    <nav className="w-full h-fit flex items-center justify-around py-6  bg-[#F8C365]">
      {/* LOGO */}
      <div className="w-20 md:w-fit">
        <p className="md:text-3xl font-semibold font-fancy">Semester Simplified</p>
      </div>

      <ul className="hidden md:flex md:gap-8">
        <li className="md:text-2xl font-semibold font-fancy">Home</li>
        <li className="md:text-2xl font-semibold font-fancy">Courses</li>
        <li className="md:text-2xl font-semibold font-fancy">About Us</li>
      </ul>

      {/* AUTH BUTTONS */}
      <ul className="flex gap-2 md:gap-5">
        <li>
          <Link
            href={"/user/login"}
            className="font-fancy font-semibold md:text-xl"
          >
            Log In
          </Link>
        </li>
        <li>
          <Link
            href={"/user/register"}
            className="font-fancy font-semibold text-white bg-black py-2 px-4 rounded-2xl md:text-xl"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
