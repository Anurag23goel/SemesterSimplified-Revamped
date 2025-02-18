import USER from "../../src/utils/models/user.model.js";
import databaseConnection from "../../src/utils/dbConnection.js";

export const handleAuthentication = (socket, io) => {
  // EVENT => AUTHENTICATE
  socket.on("authenticate", async (userId) => {
    await databaseConnection();
    const user = await USER.findById(userId);

    try {
      if (user) {
        console.log(`🎉 ${user.userName} authenticated`);
        user.socketID = socket.id; // Attach socket ID to user
        await user.save();
        socket.emit("auth_success", user.userName);
      } else {
        socket.emit("auth_error", "User not found");
      }
    } catch (error) {
      console.error("❌ Authentication error:", error);
      socket.emit("auth_error", "Database error");
    }
  });

  // EVENT => DISCONNECT
  socket.on("disconnect", async () => {
    const user = await USER.findOne({ socketID: socket.id });
    if (user) {
      user.socketID = null;
      await user.save();
    }
    console.log(`⚠️ User disconnected: ${socket.id}`);
  });
};
