const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPasswordCode,
  resetPassword,
} = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyOTP", verifyPasswordCode);
router.put("/resetpassword", resetPassword);

module.exports = router;
