import { MESSAGE } from "../../src/utils/models/messages.model.js";
import databaseConnection from "../../src/utils/dbConnection.js";
import { redis_client } from "../config/redis.connection.js";

export const handleMessages = (socket, io) => {
  // EVENT => SEND MESSAGE
  socket.on("send_message", async (data) => {
    try {
      const newMessage = await MESSAGE.create({
        roomId: data.roomId,
        sender: data.sender,
        receiver: data.receiver,
        content: data.content,
      });

      if (data.room_type === "individual") {
        const recipientSocketIds = await redis_client.sMembers(
          `user_sockets:${data.receiver}`
        );

        console.log("Recipient socket IDs:", recipientSocketIds);

        recipientSocketIds.forEach((socketId) => {
          socket.to(socketId).emit("new_message", newMessage);
        });
      }
    } catch (error) {
      console.error("Message error:", error);
      socket.emit("message_error", "Failed to send message");
    }
  });

  // EVENT => FETCH MESSAGES
  socket.on("fetch_messages", async () => {
    await databaseConnection();

    try {
      const messages = await MESSAGE.find().populate(
        "sender",
        "userName email"
      );
      socket.emit("messages_list", messages);
    } catch (error) {
      console.error("❌ Fetch messages error:", error);
      socket.emit("message_error", "Failed to fetch messages");
    }
  });
};
