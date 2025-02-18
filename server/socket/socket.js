import { Server } from "socket.io";
import { handleAuthentication } from "./authenticationSocket.js";
import { handleMessages } from "./messageSocket.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Next.js frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Load event handlers
    handleAuthentication(socket, io);
    handleMessages(socket, io);

    socket.on("disconnect", () => {
      console.log(`⚠️ User disconnected: ${socket.id}`);
    });
  });

  return io;
};
