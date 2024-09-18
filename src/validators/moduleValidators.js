const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createAndUpdateModuleValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("duration").notEmpty().withMessage("Duration is required"),
  validetorMiddleware,
];

exports.checkModuleId = [
  body("moduleId").notEmpty().withMessage("Module ID is required"),
  validetorMiddleware,
];
