"use client";

import { RootState } from "@/app/redux/Store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface ProfilePageProps {
  params: { userID: string };
}

type UserInfo = {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  university: string;
  status: string;
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [userData, setUserData] = useState<UserInfo | null>(null); // ✅ Typed state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?._id) return; // Prevent API call if no user is logged in
        const response = await axios.get(`/api/users/getUserData/${user._id}`);
        console.log(response.data.user); // ✅ Store data in state
        setUserData(response.data.user); // ✅ Store data in state
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [user?._id]); // ✅ Dependency array

  const formHandler = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full h-fit">
      <div className="w-full h-full flex flex-col gap-2 p-4">
        {/* HEADER => AVATAR AND NAME */}
        <div className="py-4 px-3 flex rounded-xl items-center bg-gray-100 justify-between border border-gray-200">
          {/* AVATAR, NAME AND EMAIL*/}
          <div className="flex items-center gap-4 w-[30%]">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-xl w-20"
              />
              <AvatarFallback>{user?.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">{userData?.name || "Loading..."}</h1>
              <span className="text-md text-gray-700">{userData?.email || "Loading..."}</span>
              <span className="text-sm text-gray-700">{userData?.phoneNumber || "Loading..."}</span>
            </div>
          </div>
          {/* DEACTIVATE BUTTON */}
          <div>
            <button className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600">
              Deactivate Account
            </button>
          </div>
        </div>

        {/* ACCOUNT DETAILS FORM */}
        <div className="py-4 px-3 rounded-xl bg-gray-100 border border-gray-200">
          <form
            onSubmit={handleSubmit(formHandler)}
            className="w-full grid grid-rows-1 gap-4"
          >
            {/* NAME SECTION */}
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Personal Information</h1>
              <div className="w-full bg-gray-400 h-[2px] mt-1"></div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="flex flex-col gap-1">
                  <label className="text-md font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    {...register("fullname", {
                      required: "Full Name is required",
                    })}
                    className="border border-gray-200 rounded-lg py-2 px-3"
                  />
                  {errors.fullname && (
                    <span className="text-red-500 text-sm">
                      {String(errors.fullname.message)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-md font-medium">Username</label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="border border-gray-200 rounded-lg py-2 px-3"
                  />
                  {errors.username && (
                    <span className="text-red-500 text-sm">
                      {String(errors.username.message)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
