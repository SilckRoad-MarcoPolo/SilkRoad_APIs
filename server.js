const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Utils
const ApiError = require("./src/utils/apiError");
const globalError = require("./src/middlewares/errorMiddleware");

// Routs
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");

// Load env vars
dotenv.config();

// Connect to database
require("./src/config/db")();

const app = express();

// body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", uploadRoutes);

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
