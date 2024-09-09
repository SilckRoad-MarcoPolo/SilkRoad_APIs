const { check, param, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");
const User = require("../models/userModel");

exports.createUserValidator = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords must match");
    }
    return true;
  }),

  check("name").notEmpty().withMessage("Name is required"),

  validetorMiddleware,
];

exports.updateUserValidator = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.params.id) {
        return Promise.reject("E-mail already in use");
      }
    }),

  check("name").notEmpty().withMessage("Name is required"),

  validetorMiddleware,
];

exports.updatePasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Passwords must match");
    }
    return true;
  }),

  validetorMiddleware,
];

exports.checkIDValidator = [
  param("id").custom(async (value) => {
    const user = await User.findById(value);
    if (!user) {
      return Promise.reject("User not found !");
    }
  }),

  check("id").isMongoId().withMessage("Invalid ID"),

  validetorMiddleware,
];
