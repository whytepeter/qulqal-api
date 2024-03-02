const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send a message to the client every 1 minute
  const interval = setInterval(() => {
    socket.emit(
      "onMessage",
      "Hey👋, this message is sent every 20sec from the server using socket"
    );
  }, 20000); // 20 seconds

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
