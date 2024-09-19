const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// Populate the track field
const autoPopulateTrack = function (next) {
  this.populate("track", "title");
  next();
};

moduleSchema.pre(/^find/, autoPopulateTrack);
moduleSchema.pre(/^findOne/, autoPopulateTrack);

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
