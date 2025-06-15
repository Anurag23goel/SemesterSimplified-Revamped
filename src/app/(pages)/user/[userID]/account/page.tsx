"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";
import Avatar from "@mui/material/Avatar";
import { Eye, LucideEdit2, LucideEdit3, LucideEyeOff } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { user_type } from "@/types/types";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [userData, setUserData] = useState<user_type | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?._id) return;
        const response = await axios.get(`/api/users/userData/${user._id}`);
        setUserData(response.data.user);
      } catch (error: any) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [user?._id]);

  const personalDetails = [
    { name: "Full Name", value: userData?.name || "User Name" },
    { name: "Username", value: userData?.userName || "user123" },
    { name: "Date of Birth", value: "January 1, 1998" },
    { name: "Gender", value: userData?.gender || "N/A" },
    { name: "Address", value: "🇺🇸 California, USA" },
  ];

  const educationalDetails = [
    { name: "University", value: userData?.university || "N/A" },
    { name: "College", value: userData?.college || "N/A" },
    { name: "Course", value: userData?.course || "N/A" },
    { name: "Branch", value: userData?.branch || "N/A" },
    { name: "Education Level", value: userData?.educationLevel || "N/A" },
  ];

  const securityDetails = [
    { name: "Email", value: userData?.email },
    { name: "Phone Number", value: userData?.phoneNumber },
    // { name: "Password", value: userData?.password },
    {
      name: "Created At",
      value:
        userData?.createdAt ?
        new Date(userData?.createdAt).toLocaleString("en-IN", {
          dateStyle: "long",
        }) : "N/A",
    },
  ];

  return (
    <div className="w-full mx-auto px-4 pt-1 pb-4 bg-white rounded-lg shadow-lg">
      {/* HEADER SECTION */}
      <div className="relative bg-gradient-to-r from-yellow-300  to-yellow-500 h-36 rounded-t-lg flex justify-end p-4"></div>

      {/* PROFILE DETAILS */}
      <div className="relative flex items-center -mt-16 px-6">
        {/* Avatar Container */}
        <div className="relative">
          {userData?.profilePicture ? (
            <Avatar
              src={userData?.profilePicture}
              sx={{ width: 100, height: 100 }}
              className="border-4 border-white shadow-md"
            />
          ) : (
            <Avatar
              sx={{ width: 100, height: 100 }}
              className="border-4 border-white shadow-md"
            >
              {userData?.name?.[0] || "U"}
            </Avatar>
          )}

          {/* Edit Icon (Bottom Right) */}
          <button
            className="absolute bottom-1 right-1 bg-white border border-gray-300 shadow-md p-1.5 rounded-full hover:bg-gray-100 transition"
            onClick={() => console.log("Change Avatar Clicked")}
          >
            <LucideEdit2 size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* USER INFO SECTION */}
      <div className="flex w-full mx-auto px-4 py-2 justify-between items-center">
        <div className="mt-2 flex flex-col">
          <h1 className="text-3xl font-semibold">
            {userData?.name || "User Name"}
          </h1>
          <p className="text-gray-600 flex items-center gap-2">Location</p>
          <p className="text-gray-600">
            Age: 24 | Gender: {userData?.gender || "N/A"} |{" "}
            <span className="text-green-600 font-semibold">Status: Active</span>
          </p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition">
          <LucideEdit3 size={18} />
          Edit Profile
        </button>
      </div>

      {/* INFO SECTION */}
      <div className="mt-6 w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PERSONAL DETAILS TABLE */}
        <div className="border rounded-lg bg-white/80 backdrop-blur-md shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Account Details
          </h2>
          <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
          <div className="space-y-2">
            {personalDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 hover:bg-yellow-100 rounded-lg px-2 transition"
              >
                <span className="font-medium">{item.name}:</span>
                <span className="text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATIONAL DETAILS TABLE */}
        <div className="border rounded-lg bg-white/80 backdrop-blur-md shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Educational Details
          </h2>
          <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
          <div className="space-y-2">
            {educationalDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 hover:bg-yellow-100 rounded-lg px-2 transition"
              >
                <span className="font-medium">{item.name}:</span>
                <span className="text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY DETAILS TABLE */}
        <div className="border rounded-lg items bg-white/80 backdrop-blur-md shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Security Details
          </h2>
          <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
          <div className="space-y-2">
            {securityDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 hover:bg-yellow-100 rounded-lg px-2 transition"
              >
                <span className="font-medium">{item.name}:</span>
                {item.name === "Password" ? (
                  <span className="flex gap-2 items-center">
                    {showPassword ? item.value : "**********"}
                    {showPassword ? (
                      <LucideEyeOff
                        size={18}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Eye size={18} onClick={() => setShowPassword(true)} />
                    )}
                  </span>
                ) : (
                  <span className="text-gray-800">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
