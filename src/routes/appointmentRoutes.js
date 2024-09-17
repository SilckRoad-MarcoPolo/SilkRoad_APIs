const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const appointmentController = require("../controllers/appointmentController");
const {
  createAndUpdateAppointmentValidator,
  checkApointmentId,
} = require("../validators/appointmentValidators");

router
  .route("/")
  .get(protect, restrictTo("mentor"), appointmentController.getAppointments)
  .post(
    protect,
    restrictTo("mentor"),
    createAndUpdateAppointmentValidator,
    appointmentController.createAppointment
  );

router
  .route("/:id")
  .get(
    protect,
    restrictTo("mentor"),
    checkApointmentId,
    appointmentController.getAppointment
  )
  .patch(
    protect,
    restrictTo("mentor"),
    createAndUpdateAppointmentValidator,
    appointmentController.updateAppointment
  )
  .delete(
    protect,
    restrictTo("mentor"),
    checkApointmentId,
    appointmentController.deleteAppointment
  );

module.exports = router;
