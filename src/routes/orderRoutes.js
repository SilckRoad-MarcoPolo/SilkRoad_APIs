const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const router = express.Router();
const { protect } = require("../controllers/authControllers");

router
  .route("/")
  .post(protect, orderControllers.createOrder)
  .get(protect, orderControllers.getMyOrders);
router.get(
  "/checkout-session/:id",
  protect,
  orderControllers.getCheckoutSession
);
router.put("/:id/pay", protect, orderControllers.markOrderAsPaid);
router.get("/:id", protect, orderControllers.getMyOrderById);

module.exports = router;
