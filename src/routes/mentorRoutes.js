const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const mentorController = require("../controllers/mentorController");

router
  .route("/")
  .get(mentorController.getMentors)
  .post(protect, restrictTo("admin"), mentorController.createMentor);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), mentorController.getMentor)
  .patch(protect, restrictTo("admin"), mentorController.updateMentor)
  .delete(protect, restrictTo("admin"), mentorController.deleteMentor);

module.exports = router;
