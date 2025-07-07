"use client"; // Mark as Client Component due to interactivity

import { useSocket } from "@/app/socket/SocketContext";
import {
  connection_type,
  message_type,
  messageRooms_type,
  user_type,
} from "@/types/types";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Inbox() {
  // State for selected chat, messages, new chat dialog, and search
  const [selectedChat, setSelectedChat] = useState<messageRooms_type | null>(
    null
  );
  const [messages, setMessages] = useState<message_type[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentChats, setRecentChats] = useState<messageRooms_type[]>([]);
  const [connections, setConnections] = useState<connection_type[] | []>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const loggedInUser: user_type = useSelector((state: any) => state.auth.user);

  // Fetch recent chats
  const fetchRecentChats = async () => {
    try {
      const response = await axios.get("/api/getRecentChats");
      setRecentChats(response.data.data);
      if (response.data.data.length > 0 && !selectedChat) {
        setSelectedChat(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching recent chats:", error);
    }
  };

  // Fetch connections for new chat dialog
  const fetchConnections = async () => {
    try {
      const response = await axios.get("/api/community/getConnections");
      console.log("ANURAG --- ", response.data.data);

      setConnections(response.data.data);
    } catch (error) {
      console.error("Error fetching connections:", error);
      // Fallback to dummy data if API call fails
      setConnections([
        { id: "4", name: "David Lee", university: "Yale" },
        { id: "5", name: "Emma Brown", university: "Oxford" },
        { id: "6", name: "Frank Chen", university: "Caltech" },
      ]);
    }
  };

  // Fetch messages for selected chat
  const getAllMessagesForSelectedChatRoom = async (chatRoomID: string) => {
    try {
      const response = await axios.get(`/api/getMessagesForChat/${chatRoomID}`);
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchRecentChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      getAllMessagesForSelectedChatRoom(selectedChat._id);
      scrollToBottom();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (isDialogOpen) {
      fetchConnections();
    }
  }, [isDialogOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const message: message_type = {
      _id: `${messages.length + 1}`, // Temporary ID; backend should assign unique _id
      sender: {
        _id: loggedInUser._id,
        name: loggedInUser.name,
        profilePicture: loggedInUser.profilePicture || "",
      },
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    socket?.emit("send_message", { ...message, chatRoomID: selectedChat._id });

    setMessages([...messages, message]);
    setNewMessage("");
    scrollToBottom();

    // Send message to API
    try {
      await axios.post("/api/messages", {
        chatId: selectedChat._id,
        content: newMessage,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleStartNewChat = async (connection: connection_type) => {
    try {
      const response = await axios.post("/api/chats", {
        userId: connection._id,
      });
      const newChat: messageRooms_type = response.data.data;
      setRecentChats((prev) => [newChat, ...prev]);
      setSelectedChat(newChat);
      setMessages([]);
      setIsDialogOpen(false);
      setSearchQuery("");
    } catch (error) {
      console.error("Error starting new chat:", error);
      // Fallback to local state update
      const newChat: messageRooms_type = {
        _id: connection._id,
        name: connection.name,
        participants: [loggedInUser._id, connection._id],
        lastMessageContent: "",
        lastMessageAt: new Date().toISOString(),
      };
      setRecentChats((prev) => [newChat, ...prev]);
      setSelectedChat(newChat);
      setMessages([]);
      setIsDialogOpen(false);
      setSearchQuery("");
    }
  };

  const handleSelectedChat = (messageRoom: messageRooms_type) => {
    setSelectedChat(messageRoom);
  };

  // Filter connections based on search query
  const filteredConnections = connections
    ? connections.filter(
        (connection) =>
          connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          connection.college.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar: Recent Chats */}
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            New Chat
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentChats.map((messageRoom) => (
            <div
              key={messageRoom._id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedChat?._id === messageRoom._id ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelectedChat(messageRoom)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium text-gray-800">
                    {messageRoom.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {messageRoom.participants.length} participants
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {messageRoom.lastMessageContent}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(messageRoom.lastMessageAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {selectedChat.name.charAt(0)}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedChat.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedChat._id}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 min-h-0">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.sender._id === loggedInUser._id
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                      message.sender._id === loggedInUser._id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span
                      className={`text-xs ${
                        message.sender._id === loggedInUser._id
                          ? "text-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 min-h-0">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* New Chat Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Start New Chat
              </h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search connections..."
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
              {filteredConnections.length > 0 ? (
                filteredConnections.map((connection) => (
                  <div
                    key={connection._id}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
                    onClick={() => handleStartNewChat(connection)}
                  >
                    <Image
                      src={
                        connection.profilePicture ||
                        "/assets/default-profile.png"
                      }
                      alt={connection.name}
                      className="w-10 h-10 rounded-full mr-3"
                      height={100}
                      width={100}
                    />
                    <div>
                      <h4 className="text-md font-medium text-gray-800">
                        {connection.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {connection.college}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No connections found</p>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
