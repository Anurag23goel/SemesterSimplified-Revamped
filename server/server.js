import http from "http";
import { initializeSocket } from "./socket/socket.js";
import databaseConnection from "../src/utils/dbConnection.js";
import "dotenv/config";

const server = http.createServer(); // No need for Express since this is WebSocket only

// ✅ Ensure MongoDB connection before starting WebSockets
databaseConnection().then(() => {
  initializeSocket(server);
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`WebSocket server running on http://localhost:${PORT}`);
});