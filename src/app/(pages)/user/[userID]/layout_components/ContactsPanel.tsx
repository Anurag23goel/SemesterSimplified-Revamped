"use client"
import { useEffect, useMemo, useState } from "react";
import ChatWindow from "./ChatWindow"; // You'll create this
import axios from "axios";
import { useSelector } from "react-redux";
import { connection_type } from "@/types/types";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

export default function ContactsPanel() {
  const [contacts, setContacts] = useState<connection_type[] | null>(null);
  const [openChats, setOpenChats] = useState<connection_type[]>([]);
  const onlineUsers: string[] = useSelector(
    (state: any) => state.onlineUsers.userIds
  );

  const onlineUserSet = useMemo(() => new Set(onlineUsers), [onlineUsers]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get("/api/community/getConnections");
      setContacts(response.data.data);
    } catch (error: any) {
      console.log("Error while fetching connections: ", error.message);
      setContacts(null);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleOpenChat = (contact: connection_type) => {
    setOpenChats((prev) => {
      if (prev.find((c) => c._id === contact._id)) return prev;
      return [...prev, contact];
    });
  };

  const handleCloseChat = (contactId: string) => {
    setOpenChats((prev) => prev.filter((c) => c._id !== contactId));
  };

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto bg-white rounded-lg">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
          <div className="text-xs text-gray-500">
            {contacts?.length || 0} total
          </div>
        </div>

        <div className="space-y-2 overflow-y-auto">
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => {
              const isOnline = onlineUserSet.has(contact._id);
              return (
                <div
                  key={contact._id}
                  onClick={() => handleOpenChat(contact)}
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 cursor-pointer shadow-sm"
                >
                  <div className="relative">
                    <Image
                      src={
                        contact.profilePicture || "/assets/default-profile.png"
                      }
                      alt={contact.name}
                      className={`w-10 h-10 rounded-full ring-2 ${
                        isOnline ? "ring-green-500" : "ring-gray-300"
                      }`}
                      width={40}
                      height={40}
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500">{contact.college}</p>
                  </div>
                  <BsCircleFill
                    className={`ml-auto text-[10px] ${
                      isOnline ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
              );
            })
          ) : (
            <div className="p-3 text-sm text-gray-500">
              No contacts available
            </div>
          )}
        </div>
      </div>

      {/* Render Chat Windows */}
      <div className="fixed bottom-0 right-4 flex gap-3">
        {openChats.map((contact) => (
          <ChatWindow
            key={contact._id}
            contact={contact}
            onClose={() => handleCloseChat(contact._id)}
          />
        ))}
      </div>
    </>
  );
}
