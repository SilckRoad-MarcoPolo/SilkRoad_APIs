const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateBadgeValidators = [
  check("badge_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Badge name is required"),

  check("badge_icon")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Badge icon is required"),

  check("badge_description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),

  validetorMiddleware,
];

exports.checkBadgeId = [
  check("id")
    .isMongoId()
    .withMessage("Badge ID must be a valid MongoDB ObjectId"),

  validetorMiddleware,
];
