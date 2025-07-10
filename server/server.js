import express from "express";
import http from "http";
import { initializeSocket } from "./socket/socket.js"; // Your Socket.IO logic
import databaseConnection from "../src/utils/dbConnection.js";
import "dotenv/config";
import connectionRouter from "./routes/connectionReq/connectionReq.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { redis_client } from "./config/redis.connection.js";

// 1. Create Express app
const app = express();

// 2. Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// 3. Example REST route
app.use("/api/connectionReq", connectionRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// 4. Create HTTP server from Express app
const server = http.createServer(app);
export const onlineUsers = new Map();

// 5. Initialize MongoDB connection and then Socket
const startServer = async () => {
  try {
    await databaseConnection();
    console.log("Connected to MongoDB");
    await redis_client.connect();
    console.log("Connected to Redis");

    // 6. Initialize Socket.IO
    initializeSocket(server);

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB or start server:", error);
  }
};

startServer();
