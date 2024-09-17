const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const streacksController = require("../controllers/xpAndStreaksControllers");
const {
  createAndUpdateStreakValidator,
  checkStreakId,
} = require("../validators/streacksValidator");

router
  .route("/")
  .get(streacksController.getXpAndStreaks)
  .post(
    protect,
    restrictTo("admin"),
    createAndUpdateStreakValidator,
    streacksController.createXpAndStreak
  );

router
  .route("/:id")
  .get(checkStreakId, streacksController.getXpAndStreak)
  .patch(
    protect,
    restrictTo("admin"),
    createAndUpdateStreakValidator,
    streacksController.updateXpAndStreak
  )
  .delete(
    protect,
    restrictTo("admin"),
    checkStreakId,
    streacksController.deleteXpAndStreak
  );

module.exports = router;
