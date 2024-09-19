const socketio = require("socket.io");

const setupSocket = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log("New WebSocket connection...");

    // Listen for joining a specific channel
    socket.on("joinChannel", (channelId) => {
      socket.join(channelId);
      console.log(`User joined channel: ${channelId}`);
    });

    // Listen for messages and broadcast to the channel
    socket.on("sendMessage", ({ channelId, message }) => {
      io.to(channelId).emit("receiveMessage", message);
      console.log(`Message sent to channel ${channelId}: ${message}`);
    });

    // Handle disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io; 
};

module.exports = setupSocket;
