const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        module: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Module",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

// Populate the user field and the module field
orderSchema.pre(/^find/, function (next) {
  this.populate("user", "name email").populate({
    path: "items.module",
    select: "name price",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
