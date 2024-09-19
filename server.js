// 3rd Party Imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
// Core Imports
const path = require("path");
const http = require("http");

// Utils
const ApiError = require("./src/utils/apiError");
const globalError = require("./src/middlewares/errorMiddleware");

// Routs
const mainRoutes = require("./src/routes/MAINROUTES");

// Webhooks Controller
const orderController = require("./src/controllers/orderControllers");

// Load env vars
dotenv.config();

// Connect to database
require("./src/config/db")();

const app = express();

// Create HTTP server for socket.io
const server = http.createServer(app);
const io = socketio(server);

// Checkout Webhook
app.post(
  "/webhook-checkout",
  bodyParser.raw({ type: "application/json" }),
  orderController.stripeWebhook
);

// body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Socket.io Connection Logic
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

// Mount routers
mainRoutes(app);

// Static page for API endpoints
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/public", "home.html"));
});

// 404 Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `server (${process.env.NODE_ENV}) listening at http://localhost:${port}`
      .yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});