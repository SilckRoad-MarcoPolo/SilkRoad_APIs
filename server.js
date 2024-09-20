// 3rd Party Imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const colors = require("colors");

// Core Imports
const path = require("path");
const http = require("http");

// Utils
const ApiError = require("./src/utils/apiError");
const globalErrorDev = require("./src/middlewares/devErrorMiddleware");
const globalErrorProd = require("./src/middlewares/prodErrorMiddleware");

// Routs
const mainRoutes = require("./src/routes/MAINROUTES");

// Webhook Controller
const orderController = require("./src/controllers/orderControllers");

// Load env vars
dotenv.config();

// Connect to database
require("./src/config/db")();

// Initialize express app
const app = express();

// Enable compression
app.use(compression());

// Create HTTP server for socket.io
const server = http.createServer(app);

// Setup socket.io
require("./src/config/socket.io")(server);

// Checkout Webhook
app.post(
  "/webhook-checkout",
  bodyParser.raw({ type: "application/json" }),
  orderController.stripeWebhook
);

// body parser
app.use(express.json({ limit: "30kb" }));

// Prevent http param pollution
app.use(
  hpp({
    whitelist: ["price"],
  })
);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mongo Sanitize Data (NoSQL Query Injection)
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

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

// Error handling middleware
if (process.env.NODE_ENV === "development") {
  app.use(globalErrorDev);
} else if (process.env.NODE_ENV === "production") {
  app.use(globalErrorProd);
}

// Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `server (${process.env.NODE_ENV}) listening at http://localhost:${port}`
      .magenta.bold
  );
});

// Handle unhandled promise rejections
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});

// Export app
module.exports = app;