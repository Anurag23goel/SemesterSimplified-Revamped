"use client";
import { user_type } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { fetchUserAuth } from "@/app/redux/slices/AuthSlice";
import { useAppDispatch } from "@/app/redux/customHook";
import { ChevronDown } from "lucide-react";

export default function CommunityPage() {
  const [allUsers, setAllUsers] = useState<null | user_type[]>(null);
  const loggedInUser: user_type = useSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFriend = (userid: string) => {
    if (loggedInUser.connections.includes(userid)) {
      return true;
    } else {
      return false;
    }
  };

  const requestSent = (userid: string) => {
    if (loggedInUser.sentConnectionRequestsUserIDs.includes(userid)) {
      return true;
    } else {
      return false;
    }
  };

  const requestReceived = (userid: string) => {
    if (loggedInUser.receivedConnectionRequestsUserIDs.includes(userid)) {
      return true;
    } else {
      return false;
    }
  };

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

  const handleIncomingConnectionRequest = async (
    userid: string,
    action: boolean
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/connectionReq/handleIncomingConnectionRequest`,
        {
          userid,
          action,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert(response.data.message);
        dispatch(fetchUserAuth());
        fetchAllUsersForCommunityPage();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-full p-6 bg-gray-50">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUsers &&
            allUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 w-full min-w-[200px]"
              >
                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-yellow-300">
                    <Image
                      src={user.profilePicture || "/assets/default-profile.png"}
                      alt={`${user.name}'s profile picture`}
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
                  <p className="text-sm text-gray-500 truncate">
                    {user.userName}
                  </p>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">University:</span>{" "}
                      {user.university || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">Course:</span>{" "}
                      {user.course || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">Branch:</span>{" "}
                      {user.branch || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">Education Level:</span>{" "}
                      {user.educationLevel || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Connect Button */}
                <div className="flex justify-center mt-4">
                  {requestSent(user._id) ? (
                    <button
                      onClick={() => handleCancelConnectionRequest(user)}
                      className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
                      aria-label={`Cancel connection request to ${user.name}`}
                    >
                      <span>Request Sent</span>
                      <FaTimes className="text-red-500" />
                    </button>
                  ) : requestReceived(user._id) ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === user._id ? null : user._id
                          )
                        }
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                        aria-label={`Connection request received from ${user.name}`}
                        aria-expanded={dropdownOpen === user._id}
                      >
                        <span>Request Received</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {dropdownOpen === user._id && (
                        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <button
                            onClick={() => {
                              handleIncomingConnectionRequest(user._id, true);
                              setDropdownOpen(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-100 transition-all duration-200"
                            aria-label={`Accept connection request from ${user.name}`}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              handleIncomingConnectionRequest(user._id, false);
                              setDropdownOpen(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-100 transition-all duration-200"
                            aria-label={`Reject connection request from ${user.name}`}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ) : isFriend(user._id) ? (
                    <button
                      className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                      aria-label={`Already friends with ${user.name}`}
                      disabled
                    >
                      <span>Already Friends</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendConnectionRequest(user)}
                      className="flex items-center space-x-2 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 focus:outline-none transition-all duration-300"
                      aria-label={`Send connection request to ${user.name}`}
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
