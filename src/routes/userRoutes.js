const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");
const userValidators = require("../validators/userValidators");

// Routes that do not require restrictTo middleware
router
  .route("/updatepassword")
  .patch(
    protect,
    userValidators.updatePasswordValidator,
    userController.updatePassword
  );

router
  .route("/updateprofile")
  .patch(
    protect,
    userValidators.updateUserValidator,
    userController.updateProfile
  );

router
  .route("/inactiveaccount")
  .delete(protect, userController.inactiveAccount);

// Routes that require restrictTo middleware
router
  .route("/")
  .get(protect, restrictTo("admin"), userController.getUsers)
  .post(
    protect,
    restrictTo("admin"),
    userValidators.createUserValidator,
    userController.createUser
  );

router
  .route("/:id")
  .get(
    protect,
    restrictTo("admin"),
    userValidators.checkIDValidator,
    userController.getUser
  )
  .patch(
    protect,
    restrictTo("admin"),
    userValidators.updateUserValidator,
    userController.updateUser
  )
  .delete(
    protect,
    restrictTo("admin"),
    userValidators.checkIDValidator,
    userController.deleteUser
  );

module.exports = router;
