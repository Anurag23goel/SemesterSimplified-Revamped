import { Server } from "socket.io";
import { handleAuthentication } from "./authenticationSocket.js";
import { handleMessages } from "./messageSocket.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Next.js frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Load event handlers
    handleAuthentication(socket, io);
    handleMessages(socket, io);
  });

  return io;
};

export const getIO = () => io;
