const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        module: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Module",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// Populate the user field and the module field
cartSchema.pre(/^find/, function (next) {
  this.populate("user", "name, email").populate({
    path: "items.module",
    select: "name price",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
