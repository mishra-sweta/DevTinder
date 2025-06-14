const socket = require("socket.io");

const initialiseSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetId }) => {
      const roomId = [userId, targetId].sort().join("_");
      console.log(firstName + " Joined Room " + roomId);
      socket.join(roomId);
    });
    socket.on("sendMessage", ({ firstName, userId, targetId, text }) => {
      const roomId = [userId, targetId].sort().join("_");
      console.log(firstName + " " + text);
      io.to(roomId).emit("messageReceived", { firstName, text });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initialiseSocket;
