'use client'; // Mark as Client Component due to potential interactivity

import Image from "next/image";
import { connection_type } from "@/types/types";

interface ContactsPanelProps {
  contacts: connection_type[];
}

export default function ContactsPanel({ contacts }: ContactsPanelProps) {
  return (
    <div className="w-64 bg-white shadow-md fixed top-16 right-0 h-[calc(100vh-4rem)] border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
      </div>
      <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={contact.profilePicture || "/assets/default-profile.png"}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.college}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-sm text-gray-500">No contacts available</div>
        )}
      </div>
    </div>
  );
}