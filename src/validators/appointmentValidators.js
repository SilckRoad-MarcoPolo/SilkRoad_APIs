const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateAppointmentValidator = [
  check("mentorId")
    .isMongoId()
    .withMessage("mentorId must be a valid MongoDB ObjectId"),

  check("userId")
    .isMongoId()
    .withMessage("userId must be a valid MongoDB ObjectId"),

  check("appointment_date")
    .isISO8601()
    .withMessage("appointment date must be a valid ISO8601 date"),

  check("status")
    .isIn(["pending", "confirmed", "completed"])
    .withMessage("status must be one of pending, confirmed, completed"),

  validetorMiddleware,
];

exports.checkApointmentId = [
  check("id")
    .isMongoId()
    .withMessage("appointmentId must be a valid MongoDB ObjectId"),

  validetorMiddleware,
];
