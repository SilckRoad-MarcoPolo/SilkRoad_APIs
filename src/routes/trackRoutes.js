const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const trackController = require("../controllers/trackControllers");
const {
  createAndUpdateTrackValidator,
  checkTrackId,
} = require("../validators/trackValidators");

router
  .route("/")
  .get(trackController.getTracks)
  .post(
    protect,
    restrictTo("admin"),
    createAndUpdateTrackValidator,
    trackController.createTrack
  );

router
  .route("/:id")
  .get(checkTrackId, trackController.getTrack)
  .patch(
    protect,
    restrictTo("admin"),
    createAndUpdateTrackValidator,
    trackController.updateTrack
  )
  .delete(
    protect,
    restrictTo("admin"),
    checkTrackId,
    trackController.deleteTrack
  );

module.exports = router;
