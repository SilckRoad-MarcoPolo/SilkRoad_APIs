const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateDailyChallengeValidators = [
  check("challenge_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Challenge name is required"),

  check("xp_reward")
    .trim()
    .not()
    .isEmpty()
    .withMessage("XP reward is required"),

  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),

  validetorMiddleware,
];

exports.checkDailyChallengeId = [
  check("id")
    .isMongoId()
    .withMessage("Daily Challenge ID must be a valid MongoDB ObjectId"),

  validetorMiddleware,
];
