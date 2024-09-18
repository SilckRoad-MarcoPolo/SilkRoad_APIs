const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
