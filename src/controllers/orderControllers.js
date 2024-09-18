const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Module = require("../models/moduleModel");
const mainHandler = require("./MAINHANDLERS");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Get All Orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
exports.getAllOrders = mainHandler.getAll(Order);

/**
 * @desc    Get Order By ID
 * @route   GET /api/orders/:id
 * @access  Private/Admin
 */
exports.getOrderById = mainHandler.getOne(Order);

/**
 * @desc    Create Order For Logged User
 * @route   POST /api/orders
 * @access  Private/Logged User
 */
exports.createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.module"
  );
  if (!cart) throw new ApiError("No cart found", 404);

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.module.price * item.quantity,
    0
  );

  const order = new Order({
    user: req.user._id,
    items: cart.items,
    totalPrice,
  });
  await order.save();

  res.status(201).json({
    success: true,
    data: order,
  });
});

/**
 * @desc    Get Checkout Session
 * @route   GET /api/orders/:id/checkout-session
 * @access  Private/Logged User
 */
exports.getCheckoutSession = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.module");
  if (!order) throw new ApiError("Order not found", 404);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: req.user.name,
          },
          unit_amount: order.totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/api/v1/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/api/v1/orders`,
    customer_email: req.user.email,
    client_reference_id: req.order._id.toString(),
  });

  res.status(200).json({
    success: true,
    data: session,
  });
});

/**
 * @desc    Update Order To Paid After Payment
 * @route   POST /webhook-checkout
 * @access  Private/Logged User
 */
exports.stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Use req.body as a Buffer since we are using bodyParser.raw()
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Retrieve the order based on session metadata or session id
    const order = await Order.findById(session.metadata.orderId);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();
    }
  }

  res.status(200).json({ received: true });
});
