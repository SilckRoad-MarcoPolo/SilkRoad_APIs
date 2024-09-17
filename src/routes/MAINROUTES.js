// Routs
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./uploadRoutes");
const mentorRoutes = require("./mentorRoutes");
const appointmentRoutes = require("./appointmentRoutes");
const trackRoutes = require("./trackRoutes");
const moduleRoutes = require("./moduleRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1", uploadRoutes);
  app.use("/api/v1/mentors", mentorRoutes);
  app.use("/api/v1/appointments", appointmentRoutes);
  app.use("/api/v1/tracks", trackRoutes);
  app.use("/api/v1/modules", moduleRoutes);
};

module.exports = mountRoutes;
