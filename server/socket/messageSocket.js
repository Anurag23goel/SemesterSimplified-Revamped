import MESSAGE from "../../src/utils/models/messages.model.js";
import databaseConnection from "../../src/utils/dbConnection.js";

export const handleMessages = (socket, io) => {
  // EVENT => SEND MESSAGE
  socket.on("send_message", async (data) => {
    await databaseConnection();
    
    try {
      const newMessage = new MESSAGE({
        text: data.text,
        sender: data.senderId,
      });

      await newMessage.save();

      io.emit("receive_message", newMessage); // Broadcast message
    } catch (error) {
      console.error("❌ Message error:", error);
      socket.emit("message_error", "Failed to send message");
    }
  });

  // EVENT => FETCH MESSAGES
  socket.on("fetch_messages", async () => {
    await databaseConnection();
    
    try {
      const messages = await MESSAGE.find().populate("sender", "userName email");
      socket.emit("messages_list", messages);
    } catch (error) {
      console.error("❌ Fetch messages error:", error);
      socket.emit("message_error", "Failed to fetch messages");
    }
  });
};
