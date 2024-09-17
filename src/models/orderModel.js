const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    module: [
      {
        module_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Module",
          required: [true, "Module ID is required"],
        },
        quantity: {
          type: Number,
          default: 1,
          required: [true, "Quantity is required"],
        },
        price: {
          type: Number,
          required: [true, "Module price is required"],
        },
      },
    ],
    taxPrice: {
      type: Number,
      required: [true, "Tax price is required"],
    },
    total_price: {
      type: Number,
      required: [true, "Total price is required"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Populate user_id and module_id
const autoPopulate = function (next) {
  this.populate("user_id", "name email");
  this.populate("module.module_id", "name price");
  next();
};

orderSchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
