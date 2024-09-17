const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateModuleValidators = [
  check("track_id")
    .isMongoId()
    .withMessage("Track ID must be a valid MongoDB ObjectId")
    .not()
    .isEmpty()
    .withMessage("Track ID is required"),

  check("module_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Module name is required"),

  check("content_url")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Content URL is required"),

  check("estimated_duration")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Estimated duration is required"),

  check("price").trim().not().isEmpty().withMessage("Price is required"),

  validetorMiddleware,
];

exports.checkModuleId = [
  check("id")
    .isMongoId()
    .withMessage("Module ID must be a valid MongoDB ObjectId"),

  validetorMiddleware,
];
