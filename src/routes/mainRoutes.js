// Routs
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./uploadRoutes");
const mentorRoutes = require("./mentorRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1", uploadRoutes);
  app.use("/api/v1/mentors", mentorRoutes);
};

module.exports = mountRoutes;
