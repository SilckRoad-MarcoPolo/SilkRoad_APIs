const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const mentorController = require("../controllers/mentorControllers");
const userValidator = require("../validators/userValidators");

router
  .route("/")
  .get(mentorController.getMentors)
  .post(
    protect,
    restrictTo("admin"),
    userValidator.createUserValidator,
    mentorController.createMentor
  );

router
  .route("/:id")
  .get(
    protect,
    restrictTo("admin"),
    userValidator.checkIDValidator,
    mentorController.getMentor
  )
  .patch(
    protect,
    restrictTo("admin"),
    userValidator.updateUserValidator,
    mentorController.updateMentor
  )
  .delete(
    protect,
    restrictTo("admin"),
    userValidator.checkIDValidator,
    mentorController.deleteMentor
  );

module.exports = router;
