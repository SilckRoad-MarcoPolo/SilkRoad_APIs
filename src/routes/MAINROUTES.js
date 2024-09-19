// Routs
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./uploadRoutes");
const mentorRoutes = require("./mentorRoutes");
const appointmentRoutes = require("./appointmentRoutes");
const trackRoutes = require("./trackRoutes");
const moduleRoutes = require("./moduleRoutes");
const dailyChallengeRoutes = require("./dailyChallengeRoutes")
const badgeRoutes = require("./badgeRoutes");
const streackRoutrs = require("./streacksRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes = require("./cartRoutes");
const chatRoutes = require("./chatRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1", uploadRoutes);
  app.use("/api/v1/mentors", mentorRoutes);
  app.use("/api/v1/appointments", appointmentRoutes);
  app.use("/api/v1/tracks", trackRoutes);
  app.use("/api/v1/modules", moduleRoutes);
  app.use("/api/v1/daily-challenges", dailyChallengeRoutes);
  app.use("/api/v1/badges", badgeRoutes);
  app.use("/api/v1/streaks", streackRoutrs);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/chat", chatRoutes);
};

module.exports = mountRoutes;
