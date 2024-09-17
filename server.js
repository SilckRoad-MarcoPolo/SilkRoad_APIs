const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");

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

// Checkout Webhook
app.post(
  "/webhooks-checkout",
  express.raw({ type: "application/json" }),
  orderController.webhookCheckout
);

// body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve static files
app.use(express.static("public"));

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
