import USER from "../../src/utils/models/user.model.js";
import databaseConnection from "../../src/utils/dbConnection.js";

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
        console.log(`User ${userId} joined room ${roomID}`);
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
        console.log(`${user.userName} disconnected with socket id - ${socket.id}`);
      } else {
        console.log(`Unknown user disconnected: socket id - ${socket.id}`);
      }
    } catch (error) {
      console.error("Error during disconnect cleanup:", error);
    }
  });
};
