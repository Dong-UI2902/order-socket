const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://inspiring-jelly-43332e.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on("sendDataToServer", function (data) {
    socket.emit("sendDataToClient", { ...data });
  });

  socket.on("sendDataUpdateToServer", function (data) {
    socket.emit("sendDataUpdateToClient", { ...data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(8000);
