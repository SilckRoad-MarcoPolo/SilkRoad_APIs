const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const orderController = require("../controllers/orderControllers");

router
  .route("/")
  .get(protect, restrictTo("admin"), orderController.getAllOrders);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), orderController.getOrderById);

router
  .route("/:id/pay")
  .put(protect, restrictTo("admin"), orderController.updateOrderToPaid);

router
  .route("/checkout-session/:moduleId")
  .get(protect, restrictTo("user"), orderController.getCheckoutSession);

module.exports = router;
