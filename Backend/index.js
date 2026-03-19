const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const PORT = 5173;
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(
      `User : ${data.username} joined \n room : ${data.room} \n id : ${socket.id}`,
    );
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("user_typing", { username });
  });

  socket.on("stop_typing", ({ room, username }) => {
    socket.to(room).emit("user_stop_typing", { username });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3000");
});
