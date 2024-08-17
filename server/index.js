const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");
require("dotenv").config();

const app = express();
app.use(express.json());

// Middleware setup
app.use(cors({
  origin: "*",
  methods: ["POST", "GET"],
  credentials: true,
}));

// Database connection setup
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful!");
  })
  .catch((err) => {
    console.log(err.message);
  });
// API routes setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// Server setup
// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on port ${process.env.PORT}`)
// );
const httpServer = createServer(app);
// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  },
});
httpServer.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
// Global map to store online users and their socket IDs
global.onlineUsers = new Map();
// Socket.io connection event
io.on("connection", (socket) => {
  global.chatSocket = socket;
  // Event to add a user to the online users map
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  // Event to send a message
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
