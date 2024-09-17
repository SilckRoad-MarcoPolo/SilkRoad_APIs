const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateStreakValidator = [
  check("user", "User is required").isMongoId(),
  check("xp_points", "XP points is required").isNumeric(),
  check("streak_days", "Streak days is required").isNumeric(),
  check("streak_multiplier", "Streak multiplier is required").isNumeric(),

  validetorMiddleware,
];

exports.checkStreakId = [
  check("id", "Id is required").isMongoId(),

  validetorMiddleware,
];
