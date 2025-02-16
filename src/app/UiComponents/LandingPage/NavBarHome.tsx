"use client";

import { logout } from "@/app/redux/slices/AuthSlice";
import { RootState } from "@/app/redux/Store";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function NavBarHome() {
  const { userLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "/api/users/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(logout());
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error logging out");
    }
  };

  return (
    <div className="w-full bg-[#F8C365]">
      <nav className="w-[90%] mx-auto h-fit flex items-center justify-between py-6  ">
        <ul className="hidden md:flex md:gap-8">
          <li className="md:text-2xl font-semibold font-fancy">Home</li>
          <li className="md:text-2xl font-semibold font-fancy">Courses</li>
          <li className="md:text-2xl font-semibold font-fancy">About Us</li>
        </ul>

        {/* LOGO */}
        <div className="w-20 md:w-fit">
          <p className="md:text-3xl font-semibold font-fancy md:-ml-20">
            Semester Simplified
          </p>
        </div>

        {/* AUTH BUTTONS */}
        <ul className="flex gap-2 md:gap-5">
          <li>
            <Link
              href={"/user/login"}
              className="font-fancy font-semibold md:text-xl"
            >
              {userLoggedIn ? "Profile" : "Login"}
            </Link>
          </li>
          <li>
            <Link
              href={"/user/register"}
              className="font-fancy font-semibold text-white bg-black py-2 px-4 rounded-2xl md:text-xl"
            >
              {userLoggedIn ? (
                <button onClick={logoutHandler}>Log Out</button>
              ) : (
                "Register"
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
