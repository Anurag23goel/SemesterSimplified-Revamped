import USER from "../../src/utils/models/user.model.js";
import databaseConnection from "../../src/utils/dbConnection.js";
import { redis_client } from "../config/redis.connection.js";

export const handleAuthentication = (socket, io) => {
  // EVENT => AUTHENTICATE
  socket.on("authenticate", async (userId) => {
    await databaseConnection();

    try {
      const res = await USER.updateOne(
        { _id: userId, socketIDs: { $ne: socket.id } },
        { $addToSet: { socketIDs: socket.id } }
      );

      const roomID = `user_${userId}`;
      socket.join(roomID); // Safe in both cases

      if (res.modifiedCount > 0) {
        socket.emit("auth_success", "User authenticated and joined room");
        await redis_client.sAdd("onlineUsers", userId);
        await redis_client.set(`socket:${socket.id}`, userId);
        socket.broadcast.emit("user_online", userId);

        // Send full list to the connected user only
        const users = await redis_client.sMembers("onlineUsers");
        const online_users = users.filter((id) => id !== userId);
        socket.emit("online_users", online_users);

        console.log(`User ${userId} joined room ${roomID} and is online`);
      } else {
        console.log(`User ${userId} rejoined room ${roomID}`);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      socket.emit("auth_error", "Database error");
    }
  });

  // EVENT => DISCONNECT
  socket.on("disconnect", async () => {
    try {
      const user = await USER.findOneAndUpdate(
        { socketIDs: socket.id },
        { $pull: { socketIDs: socket.id } },
        { new: true }
      );

      if (user) {
        console.log(
          `${user.userName} disconnected with socket id - ${socket.id}`
        );
        const userId = await redis_client.get(`socket:${socket.id}`);
        if (userId) {
          await redis_client.sRem("onlineUsers", userId);
          await redis_client.del(`socket:${socket.id}`);
          socket.broadcast.emit("user_offline", userId);
        }
      } else {
        console.log(`Unknown user disconnected: socket id - ${socket.id}`);
      }
    } catch (error) {
      console.error("Error during disconnect cleanup:", error);
    }
  });
};
