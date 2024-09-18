const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");
const { protect } = require("../controllers/authControllers");

router
  .route("/")
  .post(protect, cartControllers.addToCart)
  .get(protect, cartControllers.getCart)
  .delete(protect, cartControllers.removeFromCart);

module.exports = router;
