"use client";

import React, { useEffect, useState } from "react";
import { IoClose, IoSend, IoAttach } from "react-icons/io5";
import Image from "next/image";
import {
  connection_type,
  message_type,
  messageRoom_type,
  user_type,
} from "@/types/types";
import { useSocket } from "@/app/socket/SocketContext";
import { useSelector } from "react-redux";
import axios from "axios";
type Props = {
  contact: connection_type;
  onClose: () => void;
};

const ChatWindow: React.FC<Props> = ({ contact, onClose }) => {
  const { socket } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const onlineUsers: string[] = useSelector(
    (state: any) => state.onlineUsers.userIds
  );
  const [chatRoom, setChatRoom] = useState<messageRoom_type | null>(null);
  const [older_messages, setOlderMessages] = useState<message_type[] | null>(
    null
  );
  const loggedInUser: user_type = useSelector((state: any) => state.auth.user);

  const handleSendMessage = () => {
    console.log("MESSAGE BHEJA GAYA HAI - ", message);

    if (message.trim() && socket) {
      socket.emit("send_message", {
        sender: loggedInUser._id,
        receiver: contact._id,
        content: message,
        roomId: chatRoom?._id,
        room_type: "individual",
      });
      setMessage("");
      setIsTyping(false);
    }
  };

  const handleMediaAttach = () => {
    // Trigger file input for media
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && socket) {
        socket.emit("sendMedia", {
          recipient: contact._id,
          file,
          chatRoomID: chatRoom?._id,
        });
      }
    };
    input.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  const get_or_create_chatRoom = async () => {
    try {
      const response = await axios.get(
        `/api/chats/getOrCreateChatRoom/${contact._id}`
      );
      console.log("YE DATA AAYA HAI CHAT ROOM KA -", response.data.data);
      if (response.data.data.room_already_exists) {
        setChatRoom(response.data.data.existingChatRoom);
        setOlderMessages(response.data.data.messages);
      } else {
        setChatRoom(response.data.data.newChatRoom);
        setOlderMessages(null);
      }
    } catch (error: any) {
      console.log("Error while fetching connections: ", error.message);
      setChatRoom(null);
      setOlderMessages(null);
    }
  };

  useEffect(() => {
    console.log("ChatWindow mounted");
    get_or_create_chatRoom();
  }, []);

  return (
    <div className="w-80 bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col h-[400px] transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={contact.profilePicture || "/assets/default-profile.png"}
              width={36}
              height={36}
              className="rounded-full border-2 border-white"
              alt={contact.name}
            />
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                onlineUsers.includes(contact._id)
                  ? "bg-green-400"
                  : "bg-gray-400"
              } border border-white`}
            ></div>
          </div>
          <div>
            <span className="text-sm font-semibold">{contact.name}</span>
            <p className="text-xs opacity-75">
              {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-blue-800 transition-colors duration-200"
          aria-label="Close chat"
        >
          <IoClose className="text-xl" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="text-gray-500 text-sm italic text-center">
          Start your chat...
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
        <button
          onClick={handleMediaAttach}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
          aria-label="Attach media"
        >
          <IoAttach className="text-xl" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 bg-gray-100 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isTyping
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isTyping}
          aria-label="Send message"
        >
          <IoSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
