const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const authValidator = require("../validators/authValidators");

router.post("/signup", authValidator.signUpValidator, authController.signup);
router.post("/login", authValidator.logInValidator, authController.login);
router.post(
  "/forgotpassword",
  authValidator.forgotPasswordValidator,
  authController.forgotPassword
);
router.post("/verifyOTP", authController.verifyPasswordCode);
router.put("/resetpassword", authController.resetPassword);
router.post("/refresh", authController.refreshToken);

module.exports = router;
