const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const dailyChallengeController = require("../controllers/dailyChallengeControllers");
const {
  createAndUpdateDailyChallengeValidators,
  checkDailyChallengeId,
} = require("../validators/dailyChallengeValidators");

router
  .route("/")
  .get(dailyChallengeController.getDailyChallenges)
  .post(
    protect,
    restrictTo("admin"),
    createAndUpdateDailyChallengeValidators,
    dailyChallengeController.createDailyChallenge
  );

router
  .route("/:id")
  .get(checkDailyChallengeId, dailyChallengeController.getDailyChallenge)
  .patch(
    protect,
    restrictTo("admin"),
    checkDailyChallengeId,
    createAndUpdateDailyChallengeValidators,
    dailyChallengeController.updateDailyChallenge
  )
  .delete(
    protect,
    restrictTo("admin"),
    checkDailyChallengeId,
    dailyChallengeController.deleteDailyChallenge
  );

module.exports = router;
