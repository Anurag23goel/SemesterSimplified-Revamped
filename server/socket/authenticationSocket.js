import { redis_client } from "../config/redis.connection.js";

export const handleAuthentication = (socket, io) => {
  // EVENT => AUTHENTICATE
  socket.on("authenticate", async (userId) => {
    try {
      const roomID = `user_${userId}`;
      socket.join(roomID);

      // Add socket to Redis structures
      await redis_client.sAdd(`user_sockets:${userId}`, socket.id); // Add socket to user's set
      await redis_client.set(`socket:${socket.id}`, userId); // Reverse mapping for cleanup
      await redis_client.sAdd("onlineUsers", userId); // Track online user

      // Notify other clients this user is online
      socket.broadcast.emit("user_online", userId);

      // Send full online user list (except this one)
      const users = await redis_client.sMembers("onlineUsers");
      const online_users = users.filter((id) => id !== userId);
      socket.emit("online_users", online_users);

      console.log(
        `✅ User ${userId} authenticated, joined room ${roomID}, socket: ${socket.id}`
      );

      socket.emit("auth_success", "User authenticated and joined room");
    } catch (error) {
      console.error("❌ Authentication error:", error);
      socket.emit("auth_error", "Authentication failed");
    }
  });

  // EVENT => DISCONNECT
  socket.on("disconnect", async () => {
    try {
      // Get user ID associated with this socket
      const userId = await redis_client.get(`socket:${socket.id}`);
      if (!userId) {
        console.log(`⚠️ Unknown disconnect for socket ${socket.id}`);
        return;
      }

      // Remove socket from Redis
      await redis_client.sRem(`user_sockets:${userId}`, socket.id);
      await redis_client.del(`socket:${socket.id}`);

      // Check if any sockets remain for this user
      const remainingSockets = await redis_client.sCard(
        `user_sockets:${userId}`
      );
      if (remainingSockets === 0) {
        await redis_client.sRem("onlineUsers", userId);
        await redis_client.del(`user_sockets:${userId}`);
        socket.broadcast.emit("user_offline", userId);
        console.log(`👋 User ${userId} went offline`);
      } else {
        console.log(
          `🔌 Socket ${socket.id} of user ${userId} disconnected, but user still has ${remainingSockets} socket(s)`
        );
      }
    } catch (error) {
      console.error("❌ Disconnect cleanup error:", error);
    }
  });
};
