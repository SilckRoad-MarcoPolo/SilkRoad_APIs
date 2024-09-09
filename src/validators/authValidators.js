const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");
const User = require("../models/userModel");

exports.signUpValidator = [
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
    .withMessage("Password must be at least 6 characters long"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords must match");
    }
    return true;
  }),

  check("name").notEmpty().withMessage("Name is required"),

  validetorMiddleware,
];

exports.logInValidator = [
  check("email")
    .notEmpty()
    .withMessage("User Email is Required !")
    .isEmail()
    .withMessage("Invalid Email Provided !"),

  check("password")
    .notEmpty()
    .withMessage("User Password is Required !")
    .isLength({ min: 8 })
    .withMessage("User Password must be at least 8 characters !"),

  validetorMiddleware,
];

exports.forgotPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("User Email is Required !")
    .isEmail()
    .withMessage("Invalid Email Provided !"),

  validetorMiddleware,
];
