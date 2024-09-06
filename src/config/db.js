const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();

const dbConnection = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB successfully! 🚀".blue.bold))
    .catch((err) => console.log(err));
};

module.exports = dbConnection;
