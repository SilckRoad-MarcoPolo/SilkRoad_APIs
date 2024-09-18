const Cart = require("../models/cartModel");
const Module = require("../models/moduleModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc Add item to cart
 * @route POST /api/cart
 * @access Private/Logged User
 */
exports.addToCart = asyncHandler(async (req, res) => {
  const { moduleId } = req.body;
  const user = req.user._id;

  const module = await Module.findById(moduleId);
  if (!module) throw new ApiError("Module not found", 404);

  let cart = await Cart.findOne({ user });

  if (!cart) {
    cart = new Cart({ user, items: [{ module: moduleId, quantity: 1 }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.module.toString() === moduleId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ module: moduleId, quantity: 1 });
    }
  }
  await cart.save();
  res.status(200).json({
    message: "Item added to cart",
    cart,
  });
});

/**
 * @desc Get cart items for logged in user
 * @route GET /api/cart
 * @access Private/Logged User
 */
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.module"
  );
  if (!cart) throw new ApiError("Cart is empty", 404);

  res.status(200).json({
    message: "Cart fetched successfully",
    cart,
  });
});

/**
 * @desc Remove item from cart
 * @route DELETE /api/cart
 * @access Private/Logged User
 */
exports.removeFromCart = asyncHandler(async (req, res) => {
  const { moduleId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) throw new ApiError("Cart not found", 404);

  cart.items = cart.items.filter((item) => item.module.toString() !== moduleId);
  await cart.save();

  res.status(200).json({
    message: "Item removed from cart",
    cart,
  });
});
