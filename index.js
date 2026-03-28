require("dotenv").config();
require("./events/listners");

const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");

    // Create HTTP server
    const httpServer = http.createServer(app);
    
    // Initialize Socket.IO
    initializeSocket(httpServer);
    console.log("✅ Socket.IO initialized");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 WebSocket server ready`);  
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });