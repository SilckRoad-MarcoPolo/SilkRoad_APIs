const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateTrackValidator = [
  check("track_name").isString().withMessage("Track name must be a string"),

  check("difficulty_level")
    .isString()
    .withMessage("Difficulty level must be a string"),

  check("description").isString().optional(),

  validetorMiddleware,
];

exports.checkTrackId = [
  check("id")
    .isMongoId()
    .withMessage("Track ID must be a valid MongoDB ObjectId"),

  validetorMiddleware,
];
