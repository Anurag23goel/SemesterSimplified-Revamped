"use client";
import { user_type } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { fetchUserAuth } from "@/app/redux/slices/AuthSlice";
import { useAppDispatch } from "@/app/redux/customHook";

export default function CommunityPage() {
  const [allUsers, setAllUsers] = useState<null | user_type[]>(null);
  const loggedInUser: user_type = useSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  const fetchAllUsersForCommunityPage = async () => {
    try {
      const response = await axios.get(`/api/community/getAllUsers`, {
        withCredentials: true,
      });
      console.log("YE DATA AAYA HAI SAARE USERS KA -", response.data.data);
      setAllUsers(response.data.data);
    } catch (error: any) {
      console.log("Error while fetching all users: ", error.message);
      return;
    }
  };

  useEffect(() => {
    fetchAllUsersForCommunityPage();
  }, []);

  const handleSendConnectionRequest = async (user: user_type) => {
    console.log("Sending connection request to:", user.name);
    console.log(process.env.NEXT_PUBLIC_SERVER_URL);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/connectionReq/create`,
      user,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      alert("Connection request sent successfully!");
      dispatch(fetchUserAuth());
      fetchAllUsersForCommunityPage();
    }
  };

  const handleCancelConnectionRequest = async (user: user_type) => {
    console.log("Cancelling connection request to:", user.name);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/connectionReq/delete`,
      {
        withCredentials: true,
        data: {
          receiver: user._id,
        },
      }
    );
    if (response.data.success) {
      alert(response.data.message);
      dispatch(fetchUserAuth());
      fetchAllUsersForCommunityPage();
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allUsers &&
            allUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-yellow-300">
                    <Image
                      src={user.profilePicture || "/assets/default-profile.png"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>

                {/* User Details */}
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user.userName}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">University:</span>{" "}
                      {user.university || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Course:</span>{" "}
                      {user.course || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Branch:</span>{" "}
                      {user.branch || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Education Level:</span>{" "}
                      {user.educationLevel || "Not specified"}
                    </p>
                    
                  </div>
                </div>

                {/* Connect Button */}
                <div className="flex justify-center mt-4">
                  {loggedInUser.sentConnectionRequestsUserIDs.includes(
                    user._id
                  ) ? (
                    <button
                      onClick={() => handleCancelConnectionRequest(user)}
                      className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    >
                      <span>Request Sent</span>
                      <FaTimes className="text-red-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendConnectionRequest(user)}
                      className="flex items-center space-x-2 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 focus:outline-none transition-all duration-300"
                    >
                      <span>Connect</span>
                      <FaUserPlus />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}