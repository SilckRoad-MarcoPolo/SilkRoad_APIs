const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Routs
const authRoutes = require("./src/routes/authRoutes");

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

// Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `server (${process.env.NODE_ENV}) listening at http://localhost:${port}`
      .yellow.bold
  );
});
