const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
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
 * @desc    Update Order To Paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private/Admin
 */
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError("Threr is no such a order for this user id"));
  }
  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({
    status: "success",
    data: updatedOrder,
  });
});

/**
 * @desc    Get CheckOut Session for Stripe and Send it as response
 * @route   POST /api/orders/checkout-session/:moduleId
 * @access  Private
 */
exports.getCheckoutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;

  // 1) Get module by ID
  const module = await Module.findById(req.params.moduleId);
  if (!module) {
    return next(new ApiError("There is no such a module for this module id"));
  }

  // 2) Get order price depending on module price
  const modulePrice = module.price;
  const totalOrderPrice = modulePrice + taxPrice;

  // 3) Create checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: req.user.name,
          },
          unit_amount: totalOrderPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/modules/${module._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.moduleId,
  });

  // 4) Send session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

const createModuleOrder = async (session) => {
  try {
    const moduleId = session.client_reference_id;
    const orderPrice = session.amount_total / 100; // Assuming this is the price without tax

    // Fetch the module by id
    const module = await Module.findById(moduleId);
    if (!module) {
      throw new Error("Module not found");
    }

    // Fetch the user by email
    const user = await User.findOne({ email: session.customer_email });
    if (!user) {
      throw new Error("User not found");
    }

    // tax calculation (10%)
    const taxRate = 0.1;
    const taxPrice = orderPrice * taxRate;

    // Total price including tax
    const totalPrice = orderPrice + taxPrice;

    // Create the order using the new schema structure
    const order = await Order.create({
      user_id: user._id,
      module: [
        {
          module_id: module._id,
          quantity: 1, // You can update this if you want dynamic quantities
          price: orderPrice,
        },
      ],
      taxPrice: taxPrice,
      total_price: totalPrice,
      isPaid: true,
      paidAt: Date.now(),
    });

    // Update module sold count if order is successfully created
    if (order) {
      await Module.updateOne({ _id: module._id }, { $inc: { sold: 1 } });
    }
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
};

exports.webhookCheckout = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify and construct event
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    // Wait for the order to be created
    await createModuleOrder(event.data.object);
  }

  res.status(200).json({
    received: true,
    message: "Webhook received successfully!",
  });
});
