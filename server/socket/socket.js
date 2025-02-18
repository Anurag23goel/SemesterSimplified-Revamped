import { Server } from "socket.io";
import databaseConnection from "../../src/utils/dbConnection.js"
import USER from "../../src/utils/models/user.model.js"

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user authentication
    socket.on("authenticate", async (userId) => {
      await databaseConnection();

      try {
        const user = await USER.findById(userId);
        if (user) {
          console.log(`Hurray, ${user.userName} authenticated`);
          socket.userId = userId; // Attach user ID to socket session
          socket.emit("auth_success", user.userName); // Send confirmation back
        } else {
          socket.emit("auth_error", "User not found");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        socket.emit("auth_error", "Database error");
      }
    });

    socket.on("disconnect", () => {
      console.log(`⚠️ User disconnected: ${socket.id}`);
    });
  });

  return io;
};
