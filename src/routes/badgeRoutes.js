const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const badgeController = require("../controllers/badgeControllers");
const {
  createAndUpdateBadgeValidators,
  checkBadgeId,
} = require("../validators/badgeValidators");

router
  .route("/")
  .get(badgeController.getBadges)
  .post(
    protect,
    restrictTo("admin"),
    createAndUpdateBadgeValidators,
    badgeController.createBadge
  );

router
  .route("/:id")
  .get(checkBadgeId, badgeController.getBadge)
  .patch(
    protect,
    restrictTo("admin"),
    checkBadgeId,
    createAndUpdateBadgeValidators,
    badgeController.updateBadge
  )
  .delete(
    protect,
    restrictTo("admin"),
    checkBadgeId,
    badgeController.deleteBadge
  );

module.exports = router;
