// socket/socketListeners.ts
import { Socket } from "socket.io-client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  addOnlineUser,
  removeOnlineUser,
  setOnlineUsers,
} from "../redux/slices/OnlineUsersSlice";

export const registerSocketListeners = (
  socket: Socket,
  userId: string,
  dispatch: any
) => {
  socket.on("online_users", (data) => {
    console.log("Online users:", data);
    dispatch(setOnlineUsers(data));
  });

  socket.on("user_online", (userId) => {
    console.log("User", userId, "is online");
    dispatch(addOnlineUser(userId));
  });

  socket.on("user_offline", (userId) => {
    console.log("User", userId, "is offline");
    dispatch(removeOnlineUser(userId));
  });

  socket.on("new_message", (data) => {
    alert("New message:" + data);
  }); 

  socket.on("receive_connection_request", (data) => {
    console.log("New connection request:", data);
    toast.custom((t: any) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                className="h-10 w-10 rounded-full"
                src={
                  data.sender.profilePicture || "/assets/default-profile.png"
                }
                alt="sender_pp"
                width={100}
                height={100}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {data.sender.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">{data.message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));

    // Optionally dispatch Redux actions
    // store.dispatch(addNotification({ type: "connection", data }));
  });

  socket.on("incoming_message", (data) => {
    console.log("💬 New message:", data);
    toast.info(`New message from ${data.senderName}: ${data.content}`);
  });

  socket.on("connection_request_accepted", (data) => {
    toast.success(`${data.accepter.name} accepted your connection request`);
  });

  socket.on("disconnect", () => {
    console.warn("🚫 Socket disconnected");
  });

  // Add more listeners as needed...
};
