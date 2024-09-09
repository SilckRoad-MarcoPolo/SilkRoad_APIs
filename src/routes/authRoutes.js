const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPasswordCode,
  resetPassword,
} = require("../controllers/authControllers");
const authValidator = require("../validators/authValidators");

router.post("/signup", authValidator.signUpValidator, signup);
router.post("/login", authValidator.logInValidator, login);
router.post(
  "/forgotpassword",
  authValidator.forgotPasswordValidator,
  forgotPassword
);
router.post("/verifyOTP", verifyPasswordCode);
router.put("/resetpassword", resetPassword);

module.exports = router;
