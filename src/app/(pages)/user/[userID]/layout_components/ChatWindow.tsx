"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { connection_type } from "@/types/types";

type Props = {
  contact: connection_type;
  onClose: () => void;
};

const ChatWindow: React.FC<Props> = ({ contact, onClose }) => {
  return (
    <div className="w-64 bg-white shadow-lg border rounded-t-md">
      <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-t-md">
        <div className="flex items-center space-x-2">
          <Image
            src={contact.profilePicture || "/assets/default-profile.png"}
            width={30}
            height={30}
            className="rounded-full"
            alt={contact.name}
          />
          <span className="text-sm font-medium">{contact.name}</span>
        </div>
        <button onClick={onClose}>
          <IoClose className="text-white text-lg" />
        </button>
      </div>

      <div className="h-48 p-2 overflow-y-auto text-sm">
        {/* Replace with real messages */}
        <div className="text-gray-500 italic">Start your chat...</div>
      </div>

      <div className="p-2 border-t">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full px-2 py-1 border rounded text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
